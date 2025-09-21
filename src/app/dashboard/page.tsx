"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import SearchBar from "@/components/SearchBar";
import TrackCard from "@/components/TrackCard";
import PlaylistSideBar from "@/components/PlaylistSideBar";

export default function Dashboard() {
  const router = useRouter();
  const [searchTracks, setSearchTracks] = useState<any>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>([]);
  const [playlistTracks, setPlaylistTrack] = useState<any>([]);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);

      if (!session) {
        console.log("Redirecting to Login");
        router.replace("/login");
      }
    };

    checkSession();
  }, []);

  const search = async (name: string) => {
    const res = await fetch(`/api/search?q=${name}`);
    const data = await res.json();
    setSearchTracks(data);
  };

  const clearSearch = (name: string) => {
    if (name.length === 0) {
      setSearchTracks([]);
    }
  };

  const handleLoadPlaylistTracks = async (playlist: any) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch(
        `/api/playlist_tracks?playlist_id=${playlist.id}`,
        {
          headers: { token: token ?? "" },
        }
      );

      const data = await res.json();
      setSelectedPlaylist(playlist);
      setPlaylistTrack(data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleAddToPlaylist = async (track: any) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      await fetch("/api/playlist_tracks", {
        method: "POST",
        headers: { token: token ?? "" },
        body: JSON.stringify({ playlist_id: selectedPlaylist.id, track }),
      });

      handleLoadPlaylistTracks(selectedPlaylist);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDeleteFromPlaylist = async (track: any) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      await fetch(`/api/playlist_tracks/${track.id}`, {
        method: "DELETE",
        headers: { token: token ?? "" },
      });

      handleLoadPlaylistTracks(selectedPlaylist);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-between">
        <PlaylistSideBar onSelectPlaylist={handleLoadPlaylistTracks} />
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-400 text-white rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
      <main className="flex flex-col p-4 w-screen">
        <SearchBar onSearch={search} onChange={clearSearch} />
        <div
          className={`${
            searchTracks.length > 0 &&
            "mt-4 flex-1  border border-gray-300 rounded p-2 overflow-auto"
          }`}
        >
          {searchTracks.length > 0 &&
            searchTracks.map((track: any) => (
              <TrackCard
                key={track.trackId}
                track={track}
                onAddTrack={handleAddToPlaylist}
              />
            ))}
        </div>

        <div className="flex-1 mt-4 border border-gray-300 rounded p-2 overflow-auto">
          <h1 className="text font-semibold">Your Song</h1>
          {playlistTracks.map((track: any) => (
            <TrackCard
              key={track.id}
              track={track}
              onDeleteTrack={handleDeleteFromPlaylist}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
