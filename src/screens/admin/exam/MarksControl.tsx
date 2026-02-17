import React, { useState } from 'react';
import { Download, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarksControl = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('Class 5');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [selectedExamType, setSelectedExamType] = useState('Mid Term');
  const [selectedTerm, setSelectedTerm] = useState('First Term');

  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      avatar: '👨‍🎓',
      marks: {
        mathematics: 54,
        science: 47,
        english: 52,
        socialStudies: 48,
        hindi: 50
      }
    },
    {
      id: 2,
      name: 'Priya Patel',
      avatar: '👩‍🎓',
      marks: {
        mathematics: 58,
        science: 55,
        english: 57,
        socialStudies: 53,
        hindi: 56
      }
    },
    {
      id: 3,
      name: 'Amit Kumar',
      avatar: '👨‍💼',
      marks: {
        mathematics: 45,
        science: 42,
        english: 49,
        socialStudies: 44,
        hindi: 46
      }
    },
    {
      id: 4,
      name: 'Sneha Singh',
      avatar: '👩‍💼',
      marks: {
        mathematics: 51,
        science: 48,
        english: 54,
        socialStudies: 50,
        hindi: 52
      }
    },
    {
      id: 5,
      name: 'Rohan Gupta',
      avatar: '👨‍🔬',
      marks: {
        mathematics: 56,
        science: 53,
        english: 55,
        socialStudies: 51,
        hindi: 54
      }
    }
  ]);

  const handleMarkChange = (studentId: number, subject: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          marks: {
            ...student.marks,
            [subject]: numValue
          }
        };
      }
      return student;
    }));
  };

  const calculateTotal = (marks: any) => {
    return marks.mathematics + marks.science + marks.english + marks.socialStudies + marks.hindi;
  };

  const subjects = [
    { key: 'mathematics', label: 'Mathematics', max: 60 },
    { key: 'science', label: 'Science', max: 60 },
    { key: 'english', label: 'English', max: 60 },
    { key: 'socialStudies', label: 'Social Studies', max: 60 },
    { key: 'hindi', label: 'Hindi', max: 60 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 text-gray-700"
      >
        <span className="text-lg">&#8592;</span>
        <span>Back</span>
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Marks Control</h1>
            <div className="flex items-center space-x-3">
              <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 flex items-center space-x-2 font-medium">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 font-medium">
                <Save className="w-4 h-4" />
                <span>Save Marks</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Class</label>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option>Class 5</option>
                <option>Class 6</option>
                <option>Class 7</option>
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Section</label>
              <select 
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Exam Type</label>
              <select 
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option>Mid Term</option>
                <option>Final Term</option>
                <option>Unit Test 1</option>
                <option>Unit Test 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Term</label>
              <select 
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option>First Term</option>
                <option>Second Term</option>
                <option>Third Term</option>
              </select>
            </div>
          </div>

          {/* Marks Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Student Name</th>
                  {subjects.map(subject => (
                    <th key={subject.key} className="text-center py-4 px-4">
                      <div className="font-semibold text-gray-900">{subject.label}</div>
                      <div className="text-xs text-gray-500 font-normal mt-1">(Max: {subject.max})</div>
                    </th>
                  ))}
                  <th className="text-center py-4 px-4">
                    <div className="font-semibold text-gray-900">Total</div>
                    <div className="text-xs text-gray-500 font-normal mt-1">(300)</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                          {student.avatar}
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    {subjects.map(subject => (
                      <td key={subject.key} className="py-4 px-4 text-center">
                        <input
                          type="number"
                          min="0"
                          max={subject.max}
                          value={student.marks[subject.key as keyof typeof student.marks]}
                          onChange={(e) => handleMarkChange(student.id, subject.key, e.target.value)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </td>
                    ))}
                    <td className="py-4 px-4 text-center">
                      <span className="font-bold text-gray-900 text-lg">
                        {calculateTotal(student.marks)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium">Total Students</div>
              <div className="text-2xl font-bold text-blue-900 mt-1">{students.length}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-600 font-medium">Average Score</div>
              <div className="text-2xl font-bold text-green-900 mt-1">
                {Math.round(students.reduce((sum, s) => sum + calculateTotal(s.marks), 0) / students.length)}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 font-medium">Highest Score</div>
              <div className="text-2xl font-bold text-purple-900 mt-1">
                {Math.max(...students.map(s => calculateTotal(s.marks)))}
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-sm text-orange-600 font-medium">Lowest Score</div>
              <div className="text-2xl font-bold text-orange-900 mt-1">
                {Math.min(...students.map(s => calculateTotal(s.marks)))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarksControl;