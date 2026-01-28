
import React, { useState } from 'react';


type SchoolStatus = 'Active' | 'Inactive' | 'Pending' | 'Suspended';
type SchoolPlan = 'Free' | 'Basic' | 'Premium' | 'Custom';

// Mock school profile data
const mockSchool: {
  id: string;
  name: string;
  plan: SchoolPlan;
  status: SchoolStatus;
  contact: string;
  phone: string;
  address: string;
  principal: string;
  established: number;
  website: string;
} = {
  id: 'SCH-001',
  name: 'Springfield High School',
  plan: 'Premium',
  status: 'Active',
  contact: 'admin@springfieldhigh.edu',
  phone: '+1 555-123-4567',
  address: '742 Evergreen Terrace, Springfield',
  principal: 'Seymour Skinner',
  established: 1992,
  website: 'https://springfieldhigh.edu',
};

const statusColor: Record<SchoolStatus, string> = {
  Active: 'bg-green-100 text-green-700',
  Inactive: 'bg-gray-100 text-gray-700',
  Pending: 'bg-yellow-100 text-yellow-800',
  Suspended: 'bg-red-100 text-red-700',
};

const planColor: Record<SchoolPlan, string> = {
  Free: 'bg-gray-100 text-gray-700',
  Basic: 'bg-blue-100 text-blue-700',
  Premium: 'bg-purple-100 text-purple-700',
  Custom: 'bg-orange-100 text-orange-700',
};

const SchoolProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState({ ...mockSchool });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1200); // Simulate API call
    // TODO: Integrate with backend
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">School Profile</h1>
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">School Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">School ID</label>
            <input
              type="text"
              name="id"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              value={profile.id}
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Principal</label>
            <input
              type="text"
              name="principal"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={profile.principal}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Established</label>
            <input
              type="number"
              name="established"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={profile.established}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact Email</label>
            <input
              type="email"
              name="contact"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={profile.contact}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={profile.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Website</label>
            <input
              type="url"
              name="website"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              value={profile.website}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 mt-6">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor[profile.status as SchoolStatus]}`}>{profile.status}</span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${planColor[profile.plan as SchoolPlan]}`}>{profile.plan}</span>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded text-white font-semibold transition ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default SchoolProfileScreen;
