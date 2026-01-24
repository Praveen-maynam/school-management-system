import React, { useState } from 'react';

// Dummy settings data structure
const initialSettings = {
  schoolName: 'Green Valley School',
  address: '123 Main St, City',
  contactEmail: 'info@greenvalley.edu',
  contactPhone: '+91 9876543210',
  academicYear: '2025-2026',
  theme: 'light',
  language: 'English',
  notifications: true,
};

const themes = ['light', 'dark', 'system'];
const languages = ['English', 'Hindi', 'Telugu', 'Tamil'];

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    setTimeout(() => {
      setSaving(false);
      setEditMode(false);
      setSuccess('Settings updated successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">System Settings</h2>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">School Name</label>
          <input
            className="border rounded px-3 py-2 w-full"
            name="schoolName"
            value={settings.schoolName}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            className="border rounded px-3 py-2 w-full"
            name="address"
            value={settings.address}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Contact Email</label>
            <input
              className="border rounded px-3 py-2 w-full"
              name="contactEmail"
              type="email"
              value={settings.contactEmail}
              onChange={handleChange}
              disabled={!editMode}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Contact Phone</label>
            <input
              className="border rounded px-3 py-2 w-full"
              name="contactPhone"
              value={settings.contactPhone}
              onChange={handleChange}
              disabled={!editMode}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Academic Year</label>
            <input
              className="border rounded px-3 py-2 w-full"
              name="academicYear"
              value={settings.academicYear}
              onChange={handleChange}
              disabled={!editMode}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Theme</label>
            <select
              className="border rounded px-3 py-2 w-full"
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              disabled={!editMode}
            >
              {themes.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Language</label>
            <select
              className="border rounded px-3 py-2 w-full"
              name="language"
              value={settings.language}
              onChange={handleChange}
              disabled={!editMode}
            >
              {languages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              disabled={!editMode}
              className="mr-2"
            />
            <label className="font-medium">Enable Notifications</label>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          {editMode ? (
            <>
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                onClick={() => { setEditMode(false); setSettings(initialSettings); setError(''); setSuccess(''); }}
                disabled={saving}
              >Cancel</button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                disabled={saving}
              >{saving ? 'Saving...' : 'Save Changes'}</button>
            </>
          ) : (
            <button
              type="button"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setEditMode(true)}
            >Edit Settings</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SettingsScreen;
