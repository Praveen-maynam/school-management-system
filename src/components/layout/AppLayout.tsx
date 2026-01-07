import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const Layout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* RIGHT SECTION */}
            <div className="flex-1 flex flex-col">
                {/* TOP NAVBAR (optional - remove if not needed) */}
                {/* <TopNavbar /> */}

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;