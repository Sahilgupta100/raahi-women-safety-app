import { useEffect, useState } from 'react';
import { Bluetooth, Battery, Wifi, WifiOff } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Spinner } from '../ui/Loader';
import { deviceService } from '../../services/deviceService';
import { useToast } from '../../context/ToastContext';

export default function DeviceConnection() {
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const { success, error } = useToast();

  const loadDevice = async () => {
    try {
      const data = await deviceService.getDevice();
      setDevice(data);
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevice();
  }, []);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const data =
        device?.status === 'connected'
          ? await deviceService.disconnect()
          : device?.status === 'disconnected' && device?.lastConnected
            ? await deviceService.reconnect()
            : await deviceService.connect();
      setDevice(data);
      success(data.status === 'connected' ? 'Device connected!' : 'Device disconnected');
    } catch (err) {
      error(err.message);
    } finally {
      setConnecting(false);
    }
  };

  const isConnected = device?.status === 'connected';

  return (
    <Card
      id="device"
      title="Connect Raahi Hardware"
      subtitle="Pair your safety band via Bluetooth"
      icon={<Bluetooth className="w-5 h-5" />}
      hover
    >
      {loading ? (
        <div className="flex justify-center py-8">
          <Spinner size="md" />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <div className="flex items-center gap-4">
              <div
                className={`relative p-4 rounded-2xl ${
                  isConnected
                    ? 'bg-emerald-100 dark:bg-emerald-900/30'
                    : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
              >
                <Bluetooth
                  className={`w-8 h-8 ${
                    isConnected ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'
                  }`}
                />
                {isConnected && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse-soft" />
                )}
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">{device?.name}</p>
                <p className="text-sm flex items-center gap-1.5 mt-0.5">
                  {isConnected ? (
                    <>
                      <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Connected</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-zinc-500">Disconnected</span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isConnected
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400'
              }`}
            >
              {device?.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 p-3 rounded-xl border border-zinc-100 dark:border-zinc-700">
              <Battery className="w-4 h-4 text-raahi-purple-500" />
              <span className="text-zinc-600 dark:text-zinc-400">Battery</span>
              <span className="ml-auto font-semibold text-zinc-900 dark:text-white">{device?.battery}%</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl border border-zinc-100 dark:border-zinc-700">
              <span className="text-zinc-600 dark:text-zinc-400">Firmware</span>
              <span className="ml-auto font-semibold text-zinc-900 dark:text-white">v{device?.firmware}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleConnect}
              loading={connecting}
              fullWidth
              variant={isConnected ? 'secondary' : 'primary'}
              leftIcon={<Bluetooth className="w-4 h-4" />}
            >
              {isConnected ? 'Disconnect' : device?.lastConnected ? 'Reconnect' : 'Connect Device'}
            </Button>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Ensure Bluetooth is enabled on your phone and the Raahi device is nearby.
          </p>
        </div>
      )}
    </Card>
  );
}
