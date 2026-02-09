import React, { useState } from 'react';
import { Package, ShoppingCart, TrendingUp, AlertTriangle, BarChart3, Settings, Bell, Search, Menu, X, LogOut, ChevronDown, Truck, Users, FileText, DollarSign, Archive, RefreshCw, Plus, Filter, Download, Upload, Edit3, Eye, Trash2, Save, CheckCircle2, XCircle, Clock, MapPin, Warehouse, ShoppingBag, ClipboardList, Target, PieChart, Activity, Layers, Box, PackageCheck, PackageX, PackagePlus, PackageSearch, CalendarDays, TrendingDown, ArrowUpDown, Tags, Boxes, Shield } from 'lucide-react';

interface NavItem {
  id: string;
  icon: any;
  label: string;
  badge?: number | null;
  subItems?: SubItem[];
}

interface SubItem {
  id: string;
  label: string;
  icon: any;
}

interface Stat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  bgColor: string;
  iconColor: string;
}

export default function InventoryDepartmentSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<string>('overview');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['inventory']);

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const navItems: NavItem[] = [
    { id: 'overview', icon: BarChart3, label: 'Dashboard Overview', badge: null },
    {
      id: 'inventory',
      icon: Package,
      label: 'Inventory Management',
      // badge: 8,
      subItems: [
        { id: 'all-items', label: 'All Items', icon: Boxes },
        { id: 'add-item', label: 'Add New Item', icon: PackagePlus },
        { id: 'categories', label: 'Categories', icon: Layers },
        { id: 'stock-levels', label: 'Stock Levels', icon: BarChart3 }
      ]
    },
    {
      id: 'stock',
      icon: Archive,
      label: 'Stock Management',
      subItems: [
        { id: 'stock-in', label: 'Stock In', icon: PackageCheck },
        { id: 'stock-out', label: 'Stock Out', icon: PackageX },
        { id: 'stock-transfer', label: 'Stock Transfer', icon: ArrowUpDown },
        { id: 'stock-adjustment', label: 'Stock Adjustment', icon: RefreshCw }
      ]
    },
    {
      id: 'orders',
      icon: ShoppingCart,
      label: 'Orders Management',
      // badge: 5,
      subItems: [
        { id: 'purchase-orders', label: 'Purchase Orders', icon: ShoppingBag },
        { id: 'create-order', label: 'Create Order', icon: Plus },
        { id: 'order-history', label: 'Order History', icon: Clock },
        { id: 'suppliers', label: 'Suppliers', icon: Truck }
      ]
    },
    {
      id: 'warehouse',
      icon: Warehouse,
      label: 'Warehouse Management',
      subItems: [
        { id: 'warehouses', label: 'All Warehouses', icon: Warehouse },
        { id: 'locations', label: 'Storage Locations', icon: MapPin },
        { id: 'capacity', label: 'Capacity Planning', icon: Target }
      ]
    },
    {
      id: 'alerts',
      icon: AlertTriangle,
      label: 'Alerts & Notifications',
      // badge: 12,
      subItems: [
        { id: 'low-stock', label: 'Low Stock Alerts', icon: TrendingDown },
        { id: 'expiry-alerts', label: 'Expiry Alerts', icon: CalendarDays },
        { id: 'reorder-points', label: 'Reorder Points', icon: RefreshCw }
      ]
    },
    {
      id: 'reports',
      icon: FileText,
      label: 'Reports & Analytics',
      subItems: [
        { id: 'inventory-reports', label: 'Inventory Reports', icon: BarChart3 },
        { id: 'valuation-reports', label: 'Valuation Reports', icon: DollarSign },
        { id: 'movement-reports', label: 'Movement Reports', icon: Activity },
        { id: 'abc-analysis', label: 'ABC Analysis', icon: PieChart }
      ]
    },
    {
      id: 'users',
      icon: Users,
      label: 'User Management',
      subItems: [
        { id: 'all-users', label: 'All Users', icon: Users },
        { id: 'add-user', label: 'Add User', icon: Plus },
        { id: 'roles', label: 'Roles & Permissions', icon: Shield }
      ]
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      subItems: [
        { id: 'general-settings', label: 'General Settings', icon: Settings },
        { id: 'barcode-settings', label: 'Barcode Settings', icon: Tags },
        { id: 'integration', label: 'Integration', icon: RefreshCw }
      ]
    }
  ];

  const renderContent = () => {
    switch(activeMenu) {
      case 'overview': return <DashboardOverview />;
      case 'all-items': return <AllItems />;
      case 'add-item': return <AddItem />;
      case 'categories': return <Categories />;
      case 'stock-levels': return <StockLevels />;
      case 'stock-in': return <StockIn />;
      case 'stock-out': return <StockOut />;
      case 'stock-transfer': return <StockTransfer />;
      case 'stock-adjustment': return <StockAdjustment />;
      case 'purchase-orders': return <PurchaseOrders />;
      case 'create-order': return <CreateOrder />;
      case 'order-history': return <OrderHistory />;
      case 'suppliers': return <Suppliers />;
      case 'warehouses': return <Warehouses />;
      case 'locations': return <StorageLocations />;
      case 'capacity': return <CapacityPlanning />;
      case 'low-stock': return <LowStockAlerts />;
      case 'expiry-alerts': return <ExpiryAlerts />;
      case 'reorder-points': return <ReorderPoints />;
      case 'inventory-reports': return <InventoryReports />;
      case 'valuation-reports': return <ValuationReports />;
      case 'movement-reports': return <MovementReports />;
      case 'abc-analysis': return <ABCAnalysis />;
      case 'all-users': return <AllUsers />;
      case 'add-user': return <AddUser />;
      case 'roles': return <RolesPermissions />;
      case 'general-settings': return <GeneralSettings />;
      case 'barcode-settings': return <BarcodeSettings />;
      case 'integration': return <Integration />;
      default: return <DashboardOverview />;
    }
  };

 

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-slate-900 to-blue-900 text-white transition-all duration-300 ${
        isSidebarOpen ? 'w-72' : 'w-20'
      } flex flex-col`}>
        <div className="p-4 border-b border-slate-800">
          {isSidebarOpen ? (
            <div className="flex items-center justify-between mb-4">
             
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsSidebarOpen(true)} className="mx-auto p-2 hover:bg-slate-800 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

       

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveMenu(item.id);
                  if (item.subItems) toggleSubmenu(item.id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  activeMenu === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg'
                    : 'hover:bg-slate-800'
                } ${!isSidebarOpen && 'justify-center'}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>}
                    {item.subItems && <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`} />}
                  </>
                )}
              </button>

              {isSidebarOpen && item.subItems && expandedMenus.includes(item.id) && (
                <div className="mt-2 ml-4 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => setActiveMenu(subItem.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                        activeMenu === subItem.id
                          ? 'bg-slate-800 text-blue-300'
                          : 'text-blue-200 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <subItem.icon className="w-4 h-4" />
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => setIsLoggedIn(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-900/30 text-red-300 transition-all ${
              !isSidebarOpen && 'justify-center'
            }`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
     

        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// Page Components
function DashboardOverview() {
  const stats: Stat[] = [
    { title: 'Total Items', value: '15,234', change: '+234 this month', trend: 'up', icon: Package, bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    { title: 'Total Value', value: '$2.4M', change: '+12% this quarter', trend: 'up', icon: DollarSign, bgColor: 'bg-green-50', iconColor: 'text-green-600' },
    { title: 'Low Stock Items', value: '48', change: '-5 from yesterday', trend: 'down', icon: AlertTriangle, bgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
    { title: 'Pending Orders', value: '23', change: '+7 today', trend: 'up', icon: ShoppingCart, bgColor: 'bg-purple-50', iconColor: 'text-purple-600' }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-amber-600'}`}>
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Stock Movements</h2>
          <div className="space-y-4">
            {[
              { item: 'Laptop - Dell XPS 15', type: 'Stock In', quantity: '+50', time: '2 hours ago', status: 'completed' },
              { item: 'Office Chair - Ergonomic', type: 'Stock Out', quantity: '-25', time: '4 hours ago', status: 'completed' },
              { item: 'Printer - HP LaserJet', type: 'Stock Transfer', quantity: '15', time: '6 hours ago', status: 'in-progress' }
            ].map((movement, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{movement.item}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <ArrowUpDown className="w-4 h-4" />{movement.type}
                      </span>
                      <span className={movement.quantity.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {movement.quantity} units
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />{movement.time}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    movement.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {movement.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: PackagePlus, label: 'Add Item', color: 'blue' },
              { icon: ShoppingCart, label: 'Create Order', color: 'purple' },
              { icon: PackageCheck, label: 'Stock In', color: 'green' },
              { icon: PackageX, label: 'Stock Out', color: 'red' },
              { icon: ArrowUpDown, label: 'Transfer Stock', color: 'amber' },
              { icon: FileText, label: 'Generate Report', color: 'indigo' }
            ].map((action, idx) => (
              <button key={idx} className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 transition-colors`}>
                <action.icon className="w-6 h-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function AllItems() {
  const items = [
    { sku: 'LAP-001', name: 'Dell XPS 15 Laptop', category: 'Electronics', stock: 125, value: '$1,875', status: 'In Stock' },
    { sku: 'CHA-002', name: 'Ergonomic Office Chair', category: 'Furniture', stock: 45, value: '$13,500', status: 'In Stock' },
    { sku: 'PRI-003', name: 'HP LaserJet Printer', category: 'Electronics', stock: 8, value: '$2,400', status: 'Low Stock' },
    { sku: 'DSK-004', name: 'Standing Desk', category: 'Furniture', stock: 0, value: '$0', status: 'Out of Stock' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Inventory Items</h2>
        <div className="flex gap-3">
          <input type="search" placeholder="Search items..." className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />Filter
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />Add Item
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-y border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">SKU</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Item Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Stock</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Value</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="px-4 py-4 text-sm font-medium text-slate-900">{item.sku}</td>
                <td className="px-4 py-4 text-sm text-slate-700">{item.name}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{item.category}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{item.stock}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{item.value}</td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'In Stock' ? 'bg-green-100 text-green-700' : 
                    item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-blue-50 rounded text-blue-600"><Eye className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-indigo-50 rounded text-indigo-600"><Edit3 className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-red-50 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddItem() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Inventory Item</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">SKU / Item Code</label>
          <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter SKU" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Item Name</label>
          <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter item name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
          <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Office Supplies</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Unit Price</label>
          <input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Initial Stock</label>
          <input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Reorder Level</label>
          <input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows={4} placeholder="Enter item description..."></textarea>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700">
          <Save className="w-4 h-4 inline mr-2" />Add Item
        </button>
        <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50">Cancel</button>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Categories</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />Add Category
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { name: 'Electronics', items: 1245, icon: Box, color: 'blue' },
          { name: 'Furniture', items: 456, icon: Archive, color: 'green' },
          { name: 'Office Supplies', items: 2340, icon: ClipboardList, color: 'purple' },
          { name: 'IT Equipment', items: 890, icon: Package, color: 'indigo' }
        ].map((cat, idx) => (
          <div key={idx} className={`border border-slate-200 rounded-lg p-6 hover:border-${cat.color}-300 hover:shadow-md transition-all`}>
            <cat.icon className={`w-10 h-10 text-${cat.color}-600 mb-4`} />
            <h3 className="font-semibold text-slate-900 mb-1">{cat.name}</h3>
            <p className="text-sm text-slate-600">{cat.items} items</p>
            <button className="mt-4 w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-sm">View Items</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StockLevels() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Stock Levels Overview</h2>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-green-700 mb-2">8,456</div>
          <div className="text-sm text-green-600">Adequate Stock</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-amber-700 mb-2">48</div>
          <div className="text-sm text-amber-600">Low Stock</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-red-700 mb-2">12</div>
          <div className="text-sm text-red-600">Out of Stock</div>
        </div>
      </div>
      <div className="text-center py-12 text-slate-500">Stock level charts and analytics</div>
    </div>
  );
}

function StockIn() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Stock In Entry</h2>
      <div className="grid grid-cols-2 gap-6">
        <div><label className="block text-sm font-medium text-slate-700 mb-2">Select Item</label><select className="w-full px-4 py-2 border border-slate-300 rounded-lg"><option>Dell XPS 15 Laptop</option></select></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label><input type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg" /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-2">Supplier</label><select className="w-full px-4 py-2 border border-slate-300 rounded-lg"><option>Tech Suppliers Inc</option></select></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-2">Date</label><input type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg" /></div>
      </div>
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold">Process Stock In</button>
      </div>
    </div>
  );
}

function StockOut() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Stock Out Entry</h2>
      <div className="text-center py-12 text-slate-500">Stock out processing interface</div>
    </div>
  );
}

function StockTransfer() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Stock Transfer</h2>
      <div className="text-center py-12 text-slate-500">Stock transfer between warehouses</div>
    </div>
  );
}

function StockAdjustment() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Stock Adjustment</h2>
      <div className="text-center py-12 text-slate-500">Stock adjustment interface</div>
    </div>
  );
}

function PurchaseOrders() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Purchase Orders</h2>
      <div className="text-center py-12 text-slate-500">Purchase orders list</div>
    </div>
  );
}

function CreateOrder() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Create Purchase Order</h2>
      <div className="text-center py-12 text-slate-500">Order creation form</div>
    </div>
  );
}

function OrderHistory() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Order History</h2>
      <div className="text-center py-12 text-slate-500">Historical orders archive</div>
    </div>
  );
}

function Suppliers() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Suppliers Directory</h2>
      <div className="text-center py-12 text-slate-500">Supplier management</div>
    </div>
  );
}

function Warehouses() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Warehouses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Main Warehouse', 'Regional Warehouse A', 'Regional Warehouse B'].map((wh, idx) => (
          <div key={idx} className="border border-slate-200 rounded-lg p-6 hover:border-blue-300">
            <Warehouse className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">{wh}</h3>
            <p className="text-sm text-slate-600">Capacity: 5,000 items</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StorageLocations() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Storage Locations</h2>
      <div className="text-center py-12 text-slate-500">Storage location management</div>
    </div>
  );
}

function CapacityPlanning() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Capacity Planning</h2>
      <div className="text-center py-12 text-slate-500">Warehouse capacity analytics</div>
    </div>
  );
}

function LowStockAlerts() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Low Stock Alerts</h2>
      <div className="text-center py-12 text-slate-500">Low stock notifications</div>
    </div>
  );
}

function ExpiryAlerts() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Expiry Alerts</h2>
      <div className="text-center py-12 text-slate-500">Product expiry tracking</div>
    </div>
  );
}

function ReorderPoints() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Reorder Points</h2>
      <div className="text-center py-12 text-slate-500">Reorder point management</div>
    </div>
  );
}

function InventoryReports() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Inventory Reports</h2>
      <div className="text-center py-12 text-slate-500">Comprehensive inventory reports</div>
    </div>
  );
}

function ValuationReports() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Valuation Reports</h2>
      <div className="text-center py-12 text-slate-500">Inventory valuation analytics</div>
    </div>
  );
}

function MovementReports() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Movement Reports</h2>
      <div className="text-center py-12 text-slate-500">Stock movement analytics</div>
    </div>
  );
}

function ABCAnalysis() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">ABC Analysis</h2>
      <div className="text-center py-12 text-slate-500">ABC classification analytics</div>
    </div>
  );
}

function AllUsers() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">User Directory</h2>
      <div className="text-center py-12 text-slate-500">User management interface</div>
    </div>
  );
}

function AddUser() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New User</h2>
      <div className="text-center py-12 text-slate-500">User registration form</div>
    </div>
  );
}

function RolesPermissions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Roles & Permissions</h2>
      <div className="text-center py-12 text-slate-500">Role management interface</div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">General Settings</h2>
      <div className="text-center py-12 text-slate-500">System configuration</div>
    </div>
  );
}

function BarcodeSettings() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Barcode Settings</h2>
      <div className="text-center py-12 text-slate-500">Barcode configuration</div>
    </div>
  );
}

function Integration() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Integration Settings</h2>
      <div className="text-center py-12 text-slate-500">Third-party integrations</div>
    </div>
  );
}