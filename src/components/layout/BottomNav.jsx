import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, Settings } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function BottomNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg border-t border-raahi-purple-100 dark:border-zinc-800 safe-area-pb"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-raahi-purple-600 dark:text-raahi-purple-400'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`p-1.5 rounded-xl transition-colors ${
                    isActive ? 'bg-raahi-purple-100 dark:bg-raahi-purple-900/40' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </span>
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
