import React from 'react';
import Avatar from '../../../components/ui/Avatar';
import usersData from '../../../data/users.json';

const AdminProfileScreen = () => {
    // Simulate getting logged-in admin
    const adminEmail = localStorage.getItem('adminEmail');
    const admin = usersData.admins && usersData.admins.find(a => a.email === adminEmail);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-6 mt-8">
            <div className="flex items-center gap-6">
                <Avatar size={80} />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{admin?.name || 'Admin'}</h2>
                    <p className="text-gray-500">{admin?.email}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-600 text-sm mb-1">Full Name</label>
                    <div className="p-3 bg-gray-100 rounded-lg">{admin?.name || '-'}</div>
                </div>
                <div>
                    <label className="block text-gray-600 text-sm mb-1">Email</label>
                    <div className="p-3 bg-gray-100 rounded-lg">{admin?.email || '-'}</div>
                </div>
            </div>
            <div className="flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Edit Profile</button>
            </div>
        </div>
    );
};

export default AdminProfileScreen;
