import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import RaahiLogo from '../ui/RaahiLogo';

export default function Navbar({ onMenuClick, showMenu = true }) {
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-raahi-purple-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {showMenu && (
            <button
              type="button"
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-raahi-purple-50 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <Link to="/dashboard" className="flex items-center min-w-0 group transition-transform group-hover:scale-[1.02]">
            <RaahiLogo variant="nav" />
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="p-2 rounded-xl text-zinc-500 hover:bg-raahi-purple-50 dark:hover:bg-zinc-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-raahi-pink-500 rounded-full" aria-hidden />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-zinc-500 hover:bg-raahi-purple-50 dark:hover:bg-zinc-800 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link
            to="/profile"
            className="ml-1 flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-raahi-purple-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-raahi-purple-500 to-raahi-pink-500 flex items-center justify-center text-white text-sm font-semibold">
              {user?.fullName?.charAt(0) || 'R'}
            </div>
            <span className="hidden sm:block text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[100px]">
              {user?.fullName?.split(' ')[0] || 'User'}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
