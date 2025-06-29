const ChatEntryPanel = ({ chats, onSelect, onNewChat }) => {
  return (
    <div className="w-full lg:w-1/3 p-4 border-r dark:border-zinc-800 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chats</h2>
        <button
          onClick={onNewChat}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          + New
        </button>
      </div>
      <ul className="space-y-2">
        {chats.map((chat) => (
          <li key={chat._id}>
            <button
              onClick={() => onSelect(chat)}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 text-sm"
            >
              {chat.sessionName || "Untitled Chat"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatEntryPanel;
