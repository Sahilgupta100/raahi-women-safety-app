import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
      success('Reset link sent to your email');
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-zinc-950">
      <div className="w-full max-w-md animate-slide-up">
        <Link
          to="/login"
          className="inline-flex items-center gap-1 text-sm text-raahi-purple-600 dark:text-raahi-purple-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>

        <h1 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">Forgot Password</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 mb-8 text-sm">
          {sent
            ? 'Check your inbox for a password reset link.'
            : "Enter your email and we'll send you a reset link."}
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              leftIcon={<Mail className="w-4 h-4" />}
            />
            <Button type="submit" fullWidth loading={loading}>
              Send Reset Link
            </Button>
          </form>
        ) : (
          <Button variant="primary" fullWidth onClick={() => (window.location.href = '/login')}>
            Return to Login
          </Button>
        )}
      </div>
    </div>
  );
}
