"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { FiPlus, FiCheck, FiX } from "react-icons/fi";

export default function PlaylistSideBar({
  onSelectPlaylist,
}: {
  onSelectPlaylist: (playlist: any) => void;
}) {
  const [playLists, setPlayLists] = useState<any[]>([]);
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    handleLoadPlaylist();
  }, []);

  const handleLoadPlaylist = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch("/api/playlists", {
        headers: { token: token ?? "" },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Fetch failed");
      }

      const data = await res.json();
      setPlayLists(data);

      if (data.length > 0) {
        onSelectPlaylist(data[0]);
        setSelectedId(data[0].id);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleAddPlaylist = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch("/api/playlists", {
        method: "POST",
        headers: { token: token ?? "" },
        body: JSON.stringify({ name: playlistName, description: description }),
      });

      handleLoadPlaylist();
      setShowInput(false);
      setPlaylistName("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <aside className="w-64 h-full p-4 bg-teal-100">
      <div className="flex items-center">
        <h3 className="font-semibold">Playlists</h3>
        <div>
          <button
            onClick={() => setShowInput(true)}
            className="ml-2 px-1 py-1 text-black bg-gray-300 hover:bg-gray-500 rounded-full cursor-pointer"
          >
            <FiPlus size={20} />
          </button>
        </div>
      </div>
      <div className="flex flex-col ml-2 mt-2 p-1 bg-teal-500 shadow-xl rounded-md">
        {playLists.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              onSelectPlaylist(p);
              setSelectedId(p.id);
            }}
            className={`text-left p-2 cursor-pointer rounded-sm ${
              selectedId === p.id
                ? "bg-gray-300"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {showInput && (
        <div className="relative w-full mt-2">
          <input
            type="text"
            placeholder="Playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full p-2 bg-white border border-gray-300 text-black rounded pr-16"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <button onClick={handleAddPlaylist} className="cursor-pointer">
              <FiCheck size={24} />
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="cursor-pointer"
            >
              <FiX size={24} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
