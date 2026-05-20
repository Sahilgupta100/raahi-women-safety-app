import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const config = {
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-800 dark:text-emerald-200',
    iconColor: 'text-emerald-500',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-800',
    text: 'text-amber-800 dark:text-amber-200',
    iconColor: 'text-amber-500',
  },
  info: {
    icon: Info,
    bg: 'bg-raahi-purple-50 dark:bg-raahi-purple-950/80 border-raahi-purple-200 dark:border-raahi-purple-800',
    text: 'text-raahi-purple-800 dark:text-raahi-purple-200',
    iconColor: 'text-raahi-purple-500',
  },
};

export default function Toast({ message, type = 'info', onClose }) {
  const { icon: Icon, bg, text, iconColor } = config[type] || config.info;

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-up ${bg}`}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} aria-hidden />
      <p className={`flex-1 text-sm font-medium ${text}`}>{message}</p>
      <button
        type="button"
        onClick={onClose}
        className={`p-1 rounded-lg hover:opacity-70 transition-opacity ${text}`}
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
