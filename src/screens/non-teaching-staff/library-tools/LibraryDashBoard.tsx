


import React, { useState } from 'react';
import { ChevronRight, Search, Filter, Download, Plus, BookOpen } from 'lucide-react';

const books = [
  { id: 'BK001', title: 'Advanced Mathematics for Class 12', author: 'R.D. Sharma', category: 'Textbook', quantity: 50, unitCost: '$25', totalCost: '$1,250', purchaseDate: 'Jan 10, 2024', condition: 'New', status: 'Available' },
  { id: 'BK002', title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling', category: 'Fiction', quantity: 30, unitCost: '$15', totalCost: '$450', purchaseDate: 'Dec 15, 2023', condition: 'Good', status: 'Available' },
  { id: 'BK003', title: 'Physics: Principles and Practice', author: 'H.C. Verma', category: 'Textbook', quantity: 45, unitCost: '$30', totalCost: '$1,350', purchaseDate: 'Jan 05, 2024', condition: 'New', status: 'Available' },
  { id: 'BK004', title: 'The Complete Works of Shakespeare', author: 'William Shakespeare', category: 'Literature', quantity: 20, unitCost: '$35', totalCost: '$700', purchaseDate: 'Nov 20, 2023', condition: 'Good', status: 'Available' },
  { id: 'BK005', title: 'Indian History: Ancient to Modern', author: 'Bipan Chandra', category: 'History', quantity: 40, unitCost: '$22', totalCost: '$880', purchaseDate: 'Jan 12, 2024', condition: 'New', status: 'Available' },
  { id: 'BK006', title: 'Oxford English Dictionary', author: 'Oxford University Press', category: 'Reference', quantity: 15, unitCost: '$50', totalCost: '$750', purchaseDate: 'Oct 10, 2023', condition: 'Excellent', status: 'Available' },
  { id: 'BK007', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Biography', quantity: 35, unitCost: '$18', totalCost: '$630', purchaseDate: 'Dec 01, 2023', condition: 'Good', status: 'Available' },
  { id: 'BK008', title: 'Organic Chemistry', author: 'Morrison & Boyd', category: 'Textbook', quantity: 38, unitCost: '$32', totalCost: '$1,216', purchaseDate: 'Jan 08, 2024', condition: 'New', status: 'Available' },
  { id: 'BK009', title: 'The Diary of a Young Girl', author: 'Anne Frank', category: 'Biography', quantity: 25, unitCost: '$12', totalCost: '$300', purchaseDate: 'Nov 15, 2023', condition: 'Good', status: 'Available' },
  { id: 'BK010', title: 'Computer Science with Python', author: 'Sumita Arora', category: 'Textbook', quantity: 42, unitCost: '$28', totalCost: '$1,176', purchaseDate: 'Jan 15, 2024', condition: 'New', status: 'Available' },
];

const categoryColors = {
  Textbook:   'bg-blue-100 text-blue-800',
  Fiction:    'bg-purple-100 text-purple-800',
  Literature: 'bg-pink-100 text-pink-800',
  History:    'bg-orange-100 text-orange-800',
  Reference:  'bg-green-100 text-green-800',
  Biography:  'bg-yellow-100 text-yellow-800',
};

const conditionColors = {
  New:       'bg-green-100 text-green-800',
  Excellent: 'bg-blue-100 text-blue-800',
  Good:      'bg-yellow-100 text-yellow-800',
};

const getCategoryColor = (c: string): string => categoryColors[c as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800';
const getConditionColor = (c: string): string => conditionColors[c as keyof typeof conditionColors] || 'bg-gray-100 text-gray-800';

const categoryBreakdown = [
  { label: 'Textbooks',  count: 175, emoji: '📘', bg: 'bg-blue-50',   text: 'text-blue-600' },
  { label: 'Fiction',    count: 30,  emoji: '📕', bg: 'bg-purple-50', text: 'text-purple-600' },
  { label: 'Literature', count: 20,  emoji: '📗', bg: 'bg-pink-50',   text: 'text-pink-600' },
  { label: 'History',    count: 40,  emoji: '📙', bg: 'bg-orange-50', text: 'text-orange-600' },
  { label: 'Reference',  count: 15,  emoji: '📓', bg: 'bg-green-50',  text: 'text-green-600' },
  { label: 'Biography',  count: 60,  emoji: '📔', bg: 'bg-yellow-50', text: 'text-yellow-600' },
];

export default function LibraryDashBoard() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBooks = books.reduce((s, b) => s + b.quantity, 0);
  const totalInvestment = books.reduce((s, b) => s + parseFloat(b.totalCost.replace('$', '').replace(',', '')), 0);
  const totalCategories = new Set(books.map(b => b.category)).size;

  return (
    /* ROOT: full viewport, zero horizontal overflow */
    <div style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden', backgroundColor: '#f9fafb', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '100%', padding: '16px', boxSizing: 'border-box' }}>

        {/* BREADCRUMB */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4 flex-wrap">
          {['Finance', 'Non-Teaching Staff', 'Library', 'Books Inventory'].map((item, i, arr) => (
            <React.Fragment key={item}>
              <span className={i === arr.length - 1 ? 'text-gray-900 font-semibold' : ''}>{item}</span>
              {i < arr.length - 1 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-orange-100 rounded-xl flex-shrink-0">
            <BookOpen className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Library Finance — Books Inventory</h1>
            <p className="text-sm text-gray-500 mt-0.5">Track book purchases, costs, and library investments</p>
          </div>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Total Books', value: totalBooks, sub: 'Across all categories', emoji: '📚', color: '#1e293b' },
            { label: 'Total Investment', value: `$${totalInvestment.toLocaleString()}`, sub: 'Current fiscal year', emoji: '💰', color: '#ea580c' },
            { label: 'Book Categories', value: totalCategories, sub: 'Different types', emoji: '📖', color: '#2563eb' },
            { label: 'Library Staff', value: 12, sub: 'Librarians & assistants', emoji: '👥', color: '#7c3aed' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontSize: 12, color: '#64748b' }}>{s.label}</span>
                <span style={{ fontSize: 20 }}>{s.emoji}</span>
              </div>
              <p style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</p>
              <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* CATEGORY BREAKDOWN */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>Books by Category</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 10 }}>
            {categoryBreakdown.map(c => (
              <div key={c.label} className={`${c.bg} rounded-xl p-3 text-center`}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{c.emoji}</div>
                <p style={{ fontSize: 11, color: '#475569', fontWeight: 600, marginBottom: 2 }}>{c.label}</p>
                <p className={`text-xl font-bold ${c.text}`}>{c.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEARCH + TABLE CARD */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 20, overflow: 'hidden' }}>
          {/* Toolbar */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 180px', minWidth: 0 }}>
              <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search title, author, category, ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, cursor: 'pointer', backgroundColor: '#fff', color: '#374151' }}>
                <Filter style={{ width: 14, height: 14 }} /> Filter
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13, cursor: 'pointer', backgroundColor: '#fff', color: '#374151' }}>
                <Download style={{ width: 14, height: 14 }} /> Export
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', backgroundColor: '#0c2dea', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
                <Plus style={{ width: 14, height: 14 }} /> Add Book
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ width: '100%', overflowX: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  {[
                    { label: 'Book ID', width: '8%' },
                    { label: 'Title', width: '19%' },
                    { label: 'Author', width: '12%' },
                    { label: 'Category', width: '10%' },
                    { label: 'Qty', width: '5%' },
                    { label: 'Unit Cost', width: '8%' },
                    { label: 'Total Cost', width: '10%' },
                    { label: 'Purchase Date', width: '12%' },
                    { label: 'Condition', width: '8%' },
                    { label: 'Status', width: '8%' },
                  ].map(h => (
                    <th key={h.label} style={{ width: h.width, padding: '7px 8px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length === 0 ? (
                  <tr><td colSpan={10} style={{ textAlign: 'center', padding: '40px 16px', color: '#94a3b8', fontSize: 13 }}>No books found matching your search.</td></tr>
                ) : filteredBooks.map((book, idx) => {
                  const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
                  return (
                    <tr key={book.id} style={{ backgroundColor: rowBg, borderBottom: '1px solid #f1f5f9' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fff7ed'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = rowBg}>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap', fontWeight: 600, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis' }} title={book.id}>{book.id}</td>
                      <td style={{ padding: '6px 8px', overflow: 'hidden' }}>
                        <p style={{ fontWeight: 600, color: '#1e293b', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={book.title}>{book.title}</p>
                      </td>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis' }} title={book.author}>{book.author}</td>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${getCategoryColor(book.category)}`}>{book.category}</span>
                      </td>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap', fontWeight: 700, color: '#1e293b' }}>{book.quantity}</td>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap', color: '#475569' }}>{book.unitCost}</td>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap', fontWeight: 700, color: '#ea580c' }}>{book.totalCost}</td>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis' }} title={book.purchaseDate}>{book.purchaseDate}</td>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${getConditionColor(book.condition)}`}>{book.condition}</span>
                      </td>
                      <td style={{ padding: '6px 8px', whiteSpace: 'nowrap' }}>
                        <span className="inline-flex px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-green-100 text-green-800">{book.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
                  <td colSpan={4} style={{ padding: '7px 8px', fontWeight: 700, fontSize: 11, color: '#1e293b' }}>TOTAL</td>
                  <td style={{ padding: '7px 8px', fontWeight: 700, fontSize: 11, color: '#1e293b' }}>{totalBooks}</td>
                  <td style={{ padding: '7px 8px' }} />
                  <td style={{ padding: '7px 8px', fontWeight: 700, fontSize: 11, color: '#ea580c' }}>${totalInvestment.toLocaleString()}</td>
                  <td colSpan={3} style={{ padding: '7px 8px' }} />
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer */}
          <div style={{ padding: '8px 16px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Showing {filteredBooks.length} of {books.length} books</span>
          </div>
        </div>

        {/* BOTTOM INFO CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {/* Budget Allocation */}
          <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>💡 Library Budget Allocation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Textbooks (54%)', pct: 0.54 },
                { label: 'Reference Materials (15%)', pct: 0.15 },
                { label: 'Fiction & Literature (18%)', pct: 0.18 },
                { label: 'Other Categories (13%)', pct: 0.13 },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#374151' }}>
                  <span>{item.label}</span>
                  <span style={{ fontWeight: 700 }}>${(totalInvestment * item.pct).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Library Stats */}
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 12 }}>📊 Library Statistics</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Average cost per book', value: `$${(totalInvestment / totalBooks).toFixed(2)}` },
                { label: 'Most expensive book', value: '$50.00' },
                { label: 'Books purchased this month', value: '175' },
                { label: 'Library staff salaries', value: '$28,500/month' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#374151' }}>
                  <span>{item.label}</span>
                  <span style={{ fontWeight: 700 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}