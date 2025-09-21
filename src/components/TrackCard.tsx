"use client";

import { FiPlus, FiMinus } from "react-icons/fi";

interface TrackCardProps {
  track: any;
  onAddTrack?: (t: any) => void;
  onDeleteTrack?: (t: any) => void;
}
export default function TrackCard({
  track,
  onAddTrack,
  onDeleteTrack,
}: TrackCardProps) {
  return (
    <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-300/50">
      <img
        src={track.artworkUrl100}
        alt={track.trackName}
        className="w-16 h-16 rounded-md"
      />
      <div className="flex-1">
        <div className="text-md font-semibold">{track.trackName}</div>
        <div className="text-sm">{track.artistName}</div>
      </div>

      <div className="flex gap-2">
        {track.previewUrl && (
          <audio controls src={track.previewUrl} className="w-100" />
        )}

        {onAddTrack && !onDeleteTrack && (
          <div className="flex items-center">
            <button
              onClick={() => onAddTrack(track)}
              className="p-1 text-white bg-blue-400 hover:bg-blue-500 rounded-full cursor-pointer"
            >
              <FiPlus size={24} />
            </button>
          </div>
        )}

        {onDeleteTrack && !onAddTrack && (
          <div className="flex items-center">
            <button
              onClick={() => onDeleteTrack(track)}
              className="p-1 text-white bg-red-300 hover:bg-red-400 rounded-full cursor-pointer"
            >
              <FiMinus size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
