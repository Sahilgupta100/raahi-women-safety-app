import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RaahiLogo from '../components/ui/RaahiLogo';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-raahi-purple-700 via-raahi-purple-600 to-raahi-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-raahi-pink-300 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fade-in">
        <div className="relative mb-10">
          <div className="absolute inset-0 -m-4 rounded-3xl splash-ring opacity-70" aria-hidden />
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 animate-slide-up ring-1 ring-white/10">
            <RaahiLogo variant="splash" />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-white/80 animate-pulse-soft"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <p className="text-sm text-white/70">Loading your safe space...</p>
        </div>
      </div>
    </div>
  );
}
