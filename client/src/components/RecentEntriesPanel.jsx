import React, { useState } from "react";
import { getJournalEntries } from "../api/auth";
import {deleteJournalEntry} from '../api/auth';
import {updateJournalEntry } from '../api/auth';



const moods = [
  { label: "Happy", value: "happy", emoji: "😄" },
  { label: "Sad", value: "sad", emoji: "😢" },
  { label: "Angry", value: "angry", emoji: "😠" },
  { label: "Relaxed", value: "relaxed", emoji: "😌" },
  { label: "Neutral", value: "neutral", emoji: "😐" }, 
];


const RecentEntriesPanel = ({  entries = [],onEdit,onDelete  }) => {

 

  return (
    <div className="w-full lg:w-1/3 border-r border-gray-200 dark:border-zinc-800 p-4 overflow-y-auto max-h-[80vh]">
      <h2 className="text-lg font-semibold mb-4">Your Entries</h2>
      {entries.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No entries yet.</p>
      ) : (
        <ul className="space-y-3" >
          {entries.map((entry) => (
            <li onClick={() => onEdit(entry)}
              key={entry._id}
              className="p-3 bg-gray-100 dark:bg-zinc-800 rounded-lg shadow text-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center justify-between mb-1 gap-2 text-violet-400">
                  <span className="text-2xl">
                  {moods.find((m) => m.value === entry.mood)?.emoji || "📝"}
                </span>
                <span className="text-xl line-clamp-1">
                  {entry.title? "" : new Date(entry.createdAt).toLocaleDateString()}
                {entry.title?.length > 20 ? entry.title.slice(0, 20) + "..." : entry.title}
                </span>

                </div>
                
                <span className="text-xs text-gray-400">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
            <div className="flex justify-between">
               <p className="line-clamp-2">{entry.text}</p>
           <div className="flex justify-end gap-2 mt-2">
          
          <button
            onClick={() => onDelete(entry._id)}
            className="text-red-500 text-xs hover:underline"
          >
            Delete
          </button>
        </div>
            </div>
             
            </li>
          ))}
                      
        </ul>
        
      )}
      
    </div>
  );
};

export default RecentEntriesPanel;
