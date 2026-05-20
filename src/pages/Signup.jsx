import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useForm } from '../hooks/useForm';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';
import RaahiLogo from '../components/ui/RaahiLogo';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const { success, error: showError } = useToast();
  const { values, handleChange } = useForm({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signup(values);
      success('Account created! Welcome to Raahi.');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-10 bg-gradient-to-br from-raahi-purple-50 via-white to-raahi-pink-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="w-full max-w-md animate-slide-up">
        <div className="flex flex-col items-center mb-8 gap-3">
          <RaahiLogo variant="auth" className="rounded-xl" />
          <h1 className="font-display text-xl font-bold text-zinc-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Join Raahi for a safer journey</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900 rounded-2xl border border-raahi-purple-100 dark:border-zinc-700 shadow-xl shadow-raahi-purple-500/5 p-6 sm:p-8 space-y-4"
          noValidate
        >
          <FormInput
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            required
            autoComplete="name"
            leftIcon={<User className="w-4 h-4" />}
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@email.com"
            required
            autoComplete="email"
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            required
            autoComplete="tel"
            leftIcon={<Phone className="w-4 h-4" />}
          />
          <FormInput
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            placeholder="Min. 6 characters"
            required
            autoComplete="new-password"
            leftIcon={<Lock className="w-4 h-4" />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-400 hover:text-zinc-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat password"
            required
            autoComplete="new-password"
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Button type="submit" fullWidth loading={submitting || loading} size="lg" className="mt-2">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-raahi-purple-600 dark:text-raahi-purple-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
