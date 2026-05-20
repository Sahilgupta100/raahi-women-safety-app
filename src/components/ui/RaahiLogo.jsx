import raahiLogo from '../../assets/raahi-logo.png';

const variants = {
  /** Full horizontal lockup (shield + name + tagline) */
  full: 'h-10 sm:h-12 w-auto max-w-[220px] sm:max-w-[280px]',
  /** Navbar / compact header */
  nav: 'h-8 sm:h-9 w-auto max-w-[140px] sm:max-w-[160px]',
  /** Splash screen — large centered */
  splash: 'h-24 sm:h-32 w-auto max-w-[min(90vw,320px)]',
  /** Auth pages — medium */
  auth: 'h-14 sm:h-16 w-auto max-w-[240px]',
  /** Sidebar — medium */
  sidebar: 'h-10 w-auto max-w-[180px]',
  /** Icon only crop feel — use full image scaled in square box */
  icon: 'h-9 w-9 sm:h-10 sm:w-10 object-left object-contain',
};

/**
 * Official Raahi brand logo. Replace src/assets/raahi-logo.png to update globally.
 */
export default function RaahiLogo({
  variant = 'full',
  className = '',
  alt = 'Raahi — Your Safety, Your Journey',
  ...props
}) {
  return (
    <img
      src={raahiLogo}
      alt={alt}
      className={`object-contain select-none ${variants[variant] || variants.full} ${className}`}
      decoding="async"
      {...props}
    />
  );
}

export { raahiLogo };
