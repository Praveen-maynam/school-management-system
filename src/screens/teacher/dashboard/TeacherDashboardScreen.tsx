import React from "react";
import { GraduationCap, BookOpen, Clock, CheckCircle, BookMarked, Megaphone, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
    const navigate = useNavigate();

    const scheduleItems = [
        {
            id: 1,
            class: "Class 6-A",
            subject: "Maths",
            time: "10:00 - 11:00 AM",
            status: "Completed",
        },
        {
            id: 2,
            class: "Class 6-A",
            subject: "Maths",
            time: "10:00 - 11:00 AM",
            status: "Pending",
        },
        {
            id: 3,
            class: "Class 6-A",
            subject: "Maths",
            time: "10:00 - 11:00 AM",
            status: "Pending",
        },
        {
            id: 4,
            class: "Class 6-A",
            subject: "Maths",
            time: "10:00 - 11:00 AM",
            status: "Pending",
        },
    ];

    const quickActions = [
        {
            id: 1,
            title: "Take Attendance",
            icon: CheckCircle,
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            onClick: () => navigate("/teacher/attendance/mark"),
        },
        {
            id: 2,
            title: "Homework's",
            icon: BookMarked,
            bgColor: "bg-red-50",
            iconColor: "text-red-600",
            onClick: () => navigate("/teacher/homework/create"),
        },
        {
            id: 3,
            title: "Announcement",
            icon: Megaphone,
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            onClick: () => navigate("/teacher/announcements"),
        },
    ];

    const getStatusColor = (status: string) => {
        return status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700";
    };

    const getBorderColor = (status: string) => {
        return status === "Completed" ? "border-l-green-500" : "border-l-blue-500";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white px-8 py-6">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    Welcome, Teacher Name 👋
                </h1>
                <p className="text-blue-100 mt-1">Date: 24-12-2025</p>
            </div>

            {/* Main Content */}
            <div className="p-8">
                {/* School Name Banner */}
                <div className="bg-yellow-100 rounded-lg p-4 mb-8 flex items-center gap-3">
                    <GraduationCap className="text-yellow-700" size={24} />
                    <span className="font-semibold text-gray-800">School Name</span>
                </div>

                {/* Today's Schedule */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Schedule</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {scheduleItems.map((item) => (
                            <div
                                key={item.id}
                                className={`bg-white rounded-lg p-4 border-l-4 ${getBorderColor(item.status)} shadow-sm hover:shadow-md transition-shadow`}
                            >
                                {/* Number Badge */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                        {item.id}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>

                                {/* Class Info */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <GraduationCap size={16} />
                                        <span className="font-medium">{item.class}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <BookOpen size={16} />
                                        <span>{item.subject}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock size={16} />
                                        <span className="text-sm">{item.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                    <div className="space-y-4">
                        {quickActions.map((action) => (
                            <div
                                key={action.id}
                                className="bg-white rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
                                onClick={action.onClick}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center`}>
                                        <action.icon className={action.iconColor} size={24} />
                                    </div>
                                    <span className="font-semibold text-gray-800">{action.title}</span>
                                </div>
                                <ChevronRight className="text-gray-400" size={20} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;