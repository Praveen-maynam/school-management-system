import React, { useState } from 'react';
import Pagination from '../../../components/ui/Pagination';
import { Users, GraduationCap, Calendar, BarChart3, ChevronRight, Download, Filter } from 'lucide-react';

type ReportViewerProps = {
  reportId: string;
  sampleData: { [key: string]: Record<string, any>[] };
};
const ReportViewer: React.FC<ReportViewerProps> = ({ reportId, sampleData }) => {
  const data = sampleData[reportId];
  const [currentPage, setCurrentPage] = React.useState(1);
  // Custom page size for key reports, default for others
  const pageSize = reportId === 'student-performance' ? 2
    : reportId === 'grade-distribution' ? 2
    : reportId === 'subject-analysis' ? 2
    : reportId === 'daily-attendance' ? 2
    : reportId === 'monthly-trends' ? 2
    : reportId === 'student-attendance' ? 2
    : reportId === 'enrollment-stats' ? 2
    : reportId === 'class-distribution' ? 2
    : reportId === 'demographic-data' ? 2
    : reportId === 'fee-collection' ? 2
    : reportId === 'outstanding-dues' ? 2
    : reportId === 'revenue-analysis' ? 2
    : 10;
  React.useEffect(() => { setCurrentPage(1); }, [reportId]);
  if (!data) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Report data will be displayed here</p>
      </div>
    );
  }
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
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
          {paginatedData.map((row: Record<string, any>, idx: number) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const SchoolAdminDashboard = () => {
  const [activeScreen] = useState('dashboard');
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
    'grade-distribution': [
      { subject: 'Math', A: 12, B: 18, C: 5, D: 2, F: 1 },
      { subject: 'Science', A: 15, B: 14, C: 6, D: 2, F: 1 },
      { subject: 'English', A: 10, B: 20, C: 6, D: 1, F: 1 },
    ],
    'subject-analysis': [
      { subject: 'Math', avgScore: 85.2, highest: 98, lowest: 65 },
      { subject: 'Science', avgScore: 82.7, highest: 95, lowest: 70 },
      { subject: 'English', avgScore: 88.1, highest: 97, lowest: 75 },
    ],
    'daily-attendance': [
      { class: '9-A', total: 35, present: 33, absent: 2, percentage: 94.3 },
      { class: '9-B', total: 38, present: 36, absent: 2, percentage: 94.7 },
      { class: '10-A', total: 40, present: 38, absent: 2, percentage: 95.0 },
      { class: '10-B', total: 37, present: 35, absent: 2, percentage: 94.6 },
    ],
    'monthly-trends': [
      { month: 'Jan', present: 95.2, absent: 4.8 },
      { month: 'Feb', present: 93.7, absent: 6.3 },
      { month: 'Mar', present: 96.1, absent: 3.9 },
    ],
    'student-attendance': [
      { student: 'Aarav Sharma', daysPresent: 180, daysAbsent: 5, percentage: 97.3 },
      { student: 'Priya Patel', daysPresent: 178, daysAbsent: 7, percentage: 96.2 },
      { student: 'Rahul Kumar', daysPresent: 175, daysAbsent: 10, percentage: 94.6 },
    ],
    'enrollment-stats': [
      { year: 2024, enrolled: 320, graduated: 60, dropped: 5 },
      { year: 2025, enrolled: 340, graduated: 65, dropped: 3 },
          { year: 2025, enrolled: 340, graduated: 65, dropped: 3 },
    ],
    'class-distribution': [
      { class: '9-A', students: 35 },
      { class: '9-B', students: 38 },
      { class: '10-A', students: 40 },
      { class: '10-B', students: 37 },
    ],
    'demographic-data': [
      { gender: 'Male', count: 210 },
      { gender: 'Female', count: 240 },
      { gender: 'Other', count: 10 },
    ],
    'fee-collection': [
      { class: '9-A', total: 35, paid: 30, pending: 5, collected: 450000, outstanding: 75000 },
      { class: '9-B', total: 38, paid: 34, pending: 4, collected: 510000, outstanding: 60000 },
      { class: '10-A', total: 40, paid: 38, pending: 2, collected: 570000, outstanding: 30000 },
      { class: '10-B', total: 37, paid: 33, pending: 4, collected: 495000, outstanding: 60000 },
    ],
    'outstanding-dues': [
      { student: 'Aarav Sharma', class: '10-A', due: 5000 },
      { student: 'Priya Patel', class: '10-A', due: 0 },
      { student: 'Rahul Kumar', class: '10-B', due: 3000 },
      { student: 'Sneha Reddy', class: '10-B', due: 0 },
    ],
    'revenue-analysis': [
      { month: 'Jan', revenue: 150000 },
      { month: 'Feb', revenue: 170000 },
      { month: 'Mar', revenue: 160000 },
    ],
  };



  // Print and Download handlers for selected report
  const handlePrint = () => {
    if (!selectedReport) return;
    const data = sampleData[selectedReport.id];
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print Report</title></head><body>');
      printWindow.document.write(`<h2>${selectedReport.name}</h2>`);
      printWindow.document.write(`<p>${selectedReport.description}</p>`);
      if (data && data.length > 0) {
        printWindow.document.write('<table border="1" cellpadding="8" style="border-collapse:collapse;">');
        printWindow.document.write('<tr>' + Object.keys(data[0]).map(k => `<th>${k}</th>`).join('') + '</tr>');
        data.forEach(row => {
          printWindow.document.write('<tr>' + Object.values(row).map(v => `<td>${v}</td>`).join('') + '</tr>');
        });
        printWindow.document.write('</table>');
      }
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };
  const handleDownload = () => {
    if (!selectedReport) return;
    const data = sampleData[selectedReport.id];
    let csv = '';
    if (data && data.length > 0) {
      csv += Object.keys(data[0]).join(',') + '\n';
      data.forEach(row => {
        csv += Object.values(row).join(',') + '\n';
      });
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedReport.name.replace(/\s+/g, '_')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm" onClick={handlePrint}>
                      Print
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2" onClick={handleDownload}>
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <ReportViewer reportId={selectedReport.id} sampleData={sampleData} />
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
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm" onClick={handlePrint}>
                      Print
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2" onClick={handleDownload}>
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <ReportViewer reportId={selectedReport.id} sampleData={sampleData} />
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
  );
};

export default SchoolAdminDashboard;