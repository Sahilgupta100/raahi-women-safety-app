import { useState } from 'react';
import { User, Mail, Phone, Camera, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/authService';
import Card from '../components/ui/Card';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await authService.updateProfile(form);
      updateUser(updated);
      success('Profile updated successfully');
    } catch (err) {
      error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    success('Logged out safely');
    navigate('/login', { replace: true });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-2xl animate-slide-up">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
        Profile
      </h1>

      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 -mt-1">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-raahi-purple-500 to-raahi-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.fullName?.charAt(0) || 'R'}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 shadow-sm text-zinc-500 hover:text-raahi-purple-600 transition-colors"
              aria-label="Change profile photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="font-display text-xl font-semibold text-zinc-900 dark:text-white">
              {user?.fullName}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{user?.email}</p>
            <p className="text-xs text-raahi-purple-600 dark:text-raahi-purple-400 mt-2">
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
            </p>
          </div>
        </div>
      </Card>

      <Card title="Edit Profile" subtitle="Update your personal information">
        <form onSubmit={handleSave} className="space-y-4 -mt-2">
          <FormInput
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            leftIcon={<User className="w-4 h-4" />}
            required
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            leftIcon={<Phone className="w-4 h-4" />}
            required
          />
          <Button type="submit" loading={saving} fullWidth>
            Save Changes
          </Button>
        </form>
      </Card>

      <div className="mt-6">
        <Button
          variant="secondary"
          fullWidth
          onClick={handleLogout}
          leftIcon={<LogOut className="w-4 h-4" />}
          className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
