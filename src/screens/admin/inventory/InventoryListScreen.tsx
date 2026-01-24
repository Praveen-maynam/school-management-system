

// // import React, { useState } from 'react';

// // interface InventoryItem {
// // 	id: number;
// // 	name: string;
// // 	category: string;
// // 	quantity: number;
// // 	location: string;
// // }

// // const sampleItems: InventoryItem[] = [
// // 	{ id: 1, name: 'Projector', category: 'Electronics', quantity: 5, location: 'Room 101' },
// // 	{ id: 2, name: 'Desk', category: 'Furniture', quantity: 20, location: 'Room 201' },
// // 	{ id: 3, name: 'Whiteboard', category: 'Stationery', quantity: 10, location: 'Room 102' },
// // ];

// // export const InventoryListScreen: React.FC = () => {
// // 	const [items, setItems] = useState<InventoryItem[]>(sampleItems);
// // 	const [loading, setLoading] = useState(false);
// // 	const [error, setError] = useState<string | null>(null);

// // 	// Simulate delete action
// // 	const handleDelete = (id: number) => {
// // 		setLoading(true);
// // 		setTimeout(() => {
// // 			setItems((prev) => prev.filter((i) => i.id !== id));
// // 			setLoading(false);
// // 		}, 800);
// // 	};

// // 	return (
// // 		<div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
// // 			<h2 className="text-2xl font-bold mb-4">Inventory List</h2>
// // 			{error && <div className="text-red-500 mb-2">{error}</div>}
// // 			{loading && <div className="text-blue-600 mb-2">Processing...</div>}
// // 			{items.length === 0 ? (
// // 				<div className="text-gray-500 py-8 text-center">No inventory items found.</div>
// // 			) : (
// // 				<div className="overflow-x-auto">
// // 					<table className="min-w-full border">
// // 						<thead>
// // 							<tr className="bg-gray-100">
// // 								<th className="px-4 py-2 text-left">Name</th>
// // 								<th className="px-4 py-2 text-left">Category</th>
// // 								<th className="px-4 py-2 text-left">Quantity</th>
// // 								<th className="px-4 py-2 text-left">Location</th>
// // 								<th className="px-4 py-2 text-left">Actions</th>
// // 							</tr>
// // 						</thead>
// // 						<tbody>
// // 							{items.map((item) => (
// // 								<tr key={item.id} className="border-b">
// // 									<td className="px-4 py-2">{item.name}</td>
// // 									<td className="px-4 py-2">{item.category}</td>
// // 									<td className="px-4 py-2">{item.quantity}</td>
// // 									<td className="px-4 py-2">{item.location}</td>
// // 									<td className="px-4 py-2 flex gap-2">
// // 										<button className="text-blue-600 hover:underline text-sm">Edit</button>
// // 										<button
// // 											className="text-red-600 hover:underline text-sm"
// // 											onClick={() => handleDelete(item.id)}
// // 											disabled={loading}
// // 										>
// // 											Delete
// // 										</button>
// // 									</td>
// // 								</tr>
// // 							))}
// // 						</tbody>
// // 					</table>
// // 				</div>
// // 			)}
// // 		</div>
// // 	);
// // }



// import React, { useState } from 'react';
// import { Package, CheckCircle, AlertTriangle, DollarSign, Search, Filter, Download, Plus, MoreVertical, ChevronDown } from 'lucide-react';

// const InventorySystem = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState('All Items');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedItems, setSelectedItems] = useState<number[]>([]);

//   const stats = [
//     { label: 'Total Items', value: '1,847', icon: Package, bgColor: 'bg-blue-50', iconColor: 'text-blue-600', change: '+12%' },
//     { label: 'Available', value: '1,542', icon: CheckCircle, bgColor: 'bg-green-50', iconColor: 'text-green-600', badge: 'In Stock' },
//     { label: 'Low Stock', value: '23', icon: AlertTriangle, bgColor: 'bg-orange-50', iconColor: 'text-orange-600', badge: 'Alert' },
//     { label: 'Inventory Value', value: '$284,920', icon: DollarSign, bgColor: 'bg-purple-50', iconColor: 'text-purple-600', badge: 'Total' }
//   ];

