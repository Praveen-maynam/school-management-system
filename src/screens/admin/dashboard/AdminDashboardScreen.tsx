
import React from 'react';
import DashboardCard from '../../../components/cards/DashboardCard';
import AnnouncementWidget from '../../../components/widgets/AnnouncementWidget';
import AttendanceWidget from '../../../components/widgets/AttendanceWidget';
import UpcomingEventsWidget from '../../../components/widgets/UpcomingEventsWidget';
import QuickActionsWidget from '../../../components/widgets/QuickActionsWidget';
import BarChart from '../../../components/charts/BarChart';
import PieChart from '../../../components/charts/PieChart';
import { Book, BookOpen, User, Users,CalendarCheck } from 'lucide-react';

const AdminDashboardScreen = () => {
    return (
        <div
            className="p-6 space-y-6 w-full max-w-screen-xl"
            style={{ overflowX: 'hidden' }}
        >
            {/* Top Row: Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full" style={{ overflowX: 'hidden' }}>
                <DashboardCard title="Total Students" value={1200} icon={Users} />
                <DashboardCard title="Total Teachers" value={80} icon={User} />
                <DashboardCard title="Classes" value={30} icon={BookOpen} />
                <DashboardCard title="Attendance Today" value="97%" icon={CalendarCheck} />
            </div>

            {/* Middle Row: Charts & Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" style={{ overflowX: 'hidden' }}>
                <div className="md:col-span-2 bg-white rounded-xl shadow p-4" style={{ overflowX: 'auto' }}>
                    <h3 className="font-semibold text-lg mb-2">Student Attendance Overview</h3>
                    <BarChart />
                </div>
                <div className="bg-white rounded-xl shadow p-4" style={{ overflowX: 'auto' }}>
                    <h3 className="font-semibold text-lg mb-2">Class Distribution</h3>
                   <PieChart
                        labels={['Math', 'Science', 'English']}
                        data={[30, 45, 25]}
                        title="Subject Distribution"
                        legendDisplay={true}
                    />
                </div>
            </div>

            {/* Bottom Row: Announcements, Events, Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" style={{ overflowX: 'hidden' }}>
                <AnnouncementWidget />
                <UpcomingEventsWidget />
                <QuickActionsWidget />
            </div>
        </div>
    );
};

export default AdminDashboardScreen;

