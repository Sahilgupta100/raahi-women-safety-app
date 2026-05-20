const variants = {
  primary:
    'bg-gradient-to-r from-raahi-purple-600 to-raahi-pink-500 text-white shadow-lg shadow-raahi-purple-500/25 hover:from-raahi-purple-700 hover:to-raahi-pink-600 hover:shadow-raahi-purple-500/35',
  secondary:
    'bg-white dark:bg-zinc-800 text-raahi-purple-700 dark:text-raahi-purple-300 border border-raahi-purple-200 dark:border-zinc-600 hover:bg-raahi-purple-50 dark:hover:bg-zinc-700',
  danger:
    'bg-gradient-to-r from-red-500 to-raahi-pink-600 text-white shadow-lg shadow-red-500/25 hover:from-red-600 hover:to-raahi-pink-700',
  ghost:
    'bg-transparent text-raahi-purple-600 dark:text-raahi-purple-400 hover:bg-raahi-purple-50 dark:hover:bg-zinc-800',
  outline:
    'border-2 border-raahi-purple-500 text-raahi-purple-600 dark:text-raahi-purple-400 hover:bg-raahi-purple-50 dark:hover:bg-zinc-800',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
  icon: 'p-2.5 rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  type = 'button',
  fullWidth = false,
  leftIcon,
  rightIcon,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-raahi-purple-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-zinc-900
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        active:scale-[0.98]
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
