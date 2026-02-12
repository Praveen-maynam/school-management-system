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
                                {/* TOPBAR (Fixed, Production-level) */}
                                <div className="fixed top-0 left-0 right-0 z-40" style={{marginLeft: isOpen ? 256 : 80}}>
                                    <Topbar
                                        leftContent={
                                            <>
                                                <button className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg mr-4">Cache Clear</button>
                 
                                            </>
                                        }
                                        rightContent={
                                            <div className="flex items-center gap-6">
                                                <span className="text-lg text-gray-400">Session Years : 2024-2025</span>
                                                
                                            </div>
                                        }
                                        className="bg-white border-b shadow-sm"
                                    />
                                </div>
                                {/* Main Content (with top padding for fixed topbar) */}
                                <main className="flex-1 overflow-auto main-content pt-24">
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