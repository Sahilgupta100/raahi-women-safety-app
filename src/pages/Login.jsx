import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useForm } from '../hooks/useForm';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';
import RaahiLogo from '../components/ui/RaahiLogo';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const { success, error: showError } = useToast();
  const { values, handleChange } = useForm({ emailOrPhone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(values);
      success('Welcome back to Raahi!');
      navigate(from, { replace: true });
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-raahi-purple-700 via-raahi-purple-600 to-raahi-pink-500 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 map-grid" />
        <div className="relative z-10">
          <RaahiLogo variant="auth" className="!h-20 !max-w-[280px]" />
          <p className="text-white/80 mt-8 max-w-sm text-lg leading-relaxed">
            Your trusted companion for safety on every journey. Connect your device, track location, and reach help instantly.
          </p>
        </div>
        <p className="relative z-10 text-white/60 text-sm">© Raahi — Women Safety App</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white dark:bg-zinc-950">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex flex-col items-center mb-8">
            <RaahiLogo variant="auth" className="rounded-xl" />
          </div>

          <h2 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">Sign in</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 mb-8 text-sm">
            Enter your credentials to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <FormInput
              label="Email or Phone"
              name="emailOrPhone"
              type="text"
              value={values.emailOrPhone}
              onChange={handleChange}
              placeholder="you@email.com or +91..."
              required
              autoComplete="username"
              leftIcon={<Mail className="w-4 h-4" />}
            />
            <FormInput
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              leftIcon={<Lock className="w-4 h-4" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-raahi-purple-600 dark:text-raahi-purple-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" fullWidth loading={submitting || loading} size="lg">
              Login
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-raahi-purple-600 dark:text-raahi-purple-400 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
