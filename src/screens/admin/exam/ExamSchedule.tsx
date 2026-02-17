import React, { useState } from 'react';
import { CloudUpload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScheduleUploadPage = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
      
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 text-gray-700"
        >
          <span className="text-lg">&#8592;</span>
          <span>Back</span>
        </button>
        {/* Upload Schedule Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Upload Schedule</h1>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 font-medium">
              <span className="text-xl">+</span>
              <span>New Schedule</span>
            </button>
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <label htmlFor="classSelect" className="block text-sm font-medium text-gray-900 mb-2">Class</label>
              <select 
                id="classSelect"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                aria-label="Class"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="">Select Class</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
              </select>
            </div>
            <div>
              <label htmlFor="termSelect" className="block text-sm font-medium text-gray-900 mb-2">Term</label>
              <select 
                id="termSelect"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                aria-label="Term"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="">Select Term</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </select>
            </div>
            <div>
              <label htmlFor="yearSelect" className="block text-sm font-medium text-gray-900 mb-2">Academic Year</label>
              <select 
                id="yearSelect"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Academic Year"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
              </select>
            </div>
          </div>

          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <input
              id="fileInput"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleFileUpload}
              title="Upload schedule image"
              className="hidden"
            />
            
            {previewUrl ? (
              <div className="space-y-4">
                <img src={previewUrl} alt="Schedule preview" className="max-h-96 mx-auto rounded-lg" />
                <p className="text-sm text-gray-600">{uploadedFile?.name}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewUrl(null);
                    setUploadedFile(null);
                  }}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CloudUpload className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">Click to upload schedule image</p>
                <p className="text-sm text-gray-500">PNG, JPG or PDF (Max 5MB)</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleUploadPage;