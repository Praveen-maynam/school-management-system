import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BulkUploadTeachersScreen: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);

  const handleDownloadTemplate = () => {
    alert('Download Excel template (dummy)');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Dummy preview data
      setPreview([
        { employeeId: 'EMP-004', name: 'David Lee', department: 'Math', phone: '9001122334', status: 'Active' },
        { employeeId: 'EMP-005', name: 'Eva Green', department: 'Science', phone: '9002233445', status: 'Inactive' },
      ]);
    }
  };

  const handleUpload = () => {
    setSuccess(true);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Bulk Upload Teachers</h2>
      <div className="mb-4 flex gap-2">
        <button className="btn-secondary" onClick={handleDownloadTemplate}>Download Excel Template</button>
        <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>Upload File</button>
        <input type="file" accept=".xlsx,.csv" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      </div>
      {fileName && <div className="mb-2 text-sm text-gray-600">Selected file: {fileName}</div>}
      {preview.length > 0 && (
        <div className="mb-4">
          <div className="font-medium mb-2">Preview Data</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 text-left">Employee ID</th>
                  <th className="px-2 py-1 text-left">Name</th>
                  <th className="px-2 py-1 text-left">Department</th>
                  <th className="px-2 py-1 text-left">Phone</th>
                  <th className="px-2 py-1 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="px-2 py-1">{row.employeeId}</td>
                    <td className="px-2 py-1">{row.name}</td>
                    <td className="px-2 py-1">{row.department}</td>
                    <td className="px-2 py-1">{row.phone}</td>
                    <td className="px-2 py-1">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-primary mt-3" onClick={handleUpload}>Upload (Dummy)</button>
        </div>
      )}
      {success && <div className="text-green-600 font-semibold mb-2">Upload successful! (dummy)</div>}
      <button className="btn-secondary mt-4" onClick={() => navigate('/admin/teachers')}>Back to List</button>
    </div>
  );
};

export default BulkUploadTeachersScreen;
