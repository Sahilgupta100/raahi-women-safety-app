import { Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DeviceConnection from '../components/dashboard/DeviceConnection';
import RecordingPanel from '../components/dashboard/RecordingPanel';
import LocationMap from '../components/dashboard/LocationMap';
import EmergencyContacts from '../components/dashboard/EmergencyContacts';

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.fullName?.split(' ')[0] || 'there';

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-5xl">
      <header className="mb-8 animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-raahi-purple-500 to-raahi-pink-500 text-white shadow-lg shadow-raahi-purple-500/25">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-raahi-pink-500" />
              Safety Dashboard
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-0.5">
              Hello, {firstName}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 max-w-lg">
              Monitor your Raahi device, recordings, live location, and emergency contacts — all in one place.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <div className="lg:col-span-2">
          <DeviceConnection />
        </div>
        <RecordingPanel />
        <LocationMap />
        <div className="lg:col-span-2">
          <EmergencyContacts />
        </div>
      </div>
    </div>
  );
}
