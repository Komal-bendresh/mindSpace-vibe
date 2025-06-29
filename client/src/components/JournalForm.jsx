import React, { useState, useEffect, useRef } from "react";
import { createJournalEntry, updateJournalEntry, analyzeJournalEntry,generatePlaylist, } from "../api/auth";
import { toast } from "react-hot-toast";
import PlaylistSection from "./PlaylistSection";

const moods = [
  { label: "Happy", value: "happy", emoji: "😄" },
  { label: "Sad", value: "sad", emoji: "😢" },
  { label: "Angry", value: "angry", emoji: "😠" },
  { label: "Relaxed", value: "relaxed", emoji: "😌" },
  { label: "Neutral", value: "neutral", emoji: "😐" },
];

const JournalForm = ({ onEntryAdded, editingEntry, clearEditing }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [mood, setMood] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const recognitionRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState("");

  // Initialize speech recognition once
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText((prev) => prev + " " + transcript);
        toast.success("Voice added to journal");
      };

      recognitionRef.current.onerror = () => {
        toast.error("Voice recognition failed");
      };
    }
  }, []);

  useEffect(() => {
  if (editingEntry) {
    setMood(editingEntry.mood || "");
    setTitle(editingEntry.title || "");
    setText(editingEntry.text || "");
    setAiAnalysis(editingEntry.analysis || "");
    setShowAnalysis(!!editingEntry.analysis);

    // 🟢 Fix: Use existing analysis safely
    if (editingEntry.analysis) {
      handleTextToSpeech(editingEntry.analysis);
    }
  } else {
    setMood("");
    setTitle("");
    setText("");
    setAiAnalysis("");
    setShowAnalysis(false);
  }
}, [editingEntry]);


  const handleAIAnalysis = async () => {
    if (!text.trim()) return toast.error("Please write your journal first.");

    try {
      setLoading(true);
      setAnalyzing(true);
    const result = await analyzeJournalEntry(text); 
    setAiAnalysis(result);
    handleTextToSpeech(result);
    setShowAnalysis(true);

    const detected = result.match(/Emotion detected:\s*(\w+)/i)?.[1]?.toLowerCase();
    setEmotion(detected);


    let playlistUrl = null;
    if (detected) {
      const res = await generatePlaylist(detected); 
      playlistUrl = res.playlist;
      setPlaylistUrl(res.playlist);
    }

      const payload = { mood, title, text, analysis: result ,playlistUrl};


      if (!editingEntry) {
        await createJournalEntry(payload);
        toast.success("Journal auto-saved after analysis!");
        onEntryAdded();
      } else {
        await updateJournalEntry(editingEntry._id, payload);
        toast.success("Journal updated with new analysis!");
      }

    } catch (err) {
      toast.error("AI analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!mood || !text) {
      toast.error("Please select a mood and write something.");
      return;
    }

    try {
      setLoading(true);
      const payload = { mood, title, text, analysis: aiAnalysis };
      if (editingEntry) {
        await updateJournalEntry(editingEntry._id, payload);
        toast.success("Journal updated!");
        clearEditing();
      } else {
        await createJournalEntry(payload);
        toast.success("Journal saved!");
      }

      setMood("");
      setTitle("");
      setText("");
      setAiAnalysis("");
      setShowAnalysis(false);
      onEntryAdded();
    } catch (err) {
      toast.error("Error saving entry.");
    } finally {
      setLoading(false);
    }
  };

const handleAnalysis = async () => {
  const analysis = await analyzeJournalEntry(text);
  setAnalysisText(analysis);
  const detected = analysis.match(/Emotion detected:\s*(\w+)/i)?.[1]?.toLowerCase();
  setEmotion(detected);
};

  const handleSpeechToText = () => {
    if (!recognitionRef.current) return toast.error("STT not supported");
    recognitionRef.current.start();
    toast("Listening...");
  };

  const handleTextToSpeech = (textToSpeak) => {
  if (!window.speechSynthesis) return toast.error("TTS not supported");

  if (isSpeaking) {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    return;
  }

  const utter = new SpeechSynthesisUtterance(textToSpeak);
  utter.lang = "en-US";

  utter.onend = () => setIsSpeaking(false);
  utter.onerror = () => {
    setIsSpeaking(false);
    toast.error("TTS failed");
  };

  setIsSpeaking(true);
  speechSynthesis.speak(utter);
};

  return (
    <div className="w-full lg:w-2/3 p-4">
      <h2 className="text-lg font-semibold mb-4">{editingEntry ? "Edit Entry" : "New Entry"}</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700"
          placeholder="Title (optional)"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Mood</label>
        <div className="flex gap-3">
          {moods.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMood(m.value)}
              className={`text-3xl transition-all p-2 rounded-full border ${
                mood === m.value
                  ? "bg-blue-100 dark:bg-blue-800 border-blue-500"
                  : "bg-gray-100 dark:bg-zinc-800 border-transparent"
              }`}
            >
              {m.emoji}
            </button>
          ))}
        </div>
        {mood && <p className="mt-2 text-sm text-gray-500">Selected: {mood}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Journal</label>
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700"
          placeholder="Write your thoughts..."
        />
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={handleSpeechToText}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            🎙️ Dictate
          </button>
          <button
  type="button"
  onClick={() => handleTextToSpeech(text)}
  disabled={!text}
  className="bg-yellow-500 text-white px-4 py-1 rounded disabled:opacity-50"
>
  {isSpeaking ? "⏹️ Stop Speaking" : "🔊 Speak Entry"}
</button>
        </div>
        
      </div>
      

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? (editingEntry ? "Updating..." : "Saving...") : editingEntry ? "Update Entry" : "Save Entry"}
        </button>
        <button
          onClick={handleAIAnalysis}
          disabled={!text || loading}
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          AI-Powered Mood Analysis
        </button>
        
        {editingEntry && (
          <button
            onClick={clearEditing}
            className="text-gray-500 hover:text-black dark:hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>
      <PlaylistSection detectedMood={emotion} />

      {showAnalysis && aiAnalysis && (
  <div className="mt-4 p-4 bg-gray-100 dark:bg-zinc-800 rounded overflow-scroll">
    <h3 className="font-semibold mb-2">AI Mood Analysis:</h3>
    <pre className="text-sm">{aiAnalysis}</pre>

    <div className="flex flex-wrap gap-3 mt-2">
      <button
        onClick={() => handleTextToSpeech(aiAnalysis)}
        className="bg-indigo-600 text-white px-4 py-1 rounded"
      >
        {isSpeaking ? "⏹️ Stop Speaking" : "🔊 Speak Analysis"}
      </button>

      {playlistUrl && (
        <a
          href={playlistUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-pink-600 text-white px-4 py-1 rounded"
        >
          🎧 Listen to Playlist
        </a>
      )}
    </div>
  </div>
)}
     
    </div>
    
  );
};

export default JournalForm;
