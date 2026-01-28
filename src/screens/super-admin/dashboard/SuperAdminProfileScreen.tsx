
import React from 'react';
import Avatar from '../../../components/ui/Avatar';

// Mock profile data
const profile = {
    name: 'Jane Doe',
    email: 'superadmin@platform.com',
    phone: '+1 555-987-6543',
    avatar: '',
    role: 'Super Admin',
};

const SuperAdminProfileScreen = () => {
    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow mt-8">
            <h1 className="text-2xl font-bold mb-6">Super Admin Profile</h1>
            <div className="flex flex-col items-center mb-6">
                <Avatar src={profile.avatar} size={80} />
                <div className="mt-4 text-xl font-semibold">{profile.name}</div>
                <div className="text-gray-500">{profile.role}</div>
            </div>
            <div className="mb-4">
                <div className="font-medium text-gray-700">Email</div>
                <div className="text-gray-900">{profile.email}</div>
            </div>
            <div className="mb-6">
                <div className="font-medium text-gray-700">Phone</div>
                <div className="text-gray-900">{profile.phone}</div>
            </div>
            <button className="w-full py-2 px-4 rounded text-white font-semibold bg-blue-600 hover:bg-blue-700 transition">Edit Profile</button>
        </div>
    );
};

export default SuperAdminProfileScreen;
