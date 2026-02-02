import React, { useState } from 'react';

interface BookFormData {
  bookName: string;
  subject: string;
  writerName: string;
  classLevel: string;
  idNo: string;
  publishingDate: string;
  uploadDate: string;
}

const AddNewBook: React.FC = () => {
  const [formData, setFormData] = useState<BookFormData>({
    bookName: '',
    subject: '',
    writerName: '',
    classLevel: '',
    idNo: '',
    publishingDate: '',
    uploadDate: ''
  });

  const classOptions = [
    'Please Select Class *',
    'Play',
    'Nursery',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (
      !formData.bookName ||
      !formData.subject ||
      !formData.writerName ||
      !formData.classLevel ||
      !formData.publishingDate ||
      !formData.uploadDate
    ) {
      alert('Please fill all required fields');
      return;
    }

    console.log('Saving book data:', formData);
    // Add your save logic here
    alert('Book saved successfully!');
  };

  const handleReset = () => {
    setFormData({
      bookName: '',
      subject: '',
      writerName: '',
      classLevel: '',
      idNo: '',
      publishingDate: '',
      uploadDate: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">Add New Book</h1>
          <button className="text-gray-500 text-2xl hover:text-gray-700 px-3 py-2">
            ⋮
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Book Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Book Name *
            </label>
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleInputChange}
              className="px-4 py-3.5 text-sm border border-gray-300 rounded bg-gray-50 
                       focus:outline-none focus:border-orange-500 focus:bg-white 
                       transition-all duration-200"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="px-4 py-3.5 text-sm border border-gray-300 rounded bg-gray-50 
                       focus:outline-none focus:border-orange-500 focus:bg-white 
                       transition-all duration-200"
            />
          </div>

          {/* Writer Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Writer Name *
            </label>
            <input
              type="text"
              name="writerName"
              value={formData.writerName}
              onChange={handleInputChange}
              className="px-4 py-3.5 text-sm border border-gray-300 rounded bg-gray-50 
                       focus:outline-none focus:border-orange-500 focus:bg-white 
                       transition-all duration-200"
            />
          </div>

          {/* Class */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Class *
            </label>
            <select
              name="classLevel"
              value={formData.classLevel}
              onChange={handleInputChange}
              className="px-4 py-3.5 text-sm border border-gray-300 rounded bg-gray-50 
                       focus:outline-none focus:border-orange-500 focus:bg-white 
                       transition-all duration-200 appearance-none cursor-pointer
                       bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27currentColor%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3e%3cpolyline%20points=%276%209%2012%2015%2018%209%27%3e%3c/polyline%3e%3c/svg%3e')]
                       bg-no-repeat bg-[right_0.75rem_center] bg-[length:20px] pr-10
                       text-gray-400"
              style={{
                color: formData.classLevel ? '#1a1a1a' : '#999'
              }}
            >
              {classOptions.map((option, index) => (
                <option
                  key={index}
                  value={index === 0 ? '' : option}
                  disabled={index === 0}
                  className={index === 0 ? 'text-gray-400' : 'text-gray-900'}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* ID No */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              ID No
            </label>
            <input
              type="text"
              name="idNo"
              value={formData.idNo}
              onChange={handleInputChange}
              className="px-4 py-3.5 text-sm border border-gray-300 rounded bg-gray-50 
                       focus:outline-none focus:border-orange-500 focus:bg-white 
                       transition-all duration-200"
            />
          </div>

          {/* Publishing Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Publishing Date *
            </label>
            <input
              type="date"
              name="publishingDate"
              value={formData.publishingDate}
              onChange={handleInputChange}
              className="px-4 py-3.5 text-sm border border-gray-300 rounded bg-gray-50 
                       focus:outline-none focus:border-orange-500 focus:bg-white 
                       transition-all duration-200"
            />
          </div>

          {/* Upload Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Uploade Date *
            </label>
            <input
              type="date"
              name="uploadDate"
              value={formData.uploadDate}
              onChange={handleInputChange}
              className="px-4 py-3.5 text-sm border border-gray-300 rounded bg-gray-50 
                       focus:outline-none focus:border-orange-500 focus:bg-white 
                       transition-all duration-200"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSave}
            className="px-12 py-4 text-base font-semibold bg-orange-500 text-white 
                     rounded hover:bg-orange-600 active:scale-95 
                     transition-all duration-200 shadow-sm"
          >
            Save
          </button>
          <button
            onClick={handleReset}
            className="px-12 py-4 text-base font-semibold bg-[#001f3f] text-white 
                     rounded hover:bg-[#002a54] active:scale-95 
                     transition-all duration-200 shadow-sm"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewBook;