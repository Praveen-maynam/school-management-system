// import React, { useState, useMemo } from 'react';

// interface FeeReport {
// 	id: number;
// 	month: string;
// 	collected: number;
// 	pending: number;
// 	downloadUrl: string;
// }

// const mockReports: FeeReport[] = [
// 	{ id: 1, month: 'January', collected: 50000, pending: 2000, downloadUrl: '#' },
// 	{ id: 2, month: 'December', collected: 48000, pending: 3500, downloadUrl: '#' },
// 	{ id: 3, month: 'November', collected: 47000, pending: 4000, downloadUrl: '#' },
// 	{ id: 4, month: 'October', collected: 46000, pending: 4200, downloadUrl: '#' },
// 	{ id: 5, month: 'September', collected: 45500, pending: 3900, downloadUrl: '#' },
// 	{ id: 6, month: 'August', collected: 47000, pending: 4100, downloadUrl: '#' },
// 	{ id: 7, month: 'July', collected: 48000, pending: 3000, downloadUrl: '#' },
// 	{ id: 8, month: 'June', collected: 49000, pending: 2500, downloadUrl: '#' },
// 	{ id: 9, month: 'May', collected: 50000, pending: 2000, downloadUrl: '#' },
// 	{ id: 10, month: 'April', collected: 51000, pending: 1800, downloadUrl: '#' },
// 	{ id: 11, month: 'March', collected: 52000, pending: 1600, downloadUrl: '#' },
// 	{ id: 12, month: 'February', collected: 53000, pending: 1400, downloadUrl: '#' },
// ];


// const months = [
// 	'January', 'February', 'March', 'April', 'May', 'June',
// 	'July', 'August', 'September', 'October', 'November', 'December'
// ];

// const FeeReportsScreen: React.FC = () => {
// 	const [reports] = useState<FeeReport[]>(mockReports);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState<string | null>(null);
// 	const [search, setSearch] = useState('');
// 	const [monthFilter, setMonthFilter] = useState('');
// 	const [page, setPage] = useState(1);
// 	const pageSize = 5;

// 	// Filtered and searched reports
// 	const filteredReports = useMemo(() => {
// 		let data = reports;
// 		if (monthFilter) {
// 			data = data.filter(r => r.month === monthFilter);
// 		}
// 		if (search) {
// 			data = data.filter(r =>
// 				r.month.toLowerCase().includes(search.toLowerCase()) ||
// 				r.collected.toString().includes(search) ||
// 				r.pending.toString().includes(search)
// 			);
// 		}
// 		return data;
// 	}, [reports, monthFilter, search]);

// 	const paginatedReports = useMemo(() => {
// 		const start = (page - 1) * pageSize;
// 		return filteredReports.slice(start, start + pageSize);
// 	}, [filteredReports, page]);

// 	const totalPages = Math.ceil(filteredReports.length / pageSize);

// 	const handleDownload = (id: number) => {
// 		setLoading(true);
// 		setTimeout(() => {
// 			setLoading(false);
// 			window.alert('Fee report downloaded!');
// 		}, 800);
// 	};

// 	return (
// 		<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
// 			<h2 className="text-2xl font-bold mb-4 text-gray-800">Fee Reports</h2>

// 			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
// 				<div className="flex gap-2">
// 					<select
// 						className="border rounded px-2 py-1"
// 						value={monthFilter}
// 						onChange={e => { setMonthFilter(e.target.value); setPage(1); }}
// 					>
// 						<option value="">All Months</option>
// 						{months.map(m => (
// 							<option key={m} value={m}>{m}</option>
// 						))}
// 					</select>
// 					<input
// 						type="text"
// 						className="border rounded px-2 py-1"
// 						placeholder="Search by month or amount..."
// 						value={search}
// 						onChange={e => { setSearch(e.target.value); setPage(1); }}
// 					/>
// 				</div>
// 				<div>
// 					<span className="text-sm text-gray-500">Total: {filteredReports.length}</span>
// 				</div>
// 			</div>

// 			{loading && <div className="mb-4 text-blue-600">Processing...</div>}
// 			{error && <div className="mb-4 text-red-600">{error}</div>}

// 			<div className="overflow-x-auto">
// 				<table className="min-w-full bg-gray-50 rounded-md overflow-hidden">
// 					<thead>
// 						<tr>
// 							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Month</th>
// 							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Collected</th>
// 							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Pending</th>
// 							<th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{paginatedReports.length === 0 ? (
// 							<tr>
// 								<td colSpan={4} className="px-4 py-2 text-center text-gray-400">No fee reports found.</td>
// 							</tr>
// 						) : (
// 							paginatedReports.map((report) => (
// 								<tr key={report.id}>
// 									<td className="px-4 py-2 text-gray-700">{report.month}</td>
// 									<td className="px-4 py-2 text-gray-700">₹{report.collected.toLocaleString()}</td>
// 									<td className="px-4 py-2 text-gray-700">₹{report.pending.toLocaleString()}</td>
// 									<td className="px-4 py-2">
// 										<button
// 											className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
// 											onClick={() => handleDownload(report.id)}
// 											disabled={loading}
// 										>
// 											Download
// 										</button>
// 									</td>
// 								</tr>
// 							))
// 						)}
// 					</tbody>
// 				</table>
// 			</div>

// 			{/* Pagination */}
// 			{totalPages > 1 && (
// 				<div className="flex justify-center items-center gap-2 mt-4">
// 					<button
// 						className="px-2 py-1 border rounded disabled:opacity-50"
// 						onClick={() => setPage(p => Math.max(1, p - 1))}
// 						disabled={page === 1}
// 					>
// 						Prev
// 					</button>
// 					<span className="text-sm">Page {page} of {totalPages}</span>
// 					<button
// 						className="px-2 py-1 border rounded disabled:opacity-50"
// 						onClick={() => setPage(p => Math.min(totalPages, p + 1))}
// 						disabled={page === totalPages}
// 					>
// 						Next
// 					</button>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default FeeReportsScreen;


import React, { useState } from 'react';
import { LayoutDashboard, FileText, Users, GraduationCap, Calendar, BarChart3, Settings, ChevronRight, Download, Filter, Search } from 'lucide-react';

const SchoolAdminDashboard = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [selectedReport, setSelectedReport] = useState<{ id: string; name: string; description: string } | null>(null);

  const reportCategories = [
    {
      id: 'academic',
      title: 'Academic Reports',
      icon: <GraduationCap className="w-5 h-5" />,
      reports: [
        { id: 'student-performance', name: 'Student Performance', description: 'Individual and class performance metrics' },
        { id: 'grade-distribution', name: 'Grade Distribution', description: 'Grade analysis across subjects' },
        { id: 'subject-analysis', name: 'Subject Analysis', description: 'Subject-wise performance trends' },
      ]
    },
    {
      id: 'attendance',
      title: 'Attendance Reports',
      icon: <Calendar className="w-5 h-5" />,
      reports: [
        { id: 'daily-attendance', name: 'Daily Attendance', description: 'Daily attendance summary' },
        { id: 'monthly-trends', name: 'Monthly Trends', description: 'Attendance patterns over time' },
        { id: 'student-attendance', name: 'Student Records', description: 'Individual attendance history' },
      ]
    },
    {
      id: 'enrollment',
      title: 'Enrollment Reports',
      icon: <Users className="w-5 h-5" />,
      reports: [
        { id: 'enrollment-stats', name: 'Enrollment Statistics', description: 'Current enrollment numbers' },
        { id: 'class-distribution', name: 'Class Distribution', description: 'Students per class/section' },
        { id: 'demographic-data', name: 'Demographic Data', description: 'Student demographics' },
      ]
    },
    {
      id: 'financial',
      title: 'Financial Reports',
      icon: <BarChart3 className="w-5 h-5" />,
      reports: [
        { id: 'fee-collection', name: 'Fee Collection', description: 'Fee payment status' },
        { id: 'outstanding-dues', name: 'Outstanding Dues', description: 'Pending payments' },
        { id: 'revenue-analysis', name: 'Revenue Analysis', description: 'Financial performance' },
      ]
    }
  ];

  const sampleData: { [key: string]: any[] } = {
    'student-performance': [
      { student: 'Aarav Sharma', class: '10-A', math: 92, science: 88, english: 85, total: 265, avg: 88.3 },
      { student: 'Priya Patel', class: '10-A', math: 95, science: 91, english: 89, total: 275, avg: 91.7 },
      { student: 'Rahul Kumar', class: '10-B', math: 78, science: 82, english: 80, total: 240, avg: 80.0 },
      { student: 'Sneha Reddy', class: '10-B', math: 88, science: 86, english: 90, total: 264, avg: 88.0 },
    ],
    'daily-attendance': [
      { class: '9-A', total: 35, present: 33, absent: 2, percentage: 94.3 },
      { class: '9-B', total: 38, present: 36, absent: 2, percentage: 94.7 },
      { class: '10-A', total: 40, present: 38, absent: 2, percentage: 95.0 },
      { class: '10-B', total: 37, present: 35, absent: 2, percentage: 94.6 },
    ],
    'fee-collection': [
      { class: '9-A', total: 35, paid: 30, pending: 5, collected: 450000, outstanding: 75000 },
      { class: '9-B', total: 38, paid: 34, pending: 4, collected: 510000, outstanding: 60000 },
      { class: '10-A', total: 40, paid: 38, pending: 2, collected: 570000, outstanding: 30000 },
      { class: '10-B', total: 37, paid: 33, pending: 4, collected: 495000, outstanding: 60000 },
    ]
  };

  const ReportViewer: React.FC<{ reportId: string }> = ({ reportId }) => {
    const data = sampleData[reportId];
    
    if (!data) {
      return (
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Report data will be displayed here</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {Object.values(row).map((value, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {typeof value === 'number' && value > 1000 ? `₹${value.toLocaleString()}` : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeScreen) {
     
       
      
      case 'reports':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {!selectedReport ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportCategories.map((category) => (
                  <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.reports.map((report) => (
                        <button
                          key={report.id}
                          onClick={() => setSelectedReport(report)}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
                        >
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{report.name}</p>
                            <p className="text-sm text-gray-500">{report.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div>
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 flex items-center gap-1"
                    >
                      ← Back to Reports
                    </button>
                    <h3 className="text-xl font-bold text-gray-900">{selectedReport.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{selectedReport.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      Print
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <ReportViewer reportId={selectedReport.id} />
                </div>
              </div>
            )}
          </div>
        )
      
      default:
        return (
          <div className="text-center py-12">
            <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {!selectedReport ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportCategories.map((category) => (
                  <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.reports.map((report) => (
                        <button
                          key={report.id}
                          onClick={() => setSelectedReport(report)}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
                        >
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{report.name}</p>
                            <p className="text-sm text-gray-500">{report.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div>
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 flex items-center gap-1"
                    >
                      ← Back to Reports
                    </button>
                    <h3 className="text-xl font-bold text-gray-900">{selectedReport.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{selectedReport.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      Print
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <ReportViewer reportId={selectedReport.id} />
                </div>
              </div>
            )}
          </div>
          </div>
        );
    }
  };



  return (
    <div className="flex h-screen bg-gray-100">


      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );;
};

export default SchoolAdminDashboard;