//   const tabs = [
//     { name: 'All Items', count: 1847 },
//     { name: 'Textbooks', count: 342 },
//     { name: 'Lab Equipment', count: 156 },
//     { name: 'Sports', count: 89 },
//     { name: 'Electronics', count: 234 },
//     { name: 'Furniture', count: 412 }
//   ];

//   const items = [
//     {
//       id: 1,
//       name: 'Mathematics Textbook Grade 10',
//       publisher: 'Publisher: McGraw Hill',
//       category: 'Textbooks',
//       categoryColor: 'bg-blue-100 text-blue-700',
//       sku: 'TXT-MTH-G10-001',
//       location: 'Library - Section A',
//       quantity: 145,
//       unitPrice: '$45.00',
//       status: 'In Stock',
//       statusColor: 'bg-green-100 text-green-700',
//       icon: '📘'
//     },
//     {
//       id: 2,
//       name: 'Laboratory Microscope',
//       publisher: 'Model: BioVision Pro',
//       category: 'Lab Equipment',
//       categoryColor: 'bg-purple-100 text-purple-700',
//       sku: 'LAB-MIC-BV-845',
//       location: 'Science Lab 2',
//       quantity: 18,
//       total: 20,
//       unitPrice: '$325.00',
//       status: 'In Stock',
//       statusColor: 'bg-green-100 text-green-700',
//       icon: '🔬'
//     },
//     {
//       id: 3,
//       name: 'Basketball Official Size',
//       publisher: 'Brand: Spalding',
//       category: 'Sports',
//       categoryColor: 'bg-green-100 text-green-700',
//       sku: 'SPT-BBL-SPL-023',
//       location: 'Sports Storage',
//       quantity: 8,
//       total: 25,
//       unitPrice: '$28.50',
//       status: 'Low Stock',
//       statusColor: 'bg-orange-100 text-orange-700',
//       icon: '🏀'
//     },
//     {
//       id: 4,
//       name: 'Student Laptop Dell Latitude',
//       publisher: 'Model: 5420 | 8GB RAM',
//       category: 'Electronics',
//       categoryColor: 'bg-indigo-100 text-indigo-700',
//       sku: 'ELC-LAP-DL-5420',
//       location: 'IT Storage Room',
//       quantity: 52,
//       total: 60,
//       unitPrice: '$850.00',
//       status: 'In Stock',
//       statusColor: 'bg-green-100 text-green-700',
//       icon: '💻'
//     },
//     {
//       id: 5,
//       name: 'Student Desk with Chair',
//       publisher: 'Model: Adjustable Height',
//       category: 'Furniture',
//       categoryColor: 'bg-yellow-100 text-yellow-700',
//       sku: 'FRN-DSK-ADJ-B89',
//       location: 'Warehouse B',
//       quantity: 234,
//       total: 250,
//       unitPrice: '$165.00',
//       status: 'In Stock',
//       statusColor: 'bg-green-100 text-green-700',
//       icon: '🪑'
//     },
//     {
//       id: 6,
//       name: 'Chemistry Beaker Set 500ml',
//       publisher: 'Borosilicate Glass',
//       category: 'Lab Equipment',
//       categoryColor: 'bg-purple-100 text-purple-700',
//       sku: 'LAB-BKR-500-012',
//       location: 'Science Lab 1',
//       quantity: 5,
//       total: 30,
//       unitPrice: '$12.75',
//       status: 'Low Stock',
//       statusColor: 'bg-orange-100 text-orange-700',
//       icon: '🧪'
//     },
//     {
//       id: 7,
//       name: 'Smart Board Interactive Display',
//       publisher: '75" 4K Touch Screen',
//       category: 'Electronics',
//       categoryColor: 'bg-indigo-100 text-indigo-700',
//       sku: 'ELC-SMB-75-4K',
//       location: 'Classrooms',
//       quantity: 15,
//       total: 15,
//       unitPrice: '$2,450.00',
//       status: 'In Stock',
//       statusColor: 'bg-green-100 text-green-700',
//       icon: '📺'
//     },
//     {
//       id: 8,
//       name: 'Art Supplies Starter Kit',
//       publisher: 'Paint, Brushes & Canvas',
//       category: 'Art Supplies',
//       categoryColor: 'bg-pink-100 text-pink-700',
//       sku: 'ART-KIT-STR-034',
//       location: 'Art Room Storage',
//       quantity: 67,
//       total: 75,
//       unitPrice: '$34.99',
//       status: 'In Stock',
//       statusColor: 'bg-green-100 text-green-700',
//       icon: '🎨'
//     }
//   ];

