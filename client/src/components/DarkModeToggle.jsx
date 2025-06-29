import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-zinc-800 hover:scale-105 transition-all"
    >
      {isDark ? <Sun className="text-yellow-400 w-5 h-5" /> : <Moon className="text-gray-800 w-5 h-5" />}
    </button>
  );
};

export default DarkModeToggle;