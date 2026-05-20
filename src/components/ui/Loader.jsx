export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  };

  return (
    <span
      className={`inline-block rounded-full border-raahi-purple-500 border-t-transparent animate-spin ${sizes[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
      <Spinner size="lg" />
      <p className="text-sm text-zinc-500 dark:text-zinc-400 animate-pulse-soft">{message}</p>
    </div>
  );
}

export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700 ${className}`}
      aria-hidden
    />
  );
}

export default function Loader({ variant = 'spinner', ...props }) {
  if (variant === 'page') return <PageLoader {...props} />;
  if (variant === 'skeleton') return <Skeleton {...props} />;
  return <Spinner {...props} />;
}
