import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import SearchBar from "../ui/SearchBar";
import { Bell } from "lucide-react";
import Avatar from "../ui/Avatar";
import usersData from '../../data/users.json';
import React from 'react';


const Layout = () => {
    const location = useLocation();
    // Simulate getting the logged-in teacher from localStorage/session (for demo)
    let teacher = null, parent = null, admin = null;
    if (location.pathname.startsWith('/teacher')) {
        const teacherEmail = localStorage.getItem('teacherEmail');
        teacher = usersData.teachers.find(t => t.email === teacherEmail);
    } else if (location.pathname.startsWith('/parent')) {
        const parentEmail = localStorage.getItem('parentEmail');
        parent = usersData.parents.find(p => p.email === parentEmail);
    } else if (location.pathname.startsWith('/admin')) {
        const adminEmail = localStorage.getItem('adminEmail');
        admin = usersData.admins && usersData.admins.find(a => a.email === adminEmail);
    }
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* RIGHT SECTION */}
            <div className="flex-1 flex flex-col">
                {/* TOPBAR (Reusable) */}
                <Topbar
                    leftContent={<SearchBar />}
                    rightContent={
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 rounded-full hover:bg-gray-100">
                                <Bell size={22} className="text-gray-600" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
                            </button>
                            <div className="flex items-center gap-2">
                                <Avatar />
                                <span className="font-medium text-gray-700">
                                    {teacher?.name || parent?.name || admin?.name || 'User'}
                                </span>
                            </div>
                        </div>
                    }
                />
                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;