//   const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.checked) {
//       setSelectedItems(items.map(item => item.id));
//     } else {
//       setSelectedItems([]);
//     }
//   };

//   const toggleItem = (id: number) => {
//     setSelectedItems(prev => 
//       prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-2">
//             <h1 className="text-2xl font-bold text-gray-900">All Inventory Items</h1>
           
//           </div>
//           <p className="text-gray-600 text-sm">Manage and track all school inventory</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//               <div className="flex items-start justify-between mb-4">
//                 <div className={`${stat.bgColor} p-3 rounded-lg`}>
//                   <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
//                 </div>
//                 {stat.change && (
//                   <span className="text-sm font-medium text-green-600">{stat.change}</span>
//                 )}
//                 {stat.badge && (
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     stat.badge === 'In Stock' ? 'bg-green-100 text-green-700' :
//                     stat.badge === 'Alert' ? 'bg-orange-100 text-orange-700' :
//                     'bg-purple-100 text-purple-700'
//                   }`}>{stat.badge}</span>
//                 )}
//               </div>
//               <h3 className="text-sm text-gray-600 mb-1">{stat.label}</h3>
//               <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Search and Actions Bar */}
//         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex-1 min-w-64">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input 
//                   type="text"
//                   placeholder="Search by name, SKU, or barcode..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
//               <Filter className="w-4 h-4" />
//               <span>Filters</span>
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
//               <Download className="w-4 h-4" />
//               <span>Export</span>
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
//               <Plus className="w-4 h-4" />
//               <span>Add New Item</span>
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {tabs.map((tab) => (
//             <button
//               key={tab.name}
//               onClick={() => setActiveTab(tab.name)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 activeTab === tab.name
//                   ? 'bg-blue-100 text-blue-700'
//                   : 'bg-white text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               {tab.name} ({tab.count})
//             </button>
//           ))}
//         </div>

//         {/* Inventory Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left">
//                     <input 
//                       type="checkbox" 
//                       className="w-4 h-4 rounded border-gray-300"
//                       checked={selectedItems.length === items.length}
//                       onChange={toggleSelectAll}
//                     />
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Item Details <ChevronDown className="inline w-3 h-3 ml-1" />
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Category <ChevronDown className="inline w-3 h-3 ml-1" />
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     SKU/Barcode <ChevronDown className="inline w-3 h-3 ml-1" />
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Location <ChevronDown className="inline w-3 h-3 ml-1" />
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Quantity <ChevronDown className="inline w-3 h-3 ml-1" />
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Unit Price <ChevronDown className="inline w-3 h-3 ml-1" />
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {items.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <input 
//                         type="checkbox" 
//                         className="w-4 h-4 rounded border-gray-300"
//                         checked={selectedItems.includes(item.id)}
//                         onChange={() => toggleItem(item.id)}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
//                           {item.icon}
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">{item.name}</p>
//                           <p className="text-xs text-gray-500">{item.publisher}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${item.categoryColor}`}>
//                         {item.category}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{item.sku}</td>
//                     <td className="px-6 py-4 text-sm text-gray-900">{item.location}</td>
//                     <td className="px-6 py-4">
//                       <span className="text-sm font-medium text-gray-900">{item.quantity}</span>
//                       {item.total && <span className="text-sm text-gray-500"> /{item.total}</span>}
//                     </td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.unitPrice}</td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${item.statusColor}`}>
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button className="p-1 hover:bg-gray-100 rounded">
//                         <MoreVertical className="w-4 h-4 text-gray-400" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//             <p className="text-sm text-gray-500">
//               Showing 1-8 of 1,847 items
//             </p>
//             <div className="flex items-center gap-2">
//               <button 
//                 className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
//                 disabled={currentPage === 1}
//               >
//                 <ChevronDown className="w-4 h-4 rotate-90" />
//               </button>
              
//               <button className="w-8 h-8 bg-blue-500 text-white rounded font-medium text-sm">1</button>
//               <button className="w-8 h-8 hover:bg-gray-100 rounded font-medium text-sm">2</button>
//               <button className="w-8 h-8 hover:bg-gray-100 rounded font-medium text-sm">3</button>
//               <span className="text-gray-400">...</span>
//               <button className="w-8 h-8 hover:bg-gray-100 rounded font-medium text-sm">231</button>
              
//               <button className="p-2 hover:bg-gray-100 rounded">
//                 <ChevronDown className="w-4 h-4 -rotate-90" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InventorySystem;









import React, { useState } from 'react';
import { LayoutDashboard, FileText, Users, GraduationCap, Calendar, BarChart3, Settings, BookOpen, Search, Plus, Filter, Download, Edit, Trash2, Eye, ChevronRight, Package, TrendingUp, TrendingDown, ShoppingCart, FileCheck, DollarSign, Receipt, CreditCard, AlertTriangle, Printer, Send } from 'lucide-react';

const SchoolAdminDashboard = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [activeInventorySection, setActiveInventorySection] = useState('overview');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Products Data
  const productsData = [
    { id: 1, name: 'White Board Marker', sku: 'WBM-001', category: 'Stationery', stock: 150, minStock: 50, price: 25, supplier: 'ABC Supplies', lastRestocked: '2026-01-15' },
    { id: 2, name: 'A4 Paper Ream', sku: 'PPR-002', category: 'Paper', stock: 85, minStock: 30, price: 250, supplier: 'Paper World', lastRestocked: '2026-01-10' },
    { id: 3, name: 'Chemistry Lab Beaker 250ml', sku: 'LAB-003', category: 'Lab Equipment', stock: 45, minStock: 20, price: 120, supplier: 'Lab Supplies Co', lastRestocked: '2026-01-12' },
    { id: 4, name: 'Sports Football', sku: 'SPT-004', category: 'Sports', stock: 15, minStock: 10, price: 800, supplier: 'Sports Mart', lastRestocked: '2026-01-08' },
    { id: 5, name: 'Desktop Computer', sku: 'CMP-005', category: 'IT Equipment', stock: 8, minStock: 5, price: 45000, supplier: 'Tech Solutions', lastRestocked: '2025-12-20' },
    { id: 6, name: 'Classroom Desk', sku: 'FRN-006', category: 'Furniture', stock: 120, minStock: 20, price: 3500, supplier: 'Furniture Hub', lastRestocked: '2025-12-15' },
    { id: 7, name: 'Projector Lamp', sku: 'PRJ-007', category: 'IT Equipment', stock: 5, minStock: 8, price: 2500, supplier: 'Tech Solutions', lastRestocked: '2026-01-05' },
    { id: 8, name: 'Science Textbook Class 10', sku: 'BKS-008', category: 'Books', stock: 200, minStock: 100, price: 350, supplier: 'Book Depot', lastRestocked: '2026-01-18' },
  ];

  // Stock Movements
  const stockMovements = [
    { id: 1, product: 'White Board Marker', type: 'In', quantity: 50, date: '2026-01-15', reference: 'PO-2026-001', remarks: 'Regular stock replenishment' },
    { id: 2, product: 'A4 Paper Ream', type: 'Out', quantity: 15, date: '2026-01-20', reference: 'REQ-2026-015', remarks: 'Admin office requisition' },
    { id: 3, product: 'Chemistry Lab Beaker 250ml', type: 'In', quantity: 25, date: '2026-01-12', reference: 'PO-2026-002', remarks: 'Lab equipment purchase' },
    { id: 4, product: 'Sports Football', type: 'Out', quantity: 3, date: '2026-01-18', reference: 'REQ-2026-018', remarks: 'Sports department requisition' },
    { id: 5, product: 'Desktop Computer', type: 'In', quantity: 5, date: '2025-12-20', reference: 'PO-2025-098', remarks: 'Computer lab upgrade' },
  ];

  // Quotations
  const quotationsData = [
    { id: 'QT-2026-001', customer: 'ABC Public School', date: '2026-01-20', validTill: '2026-02-20', items: 5, total: 125000, status: 'Pending' },
    { id: 'QT-2026-002', customer: 'XYZ International School', date: '2026-01-18', validTill: '2026-02-18', items: 3, total: 85000, status: 'Approved' },
    { id: 'QT-2026-003', customer: 'Delhi Public School', date: '2026-01-15', validTill: '2026-02-15', items: 8, total: 245000, status: 'Pending' },
  ];

  // Proforma Invoices
  const proformaInvoices = [
    { id: 'PI-2026-001', customer: 'ABC Public School', date: '2026-01-22', dueDate: '2026-02-22', items: 5, total: 125000, status: 'Pending' },
    { id: 'PI-2026-002', customer: 'Modern High School', date: '2026-01-19', dueDate: '2026-02-19', items: 4, total: 95000, status: 'Converted' },
  ];

  // Sale Invoices
  const saleInvoices = [
    { id: 'INV-2026-001', customer: 'ABC Public School', date: '2026-01-23', dueDate: '2026-02-23', items: 5, total: 125000, paid: 125000, status: 'Paid' },
    { id: 'INV-2026-002', customer: 'XYZ International School', date: '2026-01-21', dueDate: '2026-02-21', items: 3, total: 85000, paid: 50000, status: 'Partial' },
    { id: 'INV-2026-003', customer: 'Delhi Public School', date: '2026-01-20', dueDate: '2026-02-20', items: 8, total: 245000, paid: 0, status: 'Unpaid' },
  ];

  // Credit Notes
  const creditNotes = [
    { id: 'CN-2026-001', customer: 'ABC Public School', invoice: 'INV-2026-001', date: '2026-01-24', amount: 5000, reason: 'Damaged goods return' },
    { id: 'CN-2026-002', customer: 'XYZ International School', invoice: 'INV-2025-098', date: '2026-01-22', amount: 12000, reason: 'Pricing error correction' },
  ];

  // Debit Notes
  const debitNotes = [
    { id: 'DN-2026-001', supplier: 'ABC Supplies', invoice: 'SUPP-2026-015', date: '2026-01-23', amount: 3000, reason: 'Short delivery' },
    { id: 'DN-2026-002', supplier: 'Paper World', invoice: 'SUPP-2026-012', date: '2026-01-21', amount: 8500, reason: 'Quality issue' },
  ];

  // Inventory Overview
  const InventoryOverview = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Inventory Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <Package className="w-8 h-8 text-blue-600 mb-3" />
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-3xl font-bold text-gray-900">628</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
          <p className="text-sm text-gray-600">Stock Value</p>
          <p className="text-3xl font-bold text-gray-900">₹12.5L</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <AlertTriangle className="w-8 h-8 text-orange-600 mb-3" />
          <p className="text-sm text-gray-600">Low Stock Items</p>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <ShoppingCart className="w-8 h-8 text-purple-600 mb-3" />
          <p className="text-sm text-gray-600">Pending Orders</p>
          <p className="text-3xl font-bold text-gray-900">8</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setActiveInventorySection('products')} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 border border-gray-200">
              <Package className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Products</span>
            </button>
            <button onClick={() => setActiveInventorySection('stock')} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 border border-gray-200">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Stock In/Out</span>
            </button>
            <button onClick={() => setActiveInventorySection('quotations')} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 border border-gray-200">
              <FileCheck className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">Quotations</span>
            </button>
            <button onClick={() => setActiveInventorySection('invoices')} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 border border-gray-200">
              <Receipt className="w-6 h-6 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">Invoices</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
          <div className="space-y-3">
            {productsData.filter(p => p.stock < p.minStock).slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500">Stock: {product.stock} (Min: {product.minStock})</p>
                </div>
                <button className="px-3 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700">
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Products Management
  const ProductsManagement = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productsData.filter(p => 
              p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              p.sku.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.supplier}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.sku}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${product.stock < product.minStock ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock}
                  </span>
                  <span className="text-xs text-gray-500"> / {product.minStock}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">₹{product.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    product.stock < product.minStock 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {product.stock < product.minStock ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Stock In/Out
  const StockInOut = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Stock In/Out</h2>
        <div className="flex gap-3">
          <button onClick={() => { setModalType('stockin'); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <TrendingUp className="w-4 h-4" />
            Stock In
          </button>
          <button onClick={() => { setModalType('stockout'); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            <TrendingDown className="w-4 h-4" />
            Stock Out
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stockMovements.map((movement) => (
              <tr key={movement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{movement.product}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit ${
                    movement.type === 'In' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {movement.type === 'In' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {movement.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{movement.quantity}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{movement.date}</td>
                <td className="px-6 py-4 text-sm text-blue-600 font-medium">{movement.reference}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{movement.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Quotations
  const QuotationsScreen = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Quotations</h2>
        <button onClick={() => { setModalType('quotation'); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Create Quotation
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quotation No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Till</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotationsData.map((quotation) => (
              <tr key={quotation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-blue-600">{quotation.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{quotation.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{quotation.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{quotation.validTill}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{quotation.items}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{quotation.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    quotation.status === 'Approved' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {quotation.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Printer className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Send className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Proforma Invoices
  const ProformaInvoicesScreen = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Proforma Invoices</h2>
        <button onClick={() => { setModalType('proforma'); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Create Proforma Invoice
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {proformaInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-blue-600">{invoice.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.dueDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.items}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{invoice.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    invoice.status === 'Converted' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Printer className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <FileCheck className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Sale Invoices
  const SaleInvoicesScreen = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sale Invoices</h2>
        <button onClick={() => { setModalType('saleinvoice'); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Create Sale Invoice
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {saleInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-blue-600">{invoice.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.dueDate}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{invoice.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-green-600">₹{invoice.paid.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-red-600">₹{(invoice.total - invoice.paid).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                    invoice.status === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Printer className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Credit Notes
  const CreditNotesScreen = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Credit Notes</h2>
        <button onClick={() => { setModalType('creditnote'); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Create Credit Note
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credit Note No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice Ref.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {creditNotes.map((note) => (
              <tr key={note.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-blue-600">{note.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{note.customer}</td>
                <td className="px-6 py-4 text-sm text-blue-600">{note.invoice}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{note.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-red-600">₹{note.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{note.reason}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Printer className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Debit Notes
  const DebitNotesScreen = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Debit Notes</h2>
        <button onClick={() => { setModalType('debitnote'); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Create Debit Note
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Debit Note No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice Ref.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {debitNotes.map((note) => (
              <tr key={note.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-blue-600">{note.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{note.supplier}</td>
                <td className="px-6 py-4 text-sm text-blue-600">{note.invoice}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{note.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-green-600">₹{note.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{note.reason}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Printer className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInventoryContent = () => {
    switch (activeInventorySection) {
      case 'overview':
        return <InventoryOverview />;
      case 'products':
        return <ProductsManagement />;
      case 'stock':
        return <StockInOut />;
      case 'quotations':
        return <QuotationsScreen />;
      case 'proforma':
        return <ProformaInvoicesScreen />;
      case 'invoices':
        return <SaleInvoicesScreen />;
      case 'creditnotes':
        return <CreditNotesScreen />;
      case 'debitnotes':
        return <DebitNotesScreen />;
      default:
        return <InventoryOverview />;
    }
  };

  const renderContent = () => {
    if (activeScreen === 'inventory') {
      return renderInventoryContent();
    }

    return (
      <div className="text-center py-12">
        {renderInventoryContent()}
      </div>
    );
  };

  const menuItems = [

    { id: 'inventory', label: 'Inventory', icon: <Package className="w-5 h-5" /> },
   
  ];

  const inventorySubMenu = [
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'Products' },
    { id: 'stock', label: 'Stock In/Out' },
    { id: 'quotations', label: 'Quotations' },
    { id: 'proforma', label: 'Proforma Invoice' },
    { id: 'invoices', label: 'Sale Invoice' },
    { id: 'creditnotes', label: 'Credit Note' },
    { id: 'debitnotes', label: 'Debit Note' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
       
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveScreen(item.id);
                  if (item.id === 'inventory') {
                    setActiveInventorySection('overview');
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeScreen === item.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
              
              {item.id === 'inventory' && activeScreen === 'inventory' && (
                <div className="ml-4 mt-1 space-y-1">
                  {inventorySubMenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => setActiveInventorySection(subItem.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                        activeInventorySection === subItem.id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;