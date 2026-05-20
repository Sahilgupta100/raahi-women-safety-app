import { useEffect, useState } from 'react';
import { Phone, Plus, Pencil, Trash2, AlertTriangle, Star } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import FormInput from '../ui/FormInput';
import { Spinner } from '../ui/Loader';
import { contactsService } from '../../services/contactsService';
import { useToast } from '../../context/ToastContext';

const emptyForm = { name: '', phone: '', relationship: 'Family' };

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [sosLoading, setSosLoading] = useState(false);
  const { success, error } = useToast();

  const loadContacts = async () => {
    try {
      const data = await contactsService.getContacts();
      setContacts(data);
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (contact) => {
    setEditingId(contact.id);
    setForm({
      name: contact.name,
      phone: contact.phone,
      relationship: contact.relationship,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      error('Name and phone are required');
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await contactsService.updateContact(editingId, form);
        success('Contact updated');
      } else {
        await contactsService.addContact(form);
        success('Contact added');
      }
      setModalOpen(false);
      await loadContacts();
    } catch (err) {
      error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this emergency contact?')) return;
    try {
      await contactsService.deleteContact(id);
      success('Contact removed');
      await loadContacts();
    } catch (err) {
      error(err.message);
    }
  };

  const handleSOS = async () => {
    if (!window.confirm('Send SOS alert to all emergency contacts?')) return;
    setSosLoading(true);
    try {
      const result = await contactsService.triggerSOS();
      success(result.message);
    } catch (err) {
      error(err.message);
    } finally {
      setSosLoading(false);
    }
  };

  return (
    <>
      <Card
        id="contacts"
        title="Emergency Contacts"
        subtitle="Manage who gets alerted in an emergency"
        icon={<Phone className="w-5 h-5" />}
        hover
        action={
          <Button size="sm" variant="ghost" onClick={openAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add
          </Button>
        }
      >
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner size="md" />
          </div>
        ) : (
          <div className="space-y-4">
            <ul className="space-y-2" role="list">
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 dark:border-zinc-700 hover:border-raahi-purple-200 dark:hover:border-zinc-600 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-raahi-purple-400 to-raahi-pink-400 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-zinc-900 dark:text-white truncate">{contact.name}</p>
                      {contact.isPrimary && (
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" aria-label="Primary contact" />
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{contact.phone}</p>
                    <p className="text-xs text-raahi-purple-600 dark:text-raahi-purple-400">{contact.relationship}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => openEdit(contact)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-raahi-purple-600 hover:bg-raahi-purple-50 dark:hover:bg-zinc-800 transition-colors"
                      aria-label={`Edit ${contact.name}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(contact.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      aria-label={`Delete ${contact.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {contacts.length === 0 && (
              <p className="text-center text-sm text-zinc-500 py-4">No contacts yet. Add your first emergency contact.</p>
            )}

            <Button
              variant="danger"
              size="lg"
              fullWidth
              loading={sosLoading}
              onClick={handleSOS}
              className="sos-pulse"
              leftIcon={<AlertTriangle className="w-5 h-5" />}
            >
              SOS Emergency Alert
            </Button>
          </div>
        )}
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Contact' : 'Add Emergency Contact'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} loading={saving}>
              {editingId ? 'Save Changes' : 'Add Contact'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormInput
            label="Full Name"
            name="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            placeholder="Contact name"
          />
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            required
            placeholder="+91 98765 43210"
          />
          <FormInput
            label="Relationship"
            name="relationship"
            value={form.relationship}
            onChange={(e) => setForm((f) => ({ ...f, relationship: e.target.value }))}
            placeholder="Family, Friend, etc."
          />
        </form>
      </Modal>
    </>
  );
}
