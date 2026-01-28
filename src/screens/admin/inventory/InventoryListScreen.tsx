
import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import { LayoutDashboard, FileText, Users, GraduationCap, Calendar, BarChart3, Settings, BookOpen, Search, Plus, Filter, Download, Edit, Trash2, Eye, ChevronRight, Package, TrendingUp, TrendingDown, ShoppingCart, FileCheck, DollarSign, Receipt, CreditCard, AlertTriangle, Printer, Send } from 'lucide-react';

const SchoolAdminDashboard = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [activeInventorySection, setActiveInventorySection] = useState('overview');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Products Data (stateful)
  const [productsData, setProductsData] = useState([
    { id: 1, name: 'White Board Marker', sku: 'WBM-001', category: 'Stationery', stock: 150, minStock: 50, price: 25, supplier: 'ABC Supplies', lastRestocked: '2026-01-15' },
    { id: 2, name: 'A4 Paper Ream', sku: 'PPR-002', category: 'Paper', stock: 85, minStock: 30, price: 250, supplier: 'Paper World', lastRestocked: '2026-01-10' },
    { id: 3, name: 'Chemistry Lab Beaker 250ml', sku: 'LAB-003', category: 'Lab Equipment', stock: 45, minStock: 20, price: 120, supplier: 'Lab Supplies Co', lastRestocked: '2026-01-12' },
    { id: 4, name: 'Sports Football', sku: 'SPT-004', category: 'Sports', stock: 15, minStock: 10, price: 800, supplier: 'Sports Mart', lastRestocked: '2026-01-08' },
    { id: 5, name: 'Desktop Computer', sku: 'CMP-005', category: 'IT Equipment', stock: 8, minStock: 5, price: 45000, supplier: 'Tech Solutions', lastRestocked: '2025-12-20' },
    { id: 6, name: 'Classroom Desk', sku: 'FRN-006', category: 'Furniture', stock: 120, minStock: 20, price: 3500, supplier: 'Furniture Hub', lastRestocked: '2025-12-15' },
    { id: 7, name: 'Projector Lamp', sku: 'PRJ-007', category: 'IT Equipment', stock: 5, minStock: 8, price: 2500, supplier: 'Tech Solutions', lastRestocked: '2026-01-05' },
    { id: 8, name: 'Science Textbook Class 10', sku: 'BKS-008', category: 'Books', stock: 200, minStock: 100, price: 350, supplier: 'Book Depot', lastRestocked: '2026-01-18' },
  ]);

  // Add Product Modal State
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [addProductError, setAddProductError] = useState<string | null>(null);
  const [addProductForm, setAddProductForm] = useState({
    name: '',
    sku: '',
    category: '',
    stock: '',
    minStock: '',
    price: '',
    supplier: '',
    lastRestocked: '',
  });

  const handleAddProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddProductForm({ ...addProductForm, [e.target.name]: e.target.value });
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddProductError(null);
    // Validation
    if (!addProductForm.name || !addProductForm.sku || !addProductForm.category || !addProductForm.stock || !addProductForm.minStock || !addProductForm.price || !addProductForm.supplier || !addProductForm.lastRestocked) {
      setAddProductError('All fields are required.');
      return;
    }
    setAddProductLoading(true);
    setTimeout(() => {
      setProductsData([
        ...productsData,
        {
          id: productsData.length + 1,
          name: addProductForm.name,
          sku: addProductForm.sku,
          category: addProductForm.category,
          stock: Number(addProductForm.stock),
          minStock: Number(addProductForm.minStock),
          price: Number(addProductForm.price),
          supplier: addProductForm.supplier,
          lastRestocked: addProductForm.lastRestocked,
        },
      ]);
      setAddProductLoading(false);
      setAddProductModalOpen(false);
      setAddProductForm({ name: '', sku: '', category: '', stock: '', minStock: '', price: '', supplier: '', lastRestocked: '' });
    }, 1200);
  };

  // Stock Movements
  const stockMovements = [
    { id: 1, product: 'White Board Marker', type: 'In', quantity: 50, date: '2026-01-15', reference: 'PO-2026-001', remarks: 'Regular stock replenishment' },
    { id: 2, product: 'A4 Paper Ream', type: 'Out', quantity: 15, date: '2026-01-20', reference: 'REQ-2026-015', remarks: 'Admin office requisition' },
    { id: 3, product: 'Chemistry Lab Beaker 250ml', type: 'In', quantity: 25, date: '2026-01-12', reference: 'PO-2026-002', remarks: 'Lab equipment purchase' },
    { id: 4, product: 'Sports Football', type: 'Out', quantity: 3, date: '2026-01-18', reference: 'REQ-2026-018', remarks: 'Sports department requisition' },
    { id: 5, product: 'Desktop Computer', type: 'In', quantity: 5, date: '2025-12-20', reference: 'PO-2025-098', remarks: 'Computer lab upgrade' },
  ];

  // Quotations
  const [quotationsData, setQuotationsData] = useState([
    { id: 'QT-2026-001', customer: 'ABC Public School', date: '2026-01-20', validTill: '2026-02-20', items: 5, total: 125000, status: 'Pending' },
    { id: 'QT-2026-002', customer: 'XYZ International School', date: '2026-01-18', validTill: '2026-02-18', items: 3, total: 85000, status: 'Approved' },
    { id: 'QT-2026-003', customer: 'Delhi Public School', date: '2026-01-15', validTill: '2026-02-15', items: 8, total: 245000, status: 'Pending' },
  ]);

  // Create Quotation Modal State
  const [addQuotationModalOpen, setAddQuotationModalOpen] = useState(false);
  const [addQuotationLoading, setAddQuotationLoading] = useState(false);
  const [addQuotationError, setAddQuotationError] = useState<string | null>(null);
  const [addQuotationForm, setAddQuotationForm] = useState({
    customer: '',
    date: '',
    validTill: '',
    items: '',
    total: '',
    status: 'Pending',
  });

  const handleAddQuotationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddQuotationForm({ ...addQuotationForm, [e.target.name]: e.target.value });
  };

  const handleAddQuotationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddQuotationError(null);
    // Validation
    if (!addQuotationForm.customer || !addQuotationForm.date || !addQuotationForm.validTill || !addQuotationForm.items || !addQuotationForm.total) {
      setAddQuotationError('All fields are required.');
      return;
    }
    setAddQuotationLoading(true);
    setTimeout(() => {
      setQuotationsData([
        ...quotationsData,
        {
          id: `QT-${Date.now()}`,
          customer: addQuotationForm.customer,
          date: addQuotationForm.date,
          validTill: addQuotationForm.validTill,
          items: Number(addQuotationForm.items),
          total: Number(addQuotationForm.total),
          status: addQuotationForm.status,
        },
      ]);
      setAddQuotationLoading(false);
      setAddQuotationModalOpen(false);
      setAddQuotationForm({ customer: '', date: '', validTill: '', items: '', total: '', status: 'Pending' });
    }, 1200);
  };

  // Proforma Invoices
  // Proforma Invoices (stateful)
  const [proformaInvoicesData, setProformaInvoicesData] = useState([
    { id: 'PI-2026-001', customer: 'ABC Public School', date: '2026-01-22', dueDate: '2026-02-22', items: 5, total: 125000, status: 'Pending' },
    { id: 'PI-2026-002', customer: 'Modern High School', date: '2026-01-19', dueDate: '2026-02-19', items: 4, total: 95000, status: 'Converted' },
  ]);

  // Create Proforma Invoice Modal State
  const [addProformaModalOpen, setAddProformaModalOpen] = useState(false);
  const [addProformaLoading, setAddProformaLoading] = useState(false);
  const [addProformaError, setAddProformaError] = useState<string | null>(null);
  const [addProformaForm, setAddProformaForm] = useState({
    customer: '',
    date: '',
    dueDate: '',
    items: '',
    total: '',
    status: 'Pending',
  });

  const handleAddProformaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddProformaForm({ ...addProformaForm, [e.target.name]: e.target.value });
  };

  const handleAddProformaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddProformaError(null);
    // Validation
    if (!addProformaForm.customer || !addProformaForm.date || !addProformaForm.dueDate || !addProformaForm.items || !addProformaForm.total) {
      setAddProformaError('All fields are required.');
      return;
    }
    setAddProformaLoading(true);
    setTimeout(() => {
      setProformaInvoicesData([
        ...proformaInvoicesData,
        {
          id: `PI-${Date.now()}`,
          customer: addProformaForm.customer,
          date: addProformaForm.date,
          dueDate: addProformaForm.dueDate,
          items: Number(addProformaForm.items),
          total: Number(addProformaForm.total),
          status: addProformaForm.status,
        },
      ]);
      setAddProformaLoading(false);
      setAddProformaModalOpen(false);
      setAddProformaForm({ customer: '', date: '', dueDate: '', items: '', total: '', status: 'Pending' });
    }, 1200);
  };

  // Sale Invoices
  // Sale Invoices (stateful)
  const [saleInvoicesData, setSaleInvoicesData] = useState([
    { id: 'INV-2026-001', customer: 'ABC Public School', date: '2026-01-23', dueDate: '2026-02-23', items: 5, total: 125000, paid: 125000, status: 'Paid' },
    { id: 'INV-2026-002', customer: 'XYZ International School', date: '2026-01-21', dueDate: '2026-02-21', items: 3, total: 85000, paid: 50000, status: 'Partial' },
    { id: 'INV-2026-003', customer: 'Delhi Public School', date: '2026-01-20', dueDate: '2026-02-20', items: 8, total: 245000, paid: 0, status: 'Unpaid' },
  ]);

  // Create Sale Invoice Modal State
  const [addSaleInvoiceModalOpen, setAddSaleInvoiceModalOpen] = useState(false);
  const [addSaleInvoiceLoading, setAddSaleInvoiceLoading] = useState(false);
  const [addSaleInvoiceError, setAddSaleInvoiceError] = useState<string | null>(null);
  const [addSaleInvoiceForm, setAddSaleInvoiceForm] = useState({
    customer: '',
    date: '',
    dueDate: '',
    items: '',
    total: '',
    paid: '',
    status: 'Unpaid',
  });

  const handleAddSaleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddSaleInvoiceForm({ ...addSaleInvoiceForm, [e.target.name]: e.target.value });
  };

  const handleAddSaleInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddSaleInvoiceError(null);
    // Validation
    if (!addSaleInvoiceForm.customer || !addSaleInvoiceForm.date || !addSaleInvoiceForm.dueDate || !addSaleInvoiceForm.items || !addSaleInvoiceForm.total || addSaleInvoiceForm.paid === '') {
      setAddSaleInvoiceError('All fields are required.');
      return;
    }
    setAddSaleInvoiceLoading(true);
    setTimeout(() => {
      setSaleInvoicesData([
        ...saleInvoicesData,
        {
          id: `INV-${Date.now()}`,
          customer: addSaleInvoiceForm.customer,
          date: addSaleInvoiceForm.date,
          dueDate: addSaleInvoiceForm.dueDate,
          items: Number(addSaleInvoiceForm.items),
          total: Number(addSaleInvoiceForm.total),
          paid: Number(addSaleInvoiceForm.paid),
          status:
            Number(addSaleInvoiceForm.paid) >= Number(addSaleInvoiceForm.total)
              ? 'Paid'
              : Number(addSaleInvoiceForm.paid) > 0
              ? 'Partial'
              : 'Unpaid',
        },
      ]);
      setAddSaleInvoiceLoading(false);
      setAddSaleInvoiceModalOpen(false);
      setAddSaleInvoiceForm({ customer: '', date: '', dueDate: '', items: '', total: '', paid: '', status: 'Unpaid' });
    }, 1200);
  };

  // Credit Notes
  // Credit Notes (stateful)
  const [creditNotesData, setCreditNotesData] = useState([
    { id: 'CN-2026-001', customer: 'ABC Public School', invoice: 'INV-2026-001', date: '2026-01-24', amount: 5000, reason: 'Damaged goods return' },
    { id: 'CN-2026-002', customer: 'XYZ International School', invoice: 'INV-2025-098', date: '2026-01-22', amount: 12000, reason: 'Pricing error correction' },
  ]);

  // Create Credit Note Modal State
  const [addCreditNoteModalOpen, setAddCreditNoteModalOpen] = useState(false);
  const [addCreditNoteLoading, setAddCreditNoteLoading] = useState(false);
  const [addCreditNoteError, setAddCreditNoteError] = useState<string | null>(null);
  const [addCreditNoteForm, setAddCreditNoteForm] = useState({
    customer: '',
    invoice: '',
    date: '',
    amount: '',
    reason: '',
  });

  const handleAddCreditNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddCreditNoteForm({ ...addCreditNoteForm, [e.target.name]: e.target.value });
  };

  const handleAddCreditNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddCreditNoteError(null);
    // Validation
    if (!addCreditNoteForm.customer || !addCreditNoteForm.invoice || !addCreditNoteForm.date || !addCreditNoteForm.amount || !addCreditNoteForm.reason) {
      setAddCreditNoteError('All fields are required.');
      return;
    }
    setAddCreditNoteLoading(true);
    setTimeout(() => {
      setCreditNotesData([
        ...creditNotesData,
        {
          id: `CN-${Date.now()}`,
          customer: addCreditNoteForm.customer,
          invoice: addCreditNoteForm.invoice,
          date: addCreditNoteForm.date,
          amount: Number(addCreditNoteForm.amount),
          reason: addCreditNoteForm.reason,
        },
      ]);
      setAddCreditNoteLoading(false);
      setAddCreditNoteModalOpen(false);
      setAddCreditNoteForm({ customer: '', invoice: '', date: '', amount: '', reason: '' });
    }, 1200);
  };

  // Debit Notes
  // Debit Notes (stateful)
  const [debitNotesData, setDebitNotesData] = useState([
    { id: 'DN-2026-001', supplier: 'ABC Supplies', invoice: 'SUPP-2026-015', date: '2026-01-23', amount: 3000, reason: 'Short delivery' },
    { id: 'DN-2026-002', supplier: 'Paper World', invoice: 'SUPP-2026-012', date: '2026-01-21', amount: 8500, reason: 'Quality issue' },
  ]);

  // Create Debit Note Modal State
  const [addDebitNoteModalOpen, setAddDebitNoteModalOpen] = useState(false);
  const [addDebitNoteLoading, setAddDebitNoteLoading] = useState(false);
  const [addDebitNoteError, setAddDebitNoteError] = useState<string | null>(null);
  const [addDebitNoteForm, setAddDebitNoteForm] = useState({
    supplier: '',
    invoice: '',
    date: '',
    amount: '',
    reason: '',
  });

  const handleAddDebitNoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddDebitNoteForm({ ...addDebitNoteForm, [e.target.name]: e.target.value });
  };

  const handleAddDebitNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddDebitNoteError(null);
    // Validation
    if (!addDebitNoteForm.supplier || !addDebitNoteForm.invoice || !addDebitNoteForm.date || !addDebitNoteForm.amount || !addDebitNoteForm.reason) {
      setAddDebitNoteError('All fields are required.');
      return;
    }
    setAddDebitNoteLoading(true);
    setTimeout(() => {
      setDebitNotesData([
        ...debitNotesData,
        {
          id: `DN-${Date.now()}`,
          supplier: addDebitNoteForm.supplier,
          invoice: addDebitNoteForm.invoice,
          date: addDebitNoteForm.date,
          amount: Number(addDebitNoteForm.amount),
          reason: addDebitNoteForm.reason,
        },
      ]);
      setAddDebitNoteLoading(false);
      setAddDebitNoteModalOpen(false);
      setAddDebitNoteForm({ supplier: '', invoice: '', date: '', amount: '', reason: '' });
    }, 1200);
  };

  // Inventory Overview
  const InventoryOverview = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">Inventory Overview</h2>
      
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
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => setAddProductModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
              {/* Add Product Modal */}
              <Modal
                isOpen={addProductModalOpen}
                onClose={() => setAddProductModalOpen(false)}
                title="Add Product"
                widthClass="max-w-xl"
              >
                <form onSubmit={handleAddProductSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        value={addProductForm.name}
                        onChange={handleAddProductChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                      <input
                        type="text"
                        name="sku"
                        value={addProductForm.sku}
                        onChange={handleAddProductChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={addProductForm.category}
                        onChange={handleAddProductChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                      <input
                        type="text"
                        name="supplier"
                        value={addProductForm.supplier}
                        onChange={handleAddProductChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={addProductForm.stock}
                        onChange={handleAddProductChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock</label>
                      <input
                        type="number"
                        name="minStock"
                        value={addProductForm.minStock}
                        onChange={handleAddProductChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={addProductForm.price}
                        onChange={handleAddProductChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Restocked</label>
                      <input
                        type="date"
                        name="lastRestocked"
                        value={addProductForm.lastRestocked}
                        onChange={handleAddProductChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  {addProductError && <div className="text-red-600 text-sm">{addProductError}</div>}
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                      onClick={() => setAddProductModalOpen(false)}
                      disabled={addProductLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                      disabled={addProductLoading}
                    >
                      {addProductLoading ? 'Adding...' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </Modal>
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
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setAddQuotationModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Quotation
        </button>
            {/* Create Quotation Modal */}
            <Modal
              isOpen={addQuotationModalOpen}
              onClose={() => setAddQuotationModalOpen(false)}
              title="Create Quotation"
              widthClass="max-w-xl"
            >
              <form onSubmit={handleAddQuotationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                    <input
                      type="text"
                      name="customer"
                      value={addQuotationForm.customer}
                      onChange={handleAddQuotationChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={addQuotationForm.date}
                      onChange={handleAddQuotationChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid Till</label>
                    <input
                      type="date"
                      name="validTill"
                      value={addQuotationForm.validTill}
                      onChange={handleAddQuotationChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Items</label>
                    <input
                      type="number"
                      name="items"
                      value={addQuotationForm.items}
                      onChange={handleAddQuotationChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total (₹)</label>
                    <input
                      type="number"
                      name="total"
                      value={addQuotationForm.total}
                      onChange={handleAddQuotationChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={addQuotationForm.status}
                      onChange={handleAddQuotationChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </div>
                </div>
                {addQuotationError && <div className="text-red-600 text-sm">{addQuotationError}</div>}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={() => setAddQuotationModalOpen(false)}
                    disabled={addQuotationLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                    disabled={addQuotationLoading}
                  >
                    {addQuotationLoading ? 'Creating...' : 'Create Quotation'}
                  </button>
                </div>
              </form>
            </Modal>
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
        <button
          onClick={() => setAddProformaModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
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
            {proformaInvoicesData.map((invoice) => (
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

      {/* Modal for Create Proforma Invoice */}
      <Modal isOpen={addProformaModalOpen} onClose={() => setAddProformaModalOpen(false)} title="Create Proforma Invoice" widthClass="max-w-lg">
        <form onSubmit={handleAddProformaSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer</label>
            <input
              type="text"
              name="customer"
              value={addProformaForm.customer}
              onChange={handleAddProformaChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={addProformaForm.date}
                onChange={handleAddProformaChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={addProformaForm.dueDate}
                onChange={handleAddProformaChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Items</label>
              <input
                type="number"
                name="items"
                value={addProformaForm.items}
                onChange={handleAddProformaChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min={1}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Total (₹)</label>
              <input
                type="number"
                name="total"
                value={addProformaForm.total}
                onChange={handleAddProformaChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min={0}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={addProformaForm.status}
              onChange={handleAddProformaChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Converted">Converted</option>
            </select>
          </div>
          {addProformaError && <div className="text-red-600 text-sm">{addProformaError}</div>}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => setAddProformaModalOpen(false)}
              disabled={addProformaLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={addProformaLoading}
            >
              {addProformaLoading ? 'Saving...' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );

  // Sale Invoices
  const SaleInvoicesScreen = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sale Invoices</h2>
        <button
          onClick={() => setAddSaleInvoiceModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {saleInvoicesData.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-blue-600">{invoice.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.dueDate}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.items}</td>
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

      {/* Modal for Create Sale Invoice */}
      <Modal isOpen={addSaleInvoiceModalOpen} onClose={() => setAddSaleInvoiceModalOpen(false)} title="Create Sale Invoice" widthClass="max-w-lg">
        <form onSubmit={handleAddSaleInvoiceSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer</label>
            <input
              type="text"
              name="customer"
              value={addSaleInvoiceForm.customer}
              onChange={handleAddSaleInvoiceChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={addSaleInvoiceForm.date}
                onChange={handleAddSaleInvoiceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={addSaleInvoiceForm.dueDate}
                onChange={handleAddSaleInvoiceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Items</label>
              <input
                type="number"
                name="items"
                value={addSaleInvoiceForm.items}
                onChange={handleAddSaleInvoiceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min={1}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Total (₹)</label>
              <input
                type="number"
                name="total"
                value={addSaleInvoiceForm.total}
                onChange={handleAddSaleInvoiceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min={0}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Paid (₹)</label>
              <input
                type="number"
                name="paid"
                value={addSaleInvoiceForm.paid}
                onChange={handleAddSaleInvoiceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min={0}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={addSaleInvoiceForm.status}
                onChange={handleAddSaleInvoiceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
                disabled
              >
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>
          {addSaleInvoiceError && <div className="text-red-600 text-sm">{addSaleInvoiceError}</div>}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => setAddSaleInvoiceModalOpen(false)}
              disabled={addSaleInvoiceLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={addSaleInvoiceLoading}
            >
              {addSaleInvoiceLoading ? 'Saving...' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );

  // Credit Notes
  const CreditNotesScreen = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Credit Notes</h2>
        <button
          onClick={() => setAddCreditNoteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
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
            {creditNotesData.map((note) => (
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

      {/* Modal for Create Credit Note */}
      <Modal isOpen={addCreditNoteModalOpen} onClose={() => setAddCreditNoteModalOpen(false)} title="Create Credit Note" widthClass="max-w-lg">
        <form onSubmit={handleAddCreditNoteSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer</label>
            <input
              type="text"
              name="customer"
              value={addCreditNoteForm.customer}
              onChange={handleAddCreditNoteChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Invoice Ref.</label>
            <input
              type="text"
              name="invoice"
              value={addCreditNoteForm.invoice}
              onChange={handleAddCreditNoteChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={addCreditNoteForm.date}
                onChange={handleAddCreditNoteChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={addCreditNoteForm.amount}
                onChange={handleAddCreditNoteChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min={0}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <input
              type="text"
              name="reason"
              value={addCreditNoteForm.reason}
              onChange={handleAddCreditNoteChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          {addCreditNoteError && <div className="text-red-600 text-sm">{addCreditNoteError}</div>}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => setAddCreditNoteModalOpen(false)}
              disabled={addCreditNoteLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={addCreditNoteLoading}
            >
              {addCreditNoteLoading ? 'Saving...' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );

  // Debit Notes
  const DebitNotesScreen = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Debit Notes</h2>
        <button
          onClick={() => setAddDebitNoteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
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
            {debitNotesData.map((note) => (
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

      {/* Modal for Create Debit Note */}
      <Modal isOpen={addDebitNoteModalOpen} onClose={() => setAddDebitNoteModalOpen(false)} title="Create Debit Note" widthClass="max-w-lg">
        <form onSubmit={handleAddDebitNoteSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={addDebitNoteForm.supplier}
              onChange={handleAddDebitNoteChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Invoice Ref.</label>
            <input
              type="text"
              name="invoice"
              value={addDebitNoteForm.invoice}
              onChange={handleAddDebitNoteChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={addDebitNoteForm.date}
                onChange={handleAddDebitNoteChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={addDebitNoteForm.amount}
                onChange={handleAddDebitNoteChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min={0}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <input
              type="text"
              name="reason"
              value={addDebitNoteForm.reason}
              onChange={handleAddDebitNoteChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          {addDebitNoteError && <div className="text-red-600 text-sm">{addDebitNoteError}</div>}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={() => setAddDebitNoteModalOpen(false)}
              disabled={addDebitNoteLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={addDebitNoteLoading}
            >
              {addDebitNoteLoading ? 'Saving...' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
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
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Horizontal Top Navigation Bar */}



      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Inventory submenus always below top nav bar */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
            {inventorySubMenu.map((subItem) => (
              <button
                key={subItem.id}
                onClick={() => {
                  setActiveScreen('inventory');
                  setActiveInventorySection(subItem.id);
                }}
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                  activeScreen === 'inventory' && activeInventorySection === subItem.id
                    ? 'border-blue-600 text-blue-700 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:bg-gray-100'
                }`}
              >
                {subItem.label}
              </button>
            ))}
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;