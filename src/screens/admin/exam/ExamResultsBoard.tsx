import React, { useState, useMemo } from 'react';
import { Users, TrendingUp, Trophy, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ==================== TYPES ====================
interface StudentMarks {
  id: string;
  name: string;
  avatar: string;
  class: string;
  math: number;
  science: number;
  english: number;
  social: number;
  hindi: number;
}

interface StudentResult extends StudentMarks {
  total: number;
  percentage: number;
  grade: string;
  rank: number;
}

// ==================== CONSTANTS ====================
const TOTAL_MARKS = 300; // 5 subjects × 100 max marks
const PASS_PERCENTAGE = 40;

// ==================== GRADE CALCULATION ====================
const calculateGrade = (percentage: number): string => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  return 'F';
};

const ExamResultsBoard = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [subjectFilters, setSubjectFilters] = useState<{
    math: number | null;
    science: number | null;
    english: number | null;
    social: number | null;
    hindi: number | null;
  }>({
    math: null,
    science: null,
    english: null,
    social: null,
    hindi: null,
  });

  // Extended student data with more classes
  const initialStudents: StudentMarks[] = [
    {
      id: '1',
      name: 'Priya Patel',
      avatar: '👩‍🎓',
      class: '5-A',
      math: 100,
      science: 95,
      english: 100,
      social: 88,
      hindi: 92,
    },
    {
      id: '2',
      name: 'Rohan Gupta',
      avatar: '👨‍🔬',
      class: '5-A',
      math: 100,
      science: 87,
      english: 92,
      social: 85,
      hindi: 90,
    },
    {
      id: '3',
      name: 'Sneha Singh',
      avatar: '👩‍💼',
      class: '6-B',
      math: 95,
      science: 100,
      english: 100,
      social: 90,
      hindi: 88,
    },
    {
      id: '4',
      name: 'Rahul Sharma',
      avatar: '👨‍🎓',
      class: '7-A',
      math: 88,
      science: 92,
      english: 100,
      social: 96,
      hindi: 85,
    },
    {
      id: '5',
      name: 'Amit Kumar',
      avatar: '👨‍💼',
      class: '8-B',
      math: 92,
      science: 100,
      english: 94,
      social: 100,
      hindi: 91,
    },
    {
      id: '6',
      name: 'Zara Khan',
      avatar: '👩‍💼',
      class: '9-A',
      math: 100,
      science: 100,
      english: 98,
      social: 100,
      hindi: 100,
    },
    {
      id: '7',
      name: 'Arjun Singh',
      avatar: '👨‍🎓',
      class: '10-B',
      math: 96,
      science: 94,
      english: 100,
      social: 92,
      hindi: 93,
    },
    {
      id: '8',
      name: 'Mira Desai',
      avatar: '👩‍🎓',
      class: '11-A',
      math: 100,
      science: 96,
      english: 94,
      social: 100,
      hindi: 97,
    },
    {
      id: '9',
      name: 'Karan Patel',
      avatar: '👨‍💼',
      class: '12-B',
      math: 98,
      science: 100,
      english: 100,
      social: 98,
      hindi: 99,
    },
    {
      id: '10',
      name: 'Ananya Joshi',
      avatar: '👩‍💼',
      class: 'LKG-A',
      math: 100,
      science: 88,
      english: 92,
      social: 85,
      hindi: 100,
    }
  ];

  // State management
  const [students, setStudents] = useState<StudentMarks[]>(initialStudents);

  // ==================== MARK UPDATE HANDLER ====================
  /**
   * Handles mark input change for a specific subject
   * @param studentId - Student unique identifier
   * @param subject - Subject name (math, science, english, social, hindi)
   * @param value - New mark value
   */
  const handleMarkChange = (
    studentId: string,
    subject: 'math' | 'science' | 'english' | 'social' | 'hindi',
    value: string
  ) => {
    const numValue = value === '' ? 0 : Math.min(Math.max(Number(value), 0), 100);

    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, [subject]: numValue }
          : student
      )
    );
  };

  // ==================== COMPUTED RESULTS ====================
  /**
   * Compute results with total, percentage, grade, and rank
   * Automatically sorts by total marks (descending) and assigns ranks
   * Filters results based on subject mark filters
   */
  const resultsList = useMemo<StudentResult[]>(() => {
    // Calculate total and percentage for each student
    const withCalculations = students.map((student) => {
      const total = student.math + student.science + student.english + student.social + student.hindi;
      const percentage = (total / TOTAL_MARKS) * 100;
      const grade = calculateGrade(percentage);

      return {
        ...student,
        total,
        percentage,
        grade,
        rank: 1, // Temporary, will be assigned after sorting
      };
    });

    // Separate students into matched and unmatched based on filters
    const hasActiveFilters = Object.values(subjectFilters).some(val => val !== null);
    
    let matchedStudents: StudentResult[] = [];
    let unmatchedStudents: StudentResult[] = [];

    if (hasActiveFilters) {
      withCalculations.forEach(student => {
        const matchesAllFilters = 
          (subjectFilters.math === null || student.math === subjectFilters.math) &&
          (subjectFilters.science === null || student.science === subjectFilters.science) &&
          (subjectFilters.english === null || student.english === subjectFilters.english) &&
          (subjectFilters.social === null || student.social === subjectFilters.social) &&
          (subjectFilters.hindi === null || student.hindi === subjectFilters.hindi);
        
        if (matchesAllFilters) {
          matchedStudents.push(student);
        } else {
          unmatchedStudents.push(student);
        }
      });

      // Sort matched students by total marks
      matchedStudents = matchedStudents.sort((a, b) => b.total - a.total);
      // Sort unmatched students by total marks
      unmatchedStudents = unmatchedStudents.sort((a, b) => b.total - a.total);

      // Combine matched first, then unmatched
      const sorted = [...matchedStudents, ...unmatchedStudents];

      // Assign ranks
      return sorted.map((student, index) => ({
        ...student,
        rank: index + 1,
      }));
    } else {
      // If no filters, sort all by total marks
      const sorted = withCalculations.sort((a, b) => b.total - a.total);
      return sorted.map((student, index) => ({
        ...student,
        rank: index + 1,
      }));
    }
  }, [students, subjectFilters]);

  // ==================== STATISTICS CALCULATION ====================
  const stats = useMemo(
    () => ({
      totalStudents: resultsList.length,
      passRate: (
        (resultsList.filter((s) => s.percentage >= PASS_PERCENTAGE).length /
          resultsList.length) *
        100
      ).toFixed(1),
      averageScore: (
        resultsList.reduce((sum, s) => sum + s.total, 0) / resultsList.length
      ).toFixed(1),
      highestScore: Math.max(...resultsList.map((s) => s.total)),
      lowestScore: Math.min(...resultsList.map((s) => s.total)),
      classAverage: (
        resultsList.reduce((sum, s) => sum + s.total, 0) / resultsList.length
      ).toFixed(0),
    }),
    [resultsList]
  );

  // ==================== UTILITY FUNCTIONS ====================
  const getRankBadgeColor = (rank: number): string => {
    switch (rank) {
      case 1:
        return 'bg-yellow-400 text-gray-900';
      case 2:
        return 'bg-gray-300 text-gray-900';
      case 3:
        return 'bg-orange-400 text-white';
      default:
        return 'bg-gray-200 text-gray-900';
    }
  };

  const getGradeColor = (grade: string): string => {
    if (grade === 'A+' || grade === 'A') return 'bg-green-100 text-green-700';
    if (grade === 'B+' || grade === 'B') return 'bg-blue-100 text-blue-700';
    if (grade === 'C') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  // ==================== RENDER MARK INPUT ====================
  /**
   * Renders editable input box for subject marks
   * Limits input to 0-100 range
   */
  const renderMarkInput = (
    studentId: string,
    subject: 'math' | 'science' | 'english' | 'social' | 'hindi',
    value: number
  ) => (
    <input
      type="number"
      min="0"
      max="100"
      value={value}
      onChange={(e) => handleMarkChange(studentId, subject, e.target.value)}
      title={`Enter ${subject} marks (0-100)`}
      placeholder="0-100"
      className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    />
  );

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
            <h1 className="text-3xl font-bold text-gray-900">Exam Results Board</h1>
            <div className="flex items-center space-x-3">
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                title="Filter results by class"
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

          {/* Main Content with Left Sidebar */}
          <div className="flex gap-8">
            {/* Left Sidebar - Subject Filters */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-blue-600" />
                  Filter by Subject
                </h3>

                <div className="space-y-5">
                  {/* Math Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Math Marks
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subjectFilters.math ?? ''}
                        onChange={(e) =>
                          setSubjectFilters(prev => ({
                            ...prev,
                            math: e.target.value === '' ? null : Number(e.target.value)
                          }))
                        }
                        placeholder="Enter mark"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                      {subjectFilters.math !== null && (
                        <button
                          onClick={() => setSubjectFilters(prev => ({ ...prev, math: null }))}
                          className="text-red-500 hover:text-red-700 font-bold"
                          title="Clear filter"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Science Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Science Marks
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subjectFilters.science ?? ''}
                        onChange={(e) =>
                          setSubjectFilters(prev => ({
                            ...prev,
                            science: e.target.value === '' ? null : Number(e.target.value)
                          }))
                        }
                        placeholder="Enter mark"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                      {subjectFilters.science !== null && (
                        <button
                          onClick={() => setSubjectFilters(prev => ({ ...prev, science: null }))}
                          className="text-red-500 hover:text-red-700 font-bold"
                          title="Clear filter"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* English Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      English Marks
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subjectFilters.english ?? ''}
                        onChange={(e) =>
                          setSubjectFilters(prev => ({
                            ...prev,
                            english: e.target.value === '' ? null : Number(e.target.value)
                          }))
                        }
                        placeholder="Enter mark"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                      {subjectFilters.english !== null && (
                        <button
                          onClick={() => setSubjectFilters(prev => ({ ...prev, english: null }))}
                          className="text-red-500 hover:text-red-700 font-bold"
                          title="Clear filter"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Social Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Social Marks
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subjectFilters.social ?? ''}
                        onChange={(e) =>
                          setSubjectFilters(prev => ({
                            ...prev,
                            social: e.target.value === '' ? null : Number(e.target.value)
                          }))
                        }
                        placeholder="Enter mark"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                      {subjectFilters.social !== null && (
                        <button
                          onClick={() => setSubjectFilters(prev => ({ ...prev, social: null }))}
                          className="text-red-500 hover:text-red-700 font-bold"
                          title="Clear filter"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hindi Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hindi Marks
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subjectFilters.hindi ?? ''}
                        onChange={(e) =>
                          setSubjectFilters(prev => ({
                            ...prev,
                            hindi: e.target.value === '' ? null : Number(e.target.value)
                          }))
                        }
                        placeholder="Enter mark"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                      {subjectFilters.hindi !== null && (
                        <button
                          onClick={() => setSubjectFilters(prev => ({ ...prev, hindi: null }))}
                          className="text-red-500 hover:text-red-700 font-bold"
                          title="Clear filter"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Clear All Filters Button */}
                  {Object.values(subjectFilters).some(val => val !== null) && (
                    <button
                      onClick={() =>
                        setSubjectFilters({
                          math: null,
                          science: null,
                          english: null,
                          social: null,
                          hindi: null,
                        })
                      }
                      className="w-full mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Content - Stats and Table */}
            <div className="flex-1">
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-6 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-blue-700 mb-2">Total Students</div>
                      <div className="text-4xl font-bold text-blue-900 mb-1">{stats.totalStudents}</div>
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
                      <div className="text-4xl font-bold text-green-900 mb-1">{stats.passRate}%</div>
                      <div className="text-sm text-green-600">Students passed</div>
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
                      <div className="text-4xl font-bold text-purple-900 mb-1">{stats.averageScore}/{TOTAL_MARKS}</div>
                      <div className="text-sm text-purple-600">Class average score</div>
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
                    {resultsList.map((result) => (
                      <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        {/* Rank Badge */}
                        <td className="py-4 px-3">
                          <div
                            className={`w-8 h-8 ${getRankBadgeColor(
                              result.rank
                            )} rounded-full flex items-center justify-center font-bold text-sm`}
                          >
                            {result.rank}
                          </div>
                        </td>

                        {/* Student Name */}
                        <td className="py-4 px-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                              {result.avatar}
                            </div>
                            <span className="font-medium text-gray-900">{result.name}</span>
                          </div>
                        </td>

                        {/* Class */}
                        <td className="py-4 px-3 text-center text-gray-700 font-medium">
                          {result.class}
                        </td>

                        {/* Subject Marks - Editable Input Boxes */}
                        <td className="py-4 px-3 text-center">
                          {renderMarkInput(result.id, 'math', result.math)}
                        </td>
                        <td className="py-4 px-3 text-center">
                          {renderMarkInput(result.id, 'science', result.science)}
                        </td>
                        <td className="py-4 px-3 text-center">
                          {renderMarkInput(result.id, 'english', result.english)}
                        </td>
                        <td className="py-4 px-3 text-center">
                          {renderMarkInput(result.id, 'social', result.social)}
                        </td>
                        <td className="py-4 px-3 text-center">
                          {renderMarkInput(result.id, 'hindi', result.hindi)}
                        </td>

                        {/* Total Marks (Auto-calculated) */}
                        <td className="py-4 px-3 text-center">
                          <span className="font-bold text-gray-900 bg-blue-50 px-3 py-1 rounded-md">
                            {result.total}
                          </span>
                        </td>

                        {/* Percentage (Auto-calculated) */}
                        <td className="py-4 px-3 text-center">
                          <span className="font-semibold text-blue-600">
                            {result.percentage.toFixed(1)}%
                          </span>
                        </td>

                        {/* Grade (Auto-assigned) */}
                        <td className="py-4 px-3 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(
                              result.grade
                            )}`}
                          >
                            {result.grade}
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
                  <div className="text-2xl font-bold text-blue-900">{stats.classAverage}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-green-600 font-medium mb-1">Highest Score</div>
                  <div className="text-2xl font-bold text-green-900">{stats.highestScore}</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-orange-600 font-medium mb-1">Lowest Score</div>
                  <div className="text-2xl font-bold text-orange-900">{stats.lowestScore}</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-purple-600 font-medium mb-1">Pass Percentage</div>
                  <div className="text-2xl font-bold text-purple-900">{stats.passRate}%</div>
                </div>
              </div>
            </div>
            {/* End of Right Content */}
          </div>
          {/* End of Flex Container */}
        </div>
      </div>
    </div>
  );
};

export default ExamResultsBoard;