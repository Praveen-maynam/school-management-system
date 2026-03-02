

import React, { useState } from 'react';

const mockBooks = [
  { id: 1, bookId: 'BK-2023-001', title: 'Advanced Mathematics for Class 12', category: 'Mathematics', totalCopies: 25, availableCopies: 18 },
  { id: 2, bookId: 'BK-2023-045', title: 'English Literature: Complete Guide', category: 'English', totalCopies: 30, availableCopies: 0 },
  { id: 3, bookId: 'BK-2023-078', title: 'Physics Fundamentals', category: 'Physics', totalCopies: 20, availableCopies: 2 },
  { id: 4, bookId: 'BK-2023-112', title: 'Chemistry: The Central Science', category: 'Chemistry', totalCopies: 22, availableCopies: 15 },
  { id: 5, bookId: 'BK-2023-156', title: 'Indian History and Culture', category: 'History', totalCopies: 15, availableCopies: 8 },
];

const mockHistory = [
  { id: 1, bookId: 'BK-2023-001', date: '2026-01-29', action: 'Issued',   quantity: 1, performedBy: 'Librarian - Mrs. Sharma', remarks: 'Issued to Student ID: STU001' },
  { id: 2, bookId: 'BK-2023-001', date: '2026-01-28', action: 'Returned', quantity: 1, performedBy: 'Librarian - Mrs. Sharma', remarks: 'Returned by Student ID: STU002' },
  { id: 3, bookId: 'BK-2023-001', date: '2026-01-25', action: 'Added',    quantity: 5, performedBy: 'Admin - Mr. Kumar',       remarks: 'New purchase - Bill No: INV-2026-001' },
];

interface Book {
  id: number;
  bookId: string;
  title: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
}

const getStockStatus = (book: Book) => {
  if (book.availableCopies === 0) return 'Out of Stock';
  if (book.availableCopies <= 2) return 'Low Stock';
  return 'In Stock';
};

const stockBadge = {
  'In Stock':     'bg-green-100 text-green-800 border-green-200',
  'Low Stock':    'bg-orange-100 text-orange-800 border-orange-200',
  'Out of Stock': 'bg-red-100 text-red-800 border-red-200',
};

const actionBadge = {
  Issued:   'bg-red-100 text-red-800 border-red-200',
  Returned: 'bg-green-100 text-green-800 border-green-200',
  Added:    'bg-blue-100 text-blue-800 border-blue-200',
  Removed:  'bg-orange-100 text-orange-800 border-orange-200',
};

const inputCls = "w-full px-3 py-2.5 border-2 border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none";
const labelCls = "block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide";

