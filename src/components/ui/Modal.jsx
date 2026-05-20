import { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`
          relative w-full ${sizeClasses[size] || sizeClasses.md}
          bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl
          border border-raahi-purple-100 dark:border-zinc-700
          animate-slide-up max-h-[90vh] flex flex-col
        `}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <h2 id="modal-title" className="font-display font-semibold text-lg text-zinc-900 dark:text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto flex-1">{children}</div>
        {footer !== undefined ? (
          <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-800 flex gap-3 justify-end">
            {footer}
          </div>
        ) : (
          <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-800">
            <Button variant="secondary" onClick={onClose} fullWidth>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
