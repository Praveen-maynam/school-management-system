import React, { useState } from 'react';
import { Calendar, Clock, Send, Plus, X } from 'lucide-react';

const ExamCreationForm = () => {
  const [formData, setFormData] = useState({
    teacherName: '',
    teacherEmail: '',
    class: '',
    section: '',
    subject: '',
    examType: '',
    term: '',
    examDate: '',
    startTime: '',
    endTime: '',
    totalMarks: '',
    duration: '',
    syllabus: '',
    instructions: '',
    chapters: ['']
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChapterChange = (index: number, value: string) => {
    const newChapters = [...formData.chapters];
    newChapters[index] = value;
    setFormData(prev => ({
      ...prev,
      chapters: newChapters
    }));
  };

  const addChapter = () => {
    setFormData(prev => ({
      ...prev,
      chapters: [...prev.chapters, '']
    }));
  };

  const removeChapter = (index: number) => {
    const newChapters = formData.chapters.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      chapters: newChapters
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Exam Request Submitted:', formData);
    // Here you would typically send this to your backend
  };

  const resetForm = () => {
    setFormData({
      teacherName: '',
      teacherEmail: '',
      class: '',
      section: '',
      subject: '',
      examType: '',
      term: '',
      examDate: '',
      startTime: '',
      endTime: '',
      totalMarks: '',
      duration: '',
      syllabus: '',
      instructions: '',
      chapters: ['']
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Exam Request Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Your exam request has been sent to the Admin and Exam Board for approval. 
            You will receive a confirmation email shortly.
          </p>
          <button
            onClick={resetForm}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Exam Schedule Request Form</h1>
            <p className="text-blue-100">Submit your exam details to notify Admin and Exam Board</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10">
            {/* Teacher Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-5 border-b pb-3">Teacher Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teacher Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="teacherEmail"
                    value={formData.teacherEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="teacher@school.com"
                  />
                </div>
              </div>
            </div>

            {/* Class & Subject Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-5 border-b pb-3">Class & Subject Details</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Class</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                    <option>Class 4</option>
                    <option>Class 5</option>
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>Class 11</option>
                    <option>Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Section</option>
                    <option>Section A</option>
                    <option>Section B</option>
                    <option>Section C</option>
                    <option>Section D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Subject</option>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Social Studies</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>Computer Science</option>
                    <option>Physical Education</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Exam Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-5 border-b pb-3">Exam Details</h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exam Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="examType"
                    value={formData.examType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Exam Type</option>
                    <option>Unit Test 1</option>
                    <option>Unit Test 2</option>
                    <option>Mid Term</option>
                    <option>Final Term</option>
                    <option>Pre-Board</option>
                    <option>Board Exam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Term <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Term</option>
                    <option>First Term</option>
                    <option>Second Term</option>
                    <option>Third Term</option>
                    <option>Annual</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Exam Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="examDate"
                    value={formData.examDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (in minutes) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 90"
                  />
                </div>
              </div>
            </div>

            {/* Timing Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-5 border-b pb-3">Timing Details</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Marks <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="totalMarks"
                    value={formData.totalMarks}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 100"
                  />
                </div>
              </div>
            </div>

            {/* Syllabus Coverage */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-5 border-b pb-3">Syllabus Coverage</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chapters/Topics Covered
                </label>
                {formData.chapters.map((chapter, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <input
                      type="text"
                      value={chapter}
                      onChange={(e) => handleChapterChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Chapter ${index + 1}`}
                    />
                    {formData.chapters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChapter(index)}
                        className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addChapter}
                  className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Chapter
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Syllabus Details
                </label>
                <textarea
                  name="syllabus"
                  value={formData.syllabus}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe the detailed syllabus for this exam..."
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-5 border-b pb-3">Special Instructions</h2>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any special instructions for students or exam board (e.g., materials allowed, seating arrangement, etc.)"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2 font-medium shadow-lg"
              >
                <Send className="w-5 h-5" />
                Submit Exam Request
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Important Notes:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Please submit this form at least 7 days before the exam date</li>
            <li>The Admin and Exam Board will review and approve your request</li>
            <li>You will receive a confirmation email once approved</li>
            <li>All fields marked with <span className="text-red-500">*</span> are mandatory</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExamCreationForm;