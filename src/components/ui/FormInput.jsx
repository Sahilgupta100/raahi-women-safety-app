import { forwardRef } from 'react';

const FormInput = forwardRef(function FormInput(
  {
    label,
    id,
    name,
    type = 'text',
    error,
    hint,
    leftIcon,
    rightElement,
    className = '',
    containerClassName = '',
    required,
    ...props
  },
  ref
) {
  const inputId = id || name;

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
          {required && <span className="text-raahi-pink-500 ml-0.5" aria-hidden>*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={`
            w-full rounded-xl border bg-white dark:bg-zinc-800
            text-zinc-900 dark:text-white placeholder:text-zinc-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-raahi-purple-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : 'pl-4'}
            ${rightElement ? 'pr-12' : 'pr-4'}
            py-2.5 text-sm
            ${error
              ? 'border-red-400 dark:border-red-500'
              : 'border-zinc-200 dark:border-zinc-600 hover:border-raahi-purple-300 dark:hover:border-zinc-500'
            }
            ${className}
          `}
          required={required}
          {...props}
        />
        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</span>
        )}
      </div>
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-zinc-500 dark:text-zinc-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

export default FormInput;
