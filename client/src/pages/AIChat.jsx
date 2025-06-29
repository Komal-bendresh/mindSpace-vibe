// import React, { useEffect, useState, useRef } from "react";
// import {
//   getChatHistory,
//   sendMessageToAI,
//   clearChatHistory,
// } from "../api/auth";
// import ChatEntryPanel from "../components/ChatEntryPanel";
// import { toast } from "react-hot-toast";

// const AIChatPage = () => {
//   const [allMessages, setAllMessages] = useState([]);
//   const [visibleMessages, setVisibleMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatBoxRef = useRef(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const messages = await getChatHistory();
//         setAllMessages(messages || []);

//         // Show today’s messages by default
//         const today = new Date().toDateString();
//         const todayMsgs = messages.filter(
//           (m) => new Date(m.date).toDateString() === today
//         );
//         setVisibleMessages(todayMsgs);
//       } catch (err) {
//         toast.error("Could not load chat history");
//       }
//     };

//     fetchHistory();
//   }, []);

//   const handleSend = async () => {
//     if (!message.trim()) return;
//     const userMsg = { role: "user", content: message, date: new Date() };
//     setVisibleMessages((prev) => [...prev, userMsg]);
//     setMessage("");
//     setLoading(true);

//     try {
//       const replyText = await sendMessageToAI(message);
//       const aiMsg = {
//         role: "assistant",
//         content: replyText,
//         date: new Date(),
//       };
//       setVisibleMessages((prev) => [...prev, userMsg, aiMsg]);
//       setAllMessages((prev) => [...prev, userMsg, aiMsg]);
//     } catch (err) {
//       toast.error("Message failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = async () => {
//     try {
//       await clearChatHistory();
//       toast.success("Chat cleared");
//       const updated = allMessages.filter(
//         (m) => new Date(m.date).toDateString() !== new Date().toDateString()
//       );
//       setAllMessages(updated);
//       setVisibleMessages([]);
//     } catch {
//       toast.error("Failed to clear chat");
//     }
//   };

//   useEffect(() => {
//     chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
//   }, [visibleMessages]);

//   return (
//     <div className="flex flex-col lg:flex-row p-4 gap-4">
//       <ChatEntryPanel
//         chatHistory={allMessages}
//         onSelectDate={setVisibleMessages}
//       />

//       <div className="w-full lg:w-2/3 p-4 flex flex-col">
//         <div
//           ref={chatBoxRef}
//           className="flex-1 overflow-y-auto bg-white dark:bg-zinc-900 p-4 rounded shadow border dark:border-zinc-700"
//         >
//           {visibleMessages.length === 0 ? (
//             <p className="text-gray-500 text-sm">No messages</p>
//           ) : (
//             visibleMessages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`mb-3 text-sm ${
//                   msg.role === "user" ? "text-right" : "text-left"
//                 }`}
//               >
//                 <div
//                   className={`inline-block px-4 py-2 rounded-lg ${
//                     msg.role === "user"
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-200 dark:bg-zinc-800 text-black dark:text-white"
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))
//           )}
//           {loading && (
//             <div className="text-left text-sm text-gray-400 mt-2">
//               AI is typing...
//             </div>
//           )}
//         </div>

//         {/* Input + clear */}
//         <div className="mt-4 flex gap-2">
//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             placeholder="Talk to your assistant..."
//             className="flex-1 p-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700"
//           />
//           <button
//             onClick={handleSend}
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Send
//           </button>
//           <button
//             onClick={handleClear}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Clear
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AIChatPage;


// import React, { useEffect, useState, useRef } from "react";
// import {
//   getChatHistory,
//   sendMessageToAI,
//   clearChatHistory,
// } from "../api/auth";
// import ChatEntryPanel from "../components/ChatEntryPanel";
// import { toast } from "react-hot-toast";

// const AIChatPage = () => {
//   const [allMessages, setAllMessages] = useState([]);
//   const [visibleMessages, setVisibleMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatBoxRef = useRef(null);
//   const [currentDate, setCurrentDate] = useState(new Date().toDateString());

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const messages = await getChatHistory();
//         setAllMessages(messages || []);

//         const today = new Date().toDateString();
//         const todayMsgs = (messages || []).filter(
//           (m) => new Date(m.date).toDateString() === today
//         );
//         setVisibleMessages(todayMsgs);
//         setCurrentDate(today);
//       } catch (err) {
//         toast.error("Could not load chat history");
//       }
//     };

//     fetchHistory();
//   }, []);

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     const newUserMsg = {
//       role: "user",
//       content: message,
//       date: new Date().toISOString(),
//     };

//     const updatedAll = [...allMessages, newUserMsg];
//     setAllMessages(updatedAll);

//     if (new Date(newUserMsg.date).toDateString() === currentDate) {
//       setVisibleMessages((prev) => [...prev, newUserMsg]);
//     }

//     setMessage("");
//     setLoading(true);

//     try {
//       const replyText = await sendMessageToAI(message);
//       const aiMsg = {
//         role: "assistant",
//         content: replyText,
//         date: new Date().toISOString(),
//       };

//       const updatedWithAI = [...updatedAll, aiMsg];
//       setAllMessages(updatedWithAI);

//       if (new Date(aiMsg.date).toDateString() === currentDate) {
//         setVisibleMessages((prev) => [...prev, aiMsg]);
//       }
//     } catch (err) {
//       toast.error("Message failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = async () => {
//     try {
//       await clearChatHistory();
//       toast.success("Chat cleared");
//       setAllMessages([]);
//       setVisibleMessages([]);
//     } catch {
//       toast.error("Failed to clear chat");
//     }
//   };

//   const handleDateSelect = (messages) => {
//     setVisibleMessages(messages);
//     if (messages.length > 0) {
//       const dateStr = new Date(messages[0].date).toDateString();
//       setCurrentDate(dateStr);
//     }
//   };

//   useEffect(() => {
//     chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
//   }, [visibleMessages]);

//   return (
//     <div className="flex flex-col lg:flex-row p-4 gap-4">
//       <ChatEntryPanel
//         chatHistory={allMessages}
//         onSelectDate={handleDateSelect}
//       />

//       <div className="w-full lg:w-2/3 p-4 flex flex-col">
//         <div
//           ref={chatBoxRef}
//           className="flex-1 overflow-y-auto bg-white dark:bg-zinc-900 p-4 rounded shadow border dark:border-zinc-700"
//         >
//           {visibleMessages.length === 0 ? (
//             <p className="text-gray-500 text-sm">No messages</p>
//           ) : (
//             visibleMessages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`mb-3 text-sm ${
//                   msg.role === "user" ? "text-right" : "text-left"
//                 }`}
//               >
//                 <div
//                   className={`inline-block px-4 py-2 rounded-lg ${
//                     msg.role === "user"
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-200 dark:bg-zinc-800 text-black dark:text-white"
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               </div>
//             ))
//           )}
//           {loading && (
//             <div className="text-left text-sm text-gray-400 mt-2">
//               AI is typing...
//             </div>
//           )}
//         </div>

//         <div className="mt-4 flex gap-2">
//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             placeholder="Talk to your assistant..."
//             className="flex-1 p-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700"
//           />
//           <button
//             onClick={handleSend}
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Send
//           </button>
//           <button
//             onClick={handleClear}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Clear
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AIChatPage;


import React, { useEffect, useState, useRef } from "react";
import {
  getChatHistory,
  sendMessageToAI,
  clearChatHistory,
  startNewChat,
} from "../api/auth";
import ChatEntryPanel from "../components/ChatEntryPanel";
import { toast } from "react-hot-toast";

const AIChatPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
    const scriptRef = useRef(null);

  const fetchChats = async () => {
    try {
      const res = await getChatHistory();
      setChats(res || []);
      if (res?.length > 0) setSelectedChat(res[0]);
    } catch {
      toast.error("Failed to load chats");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  
  useEffect(() => {
  console.log("AIChatPage mounted - adding widget script");

  const script = document.createElement("script");
  script.src = "https://backend.omnidim.io/web_widget.js?secret_key=3072ce0cc21d246a71fd2a2e24d0edd0";
  script.async = true;
  script.id = "omnidimension-web-widget";
  scriptRef.current = script;
  document.body.appendChild(script);

  return () => {
    console.log("AIChatPage unmounted - removing widget");
    if (scriptRef.current) {
      document.body.removeChild(scriptRef.current);
    }

    const omnidiv = document.querySelector('[id^="omnidim-widget-container"]');
    if (omnidiv) omnidiv.remove();
  };
}, []);
  const handleSend = async () => {
    if (!message.trim() || !selectedChat) return;
    setLoading(true);
    const chatId = selectedChat._id;
    const userMsg = {
      role: "user",
      content: message,
      date: new Date().toISOString(),
    };
    const updated = {
      ...selectedChat,
      messages: [...selectedChat.messages, userMsg],
    };
    setSelectedChat(updated);
    setMessage("");

    try {
      const reply = await sendMessageToAI(chatId, message);
      const aiMsg = {
        role: "assistant",
        content: reply,
        date: new Date().toISOString(),
      };
      const updated2 = {
        ...updated,
        messages: [...updated.messages, aiMsg],
      };
      setSelectedChat(updated2);
      setChats((prev) =>
        prev.map((c) => (c._id === chatId ? updated2 : c))
      );
    } catch {
      toast.error("Failed to send");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (!selectedChat) return;
    try {
      await clearChatHistory(selectedChat._id);
      const updated = {
        ...selectedChat,
        messages: [],
      };
      setSelectedChat(updated);
      setChats((prev) =>
        prev.map((c) => (c._id === selectedChat._id ? updated : c))
      );
      toast.success("Chat cleared");
    } catch {
      toast.error("Failed to clear chat");
    }
  };

  const handleNewChat = async () => {
    try {
      const newChat = await startNewChat();
      setChats((prev) => [newChat, ...prev]);
      setSelectedChat(newChat);
    } catch {
      toast.error("Failed to start chat");
    }
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [selectedChat?.messages]);

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4">
      <ChatEntryPanel
        chats={chats}
        onSelect={setSelectedChat}
        onNewChat={handleNewChat}
      />

      <div className="w-full lg:w-2/3 p-4 flex flex-col">
        <div
          ref={chatBoxRef}
          className="flex-1 overflow-y-auto bg-white dark:bg-zinc-900 p-4 rounded shadow border dark:border-zinc-700"
        >
          {!selectedChat?.messages?.length ? (
            <p className="text-gray-500 text-sm">No messages</p>
          ) : (
            selectedChat.messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 text-sm ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-zinc-800 text-black dark:text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="text-left text-sm text-gray-400 mt-2">
              AI is typing...
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Talk to your assistant..."
            className="flex-1 p-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;