import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
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
    const { isOpen } = useSidebar();
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* RIGHT SECTION */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
                {/* TOPBAR (Reusable) */}
                {/* Main Content */}
                <main className="flex-1 overflow-auto main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const LayoutWithSidebarProvider = () => (
    <SidebarProvider>
        <Layout />
    </SidebarProvider>
);

export default LayoutWithSidebarProvider;