import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Settings,
  Bluetooth,
  Mic,
  MapPin,
  Phone,
  X,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import RaahiLogo from '../ui/RaahiLogo';

const mainLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const featureLinks = [
  { hash: '#device', label: 'Device', icon: Bluetooth },
  { hash: '#recording', label: 'Recording', icon: Mic },
  { hash: '#location', label: 'Location', icon: MapPin },
  { hash: '#contacts', label: 'Contacts', icon: Phone },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();

  const navContent = (
    <>
      <div className="flex flex-col gap-2 px-4 py-5 border-b border-raahi-purple-100 dark:border-zinc-800">
        <div className="flex items-start justify-between gap-2">
          <RaahiLogo variant="sidebar" className="rounded-lg" />
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex-shrink-0"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate pl-0.5">{user?.email}</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6" aria-label="Sidebar">
        <div>
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">Menu</p>
          <ul className="space-y-1">
            {mainLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-raahi-purple-600 to-raahi-pink-500 text-white shadow-md shadow-raahi-purple-500/20'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-raahi-purple-50 dark:hover:bg-zinc-800'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">Features</p>
          <ul className="space-y-1">
            {featureLinks.map(({ hash, label, icon: Icon }) => (
              <li key={hash}>
                <a
                  href={`/dashboard${hash}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-raahi-purple-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-raahi-purple-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-raahi-purple-50 dark:bg-raahi-purple-950/30">
          <Shield className="w-4 h-4 text-raahi-purple-600 dark:text-raahi-purple-400 flex-shrink-0" />
          <p className="text-xs text-raahi-purple-700 dark:text-raahi-purple-300">
            Your safety is our priority
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 lg:z-auto
          h-full w-64 flex flex-col
          bg-white dark:bg-zinc-900
          border-r border-raahi-purple-100 dark:border-zinc-800
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {navContent}
      </aside>
    </>
  );
}
