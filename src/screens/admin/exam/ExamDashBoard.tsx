
import React, { useState, useMemo } from 'react';
import { Filter, Copy, Edit, Trash2, Plus, Eye, Monitor, FileText, Clock, Users, CheckCircle, XCircle, Settings, Calendar, Download, Upload, PlayCircle, StopCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ExamMode = 'offline' | 'online';
type ExamStatus = 'Draft' | 'Scheduled' | 'Ongoing' | 'Completed' | 'Cancelled';

type OnlineExamConfig = {
  platform: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  questionsCount: number;
  shuffleQuestions: boolean;
  showResults: boolean;
  allowReview: boolean;
  proctoring: boolean;
  autoSubmit: boolean;
  accessCode?: string;
};

type Exam = {
  id: number;
  name: string;
  type: string;
  mode: ExamMode;
  year: string;
  term: string;
  classes: string[];
  duration: string;
  days: string;
  status: ExamStatus;
  icon: string;
  color: string;
  onlineConfig?: OnlineExamConfig;
  startDate?: string;
  endDate?: string;
  studentsEnrolled?: number;
  studentsCompleted?: number;
  venue?: string;
};

const ExamDashboard = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedTerm, setSelectedTerm] = useState('All Terms');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedMode, setSelectedMode] = useState<'all' | 'online' | 'offline'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showOnlineConfigModal, setShowOnlineConfigModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [createExamMode, setCreateExamMode] = useState<ExamMode>('offline');

  const [allExams, setAllExams] = useState<Exam[]>([
    {
      id: 1,
      name: 'Final Examination 2024',
      type: 'Final exam',
      mode: 'offline',
      year: '2023-2024',
      term: 'Term 3',
      classes: ['9th', '10th', '12th'],
      duration: 'May 15 - May 30',
      days: '16 days',
      status: 'Scheduled',
      icon: 'F',
      color: 'bg-blue-500',
      startDate: '2024-05-15',
      endDate: '2024-05-30',
      studentsEnrolled: 450,
      venue: 'Main Auditorium'
    },
    {
      id: 2,
      name: 'Mid-Term Assessment',
      type: 'Mid-Term',
      mode: 'online',
      year: '2023-2024',
      term: 'Term 2',
      classes: ['8th', '10th', '11th'],
      duration: 'Mar 10 - Mar 22',
      days: '12 days',
      status: 'Ongoing',
      icon: 'M',
      color: 'bg-purple-500',
      onlineConfig: {
        platform: 'School LMS',
        duration: 120,
        totalMarks: 100,
        passingMarks: 40,
        questionsCount: 50,
        shuffleQuestions: true,
        showResults: false,
        allowReview: true,
        proctoring: true,
        autoSubmit: true,
        accessCode: 'EXAM2024'
      },
      startDate: '2024-03-10',
      endDate: '2024-03-22',
      studentsEnrolled: 380,
      studentsCompleted: 245
    },
    {
      id: 3,
      name: 'Unit Test 3 - Science',
      type: 'Monthly Assessment',
      mode: 'online',
      year: '2023-2024',
      term: 'Term 2',
      classes: ['8th', '10th'],
      duration: 'Feb 20 - Feb 25',
      days: '5 days',
      status: 'Completed',
      icon: 'U',
      color: 'bg-green-600',
      onlineConfig: {
        platform: 'Google Forms',
        duration: 60,
        totalMarks: 50,
        passingMarks: 20,
        questionsCount: 30,
        shuffleQuestions: true,
        showResults: true,
        allowReview: false,
        proctoring: false,
        autoSubmit: true
      },
      startDate: '2024-02-20',
      endDate: '2024-02-25',
      studentsEnrolled: 220,
      studentsCompleted: 220
    },
    {
      id: 4,
      name: 'Unit Test 2',
      type: 'Monthly Assessment',
      mode: 'offline',
      year: '2023-2024',
      term: 'Term 2',
      classes: ['All'],
      duration: 'Jan 15 - Jan 20',
      days: '5 days',
      status: 'Completed',
      icon: 'U',
      color: 'bg-orange-500',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      studentsEnrolled: 580,
      studentsCompleted: 575,
      venue: 'Classrooms'
    },
    {
      id: 5,
      name: 'Pre-Board Online Mock',
      type: 'Mock Board Exam',
      mode: 'online',
      year: '2023-2024',
      term: 'Term 3',
      classes: ['10th', '12th'],
      duration: 'Apr 5 - Apr 18',
      days: '13 days',
      status: 'Draft',
      icon: 'P',
      color: 'bg-red-500',
      onlineConfig: {
        platform: 'School LMS',
        duration: 180,
        totalMarks: 100,
        passingMarks: 40,
        questionsCount: 80,
        shuffleQuestions: true,
        showResults: false,
        allowReview: true,
        proctoring: true,
        autoSubmit: true,
        accessCode: 'PREBOARD24'
      },
      startDate: '2024-04-05',
      endDate: '2024-04-18',
      studentsEnrolled: 0
    },
    {
      id: 6,
      name: 'Mathematics Quiz',
      type: 'Quick Assessment',
      mode: 'online',
      year: '2023-2024',
      term: 'Term 2',
      classes: ['9th', '10th'],
      duration: 'Mar 1 - Mar 3',
      days: '3 days',
      status: 'Completed',
      icon: 'Q',
      color: 'bg-teal-500',
      onlineConfig: {
        platform: 'School LMS',
        duration: 30,
        totalMarks: 25,
        passingMarks: 10,
        questionsCount: 20,
        shuffleQuestions: true,
        showResults: true,
        allowReview: false,
        proctoring: false,
        autoSubmit: true
      },
      startDate: '2024-03-01',
      endDate: '2024-03-03',
      studentsEnrolled: 290,
      studentsCompleted: 285
    }
  ]);

  const [createFormData, setCreateFormData] = useState({
    name: '',
    type: '',
    year: '2023-2024',
    term: 'Term 1',
    classes: [] as string[],
    startDate: '',
    endDate: '',
    venue: '',
    // Online config
    platform: 'School LMS',
    duration: 60,
    totalMarks: 100,
    passingMarks: 40,
    questionsCount: 50,
    shuffleQuestions: true,
    showResults: false,
    allowReview: true,
    proctoring: false,
    autoSubmit: true,
    accessCode: ''
  });

  // Dynamic filtering
  const filteredExams = useMemo(() => {
    return allExams.filter(exam => {
      if (selectedYear !== 'All Years' && exam.year !== selectedYear) return false;
      if (selectedTerm !== 'All Terms' && exam.term !== selectedTerm) return false;
      if (selectedClass !== 'All Classes') {
        if (!exam.classes.includes(selectedClass) && !exam.classes.includes('All')) return false;
      }
      if (selectedStatus !== 'All Status' && exam.status !== selectedStatus) return false;
      if (selectedMode !== 'all' && exam.mode !== selectedMode) return false;
      return true;
    });
  }, [allExams, selectedYear, selectedTerm, selectedClass, selectedStatus, selectedMode]);

  const getStatusColor = (status: ExamStatus) => {
    switch(status) {
      case 'Scheduled': return 'bg-green-100 text-green-700';
      case 'Ongoing': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Draft': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getModeIcon = (mode: ExamMode) => {
    return mode === 'online' ? <Monitor className="w-4 h-4" /> : <FileText className="w-4 h-4" />;
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExam: Exam = {
      id: allExams.length + 1,
      name: createFormData.name,
      type: createFormData.type,
      mode: createExamMode,
      year: createFormData.year,
      term: createFormData.term,
      classes: createFormData.classes,
      duration: `${createFormData.startDate} - ${createFormData.endDate}`,
      days: calculateDays(createFormData.startDate, createFormData.endDate),
      status: 'Draft',
      icon: createFormData.name.charAt(0).toUpperCase(),
      color: getRandomColor(),
      startDate: createFormData.startDate,
      endDate: createFormData.endDate,
      studentsEnrolled: 0,
      venue: createExamMode === 'offline' ? createFormData.venue : undefined,
      onlineConfig: createExamMode === 'online' ? {
        platform: createFormData.platform,
        duration: createFormData.duration,
        totalMarks: createFormData.totalMarks,
        passingMarks: createFormData.passingMarks,
        questionsCount: createFormData.questionsCount,
        shuffleQuestions: createFormData.shuffleQuestions,
        showResults: createFormData.showResults,
        allowReview: createFormData.allowReview,
        proctoring: createFormData.proctoring,
        autoSubmit: createFormData.autoSubmit,
        accessCode: createFormData.accessCode
      } : undefined
    };

    setAllExams([...allExams, newExam]);
    setShowCreateModal(false);
    resetForm();
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return `${days} days`;
  };

  const getRandomColor = () => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-600', 'bg-orange-500', 'bg-red-500', 'bg-indigo-500', 'bg-teal-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const resetForm = () => {
    setCreateFormData({
      name: '',
      type: '',
      year: '2023-2024',
      term: 'Term 1',
      classes: [],
      startDate: '',
      endDate: '',
      venue: '',
      platform: 'School LMS',
      duration: 60,
      totalMarks: 100,
      passingMarks: 40,
      questionsCount: 50,
      shuffleQuestions: true,
      showResults: false,
      allowReview: true,
      proctoring: false,
      autoSubmit: true,
      accessCode: ''
    });
  };

  const handleClassToggle = (className: string) => {
    setCreateFormData(prev => ({
      ...prev,
      classes: prev.classes.includes(className)
        ? prev.classes.filter(c => c !== className)
        : [...prev.classes, className]
    }));
  };

  const handleDeleteExam = (examId: number) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setAllExams(allExams.filter(exam => exam.id !== examId));
    }
  };

  const handleStartExam = (exam: Exam) => {
    if (exam.mode === 'online') {
      setAllExams(allExams.map(e => 
        e.id === exam.id ? { ...e, status: 'Ongoing' } : e
      ));
      alert(`Online exam "${exam.name}" has been started. Students can now access it.`);
    }
  };

  const handleEndExam = (exam: Exam) => {
    if (exam.mode === 'online' && exam.status === 'Ongoing') {
      setAllExams(allExams.map(e => 
        e.id === exam.id ? { ...e, status: 'Completed' } : e
      ));
      alert(`Online exam "${exam.name}" has been ended. All submissions are now closed.`);
    }
  };

  // Create Exam Modal
  const CreateExamModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Create New Exam</h3>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Mode Selection */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => setCreateExamMode('offline')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                createExamMode === 'offline'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FileText className={`w-8 h-8 mx-auto mb-2 ${createExamMode === 'offline' ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="font-semibold text-gray-900">Offline Exam</div>
              <div className="text-xs text-gray-500 mt-1">Traditional paper-based examination</div>
            </button>
            <button
              onClick={() => setCreateExamMode('online')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                createExamMode === 'online'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Monitor className={`w-8 h-8 mx-auto mb-2 ${createExamMode === 'online' ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="font-semibold text-gray-900">Online Exam</div>
              <div className="text-xs text-gray-500 mt-1">Digital assessment with auto-grading</div>
            </button>
          </div>
        </div>

        <form onSubmit={handleCreateExam} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Name *</label>
                <input
                  type="text"
                  required
                  value={createFormData.name}
                  onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Final Examination 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type *</label>
                <select
                  required
                  value={createFormData.type}
                  onChange={(e) => setCreateFormData({ ...createFormData, type: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="Final exam">Final Exam</option>
                  <option value="Mid-Term">Mid-Term</option>
                  <option value="Monthly Assessment">Monthly Assessment</option>
                  <option value="Mock Board Exam">Mock Board Exam</option>
                  <option value="Quick Assessment">Quick Assessment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year *</label>
                <select
                  required
                  value={createFormData.year}
                  onChange={(e) => setCreateFormData({ ...createFormData, year: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Term *</label>
                <select
                  required
                  value={createFormData.term}
                  onChange={(e) => setCreateFormData({ ...createFormData, term: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                  <option value="Term 3">Term 3</option>
                </select>
              </div>
            </div>
          </div>

          {/* Class Selection */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Select Classes *</h4>
            <div className="flex flex-wrap gap-2">
              {['8th', '9th', '10th', '11th', '12th'].map(cls => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => handleClassToggle(cls)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    createFormData.classes.includes(cls)
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Duration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Schedule</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  required
                  value={createFormData.startDate}
                  onChange={(e) => setCreateFormData({ ...createFormData, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  required
                  value={createFormData.endDate}
                  onChange={(e) => setCreateFormData({ ...createFormData, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Offline Specific */}
          {createExamMode === 'offline' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Venue Information</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
                <input
                  type="text"
                  required
                  value={createFormData.venue}
                  onChange={(e) => setCreateFormData({ ...createFormData, venue: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Main Auditorium, Classrooms"
                />
              </div>
            </div>
          )}

          {/* Online Specific */}
          {createExamMode === 'online' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Online Exam Configuration</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform *</label>
                  <select
                    required
                    value={createFormData.platform}
                    onChange={(e) => setCreateFormData({ ...createFormData, platform: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="School LMS">School LMS</option>
                    <option value="Google Forms">Google Forms</option>
                    <option value="Microsoft Forms">Microsoft Forms</option>
                    <option value="Moodle">Moodle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={createFormData.duration}
                    onChange={(e) => setCreateFormData({ ...createFormData, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={createFormData.totalMarks}
                    onChange={(e) => setCreateFormData({ ...createFormData, totalMarks: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Passing Marks *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={createFormData.passingMarks}
                    onChange={(e) => setCreateFormData({ ...createFormData, passingMarks: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={createFormData.questionsCount}
                    onChange={(e) => setCreateFormData({ ...createFormData, questionsCount: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Access Code</label>
                  <input
                    type="text"
                    value={createFormData.accessCode}
                    onChange={(e) => setCreateFormData({ ...createFormData, accessCode: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createFormData.shuffleQuestions}
                    onChange={(e) => setCreateFormData({ ...createFormData, shuffleQuestions: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Shuffle Questions</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createFormData.showResults}
                    onChange={(e) => setCreateFormData({ ...createFormData, showResults: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Show Results After Submission</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createFormData.allowReview}
                    onChange={(e) => setCreateFormData({ ...createFormData, allowReview: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Allow Review Before Submit</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createFormData.proctoring}
                    onChange={(e) => setCreateFormData({ ...createFormData, proctoring: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Enable Proctoring</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createFormData.autoSubmit}
                    onChange={(e) => setCreateFormData({ ...createFormData, autoSubmit: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Auto-Submit on Timeout</span>
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Exam Details Modal
  const ExamDetailsModal = () => {
    if (!selectedExam) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`${selectedExam.color} w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl`}>
                  {selectedExam.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedExam.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-600">{selectedExam.type}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      {getModeIcon(selectedExam.mode)}
                      <span className="text-sm text-gray-600 capitalize">{selectedExam.mode}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedExam.status)}`}>
                      {selectedExam.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Exam Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Academic Year:</span>
                    <span className="font-medium text-gray-900">{selectedExam.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Term:</span>
                    <span className="font-medium text-gray-900">{selectedExam.term}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-gray-900">{selectedExam.days}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dates:</span>
                    <span className="font-medium text-gray-900">{selectedExam.duration}</span>
                  </div>
                  {selectedExam.venue && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Venue:</span>
                      <span className="font-medium text-gray-900">{selectedExam.venue}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Enrollment</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Students Enrolled:</span>
                    <span className="font-medium text-gray-900">{selectedExam.studentsEnrolled || 0}</span>
                  </div>
                  {selectedExam.mode === 'online' && selectedExam.studentsCompleted !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Completed:</span>
                      <span className="font-medium text-gray-900">{selectedExam.studentsCompleted}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Classes:</span>
                    <div className="flex gap-1">
                      {selectedExam.classes.map((cls, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Online Config */}
            {selectedExam.mode === 'online' && selectedExam.onlineConfig && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Online Configuration</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Platform:</span>
                      <span className="font-medium text-gray-900">{selectedExam.onlineConfig.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium text-gray-900">{selectedExam.onlineConfig.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Marks:</span>
                      <span className="font-medium text-gray-900">{selectedExam.onlineConfig.totalMarks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Passing Marks:</span>
                      <span className="font-medium text-gray-900">{selectedExam.onlineConfig.passingMarks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Questions:</span>
                      <span className="font-medium text-gray-900">{selectedExam.onlineConfig.questionsCount}</span>
                    </div>
                    {selectedExam.onlineConfig.accessCode && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Access Code:</span>
                        <span className="font-mono font-medium text-blue-600">{selectedExam.onlineConfig.accessCode}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {selectedExam.onlineConfig.shuffleQuestions ? 
                        <CheckCircle className="w-4 h-4 text-green-600" /> : 
                        <XCircle className="w-4 h-4 text-gray-400" />
                      }
                      <span className="text-sm text-gray-700">Shuffle Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedExam.onlineConfig.showResults ? 
                        <CheckCircle className="w-4 h-4 text-green-600" /> : 
                        <XCircle className="w-4 h-4 text-gray-400" />
                      }
                      <span className="text-sm text-gray-700">Show Results</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedExam.onlineConfig.allowReview ? 
                        <CheckCircle className="w-4 h-4 text-green-600" /> : 
                        <XCircle className="w-4 h-4 text-gray-400" />
                      }
                      <span className="text-sm text-gray-700">Allow Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedExam.onlineConfig.proctoring ? 
                        <CheckCircle className="w-4 h-4 text-green-600" /> : 
                        <XCircle className="w-4 h-4 text-gray-400" />
                      }
                      <span className="text-sm text-gray-700">Proctoring Enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedExam.onlineConfig.autoSubmit ? 
                        <CheckCircle className="w-4 h-4 text-green-600" /> : 
                        <XCircle className="w-4 h-4 text-gray-400" />
                      }
                      <span className="text-sm text-gray-700">Auto Submit</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between pt-4 border-t">
              <div className="flex gap-2">
                {selectedExam.mode === 'online' && selectedExam.status === 'Scheduled' && (
                  <button
                    onClick={() => {
                      handleStartExam(selectedExam);
                      setShowDetailsModal(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Start Exam
                  </button>
                )}
                {selectedExam.mode === 'online' && selectedExam.status === 'Ongoing' && (
                  <button
                    onClick={() => {
                      handleEndExam(selectedExam);
                      setShowDetailsModal(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <StopCircle className="w-4 h-4" />
                    End Exam
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-8 border-b border-gray-200">
            <button className="pb-3 px-1 text-blue-600 border-b-2 border-blue-600 font-medium">Exams</button>
            <button 
              onClick={() => navigate('/admin/exams/schedule')}
              className="pb-3 px-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300"
            >
              Schedule
            </button>
            <button 
              onClick={() => navigate('/admin/exams/marks')}
              className="pb-3 px-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300"
            >
              Marks Control
            </button>
            <button 
              onClick={() => navigate('/admin/exams/grade-config')}
              className="pb-3 px-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300"
            >
              Grade Config
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="pb-3 px-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300"
            >
              Exam Creation
            </button>
            <button 
              onClick={() => navigate('/admin/exams/results')}
              className="pb-3 px-1 text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300"
            >
              Results
            </button>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Exam
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Exams</p>
                <p className="text-2xl font-bold text-gray-900">{allExams.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Online Exams</p>
                <p className="text-2xl font-bold text-gray-900">{allExams.filter(e => e.mode === 'online').length}</p>
              </div>
              <Monitor className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ongoing</p>
                <p className="text-2xl font-bold text-gray-900">{allExams.filter(e => e.status === 'Ongoing').length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{allExams.filter(e => e.status === 'Completed').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="grid grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
              <select 
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value as 'all' | 'online' | 'offline')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>All Years</option>
                <option>2023-2024</option>
                <option>2022-2023</option>
                <option>2024-2025</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
              <select 
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>All Terms</option>
                <option>Term 1</option>
                <option>Term 2</option>
                <option>Term 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>All Classes</option>
                <option>8th</option>
                <option>9th</option>
                <option>10th</option>
                <option>11th</option>
                <option>12th</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>All Status</option>
                <option>Scheduled</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Draft</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => {
                  setSelectedYear('All Years');
                  setSelectedTerm('All Terms');
                  setSelectedClass('All Classes');
                  setSelectedStatus('All Status');
                  setSelectedMode('all');
                }}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Exam Table */}
        <div className="bg-white rounded-lg mb-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left w-12">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year/Term</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrollment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${exam.color} rounded flex items-center justify-center text-white font-bold text-lg`}>
                            {exam.icon}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{exam.name}</div>
                            <div className="text-sm text-gray-500">{exam.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getModeIcon(exam.mode)}
                          <span className="text-sm text-gray-900 capitalize">{exam.mode}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{exam.year}</div>
                        <div className="text-xs text-gray-500">{exam.term}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {exam.classes.slice(0, 2).map((cls, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              {cls}
                            </span>
                          ))}
                          {exam.classes.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{exam.classes.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{exam.duration}</div>
                        <div className="text-xs text-gray-500">{exam.days}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Users className="w-4 h-4 text-gray-400" />
                          {exam.studentsEnrolled || 0}
                          {exam.mode === 'online' && exam.studentsCompleted !== undefined && (
                            <span className="text-xs text-gray-500">/ {exam.studentsCompleted}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.status)}`}>
                          {exam.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedExam(exam);
                              setShowDetailsModal(true);
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded" 
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded" title="Edit">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded" title="Copy">
                            <Copy className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={() => handleDeleteExam(exam.id)}
                            className="p-1.5 hover:bg-gray-100 rounded" 
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <p className="text-lg font-medium">No exams found</p>
                        <p className="text-sm mt-1">Try adjusting your filters or create a new exam</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredExams.length > 0 ? '1' : '0'} to {Math.min(5, filteredExams.length)} of {filteredExams.length} exams
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50">&lt;</button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50">&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateExamModal />}
      {showDetailsModal && <ExamDetailsModal />}
    </div>
  );
};

export default ExamDashboard;