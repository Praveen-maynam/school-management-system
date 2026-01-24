import React, { useState } from 'react';
import { Users, TrendingUp, Trophy, Filter } from 'lucide-react';

const ExamResultsBoard = () => {
  const [selectedClass, setSelectedClass] = useState('All Classes');

  const students = [
    {
      rank: 1,
      name: 'Priya Patel',
      avatar: '👩‍🎓',
      class: '5-A',
      math: 58,
      science: 55,
      english: 57,
      social: 53,
      hindi: 56,
      total: 279,
      percentage: 93.0,
      grade: 'A+'
    },
    {
      rank: 2,
      name: 'Rohan Gupta',
      avatar: '👨‍🔬',
      class: '5-A',
      math: 56,
      science: 53,
      english: 55,
      social: 51,
      hindi: 54,
      total: 269,
      percentage: 89.7,
      grade: 'A'
    },
    {
      rank: 3,
      name: 'Sneha Singh',
      avatar: '👩‍💼',
      class: '5-A',
      math: 51,
      science: 48,
      english: 54,
      social: 50,
      hindi: 52,
      total: 255,
      percentage: 85.0,
      grade: 'A'
    },
    {
      rank: 4,
      name: 'Rahul Sharma',
      avatar: '👨‍🎓',
      class: '5-A',
      math: 54,
      science: 47,
      english: 52,
      social: 48,
      hindi: 50,
      total: 251,
      percentage: 83.7,
      grade: 'B+'
    },
    {
      rank: 5,
      name: 'Amit Kumar',
      avatar: '👨‍💼',
      class: '5-A',
      math: 45,
      science: 42,
      english: 49,
      social: 44,
      hindi: 46,
      total: 226,
      percentage: 75.3,
      grade: 'B'
    }
  ];

  const getRankBadgeColor = (rank: number) => {
    switch(rank) {
      case 1: return 'bg-yellow-400';
      case 2: return 'bg-gray-300';
      case 3: return 'bg-orange-400';
      default: return 'bg-gray-200';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A+') return 'bg-green-100 text-green-700';
    if (grade === 'A') return 'bg-green-100 text-green-700';
    if (grade === 'B+') return 'bg-blue-100 text-blue-700';
    if (grade === 'B') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Exam Results Board</h1>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Classes</option>
                <option>Class 5-A</option>
                <option>Class 5-B</option>
                <option>Class 6-A</option>
                <option>Class 6-B</option>
              </select>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-blue-700 mb-2">Total Students</div>
                  <div className="text-4xl font-bold text-blue-900 mb-1">245</div>
                  <div className="text-sm text-blue-600">Across all classes</div>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-green-700 mb-2">Pass Rate</div>
                  <div className="text-4xl font-bold text-green-900 mb-1">87.3%</div>
                  <div className="text-sm text-green-600">+5.2% from last term</div>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-purple-700 mb-2">Average Score</div>
                  <div className="text-4xl font-bold text-purple-900 mb-1">256/300</div>
                  <div className="text-sm text-purple-600">85.3% overall</div>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-3 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-4 px-3 font-semibold text-gray-700">Student Name</th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-700">Class</th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-700">Math</th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-700">Science</th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-700">English</th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-700">Social</th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-700">Hindi</th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-700">Total</th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-700">Percentage</th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-700">Grade</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.rank} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-3">
                      <div className={`w-8 h-8 ${getRankBadgeColor(student.rank)} rounded-full flex items-center justify-center font-bold text-gray-900`}>
                        {student.rank}
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                          {student.avatar}
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center text-gray-700">{student.class}</td>
                    <td className="py-4 px-3 text-center text-gray-700">{student.math}</td>
                    <td className="py-4 px-3 text-center text-gray-700">{student.science}</td>
                    <td className="py-4 px-3 text-center text-gray-700">{student.english}</td>
                    <td className="py-4 px-3 text-center text-gray-700">{student.social}</td>
                    <td className="py-4 px-3 text-center text-gray-700">{student.hindi}</td>
                    <td className="py-4 px-3 text-center font-bold text-gray-900">{student.total}</td>
                    <td className="py-4 px-3 text-center">
                      <span className="font-semibold text-blue-600">{student.percentage.toFixed(1)}%</span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(student.grade)}`}>
                        {student.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Stats */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-sm text-blue-600 font-medium mb-1">Class Average</div>
              <div className="text-2xl font-bold text-blue-900">256</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-sm text-green-600 font-medium mb-1">Highest Score</div>
              <div className="text-2xl font-bold text-green-900">279</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-sm text-orange-600 font-medium mb-1">Lowest Score</div>
              <div className="text-2xl font-bold text-orange-900">226</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-sm text-purple-600 font-medium mb-1">Pass Percentage</div>
              <div className="text-2xl font-bold text-purple-900">100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResultsBoard;