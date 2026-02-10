# Teacher Homework Navigation Setup

## Overview
This document describes the complete implementation of the Homework navigation feature in the Teacher Dashboard.

---

## 1. Sidebar Menu Item Code

### File: [src/components/layout/Sidebar.tsx](src/components/layout/Sidebar.tsx)

The sidebar automatically highlights menu items based on the current route using React Router's `useLocation()` hook.

**Teacher Menu Item:**
```tsx
{path: "/teacher/homework", icon: BookOpen, label: "Homework" }
```

**Key Features:**
- Uses `BookOpen` icon from lucide-react
- Path: `/teacher/homework`
- Automatically highlights when user navigates to any homework route
- Clean, reusable menu structure

**Active State Logic:**
```tsx
const itemClass = (path?: string) => {
  const isActive = path && location.pathname.startsWith(path);
  return `
    flex items-center ${isOpen ? 'gap-3 px-6' : 'justify-center'} py-3 cursor-pointer transition-all rounded-l-full
    ${isActive
      ? "bg-blue-600 text-white border-l-4 border-white"
      : "text-gray-300 hover:bg-[#23265a] hover:text-blue-400"}
  `;
};
```

---

## 2. Route Configuration

### File: [src/App.tsx](src/App.tsx)

Routes are configured in the main App component using React Router v6's `Routes` and `Route` components.

**Teacher Homework Routes:**
```tsx
<Route path="/teacher" element={<Layout />}>
  <Route path="homework" element={<CreateHomeWorkScreen />} />
  <Route path="homework/create" element={<CreateHomeWorkScreen />} />
  <Route path="homework/add" element={<AddHomeWorkScreen />} />
  {/* Other teacher routes... */}
  <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
</Route>
```

**Route Details:**
| Path | Component | Purpose |
|------|-----------|---------|
| `/teacher/homework` | CreateHomeWorkScreen | Default homework dashboard |
| `/teacher/homework/create` | CreateHomeWorkScreen | Create new homework |
| `/teacher/homework/add` | AddHomeWorkScreen | Alternative add homework view |

---

## 3. Navigation Implementation

### A. useNavigate Hook
Used in components for programmatic navigation:

```tsx
import { useNavigate } from 'react-router-dom';

function CreateHomeWorkScreen() {
  const navigate = useNavigate();
  
  const handleSaveHomework = () => {
    // Save logic
    navigate('/teacher/homework'); // Navigate back to list
  };
  
  const handleAddNew = () => {
    navigate('/teacher/homework/create');
  };
  
  return (/* JSX */);
}
```

### B. NavLink Component
For creating navigation links with automatic active styling:

```tsx
import { NavLink } from 'react-router-dom';

function HomeworkNav() {
  return (
    <div className="flex gap-4">
      <NavLink
        to="/teacher/homework"
        className={({ isActive }) => 
          isActive ? 'text-blue-600 font-bold' : 'text-gray-600'
        }
      >
        Homework List
      </NavLink>
      <NavLink
        to="/teacher/homework/create"
        className={({ isActive }) => 
          isActive ? 'text-blue-600 font-bold' : 'text-gray-600'
        }
      >
        Create Homework
      </NavLink>
    </div>
  );
}
```

---

## 4. Folder-Based Import Paths

### Current Structure:
```
src/
├── screens/
│   └── teacher/
│       └── homework/
│           ├── CreateHomeWorkScreen.tsx  ← Default screen
│           ├── AddHomeWorkScreen.tsx
│           └── GradeAssignmentScreen.tsx
├── components/
│   └── layout/
│       └── Sidebar.tsx
└── routes/
    └── (route configuration in App.tsx)
```

### Import Paths:

**In App.tsx:**
```tsx
import CreateHomeWorkScreen from "./screens/teacher/homework/CreateHomeWorkScreen";
import AddHomeWorkScreen from "./screens/teacher/homework/AddHomeWorkScreen";
```

**Create reusable components:**
```tsx
// src/components/homework/HomeworkForm.tsx
export const HomeworkForm = ({ ... }) => { /* ... */ };

// src/components/homework/HomeworkList.tsx
export const HomeworkList = ({ ... }) => { /* ... */ };

// Usage in screens
import HomeworkForm from "../../../components/homework/HomeworkForm";
```

---

## 5. User Flow

### Step-by-Step Navigation:

1. **Teacher logs in** → Navigates to `/teacher/dashboard`
2. **Clicks "Homework" in Sidebar** → Navigates to `/teacher/homework`
3. **Sidebar item highlights** → Active state triggered (blue background, white text)
4. **CreateHomeWorkScreen renders** → Shows homework list/management
5. **Teacher clicks "Create Homework"** → Navigates to `/teacher/homework/create`
6. **Form is displayed** → User creates homework
7. **Submit & Save** → useNavigate redirects back to `/teacher/homework`

---

## 6. Key Implementation Details

### Active State Highlighting

The sidebar uses `location.pathname.startsWith(path)` to determine if a menu item is active:

```tsx
// This means:
// - Active when: /teacher/homework
// - Active when: /teacher/homework/create
// - Active when: /teacher/homework/add
// - NOT active: /teacher/dashboard
```

### Responsive Design

Sidebar collapses/expands:
- **Expanded**: Shows label + icon + visual feedback
- **Collapsed**: Shows only icon with tooltip

```tsx
{isOpen && <span className="font-medium">{item.label}</span>}
title={!isOpen ? item.label : undefined}
```

### TypeScript Support

Menu items follow a strict interface:

```tsx
interface MenuItem {
  path?: string;
  label: string;
  icon: React.ElementType;
  children?: MenuItem[];
}
```

---

## 7. Best Practices Implemented

✅ **React Router v6 Patterns**
- Using `useNavigate()` for programmatic navigation
- Using `useLocation()` for route detection
- Using nested routes with `<Outlet />`

✅ **TypeScript Strict Typing**
- MenuItem interface defined
- Route props properly typed
- Navigation functions type-safe

✅ **Performance**
- Route code-splitting ready
- Sidebar state management with context
- No unnecessary re-renders

✅ **Accessibility**
- `title` attribute for collapsed sidebar
- `aria-label` for toggle button
- Semantic HTML structure

✅ **Maintainability**
- Centralized route configuration
- Folder-based organization
- Reusable menu structure
- Clear separation of concerns

---

## 8. Testing the Implementation

### Manual Testing Checklist:

- [ ] Click "Homework" in sidebar → Navigates to `/teacher/homework`
- [ ] Sidebar item highlights in blue
- [ ] URL changes to `/teacher/homework`
- [ ] CreateHomeWorkScreen renders
- [ ] Click "Create Homework" → Navigates to `/teacher/homework/create`
- [ ] Sidebar still highlights "Homework"
- [ ] Back button → Returns to `/teacher/homework`
- [ ] Collapse sidebar → Icon visible, label hidden
- [ ] Expand sidebar → Full menu visible with highlight

### Browser Console Verification:

```javascript
// Check current location
window.location.pathname

// Verify router context
document.querySelector('[class*="bg-blue-600"]').textContent // Should show "Homework"
```

---

## 9. Future Enhancements

- Add homework sub-menu items (Pending, Completed, Graded)
- Implement breadcrumb navigation
- Add route guards for permission checks
- Integrate Redux/Context for homework state management
- Add loading states during navigation
- Implement history/back button functionality

---

## 10. Troubleshooting

### Issue: Sidebar item not highlighting
**Solution:** Check that route path matches exactly, use `startsWith()` comparison

### Issue: Navigation not working
**Solution:** Verify `<BrowserRouter>` wraps all routes, check NavLink/useNavigate imports

### Issue: Page not rendering after navigation
**Solution:** Ensure component is imported, check for circular imports, verify route config

---

## File Modifications Summary

| File | Change | Status |
|------|--------|--------|
| `src/components/layout/Sidebar.tsx` | Updated Homework menu item path from `/teacher/home-work` to `/teacher/homework`, changed icon from Wallet to BookOpen | ✅ Complete |
| `src/App.tsx` | Added route `/teacher/homework` mapping to CreateHomeWorkScreen | ✅ Complete |

---

**Last Updated:** February 4, 2026
**Version:** 1.0
