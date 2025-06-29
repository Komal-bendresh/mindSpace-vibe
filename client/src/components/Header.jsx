

import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-blue-600 dark:bg-zinc-900 text-white shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-xl font-bold">
          MindSpace
        </Link>

        {/* Navigation and Toggles */}
        <div className="flex items-center gap-4">
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>

            {isAuthenticated ? (
              <>
                <Link to="/journal" className="hover:underline">Journal</Link>
                <Link to="/chat" className="hover:underline">ChatWithAI</Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/signup" className="hover:underline">Signup</Link>
              </>
            )}
          </nav>

          {/* Dark Mode Toggle */}
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
