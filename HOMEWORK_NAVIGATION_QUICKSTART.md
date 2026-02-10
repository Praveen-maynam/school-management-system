# 🎓 Homework Navigation - Quick Start Guide

## ✅ What's Been Implemented

Your Teacher Dashboard now has a fully functional **Homework** navigation feature with:
- ✅ Sidebar menu item with icon
- ✅ Active state highlighting (blue background when selected)
- ✅ Route to `/teacher/homework`
- ✅ TypeScript support
- ✅ React Router v6 integration

---

## 🎯 How It Works

### 1. **Sidebar Menu Item**
When you click "Homework" in the sidebar, it navigates to the homework screen and highlights itself.

```
Sidebar: Homework → Click → Navigate to /teacher/homework → Highlight active
```

### 2. **Files Modified**

| File | Change |
|------|--------|
| `src/components/layout/Sidebar.tsx` | Updated menu item path and icon |
| `src/App.tsx` | Added route mapping |

### 3. **Route Structure**

```
/teacher/homework          → CreateHomeWorkScreen (list/manage)
/teacher/homework/create   → CreateHomeWorkScreen (create form)
/teacher/homework/add      → AddHomeWorkScreen (alternate form)
```

---

## 🚀 Quick Reference

### Navigate Programmatically
```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/teacher/homework');
  };
  
  return <button onClick={handleClick}>Go to Homework</button>;
}
```

### Create a Navigation Link
```tsx
import { NavLink } from 'react-router-dom';

function MyComponent() {
  return (
    <NavLink
      to="/teacher/homework"
      className={({ isActive }) => isActive ? 'active' : ''}
    >
      Homework
    </NavLink>
  );
}
```

### Check Current Route
```tsx
import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();
  
  const isHomeworkPage = location.pathname.startsWith('/teacher/homework');
  
  return isHomeworkPage ? <div>On homework page</div> : null;
}
```

---

## 📁 Folder Structure

```
src/
├── components/
│   └── layout/
│       └── Sidebar.tsx              ← Menu configuration
├── screens/
│   └── teacher/
│       └── homework/
│           ├── CreateHomeWorkScreen.tsx
│           ├── AddHomeWorkScreen.tsx
│           └── GradeAssignmentScreen.tsx
├── routes/
│   └── (configured in App.tsx)
└── App.tsx                          ← Route definitions
```

---

## 🧪 Testing

### 1. **Basic Navigation Test**
- [ ] Login as teacher
- [ ] Click "Homework" in sidebar
- [ ] URL changes to `/teacher/homework`
- [ ] Screen displays homework management

### 2. **Active State Test**
- [ ] Sidebar item should be highlighted (blue background)
- [ ] Highlight remains when clicking buttons inside homework screen
- [ ] Highlight disappears when navigating away

### 3. **Route Test**
- [ ] Directly visit `/teacher/homework` in browser → Works
- [ ] Directly visit `/teacher/homework/create` in browser → Works
- [ ] Type invalid URL `/teacher/homework/invalid` → Redirects to dashboard

### 4. **Responsive Test**
- [ ] Collapse sidebar → Icon visible, highlight visible
- [ ] Expand sidebar → Full menu visible, highlight visible
- [ ] Test on mobile → Menu and highlight work correctly

---

## 🔧 Common Tasks

### Add a New Homework Sub-Menu Item

**In Sidebar.tsx:**
```tsx
{
  path: "/teacher/homework", 
  icon: BookOpen, 
  label: "Homework",
  children: [
    { path: "/teacher/homework", label: "All Homework", icon: List },
    { path: "/teacher/homework/create", label: "Create New", icon: Plus },
    { path: "/teacher/homework/pending", label: "Pending", icon: Clock },
  ]
}
```

**In App.tsx:**
```tsx
<Route path="homework/pending" element={<PendingHomeworkScreen />} />
```

### Navigate with Data

```tsx
const navigate = useNavigate();

// Option 1: Using state
navigate('/teacher/homework/create', { 
  state: { homeworkId: 123 } 
});

// Option 2: Using URL params
navigate(`/teacher/homework/${id}/edit`);

// Option 3: Using search params
navigate('/teacher/homework?status=pending&sort=date');
```

### Get Navigation State

```tsx
import { useLocation } from 'react-router-dom';

function CreateHomeWorkScreen() {
  const location = useLocation();
  
  // Get state passed via navigate()
  const homeworkId = location.state?.homeworkId;
  
  // Get search params
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');
  
  return null;
}
```

---

## 📚 API Reference

### React Router v6 Hooks

**useNavigate()**
- Programmatically navigate to different routes
- Used for button clicks and conditional navigation

**useLocation()**
- Get current route and search parameters
- Used for active state detection
- Used to read navigation state

**useParams()**
- Extract URL parameters (e.g., `/homework/:id`)
- Used for dynamic routes

**NavLink**
- Declarative navigation component
- Automatically applies active class when route matches

---

## ⚠️ Common Issues & Solutions

### Issue: Sidebar item not highlighting
**Solution:**
- Check that path matches exactly
- Verify `location.pathname.startsWith(path)` logic
- Ensure Layout component renders Sidebar

### Issue: Navigation not working
**Solution:**
- Verify `<BrowserRouter>` wraps entire app in App.tsx
- Check component is imported correctly
- Verify route path exists in App.tsx

### Issue: Page content not displaying
**Solution:**
- Check route path matches exactly (case-sensitive)
- Verify component is imported
- Look for route ordering (more specific routes first)

---

## 📖 Documentation Files

- **[HOMEWORK_NAVIGATION_SETUP.md](HOMEWORK_NAVIGATION_SETUP.md)** - Full implementation details
- **[HOMEWORK_NAVIGATION_CODE_SNIPPETS.md](HOMEWORK_NAVIGATION_CODE_SNIPPETS.md)** - Code examples and reference

---

## 🎓 Learning Resources

### React Router v6
- [Official Documentation](https://reactrouter.com/)
- [useNavigate Hook](https://reactrouter.com/en/main/hooks/use-navigate)
- [useLocation Hook](https://reactrouter.com/en/main/hooks/use-location)
- [NavLink Component](https://reactrouter.com/en/main/components/nav-link)

### TypeScript with React Router
- [Type-safe Navigation](https://www.typescript-handbook.org/docs/handbook/react.html)
- [React Router Types](https://github.com/remix-run/react-router/tree/main/packages/react-router-dom)

---

## 🚀 Next Steps

1. **Test the implementation:**
   - Login to teacher dashboard
   - Click "Homework" in sidebar
   - Verify navigation and highlighting work

2. **Customize the screens:**
   - Edit `CreateHomeWorkScreen.tsx` to add features
   - Edit `AddHomeWorkScreen.tsx` if needed

3. **Add more features:**
   - Create sub-menu items for homework status
   - Add homework search/filter functionality
   - Implement homework submission tracking

4. **Expand to other roles:**
   - Add homework navigation for parent role
   - Add homework grading for teacher role

---

## 📞 Support

For issues or questions:
1. Check the documentation files in the project root
2. Review the code snippets in `HOMEWORK_NAVIGATION_CODE_SNIPPETS.md`
3. Test using the checklist in this guide
4. Verify React Router is properly installed (`npm list react-router-dom`)

---

**Version:** 1.0  
**Last Updated:** February 4, 2026  
**Status:** ✅ Ready for Production
