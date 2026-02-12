import React, { useState } from 'react';
import { ChevronDown, Calendar, TrendingUp, Download, BarChart3, Award, AlertCircle, CheckCircle, MessageSquare } from 'lucide-react';

// Type Definitions
interface Student {
  id: string;
  name: string;
  class: string;
}

interface Exam {
  id: string;
  name: string;
  type: 'unit' | 'midterm' | 'final';
}

interface SubjectMark {
  id: number;
  subject: string;
  subjectIcon: string;
  subjectColor: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  status: 'pass' | 'fail' | 'excellent';
  classAverage: number;
  remarks?: string;
}

interface ResultSummary {
  totalMarksObtained: number;
  totalMaxMarks: number;
  percentage: number;
  overallGrade: string;
  resultStatus: 'pass' | 'fail';
  classRank: number;
  totalStudents: number;
}

const ResultsScreen: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('aarav');
  const [selectedExam, setSelectedExam] = useState<string>('midterm');
  const [expandedSubject, setExpandedSubject] = useState<number | null>(null);

  const students: Student[] = [
    { id: 'aarav', name: 'Aarav', class: 'Class 8 A' },
    { id: 'ananya', name: 'Ananya', class: 'Class 5 B' }
  ];

  const exams: Exam[] = [
    { id: 'unit1', name: 'Unit Test 1', type: 'unit' },
    { id: 'midterm', name: 'Mid Term Exam', type: 'midterm' },
    { id: 'final', name: 'Final Exam', type: 'final' }
  ];

  const subjectMarks: SubjectMark[] = [
    {
      id: 1,
      subject: 'English',
      subjectIcon: '📘',
      subjectColor: 'bg-blue-500',
      marksObtained: 82,
      totalMarks: 100,
      grade: 'A',
      status: 'excellent',
      classAverage: 75,
      remarks: 'Excellent writing skills. Keep up the good work!'
    },
    {
      id: 2,
      subject: 'Mathematics',
      subjectIcon: '📐',
      subjectColor: 'bg-emerald-500',
      marksObtained: 78,
      totalMarks: 100,
      grade: 'B+',
      status: 'pass',
      classAverage: 72,
      remarks: 'Good improvement in algebra. Focus more on geometry.'
    },
    {
      id: 3,
      subject: 'Science',
      subjectIcon: '🔬',
      subjectColor: 'bg-purple-500',
      marksObtained: 65,
      totalMarks: 100,
      grade: 'C+',
      status: 'pass',
      classAverage: 68,
      remarks: 'Needs more focus on practical applications and experiments.'
    },
    {
      id: 4,
      subject: 'Social Science',
      subjectIcon: '🌍',
      subjectColor: 'bg-orange-500',
      marksObtained: 88,
      totalMarks: 100,
      grade: 'A+',
      status: 'excellent',
      classAverage: 70,
      remarks: 'Outstanding performance! Excellent grasp of historical concepts.'
    },
    {
      id: 5,
      subject: 'Computer Science',
      subjectIcon: '💻',
      subjectColor: 'bg-teal-500',
      marksObtained: 72,
      totalMarks: 100,
      grade: 'B',
      status: 'pass',
      classAverage: 75,
      remarks: 'Good programming skills. Work on debugging techniques.'
    },
    {
      id: 6,
      subject: 'Hindi',
      subjectIcon: '🌐',
      subjectColor: 'bg-pink-500',
      marksObtained: 65,
      totalMarks: 100,
      grade: 'C+',
      status: 'pass',
      classAverage: 65,
      remarks: 'Average performance. More practice in grammar needed.'
    }
  ];

  const resultSummary: ResultSummary = {
    totalMarksObtained: subjectMarks.reduce((sum, subject) => sum + subject.marksObtained, 0),
    totalMaxMarks: subjectMarks.reduce((sum, subject) => sum + subject.totalMarks, 0),
    percentage: 0,
    overallGrade: 'B+',
    resultStatus: 'pass',
    classRank: 8,
    totalStudents: 40
  };

  resultSummary.percentage = Math.round((resultSummary.totalMarksObtained / resultSummary.totalMaxMarks) * 100);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'excellent':
        return 'bg-green-50 border-green-300';
      case 'pass':
        return 'bg-white border-slate-200';
      case 'fail':
        return 'bg-red-50 border-red-300';
      default:
        return 'bg-white border-slate-200';
    }
  };

  const getGradeColor = (status: string): string => {
    switch (status) {
      case 'excellent':
        return 'bg-green-600 text-white';
      case 'pass':
        return 'bg-teal-600 text-white';
      case 'fail':
        return 'bg-red-600 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  const getPerformanceBarColor = (percentage: number): string => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const toggleSubjectExpand = (id: number): void => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  const handleDownloadMarksheet = (): void => {
    console.log('Downloading marksheet...');
    // Implementation for PDF download
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-teal-100 to-white rounded-2xl p-8 mb-8 shadow-sm border border-teal-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-1">Results</h1>
              <p className="text-slate-600">Academic performance overview</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Student Selector */}
              <div className="relative">
                <select 
                  value={selectedStudent}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStudent(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 font-medium text-slate-700 cursor-pointer hover:border-teal-300 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {students.map((student: Student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} – {student.class}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>

              {/* Exam Selector */}
              <div className="relative">
                <select 
                  value={selectedExam}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedExam(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 font-medium text-slate-700 cursor-pointer hover:border-teal-300 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {exams.map((exam: Exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>

              {/* Academic Year Badge */}
              <div className="bg-amber-400 text-amber-900 px-4 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                <Calendar className="w-4 h-4" />
                2024-25
              </div>
            </div>
          </div>
        </div>

        {/* RESULT SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Marks */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Marks</p>
                <p className="text-2xl font-bold text-slate-800">
                  {resultSummary.totalMarksObtained} / {resultSummary.totalMaxMarks}
                </p>
              </div>
            </div>
          </div>

          {/* Percentage */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Percentage</p>
                <p className="text-2xl font-bold text-teal-700">{resultSummary.percentage}%</p>
              </div>
            </div>
          </div>

          {/* Overall Grade */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Overall Grade</p>
                <p className="text-2xl font-bold text-slate-800">{resultSummary.overallGrade}</p>
              </div>
            </div>
          </div>

          {/* Result Status */}
          <div className={`rounded-2xl p-6 shadow-sm border ${
            resultSummary.resultStatus === 'pass' 
              ? 'bg-green-50 border-green-300' 
              : 'bg-red-50 border-red-300'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                resultSummary.resultStatus === 'pass' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {resultSummary.resultStatus === 'pass' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Result Status</p>
                <p className={`text-2xl font-bold ${
                  resultSummary.resultStatus === 'pass' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {resultSummary.resultStatus === 'pass' ? '🟩 Pass' : '🟥 Fail'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Class Rank */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 mb-8 shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-amber-100 text-sm font-medium mb-1">Class Rank</p>
                <p className="text-3xl font-bold">
                  {resultSummary.classRank} / {resultSummary.totalStudents}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-amber-100 text-sm">You're in the</p>
              <p className="text-2xl font-bold">Top {Math.round((resultSummary.classRank / resultSummary.totalStudents) * 100)}%</p>
            </div>
          </div>
        </div>

        {/* SUBJECT-WISE MARKS */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Subject-wise Performance</h2>
          
          <div className="space-y-4">
            {subjectMarks.map((subject: SubjectMark) => {
              const percentage = Math.round((subject.marksObtained / subject.totalMarks) * 100);
              const isExpanded = expandedSubject === subject.id;
              
              return (
                <div 
                  key={subject.id}
                  className={`${getStatusColor(subject.status)} border-2 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md`}
                >
                  {/* Main Card */}
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleSubjectExpand(subject.id)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Subject Icon */}
                      <div className={`${subject.subjectColor} w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0`}>
                        {subject.subjectIcon}
                      </div>

                      {/* Subject Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{subject.subject}</h3>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-sm text-slate-600">
                            Marks: <span className="font-bold text-slate-800">{subject.marksObtained} / {subject.totalMarks}</span>
                          </span>
                          <span className="text-sm text-slate-600">
                            Class Avg: <span className="font-semibold">{subject.classAverage}</span>
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-full ${getPerformanceBarColor(percentage)} transition-all duration-500 rounded-full`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{percentage}%</p>
                        </div>
                      </div>

                      {/* Grade Badge */}
                      <div className="flex flex-col items-end gap-2">
                        <div className={`${getGradeColor(subject.status)} px-4 py-2 rounded-xl font-bold text-lg shadow-sm`}>
                          {subject.grade}
                        </div>
                        {subject.marksObtained > subject.classAverage && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                            Above Average
                          </span>
                        )}
                        {subject.marksObtained < subject.classAverage && (
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-semibold">
                            Below Average
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Section - Remarks */}
                  {isExpanded && subject.remarks && (
                    <div className="px-6 pb-6 pt-0 border-t border-slate-200">
                      <div className="bg-blue-50 rounded-xl p-4 mt-4">
                        <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                          Teacher's Remarks
                        </p>
                        <p className="text-sm text-slate-700">{subject.remarks}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* TEACHER'S OVERALL REMARKS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-600" />
            Overall Teacher's Remarks
          </h3>
          <p className="text-slate-700 leading-relaxed">
            Aarav has shown consistent performance across most subjects. Excellent work in Social Science and English. 
            Mathematics shows good improvement compared to last term. However, more focus is needed in Science, 
            particularly in practical applications. Regular practice and revision will help improve overall performance. 
            Keep up the good work!
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={handleDownloadMarksheet}
            className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 shadow-md hover:shadow-lg transition-all"
          >
            <Download className="w-5 h-5" />
            Download Marksheet
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 shadow-sm transition-all">
            <BarChart3 className="w-5 h-5" />
            View Exam Analysis
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 shadow-sm transition-all">
            <TrendingUp className="w-5 h-5" />
            View Improvement Tips
          </button>
        </div>

        {/* EMPTY STATE */}
        {subjectMarks.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              ⏳
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Results Not Published Yet</h3>
            <p className="text-slate-600">Results will be available soon</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResultsScreen;