"use client";

export default function TrackCard({
  track,
  onAdd,
}: {
  track: any;
  onAdd: (t: any) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-300/50">
      <img
        src={track.artworkUrl100}
        alt={track.trackName}
        className="w-16 h-16 rounded-md"
      />
      <div className="flex-1">
        <div className="font-medium">{track.trackName}</div>
        <div className="text-sm text-muted">{track.artistName}</div>
      </div>
      <div className="flex gap-2">
        {track.previewUrl && (
          <audio controls src={track.previewUrl} className="w-100" />
        )}
        <button
          onClick={() => onAdd(track)}
          className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700 cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
}
