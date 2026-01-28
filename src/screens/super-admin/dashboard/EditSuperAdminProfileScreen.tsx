
import React, { useState } from 'react';
import Avatar from '../../../components/ui/Avatar';

// Mock profile data
const mockProfile = {
    name: 'Jane Doe',
    email: 'superadmin@platform.com',
    phone: '+1 555-987-6543',
    avatar: '',
};

const EditSuperAdminProfileScreen = () => {
    const [profile, setProfile] = useState({ ...mockProfile });
    const [password, setPassword] = useState('');
    const [saving, setSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setProfile((p) => ({ ...p, avatar: ev.target?.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setTimeout(() => setSaving(false), 1200); // Simulate API call
        // TODO: Integrate with backend
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow mt-8">
            <h1 className="text-2xl font-bold mb-6">Edit Super Admin Profile</h1>
            <form onSubmit={handleSave} className="space-y-6">
                <div className="flex flex-col items-center mb-4">
                    <Avatar src={profile.avatar} size={80} />
                    <label className="mt-2 text-blue-600 cursor-pointer hover:underline">
                        Change Avatar
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </label>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
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
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        value={profile.email}
                        onChange={handleChange}
                        required
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
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Leave blank to keep current password"
                    />
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

export default EditSuperAdminProfileScreen;
