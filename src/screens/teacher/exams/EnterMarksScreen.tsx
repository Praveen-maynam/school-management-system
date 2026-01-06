import React, { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';

function EnterMarksScreen() {
  const [selectedExam, setSelectedExam] = useState('Term 1');
  const [selectedSubject, setSelectedSubject] = useState('Maths');
  const [marks, setMarks] = useState('75');
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);

  const exams = ['Term 1', 'Term 2', 'Term 3', 'Final Exam', 'Mid-term'];
  const subjects = ['Maths', 'English', 'Science', 'History', 'Geography', 'Physics', 'Chemistry'];

  const handleSave = () => {
    alert(`Saved:\nExam: ${selectedExam}\nSubject: ${selectedSubject}\nMarks: ${marks}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center gap-3">
          <button className="hover:bg-blue-700 rounded-full p-1 transition">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Post Marks Or Results</h1>
        </div>

        {/* Form Content */}
        <div className="max-w-3xl mx-auto p-8 space-y-6">
          {/* Select Exam Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Exam / Test
            </label>
            <div className="relative">
              <button
                onClick={() => setIsExamOpen(!isExamOpen)}
                className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <span className="text-gray-900">{selectedExam}</span>
                <ChevronDown className={`text-gray-500 transition-transform ${isExamOpen ? 'rotate-180' : ''}`} size={20} />
              </button>
              
              {isExamOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {exams.map((exam) => (
                    <button
                      key={exam}
                      onClick={() => {
                        setSelectedExam(exam);
                        setIsExamOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition ${
                        selectedExam === exam ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-900'
                      }`}
                    >
                      {exam}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Select Subject Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Subject
            </label>
            <div className="relative">
              <button
                onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <span className="text-gray-900">{selectedSubject}</span>
                <ChevronDown className={`text-gray-500 transition-transform ${isSubjectOpen ? 'rotate-180' : ''}`} size={20} />
              </button>
              
              {isSubjectOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setIsSubjectOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition ${
                        selectedSubject === subject ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-900'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Enter Marks Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Enter Marks
            </label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="Enter marks"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition shadow-md hover:shadow-lg"
          >
            Save & publish
          </button>
        </div>
      </div>
    </div>
  );
};
export default EnterMarksScreen;