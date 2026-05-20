import { useState } from 'react';
import {
  Moon,
  Bell,
  MapPin,
  Mic,
  Globe,
  ChevronRight,
  Shield,
} from 'lucide-react';
import mockData from '../data/mockData.json';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

function Toggle({ enabled, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={`
        relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0
        ${enabled ? 'bg-raahi-purple-600' : 'bg-zinc-300 dark:bg-zinc-600'}
      `}
    >
      <span
        className={`
          absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
          ${enabled ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
}

function SettingRow({ icon, title, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      <div className="flex items-start gap-3 min-w-0">
        <div className="p-2 rounded-lg bg-raahi-purple-50 dark:bg-raahi-purple-950/40 text-raahi-purple-600 dark:text-raahi-purple-400 flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-zinc-900 dark:text-white text-sm">{title}</p>
          {description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const { darkMode, toggleTheme } = useTheme();
  const { success } = useToast();
  const [settings, setSettings] = useState(mockData.settings);

  const updateSetting = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }));
    success('Settings saved');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-2xl animate-slide-up">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
        Settings
      </h1>

      <Card title="Appearance" icon={<Moon className="w-5 h-5" />} className="mb-5">
        <SettingRow
          icon={<Moon className="w-4 h-4" />}
          title="Dark Mode"
          description="Reduce eye strain in low light"
        >
          <Toggle
            enabled={darkMode}
            onChange={() => toggleTheme()}
            label="Toggle dark mode"
          />
        </SettingRow>
      </Card>

      <Card title="Safety & Privacy" icon={<Shield className="w-5 h-5" />} className="mb-5">
        <SettingRow
          icon={<Bell className="w-4 h-4" />}
          title="Push Notifications"
          description="Alerts for SOS and device events"
        >
          <Toggle
            enabled={settings.notifications}
            onChange={(v) => updateSetting('notifications', v)}
            label="Toggle notifications"
          />
        </SettingRow>
        <SettingRow
          icon={<MapPin className="w-4 h-4" />}
          title="Location Sharing"
          description="Share live GPS with trusted contacts"
        >
          <Toggle
            enabled={settings.locationSharing}
            onChange={(v) => updateSetting('locationSharing', v)}
            label="Toggle location sharing"
          />
        </SettingRow>
        <SettingRow
          icon={<Mic className="w-4 h-4" />}
          title="Auto-record on SOS"
          description="Start recording when SOS is triggered"
        >
          <Toggle
            enabled={settings.autoRecordOnSOS}
            onChange={(v) => updateSetting('autoRecordOnSOS', v)}
            label="Toggle auto record"
          />
        </SettingRow>
      </Card>

      <Card title="General" icon={<Globe className="w-5 h-5" />}>
        <button
          type="button"
          className="w-full flex items-center justify-between gap-4 py-4 text-left hover:opacity-80 transition-opacity"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-raahi-purple-50 dark:bg-raahi-purple-950/40 text-raahi-purple-600 dark:text-raahi-purple-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-zinc-900 dark:text-white text-sm">Language</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">English</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-400" />
        </button>
      </Card>

      <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 mt-8">
        Raahi v1.0.0 · Backend integration ready
      </p>
    </div>
  );
}