// ── Modal Shell ─────────────────────────────────────────────────────────────
function ModalShell({ headerBg, title, subtitle, onClose, children, footer }: { headerBg: string; title: string; subtitle?: string; onClose: () => void; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50, overflowY: 'auto' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 580, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
        <div style={{ background: headerBg, color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '16px 16px 0 0', position: 'sticky', top: 0, zIndex: 10 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>{title}</p>
            {subtitle && <p style={{ fontSize: 12, opacity: 0.8, margin: '2px 0 0' }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
        {footer && <div style={{ backgroundColor: '#f8fafc', padding: '12px 18px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: 10, borderRadius: '0 0 16px 16px' }}>{footer}</div>}
      </div>
    </div>
  );
}

function CancelBtn({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick} style={{ padding: '8px 18px', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Cancel</button>;
}

// ── Add Copies Modal ─────────────────────────────────────────────────────────
function AddCopiesModal({ book, onClose, onAdd }: { book: Book | null; onClose: () => void; onAdd: (data: any) => void }) {
  const [form, setForm] = useState({ quantity: 1, source: 'New Purchase', billNo: '', remarks: '' });
  if (!book) return null;

  const handleSubmit = () => {
    if (form.quantity <= 0) { alert('Please enter a valid quantity'); return; }
    if (!form.billNo) { alert('Please enter bill/reference number'); return; }
    onAdd(form);
  };

  return (
    <ModalShell headerBg="linear-gradient(135deg,#16a34a,#15803d)" title="📦 Add Copies" onClose={onClose}
      footer={<><CancelBtn onClick={onClose} /><button onClick={handleSubmit} style={{ padding: '8px 18px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Update Stock</button></>}>

      {/* Book Info */}
      <div style={{ backgroundColor: '#f8fafc', borderRadius: 10, padding: 14 }}>
        <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Book Title</p>
        <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{book.title}</p>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>Current Total: <strong style={{ color: '#16a34a' }}>{book.totalCopies} copies</strong></p>
      </div>

      {/* Form grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        <div>
          <label className={labelCls}>Copies to Add *</label>
          <input type="number" min="1" className={inputCls} value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })} />
        </div>
        <div>
          <label className={labelCls}>Source *</label>
          <select className={inputCls} value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}>
            <option>New Purchase</option><option>Donation</option><option>Replacement</option><option>Other</option>
          </select>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label className={labelCls}>Bill / Reference No *</label>
          <input type="text" className={inputCls} placeholder="Enter bill or reference number" value={form.billNo} onChange={e => setForm({ ...form, billNo: e.target.value })} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label className={labelCls}>Remarks</label>
          <textarea className={inputCls} rows={3} placeholder="Enter any additional remarks..." value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} style={{ resize: 'vertical' }} />
        </div>
      </div>

      {/* Preview */}
      <div style={{ backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 10, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, color: '#374151' }}>New Total:</span>
        <span style={{ fontSize: 22, fontWeight: 700, color: '#16a34a' }}>{book.totalCopies + form.quantity} copies</span>
      </div>
    </ModalShell>
  );
}

// ── Remove Copies Modal ──────────────────────────────────────────────────────
function RemoveCopiesModal({ book, onClose, onRemove }: { book: Book | null; onClose: () => void; onRemove: (data: any) => void }) {
  const [form, setForm] = useState({ quantity: 1, reason: 'Lost', remarks: '' });
  if (!book) return null;
  const noStock = book.availableCopies === 0;

  const handleSubmit = () => {
    if (form.quantity <= 0) { alert('Please enter a valid quantity'); return; }
    if (form.quantity > book.availableCopies) { alert(`Cannot remove more than ${book.availableCopies} available copies`); return; }
    onRemove(form);
  };

  return (
    <ModalShell headerBg="linear-gradient(135deg,#dc2626,#b91c1c)" title="🗑️ Remove Copies" onClose={onClose}
      footer={<><CancelBtn onClick={onClose} /><button onClick={handleSubmit} disabled={noStock} style={{ padding: '8px 18px', backgroundColor: noStock ? '#d1d5db' : '#dc2626', color: noStock ? '#9ca3af' : '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: noStock ? 'not-allowed' : 'pointer' }}>Remove Stock</button></>}>

      {/* Book Info */}
      <div style={{ backgroundColor: '#f8fafc', borderRadius: 10, padding: 14 }}>
        <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Book Title</p>
        <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{book.title}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8, fontSize: 13 }}>
          <div><span style={{ color: '#64748b' }}>Total: </span><strong>{book.totalCopies}</strong></div>
          <div><span style={{ color: '#64748b' }}>Available: </span><strong style={{ color: '#16a34a' }}>{book.availableCopies}</strong></div>
        </div>
      </div>

      {noStock && (
        <div style={{ backgroundColor: '#fef2f2', border: '2px solid #fecaca', borderRadius: 10, padding: 14, display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div>
            <p style={{ fontWeight: 700, color: '#991b1b', fontSize: 13 }}>No Available Copies</p>
            <p style={{ fontSize: 12, color: '#b91c1c' }}>All copies are currently issued. Cannot remove any copies.</p>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        <div>
          <label className={labelCls}>Copies to Remove *</label>
          <input type="number" min="1" max={book.availableCopies} className={inputCls} disabled={noStock} value={form.quantity} onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })} style={noStock ? { backgroundColor: '#f1f5f9' } : {}} />
          <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Max: {book.availableCopies} available</p>
        </div>
        <div>
          <label className={labelCls}>Reason *</label>
          <select className={inputCls} disabled={noStock} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} style={noStock ? { backgroundColor: '#f1f5f9' } : {}}>
            <option>Lost</option><option>Damaged</option><option>Old Stock</option><option>Torn Pages</option><option>Other</option>
          </select>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label className={labelCls}>Remarks</label>
          <textarea className={inputCls} rows={3} disabled={noStock} placeholder="Enter reason for removal..." value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} style={{ resize: 'vertical', ...(noStock ? { backgroundColor: '#f1f5f9' } : {}) }} />
        </div>
      </div>

      {!noStock && (
        <div style={{ backgroundColor: '#fef2f2', border: '2px solid #fecaca', borderRadius: 10, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, color: '#374151' }}>New Total:</span>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#dc2626' }}>{book.totalCopies - form.quantity} copies</span>
        </div>
      )}
    </ModalShell>
  );
}

// ── Inventory History Modal ──────────────────────────────────────────────────
function InventoryHistoryModal({ book, onClose }: { book: Book | null; onClose: () => void }) {
  if (!book) return null;
  const history = mockHistory.filter(h => h.bookId === book.bookId);

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 50, overflowY: 'auto' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: 16, width: '100%', maxWidth: 700, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
        <div style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', color: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '16px 16px 0 0', position: 'sticky', top: 0, zIndex: 10 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>📜 Inventory History</p>
            <p style={{ fontSize: 12, opacity: 0.8, margin: '2px 0 0' }}>{book.title}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        <div style={{ padding: 18 }}>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <p>No history available for this book</p>
            </div>
          ) : (
            /* History table also scrolls internally */
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ minWidth: '520px', width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                    {['Date', 'Action', 'Qty', 'Performed By', 'Remarks'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, idx) => {
                    const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                    return (
                      <tr key={h.id} style={{ backgroundColor: rowBg, borderBottom: '1px solid #f1f5f9' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f3ff'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = rowBg}>
                        <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: '#475569' }}>{new Date(h.date).toLocaleDateString('en-IN')}</td>
                        <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                          <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full border ${actionBadge[h.action as keyof typeof actionBadge] || actionBadge.Added}`}>{h.action}</span>
                        </td>
                        <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', fontWeight: 700, color: h.action === 'Issued' || h.action === 'Removed' ? '#dc2626' : '#16a34a' }}>
                          {h.action === 'Issued' || h.action === 'Removed' ? '-' : '+'}{h.quantity}
                        </td>
                        <td style={{ padding: '10px 12px', color: '#475569' }}>{h.performedBy}</td>
                        <td style={{ padding: '10px 12px', color: '#64748b', maxWidth: 200 }}>
                          <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{h.remarks}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#f8fafc', padding: '12px 18px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', borderRadius: '0 0 16px 16px' }}>
          <CancelBtn onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function LibraryInventoryManagement() {
  const [books, setBooks] = useState(mockBooks);
  const [filteredBooks, setFilteredBooks] = useState(mockBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('All');

  const totalBookTitles = books.length;
  const totalCopies = books.reduce((s, b) => s + b.totalCopies, 0);
  const totalAvailable = books.reduce((s, b) => s + b.availableCopies, 0);
  const outOfStock = books.filter(b => b.availableCopies === 0).length;

  const handleSearch = () => {
    let r = books;
    if (searchTerm) r = r.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.bookId.toLowerCase().includes(searchTerm.toLowerCase()));
    if (stockFilter !== 'All') r = r.filter(b => getStockStatus(b) === stockFilter);
    setFilteredBooks(r);
  };

  const handleReset = () => { setSearchTerm(''); setStockFilter('All'); setFilteredBooks(books); };

  const handleAddCopies = (data: { quantity: number; source: string; billNo: string; remarks: string }) => {
    if (!selectedBook) return;
    const updated = books.map(b => b.id === selectedBook.id ? { ...b, totalCopies: b.totalCopies + data.quantity, availableCopies: b.availableCopies + data.quantity } : b);
    setBooks(updated); setFilteredBooks(updated);
    alert(`Successfully added ${data.quantity} copies!`);
    setShowAddModal(false); setSelectedBook(null);
  };

  const handleRemoveCopies = (data: { quantity: number; reason: string; remarks: string }) => {
    if (!selectedBook) return;
    const updated = books.map(b => b.id === selectedBook.id ? { ...b, totalCopies: b.totalCopies - data.quantity, availableCopies: b.availableCopies - data.quantity } : b);
    setBooks(updated); setFilteredBooks(updated);
    alert(`Successfully removed ${data.quantity} copies!`);
    setShowRemoveModal(false); setSelectedBook(null);
  };

  return (
    /* ROOT: full viewport, zero horizontal overflow */
    <div style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', background: 'linear-gradient(135deg,#f8fafc,#eef2ff,#f8fafc)', boxSizing: 'border-box' }}>

      {/* TOP BAR */}
      <div style={{ backgroundColor: '#fff', borderBottom: '2px solid #e0e7ff', padding: '14px 16px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              Library Inventory Management
            </h1>
            <p style={{ fontSize: 13, color: '#64748b', margin: '2px 0 0' }}>Track and manage book stock in real-time</p>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'linear-gradient(135deg,#16a34a,#15803d)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer', flexShrink: 0 }}>
            📊 Export Report
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '100%', padding: '16px', boxSizing: 'border-box' }}>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total Book Titles', value: totalBookTitles, emoji: '📚', from: '#3b82f6', to: '#2563eb' },
            { label: 'Total Copies',      value: totalCopies,      emoji: '📖', from: '#a855f7', to: '#9333ea' },
            { label: 'Available Copies',  value: totalAvailable,   emoji: '✅', from: '#22c55e', to: '#16a34a' },
            { label: 'Out of Stock',       value: outOfStock,       emoji: '⚠️', from: '#ef4444', to: '#dc2626' },
          ].map(s => (
            <div key={s.label} style={{ background: `linear-gradient(135deg,${s.from},${s.to})`, borderRadius: 14, padding: 16, color: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.14)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 11, opacity: 0.85, margin: '0 0 6px', fontWeight: 600 }}>{s.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>{s.value}</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: 10, fontSize: 22 }}>{s.emoji}</div>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTER */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e0e7ff', borderRadius: 14, padding: 16, marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 12 }}>
            <div style={{ flex: '2 1 200px' }}>
              <label className={labelCls}>🔍 Search by Title or Book ID</label>
              <input type="text" className={inputCls} placeholder="Enter book title or ID..." value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()} />
            </div>
            <div>
              <label className={labelCls}>📊 Filter by Stock Status</label>
              <select className={inputCls} value={stockFilter} onChange={e => setStockFilter(e.target.value)}>
                <option>All</option><option>In Stock</option><option>Low Stock</option><option>Out of Stock</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSearch} style={{ padding: '8px 18px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Search</button>
            <button onClick={handleReset} style={{ padding: '8px 18px', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Reset</button>
          </div>
        </div>

        {/* TABLE CARD */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e0e7ff', borderRadius: 14, overflow: 'hidden' }}>
          {/* Only this div scrolls horizontally */}
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ minWidth: '760px', width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
                  {['Book ID', 'Book Title', 'Category', 'Total', 'Available', 'Issued', 'Stock Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length === 0 ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px 16px', color: '#94a3b8' }}>No books found.</td></tr>
                ) : filteredBooks.map((book, idx) => {
                  const issued = book.totalCopies - book.availableCopies;
                  const status = getStockStatus(book);
                  const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                  return (
                    <tr key={book.id} style={{ backgroundColor: rowBg, borderBottom: '1px solid #f1f5f9' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef2ff'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = rowBg}>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap', fontWeight: 600, color: '#374151' }}>{book.bookId}</td>
                      <td style={{ padding: '10px 14px', maxWidth: 200, fontWeight: 600, color: '#1e293b' }}>
                        <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{book.title}</span>
                      </td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <span style={{ display: 'inline-flex', padding: '2px 10px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{book.category}</span>
                      </td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap', fontWeight: 700, color: '#1e293b' }}>{book.totalCopies}</td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap', fontWeight: 700, color: '#16a34a' }}>{book.availableCopies}</td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap', fontWeight: 700, color: '#dc2626' }}>{issued}</td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <span className={`inline-flex px-2 py-0.5 text-xs font-bold rounded-full border-2 ${stockBadge[status]}`}>{status}</span>
                      </td>
                      <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button title="Add Copies" onClick={() => { setSelectedBook(book); setShowAddModal(true); }}
                            style={{ padding: '5px 10px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: 7, fontSize: 14, cursor: 'pointer' }}>➕</button>
                          <button title="Remove Copies" onClick={() => { setSelectedBook(book); setShowRemoveModal(true); }}
                            style={{ padding: '5px 10px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: 7, fontSize: 14, cursor: 'pointer' }}>➖</button>
                          <button title="View History" onClick={() => { setSelectedBook(book); setShowHistoryModal(true); }}
                            style={{ padding: '5px 10px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', borderRadius: 7, fontSize: 14, cursor: 'pointer' }}>📜</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div style={{ backgroundColor: '#f8fafc', padding: '10px 16px', borderTop: '2px solid #e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748b' }}>Showing <strong>1</strong>–<strong>{filteredBooks.length}</strong> of <strong>{filteredBooks.length}</strong> books</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Previous', '1', 'Next'].map(label => (
                <button key={label} disabled={label !== '1'}
                  style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: label === '1' ? 'pointer' : 'not-allowed', border: label === '1' ? 'none' : '2px solid #d1d5db', backgroundColor: label === '1' ? '#4f46e5' : '#fff', color: label === '1' ? '#fff' : '#64748b', opacity: label !== '1' ? 0.5 : 1 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {showAddModal     && <AddCopiesModal       book={selectedBook} onClose={() => { setShowAddModal(false);     setSelectedBook(null); }} onAdd={handleAddCopies} />}
      {showRemoveModal  && <RemoveCopiesModal     book={selectedBook} onClose={() => { setShowRemoveModal(false);  setSelectedBook(null); }} onRemove={handleRemoveCopies} />}
      {showHistoryModal && <InventoryHistoryModal book={selectedBook} onClose={() => { setShowHistoryModal(false); setSelectedBook(null); }} />}
    </div>
  );
}