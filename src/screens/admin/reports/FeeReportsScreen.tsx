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