// ============================================================================
// HOMEWORK NAVIGATION - QUICK REFERENCE CODE SNIPPETS
// ============================================================================

// ============================================================================
// 1. SIDEBAR MENU ITEM (in Sidebar.tsx)
// ============================================================================

/**
 * Updated teacher menu configuration in Sidebar.tsx
 * 
 * Key changes:
 * - Path changed from "/teacher/home-work" to "/teacher/homework"
 * - Icon changed from Wallet to BookOpen
 * - This enables proper route matching and active state highlighting
 */

// In getMenuItems() function:
} else if (location.pathname.startsWith('/teacher')) {
  return [
    { path: "/teacher/dashboard", icon: Home, label: "Dashboard" },
    { 
      path: "/teacher/attendance", 
      icon: School, 
      label: "Attendance",
      children: [
        { path: "/teacher/attendance/attendance-list", label: "Attendance List", icon: Calendar },
        { path: "/teacher/attendance/attendance-report", label: "Attendance Report", icon: BarChart2 },
      ]
    },
    // ✅ THIS IS THE HOMEWORK MENU ITEM
    { path: "/teacher/homework", icon: BookOpen, label: "Homework" },
    
    { path: "/teacher/exams", icon: FileText, label: "Exams" },
    { path: "/teacher/classes", icon: GraduationCap, label: "Classes" },
    { path: "/teacher/notifications", icon: Settings, label: "Notifications" },
    { path: "/teacher/reports", icon: BarChart2, label: "Reports" },
    { path: "/teacher/time-table", icon: BookOpen, label: "Time Table" },
    { path: "/teacher/leave", icon: Book, label: "Leave" },
    { path: "/teacher/students/studentlist", icon: Users, label: "Students" },
    { path: "/teacher/profile", icon: User, label: "Profile" },
  ];
}

// ============================================================================
// 2. ROUTE CONFIGURATION (in App.tsx)
// ============================================================================

/**
 * Router setup with all homework routes
 * The path "/teacher/homework" routes to CreateHomeWorkScreen by default
 */

<Route path="/teacher" element={<Layout />}>
  {/* Dashboard */}
  <Route path="dashboard" element={<TeacherDashboard />} />
  
  {/* Attendance */}
  <Route path="attendance/mark" element={<MarkAttendanceScreen />} />
  
  {/* ✅ HOMEWORK ROUTES */}
  <Route path="homework" element={<CreateHomeWorkScreen />} />
  <Route path="homework/create" element={<CreateHomeWorkScreen />} />
  <Route path="homework/add" element={<AddHomeWorkScreen />} />
  
  {/* Other routes... */}
  <Route path="announcements" element={<AnnouncementScreen />} />
  <Route path="profile" element={<TeacherProfileScreen />} />
  
  {/* Catch-all redirect */}
  <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
</Route>

// ============================================================================
// 3. USING useNavigate() - Programmatic Navigation
// ============================================================================

/**
 * Example: Navigate to homework screen from a button click
 */

import { useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft } from 'lucide-react';

function CreateHomeWorkScreen() {
  const navigate = useNavigate();

  // Navigate to homework list
  const handleBackToList = () => {
    navigate('/teacher/homework');
  };

  // Navigate to add homework form
  const handleAddNew = () => {
    navigate('/teacher/homework/add');
  };

  // Navigate with state (optional)
  const handleEditHomework = (id: number) => {
    navigate('/teacher/homework/create', { 
      state: { homeworkId: id } 
    });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleBackToList}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <ChevronLeft size={20} />
        Back to Homework
      </button>

      <button
        onClick={handleAddNew}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        <Plus size={20} />
        Create Homework
      </button>

      {/* Rest of component */}
    </div>
  );
}

// ============================================================================
// 4. USING NavLink - Declarative Navigation with Active State
// ============================================================================

/**
 * Example: Create navigation tabs with automatic active styling
 */

import { NavLink } from 'react-router-dom';

function HomeworkNavigation() {
  return (
    <nav className="flex gap-4 border-b border-gray-300 mb-6">
      <NavLink
        to="/teacher/homework"
        end
        className={({ isActive }) => `
          px-4 py-2 font-medium border-b-2 transition-colors
          ${isActive 
            ? 'border-blue-600 text-blue-600' 
            : 'border-transparent text-gray-600 hover:text-gray-900'}
        `}
      >
        All Homework
      </NavLink>

      <NavLink
        to="/teacher/homework/create"
        className={({ isActive }) => `
          px-4 py-2 font-medium border-b-2 transition-colors
          ${isActive 
            ? 'border-blue-600 text-blue-600' 
            : 'border-transparent text-gray-600 hover:text-gray-900'}
        `}
      >
        Create New
      </NavLink>
    </nav>
  );
}

/**
 * Note: Use "end" prop to match exact path (prevents parent matching)
 */

// ============================================================================
// 5. SIDEBAR ACTIVE STATE LOGIC
// ============================================================================

/**
 * How the sidebar determines if an item is active:
 * Uses location.pathname.startsWith(path) to match any sub-routes
 */

import { useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const itemClass = (path?: string) => {
    // Check if current path starts with menu item path
    const isActive = path && location.pathname.startsWith(path);
    
    return `
      flex items-center gap-3 px-6 py-3 cursor-pointer transition-all rounded-l-full
      ${isActive
        ? "bg-blue-600 text-white border-l-4 border-white"  // ← Active styles
        : "text-gray-300 hover:bg-[#23265a] hover:text-blue-400"}  // ← Inactive styles
    `;
  };

  // Render menu item
  return (
    <div className={itemClass('/teacher/homework')}>
      <BookOpen size={22} />
      <span className="font-medium">Homework</span>
    </div>
  );
}

/**
 * Example active paths:
 * - /teacher/homework ✅ Active
 * - /teacher/homework/create ✅ Active
 * - /teacher/homework/add ✅ Active
 * - /teacher/dashboard ❌ Not active
 * - /teacher/attendance ❌ Not active
 */

// ============================================================================
// 6. FOLDER STRUCTURE & IMPORTS
// ============================================================================

/**
 * Current folder structure:
 */

// src/screens/teacher/homework/
// ├── CreateHomeWorkScreen.tsx  ← Default screen (list/manage)
// ├── AddHomeWorkScreen.tsx
// └── GradeAssignmentScreen.tsx

// src/components/layout/
// └── Sidebar.tsx  ← Contains menu configuration

/**
 * Import statements in App.tsx:
 */
import CreateHomeWorkScreen from "./screens/teacher/homework/CreateHomeWorkScreen";
import AddHomeWorkScreen from "./screens/teacher/homework/AddHomeWorkScreen";

/**
 * Best practice: Extract reusable components
 */
// src/components/homework/HomeworkForm.tsx
export function HomeworkForm(props: HomeworkFormProps) {
  // Form logic
}

// src/components/homework/HomeworkList.tsx
export function HomeworkList(props: HomeworkListProps) {
  // List logic
}

// Usage in screen:
import HomeworkForm from "../../../components/homework/HomeworkForm";
import HomeworkList from "../../../components/homework/HomeworkList";

// ============================================================================
// 7. COMPLETE EXAMPLE: HOMEWORK SCREEN WITH NAVIGATION
// ============================================================================

/**
 * Full working example of the homework screen
 */

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Plus, ChevronLeft } from 'lucide-react';

interface Homework {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: 'active' | 'completed';
}

function CreateHomeWorkScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleNavigateToCreate = () => {
    navigate('/teacher/homework/create');
  };

  const handleNavigateToAdd = () => {
    navigate('/teacher/homework/add');
  };

  const handleEditHomework = (id: number) => {
    // Pass homework ID via state
    navigate('/teacher/homework/create', { 
      state: { homeworkId: id } 
    });
  };

  const handleBackToDashboard = () => {
    navigate('/teacher/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-600" size={32} />
            <h1 className="text-4xl font-bold text-gray-900">Homework Management</h1>
          </div>
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={20} />
            Back
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleNavigateToCreate}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Create Homework
          </button>
          <button
            onClick={handleNavigateToAdd}
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Add Homework
          </button>
        </div>

        {/* Homework List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {homeworkList.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="text-gray-300 mx-auto mb-4" size={48} />
              <p className="text-gray-500 text-lg">No homework assigned yet</p>
              <button
                onClick={handleNavigateToCreate}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Create your first homework
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {homeworkList.map((hw) => (
                <div
                  key={hw.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleEditHomework(hw.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{hw.title}</h3>
                      <p className="text-sm text-gray-600">{hw.subject}</p>
                      <p className="text-xs text-gray-500 mt-2">Due: {hw.dueDate}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      hw.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {hw.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateHomeWorkScreen;

// ============================================================================
// 8. TYPESCRIPT TYPES
// ============================================================================

/**
 * Type definitions for homework feature
 */

// Menu item type (from Sidebar.tsx)
interface MenuItem {
  path?: string;
  label: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

// Homework data type
interface Homework {
  id: number;
  class: string;
  date: string;
  subject: string;
  title: string;
  document?: string;
  dueDate: string;
  status: 'active' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

// Navigation location state type
interface HomeworkLocationState {
  homeworkId?: number;
  action?: 'create' | 'edit' | 'grade';
}

// ============================================================================
// 9. TESTING CHECKLIST
// ============================================================================

/**
 * Manual testing checklist for homework navigation
 */

// [ ] 1. Login as teacher
// [ ] 2. Sidebar displays "Homework" menu item
// [ ] 3. Click "Homework" → navigate to /teacher/homework
// [ ] 4. Sidebar item highlights (blue background)
// [ ] 5. CreateHomeWorkScreen renders
// [ ] 6. Click "Create Homework" button → navigate to /teacher/homework/create
// [ ] 7. Sidebar still shows "Homework" as active
// [ ] 8. Form is displayed
// [ ] 9. Click back button → navigate to /teacher/homework
// [ ] 10. Collapse sidebar → icon visible, label hidden, still highlighted
// [ ] 11. Expand sidebar → full menu visible with highlight
// [ ] 12. Refresh page at /teacher/homework → Sidebar item still highlighted
// [ ] 13. Navigate via browser back button → URL and highlight update correctly
// [ ] 14. Open DevTools → Check that location.pathname is correct

// ============================================================================
