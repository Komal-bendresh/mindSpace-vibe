import React, { useState } from "react";
import { generatePlaylist } from "../api/auth";
import { toast } from "react-hot-toast";

const PlaylistSection = ({ detectedMood }) => {
  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generatePlaylist(detectedMood);
      setPlaylistUrl(res.playlist);
      toast.success(res.message);
    } catch {
      toast.error("Could not fetch playlist");
    } finally {
      setLoading(false);
    }
  };

  if (!detectedMood) return null;

  return (
    <div className="mt-4 p-4 border rounded bg-gray-100 dark:bg-zinc-800">
      <h3 className="text-md font-semibold mb-2">Feeling {detectedMood}? Here's a playlist for you:</h3>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Fetching..." : "Generate Playlist"}
      </button>

      {playlistUrl && (
        <div className="mt-3">
          <a
            href={playlistUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Open Playlist
          </a>
        </div>
      )}
    </div>
  );
};

export default PlaylistSection;