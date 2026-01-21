import React, { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

const mockBooks: Book[] = [
  { id: 1, title: 'Mathematics 101', author: 'John Smith', available: true },
  { id: 2, title: 'Physics for Beginners', author: 'Jane Doe', available: false },
  { id: 3, title: 'Chemistry Essentials', author: 'Albert Lee', available: true },
];

const BookListScreen: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleView = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Library Book List</h2>
      {loading && <div className="mb-4 text-blue-600">Processing...</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Title</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Author</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-2 text-center text-gray-400">No books found.</td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td className="px-4 py-2 text-gray-700">{book.title}</td>
                <td className="px-4 py-2 text-gray-700">{book.author}</td>
                <td className="px-4 py-2 text-gray-700">{book.available ? 'Available' : 'Issued'}</td>
                <td className="px-4 py-2">
                  <button
                    className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleView(book)}
                  >
                    View
                  </button>
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    disabled
                  >
                    Issue
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal for viewing book details */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-2">Book Details</h3>
            <p><span className="font-semibold">Title:</span> {selectedBook.title}</p>
            <p><span className="font-semibold">Author:</span> {selectedBook.author}</p>
            <p><span className="font-semibold">Status:</span> {selectedBook.available ? 'Available' : 'Issued'}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookListScreen;


// import React, { useState } from 'react';
// import { BookOpen, LayoutDashboard, Users, GraduationCap, Calendar, FileText, Settings, Bell, Menu, X, ChevronDown, Search, Plus, Filter, Download, Edit, Trash2, Eye, BookMarked, UserCheck, Clock, TrendingUp, MoreVertical, AlertCircle, CheckCircle } from 'lucide-react';

// export default function SchoolAdminApp() {
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [expandedMenus, setExpandedMenus] = useState({ library: true });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState('all');

//   const [books] = useState([
//     { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', category: 'Fiction', total: 15, available: 12, issued: 3 },
//     { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', category: 'Fiction', total: 20, available: 18, issued: 2 },
//     { id: 3, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0-262-03384-8', category: 'Computer Science', total: 10, available: 7, issued: 3 },
//     { id: 4, title: 'Physics for Scientists', author: 'Raymond A. Serway', isbn: '978-1-133-95405-7', category: 'Science', total: 25, available: 20, issued: 5 },
//     { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0-14-143951-8', category: 'Fiction', total: 12, available: 10, issued: 2 },
//     { id: 6, title: 'Chemistry Principles', author: 'Peter Atkins', isbn: '978-1-429-23815-5', category: 'Science', total: 18, available: 15, issued: 3 },
//     { id: 7, title: 'Data Structures', author: 'Seymour Lipschutz', isbn: '978-0-07-013596-6', category: 'Computer Science', total: 14, available: 11, issued: 3 },
//     { id: 8, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', category: 'Fiction', total: 16, available: 14, issued: 2 }
//   ]);

//   const [issuedBooks] = useState([
//     { id: 1, bookTitle: 'To Kill a Mockingbird', studentName: 'Emma Johnson', studentId: 'S2024001', issueDate: '2026-01-10', dueDate: '2026-01-24', status: 'active' },
//     { id: 2, bookTitle: 'Introduction to Algorithms', studentName: 'Liam Smith', studentId: 'S2024002', issueDate: '2026-01-08', dueDate: '2026-01-22', status: 'overdue' },
//     { id: 3, bookTitle: 'Physics for Scientists', studentName: 'Olivia Brown', studentId: 'S2024003', issueDate: '2026-01-15', dueDate: '2026-01-29', status: 'active' },
//     { id: 4, bookTitle: 'The Great Gatsby', studentName: 'Noah Davis', studentId: 'S2024004', issueDate: '2026-01-12', dueDate: '2026-01-26', status: 'active' },
//     { id: 5, bookTitle: 'Chemistry Principles', studentName: 'Ava Wilson', studentId: 'S2024005', issueDate: '2026-01-05', dueDate: '2026-01-19', status: 'overdue' },
//     { id: 6, bookTitle: 'Data Structures', studentName: 'James Miller', studentId: 'S2024006', issueDate: '2026-01-18', dueDate: '2026-02-01', status: 'active' }
//   ]);

//   const [libraryMembers] = useState([
//     { id: 1, name: 'Emma Johnson', memberId: 'L2024001', type: 'Student', booksIssued: 2, joinDate: '2024-09-01', status: 'active' },
//     { id: 2, name: 'Liam Smith', memberId: 'L2024002', type: 'Student', booksIssued: 1, joinDate: '2024-09-01', status: 'active' },
//     { id: 3, name: 'Dr. Sarah Williams', memberId: 'L2024003', type: 'Teacher', booksIssued: 3, joinDate: '2024-09-01', status: 'active' },
//     { id: 4, name: 'Olivia Brown', memberId: 'L2024004', type: 'Student', booksIssued: 1, joinDate: '2024-09-05', status: 'active' },
//     { id: 5, name: 'Noah Davis', memberId: 'L2024005', type: 'Student', booksIssued: 1, joinDate: '2024-09-10', status: 'active' },
//     { id: 6, name: 'Prof. Michael Chen', memberId: 'L2024006', type: 'Teacher', booksIssued: 2, joinDate: '2024-09-01', status: 'active' }
//   ]);

//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'students', label: 'Students', icon: Users },
//     { id: 'teachers', label: 'Teachers', icon: GraduationCap },
//     { 
//       id: 'library', 
//       label: 'Library', 
//       icon: BookOpen,
//       submenu: [
//         { id: 'library-overview', label: 'Overview', icon: TrendingUp },
//         { id: 'library-catalog', label: 'Books Catalog', icon: BookMarked },
//         { id: 'library-issued', label: 'Issued Books', icon: BookOpen },
//         { id: 'library-members', label: 'Members', icon: UserCheck },
//         { id: 'library-reports', label: 'Reports', icon: FileText }
//       ]
//     },
//     { id: 'calendar', label: 'Calendar', icon: Calendar },
//     { id: 'reports', label: 'Reports', icon: FileText },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   const toggleSubmenu = (id) => {
//     setExpandedMenus(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const handleMenuClick = (item, subItem = null) => {
//     if (item.submenu && !subItem) {
//       toggleSubmenu(item.id);
//       if (!expandedMenus[item.id]) {
//         setCurrentPage(item.submenu[0].id);
//       }
//     } else {
//       setCurrentPage(subItem ? subItem.id : item.id);
//     }
//   };

//   const LibraryOverview = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-800">Library Overview</h1>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
//           <Download size={18} />
//           Export Report
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <BookMarked size={32} />
//             <span className="text-blue-100 text-sm">Total</span>
//           </div>
//           <h3 className="text-3xl font-bold mb-1">12,450</h3>
//           <p className="text-blue-100">Total Books</p>
//         </div>

//         <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <BookOpen size={32} />
//             <span className="text-green-100 text-sm">Active</span>
//           </div>
//           <h3 className="text-3xl font-bold mb-1">3,267</h3>
//           <p className="text-green-100">Books Issued</p>
//         </div>

//         <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <Clock size={32} />
//             <span className="text-orange-100 text-sm">Pending</span>
//           </div>
//           <h3 className="text-3xl font-bold mb-1">142</h3>
//           <p className="text-orange-100">Overdue Books</p>
//         </div>

//         <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <UserCheck size={32} />
//             <span className="text-purple-100 text-sm">Active</span>
//           </div>
//           <h3 className="text-3xl font-bold mb-1">1,842</h3>
//           <p className="text-purple-100">Members</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Issues</h2>
//           <div className="space-y-3">
//             {issuedBooks.slice(0, 5).map(item => (
//               <div key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
//                 <div>
//                   <p className="font-semibold text-gray-800">{item.bookTitle}</p>
//                   <p className="text-sm text-gray-500">{item.studentName}</p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   item.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
//                 }`}>
//                   {item.status === 'overdue' ? 'Overdue' : 'Active'}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Categories</h2>
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-700">Fiction</span>
//                 <span className="font-semibold">35%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-700">Science</span>
//                 <span className="font-semibold">28%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-700">Computer Science</span>
//                 <span className="font-semibold">22%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-purple-600 h-2 rounded-full" style={{ width: '22%' }}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-700">Others</span>
//                 <span className="font-semibold">15%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-orange-600 h-2 rounded-full" style={{ width: '15%' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Statistics</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="text-center p-4 bg-blue-50 rounded-lg">
//             <p className="text-sm text-gray-600 mb-1">Books Added This Month</p>
//             <p className="text-2xl font-bold text-blue-600">148</p>
//           </div>
//           <div className="text-center p-4 bg-green-50 rounded-lg">
//             <p className="text-sm text-gray-600 mb-1">New Members This Month</p>
//             <p className="text-2xl font-bold text-green-600">52</p>
//           </div>
//           <div className="text-center p-4 bg-purple-50 rounded-lg">
//             <p className="text-sm text-gray-600 mb-1">Average Daily Issues</p>
//             <p className="text-2xl font-bold text-purple-600">87</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const BooksCatalog = () => {
//     const filteredBooks = books.filter(book => {
//       const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                            book.isbn.includes(searchQuery);
//       const matchesFilter = selectedFilter === 'all' || 
//                            book.category.toLowerCase() === selectedFilter.toLowerCase().replace('-', ' ');
//       return matchesSearch && matchesFilter;
//     });

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-gray-800">Books Catalog</h1>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
//             <Plus size={18} />
//             Add New Book
//           </button>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-4">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search books by title, author, or ISBN..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <select
//               value={selectedFilter}
//               onChange={(e) => setSelectedFilter(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Categories</option>
//               <option value="fiction">Fiction</option>
//               <option value="science">Science</option>
//               <option value="computer-science">Computer Science</option>
//             </select>
//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <Filter size={18} />
//               More Filters
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Book Details</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ISBN</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
//                   <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Total</th>
//                   <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Available</th>
//                   <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Issued</th>
//                   <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {filteredBooks.map(book => (
//                   <tr key={book.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4">
//                       <div>
//                         <p className="font-semibold text-gray-800">{book.title}</p>
//                         <p className="text-sm text-gray-500">{book.author}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{book.isbn}</td>
//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
//                         {book.category}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-center font-semibold">{book.total}</td>
//                     <td className="px-6 py-4 text-center">
//                       <span className="text-green-600 font-semibold">{book.available}</span>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <span className="text-orange-600 font-semibold">{book.issued}</span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center justify-center gap-2">
//                         <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600" title="View">
//                           <Eye size={18} />
//                         </button>
//                         <button className="p-2 hover:bg-green-50 rounded-lg text-green-600" title="Edit">
//                           <Edit size={18} />
//                         </button>
//                         <button className="p-2 hover:bg-red-50 rounded-lg text-red-600" title="Delete">
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {filteredBooks.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No books found matching your search criteria.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const IssuedBooks = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-800">Issued Books</h1>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
//           <Plus size={18} />
//           Issue Book
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
//           <p className="text-sm text-gray-600">Active Issues</p>
//           <p className="text-2xl font-bold text-gray-800 mt-1">
//             {issuedBooks.filter(b => b.status === 'active').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
//           <p className="text-sm text-gray-600">Overdue</p>
//           <p className="text-2xl font-bold text-gray-800 mt-1">
//             {issuedBooks.filter(b => b.status === 'overdue').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
//           <p className="text-sm text-gray-600">Total Issued</p>
//           <p className="text-2xl font-bold text-gray-800 mt-1">{issuedBooks.length}</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Book Title</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student ID</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Issue Date</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Due Date</th>
//                 <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Status</th>
//                 <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {issuedBooks.map(issue => (
//                 <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 font-semibold text-gray-800">{issue.bookTitle}</td>
//                   <td className="px-6 py-4 text-gray-600">{issue.studentName}</td>
//                   <td className="px-6 py-4 text-gray-600">{issue.studentId}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{issue.issueDate}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{issue.dueDate}</td>
//                   <td className="px-6 py-4 text-center">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       issue.status === 'overdue' 
//                         ? 'bg-red-100 text-red-700' 
//                         : 'bg-green-100 text-green-700'
//                     }`}>
//                       {issue.status === 'overdue' ? 'Overdue' : 'Active'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
//                         Return
//                       </button>
//                       <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
//                         Renew
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const LibraryMembers = () => (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-800">Library Members</h1>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
//           <Plus size={18} />
//           Add Member
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
//           <p className="text-sm text-gray-600">Total Members</p>
//           <p className="text-2xl font-bold text-gray-800 mt-1">{libraryMembers.length}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
//           <p className="text-sm text-gray-600">Teachers</p>
//           <p className="text-2xl font-bold text-gray-800 mt-1">
//             {libraryMembers.filter(m => m.type === 'Teacher').length}
//           </p>
//         </div>
//         <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
//           <p className="text-sm text-gray-600">Students</p>
//           <p className="text-2xl font-bold text-gray-800 mt-1">
//             {libraryMembers.filter(m => m.type === 'Student').length}
//           </p>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Member ID</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
//                 <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Books Issued</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Join Date</th>
//                 <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Status</th>
//                 <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {libraryMembers.map(member => (
//                 <tr key={member.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 font-semibold text-gray-800">{member.name}</td>
//                   <td className="px-6 py-4 text-gray-600">{member.memberId}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       member.type === 'Teacher' 
//                         ? 'bg-purple-100 text-purple-700' 
//                         : 'bg-blue-100 text-blue-700'
//                     }`}>
//                       {member.type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-center font-semibold">{member.booksIssued}</td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{member.joinDate}</td>
//                   <td className="px-6 py-4 text-center">
//                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//                       Active
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600" title="View">
//                         <Eye size={18} />
//                       </button>
//                                           <button className="p-2 hover:bg-green-50 rounded-lg text-green-600" title="Edit">
//                         <Edit size={18} />
//                       </button>
//                       <button className="p-2 hover:bg-red-50 rounded-lg text-red-600" title="Delete">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
//   const renderPage = () => {
//     switch (currentPage) {
//       case 'library-overview':
//         return <LibraryOverview />;
//       case 'library-catalog':
//         return <BooksCatalog />;
//       case 'library-issued':
//         return <IssuedBooks />;
//       case 'library-members':
//         return <LibraryMembers />;
//       default:
//         return <LibraryOverview />;
//     }
//   };
//   const Sidebar = () => (
//     <div className={`bg-white border-r h-screen transition-all ${sidebarOpen ? 'w-72' : 'w-20'}`}>
//       <div className="flex items-center justify-between px-4 py-4 border-b">
//         {sidebarOpen && <h2 className="text-xl font-bold text-blue-600">School Admin</h2>}
//         <button onClick={() => setSidebarOpen(!sidebarOpen)}>
//           {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </div>

//       <nav className="p-3 space-y-1">
//         {menuItems.map(item => (
//           <div key={item.id}>
//             <button
//               onClick={() => handleMenuClick(item)}
//               className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 ${
//                 currentPage === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
//               }`}
//             >
//               <item.icon size={20} />
//               {sidebarOpen && <span>{item.label}</span>}
//               {item.submenu && sidebarOpen && (
//                 <ChevronDown
//                   size={16}
//                   className={`ml-auto transition-transform ${
//                     expandedMenus[item.id] ? 'rotate-180' : ''
//                   }`}
//                 />
//               )}
//             </button>

//             {item.submenu && expandedMenus[item.id] && sidebarOpen && (
//               <div className="ml-8 mt-1 space-y-1">
//                 {item.submenu.map(sub => (
//                   <button
//                     key={sub.id}
//                     onClick={() => handleMenuClick(item, sub)}
//                     className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
//                       currentPage === sub.id
//                         ? 'bg-blue-100 text-blue-700'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     <sub.icon size={16} />
//                     {sub.label}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
 
//   return (
//     <div className="flex h-screen bg-gray-100">
      
//       <div className="flex-1 flex flex-col overflow-hidden">
     
//         <main className="flex-1 overflow-y-auto p-6">
//           {renderPage()}
//         </main>
//       </div>
//     </div>
//   );
// }
