export default function Card({
  children,
  className = '',
  title,
  subtitle,
  icon,
  action,
  padding = true,
  hover = false,
  ...rest
}) {
  return (
    <article
      {...rest}
      className={`
        rounded-2xl border border-raahi-purple-100 dark:border-zinc-700
        bg-white dark:bg-zinc-900
        shadow-sm shadow-raahi-purple-500/5
        transition-all duration-300
        ${hover ? 'hover:shadow-md hover:shadow-raahi-purple-500/10 hover:border-raahi-purple-200 dark:hover:border-zinc-600' : ''}
        ${className}
      `}
    >
      {(title || icon || action) && (
        <header className={`flex items-start justify-between gap-3 ${padding ? 'px-5 pt-5' : ''}`}>
          <div className="flex items-start gap-3 min-w-0">
            {icon && (
              <div className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-raahi-purple-100 to-raahi-pink-100 dark:from-raahi-purple-900/40 dark:to-raahi-pink-900/30 text-raahi-purple-600 dark:text-raahi-purple-400">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              {title && (
                <h3 className="font-display font-semibold text-zinc-900 dark:text-white text-base sm:text-lg truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </header>
      )}
      <div className={padding ? 'p-5' : ''}>{children}</div>
    </article>
  );
}
