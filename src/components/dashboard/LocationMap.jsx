import { useEffect, useState } from 'react';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Spinner } from '../ui/Loader';
import { locationService } from '../../services/locationService';

export default function LocationMap() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const init = async () => {
      try {
        const data = await locationService.getLocation();
        setLocation(data);
        setLastUpdate(new Date(data.updatedAt));
      } finally {
        setLoading(false);
      }
    };

    init();
    locationService.subscribeToLocation((data) => {
      setLocation(data);
      setLastUpdate(new Date());
    }).then((unsub) => {
      unsubscribe = unsub;
    });

    return () => unsubscribe?.();
  }, []);

  const formatCoords = (lat, lng) =>
    `${Number(lat).toFixed(4)}° N, ${Number(lng).toFixed(4)}° E`;

  return (
    <Card
      id="location"
      title="Live Location Tracking"
      subtitle="Real-time GPS from your Raahi device"
      icon={<MapPin className="w-5 h-5" />}
      hover
      action={
        lastUpdate && (
          <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
            Live
          </span>
        )
      }
    >
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="md" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-[16/10] sm:aspect-[2/1] rounded-xl overflow-hidden border border-raahi-purple-100 dark:border-zinc-700">
            <div className="absolute inset-0 map-grid bg-gradient-to-br from-raahi-purple-100/50 to-raahi-pink-100/30 dark:from-zinc-800 dark:to-zinc-900" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="absolute inset-0 w-16 h-16 -m-2 rounded-full bg-raahi-pink-500/20 animate-ping" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-raahi-purple-600 to-raahi-pink-500 flex items-center justify-center shadow-lg shadow-raahi-purple-500/40 border-2 border-white dark:border-zinc-800">
                  <Navigation className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-sm font-medium truncate">{location?.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Coordinates</p>
              <p className="font-mono font-medium text-zinc-900 dark:text-white text-xs sm:text-sm">
                {formatCoords(location?.latitude, location?.longitude)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-1">Accuracy</p>
              <p className="font-medium text-zinc-900 dark:text-white">±{location?.accuracy}m</p>
            </div>
          </div>

          {lastUpdate && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3" />
              Updated {lastUpdate.toLocaleTimeString()}
            </p>
          )}

          <Button
            variant="outline"
            size="sm"
            fullWidth
            leftIcon={<MapPin className="w-4 h-4" />}
            onClick={() => {
              const url = `https://www.google.com/maps?q=${location?.latitude},${location?.longitude}`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
          >
            Open in Maps
          </Button>
        </div>
      )}
    </Card>
  );
}
