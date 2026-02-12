
import React, { useState } from 'react';
import { Users, Calendar, BookOpen, Search, Plus, Download, Edit, Trash2, ChevronRight, UserCheck, School, ClipboardList, UserCircle, Phone, Mail, MapPin, Award, TrendingUp } from 'lucide-react';

type Section = { id: string; name: string; students: number; teacher: string; room: string; avgAttendance: number };

interface SectionDetailsScreenProps {
  selectedSection: Section | null;
  selectedClass: {
    id: number;
    name: string;
    totalStudents: number;
    sections: number;
    teachers: number;
    subjects: string[];
    classTeacher: string;
  } | null;
  setSelectedSection: React.Dispatch<React.SetStateAction<Section | null>>;
}

const SectionDetailsScreen: React.FC<SectionDetailsScreenProps> = ({ selectedSection, selectedClass, setSelectedSection }) => {
  if (!selectedSection || !selectedClass) return null;
  // Example period timings (customize as needed)
  const periodTimes = [
    { period: 1, time: '09:00 - 09:45' },
    { period: 2, time: '09:50 - 10:35' },
    { period: 3, time: '10:40 - 11:25' },
    { period: 4, time: '11:30 - 12:15' },
    { period: 5, time: '12:20 - 01:05' },
  ];
  // Timetable with subject and timing for each period
  const timetable = [
    {
      day: 'Monday',
      periods: [
        { subject: 'Math', time: periodTimes[0].time },
        { subject: 'Science', time: periodTimes[1].time },
        { subject: 'English', time: periodTimes[2].time },
        { subject: 'PE', time: periodTimes[3].time },
        { subject: '-', time: periodTimes[4].time },
      ],
    },
    {
      day: 'Tuesday',
      periods: [
        { subject: 'Math', time: periodTimes[0].time },
        { subject: 'Social Studies', time: periodTimes[1].time },
        { subject: 'Hindi', time: periodTimes[2].time },
        { subject: 'Art', time: periodTimes[3].time },
        { subject: '-', time: periodTimes[4].time },
      ],
    },
    {
      day: 'Wednesday',
      periods: [
        { subject: 'Science', time: periodTimes[0].time },
        { subject: 'English', time: periodTimes[1].time },
        { subject: 'Math', time: periodTimes[2].time },
        { subject: 'Computer', time: periodTimes[3].time },
        { subject: '-', time: periodTimes[4].time },
      ],
    },
    {
      day: 'Thursday',
      periods: [
        { subject: 'Math', time: periodTimes[0].time },
        { subject: 'Science', time: periodTimes[1].time },
        { subject: 'English', time: periodTimes[2].time },
        { subject: 'Music', time: periodTimes[3].time },
        { subject: '-', time: periodTimes[4].time },
      ],
    },
    {
      day: 'Friday',
      periods: [
        { subject: 'Math', time: periodTimes[0].time },
        { subject: 'Social Studies', time: periodTimes[1].time },
        { subject: 'Hindi', time: periodTimes[2].time },
        { subject: 'PE', time: periodTimes[3].time },
        { subject: '-', time: periodTimes[4].time },
      ],
    },
  ];
  return (
    <div className="w-full max-w-none min-h-[80vh] bg-white rounded-2xl shadow-xl px-2 sm:px-6 md:px-12 lg:px-20 py-4 md:py-10 mt-8 transition-all duration-300">
      <div className="flex justify-start mb-8">
        <button
          onClick={() => setSelectedSection(null)}
          className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
          aria-label="Back to Sections"
        >
          ← Back to Sections
        </button>
      </div>
      <div className="border-b border-gray-200 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{selectedClass.name} <span className="text-blue-600">- {selectedSection.name}</span></h1>
          <p className="text-lg text-gray-500">Room: <span className="font-semibold text-gray-700">{selectedSection.room}</span> &bull; Teacher: <span className="font-semibold text-gray-700">{selectedSection.teacher}</span></p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Timetable */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm overflow-x-auto">
          <h2 className="font-bold text-xl text-blue-900 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Timetable
          </h2>
          <table className="w-full text-base border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-2 font-semibold text-blue-700">Day</th>
                {periodTimes.map((p) => (
                  <th key={p.period} className="text-left py-2 px-2 font-semibold text-blue-700">Period {p.period}<br /><span className='text-xs text-gray-500'>{p.time}</span></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetable.map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-100 transition">
                  <td className="py-2 px-2 font-medium text-gray-900 whitespace-nowrap">{row.day}</td>
                  {row.periods.map((period, pidx) => (
                    <td key={pidx} className="py-2 px-2 text-gray-700 whitespace-nowrap">{period.subject}<br /><span className='text-xs text-gray-400'>{period.time}</span></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Teachers & Subjects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-xl text-green-900 mb-4 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-green-600" />
              Section Teacher
            </h2>
            <p className="font-medium text-gray-900 text-lg">{selectedSection.teacher}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-xl text-purple-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
              Subjects
            </h2>
            <div className="flex flex-wrap gap-2">
              {selectedClass.subjects.map((subject, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium shadow-sm hover:bg-purple-100 transition">{subject}</span>
              ))}
            </div>
          </div>
        </div>
        {/* Section Profile */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-blue-600" />
            Section Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Section Name</p>
              <p className="font-semibold text-gray-900 text-lg">{selectedSection.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Room</p>
              <p className="font-semibold text-gray-900 text-lg">{selectedSection.room}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Attendance</p>
              <p className="font-semibold text-blue-700 text-lg">{selectedSection.avgAttendance}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Number of Students</p>
              <p className="font-semibold text-green-700 text-lg">{selectedSection.students}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SchoolAdminDashboard = () => {
  // Modal state for Add Class
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [addClassForm, setAddClassForm] = useState({
    name: '',
    sections: '',
    teachers: '',
    subjects: '',
    classTeacher: '',
  });
  const [addClassError, setAddClassError] = useState<string | null>(null);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [activeLibrarySection, setActiveLibrarySection] = useState('overview');
  const [selectedClass, setSelectedClass] = useState<{
    id: number;
    name: string;
    totalStudents: number;
    sections: number;
    teachers: number;
    subjects: string[];
    classTeacher: string;
  } | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  type Student = {
    id: number;
    name: string;
    roll: string;
    dob: string;
    father: string;
    mother: string;
    phone: string;
    email: string;
    address: string;
    attendance: number;
    avgScore: number;
  };

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Classes Data
  const [classesData, setClassesData] = useState([
    { 
      id: 1, 
      name: 'Class 9', 
      totalStudents: 150, 
      sections: 4, 
      teachers: 8,
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'],
      classTeacher: 'Mrs. Anjali Sharma'
    },
    { 
      id: 2, 
      name: 'Class 10', 
      totalStudents: 160, 
      sections: 4, 
      teachers: 9,
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'],
      classTeacher: 'Mr. Rajesh Kumar'
    },
    { 
      id: 3, 
      name: 'Class 11 (Science)', 
      totalStudents: 90, 
      sections: 3, 
      teachers: 7,
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
      classTeacher: 'Dr. Priya Patel'
    },
    { 
      id: 4, 
      name: 'Class 11 (Commerce)', 
      totalStudents: 80, 
      sections: 2, 
      teachers: 6,
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Mathematics'],
      classTeacher: 'Mr. Amit Verma'
    },
    { 
      id: 5, 
      name: 'Class 12 (Science)', 
      totalStudents: 85, 
      sections: 3, 
      teachers: 7,
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
      classTeacher: 'Dr. Sunita Reddy'
    },
    { 
      id: 6, 
      name: 'Class 12 (Commerce)', 
      totalStudents: 75, 
      sections: 2, 
      teachers: 6,
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Mathematics'],
      classTeacher: 'Mrs. Kavita Singh'
    },
  ]);

  // Sections Data
  type Section = { id: string; name: string; students: number; teacher: string; room: string; avgAttendance: number };
  const [sectionsData, setSectionsData] = useState<Record<number, Section[]>>({
    1: [
      { id: 'A', name: 'Section A', students: 38, teacher: 'Mrs. Meera Joshi', room: '201', avgAttendance: 94 },
      { id: 'B', name: 'Section B', students: 37, teacher: 'Mr. Suresh Nair', room: '202', avgAttendance: 92 },
      { id: 'C', name: 'Section C', students: 38, teacher: 'Mrs. Priya Menon', room: '203', avgAttendance: 95 },
      { id: 'D', name: 'Section D', students: 37, teacher: 'Mr. Vivek Gupta', room: '204', avgAttendance: 93 },
    ],
    2: [
      { id: 'A', name: 'Section A', students: 40, teacher: 'Mrs. Deepa Singh', room: '301', avgAttendance: 95 },
      { id: 'B', name: 'Section B', students: 40, teacher: 'Mr. Anil Kumar', room: '302', avgAttendance: 94 },
      { id: 'C', name: 'Section C', students: 40, teacher: 'Mrs. Neha Sharma', room: '303', avgAttendance: 96 },
      { id: 'D', name: 'Section D', students: 40, teacher: 'Mr. Kiran Rao', room: '304', avgAttendance: 93 },
    ],
    3: [
      { id: 'A', name: 'Section A', students: 30, teacher: 'Dr. Raghav Desai', room: '401', avgAttendance: 97 },
      { id: 'B', name: 'Section B', students: 30, teacher: 'Mrs. Lakshmi Iyer', room: '402', avgAttendance: 96 },
      { id: 'C', name: 'Section C', students: 30, teacher: 'Mr. Harish Pillai', room: '403', avgAttendance: 95 },
    ],
    4: [
      { id: 'A', name: 'Section A', students: 40, teacher: 'Mrs. Ritu Kapoor', room: '501', avgAttendance: 94 },
      { id: 'B', name: 'Section B', students: 40, teacher: 'Mr. Manoj Tiwari', room: '502', avgAttendance: 95 },
    ],
    5: [
      { id: 'A', name: 'Section A', students: 28, teacher: 'Dr. Arjun Mehta', room: '601', avgAttendance: 98 },
      { id: 'B', name: 'Section B', students: 29, teacher: 'Mrs. Swati Bansal', room: '602', avgAttendance: 97 },
      { id: 'C', name: 'Section C', students: 28, teacher: 'Mr. Rohit Saxena', room: '603', avgAttendance: 96 },
    ],
    6: [
      { id: 'A', name: 'Section A', students: 38, teacher: 'Mrs. Geeta Malhotra', room: '701', avgAttendance: 97 },
      { id: 'B', name: 'Section B', students: 37, teacher: 'Mr. Ashok Tripathi', room: '702', avgAttendance: 96 },
    ],
  });

  // Modal state for Add Section
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [addSectionForm, setAddSectionForm] = useState({
    id: '',
    name: '',
    students: '',
    teacher: '',
    room: '',
    avgAttendance: '',
  });
  const [addSectionError, setAddSectionError] = useState<string | null>(null);

  // Students Data
  const studentsData: { [key: string]: Student[] } = {
    '1-A': [
      { id: 1, name: 'Aarav Sharma', roll: '001', dob: '2010-05-15', father: 'Rajesh Sharma', mother: 'Priya Sharma', phone: '+91-9876543210', email: 'sharma.r@email.com', address: 'MG Road, Hyderabad', attendance: 95, avgScore: 88 },
      { id: 2, name: 'Ananya Patel', roll: '002', dob: '2010-08-22', father: 'Amit Patel', mother: 'Neha Patel', phone: '+91-9876543211', email: 'patel.a@email.com', address: 'Banjara Hills, Hyderabad', attendance: 97, avgScore: 92 },
      { id: 3, name: 'Arjun Kumar', roll: '003', dob: '2010-03-10', father: 'Suresh Kumar', mother: 'Meera Kumar', phone: '+91-9876543212', email: 'kumar.s@email.com', address: 'Jubilee Hills, Hyderabad', attendance: 92, avgScore: 85 },
      { id: 4, name: 'Diya Reddy', roll: '004', dob: '2010-11-30', father: 'Ravi Reddy', mother: 'Lakshmi Reddy', phone: '+91-9876543213', email: 'reddy.r@email.com', address: 'Gachibowli, Hyderabad', attendance: 94, avgScore: 90 },
      { id: 5, name: 'Ishaan Singh', roll: '005', dob: '2010-07-18', father: 'Vikram Singh', mother: 'Pooja Singh', phone: '+91-9876543214', email: 'singh.v@email.com', address: 'Madhapur, Hyderabad', attendance: 96, avgScore: 87 },
    ],
    '2-A': [
      { id: 1, name: 'Kavya Menon', roll: '001', dob: '2009-04-12', father: 'Arun Menon', mother: 'Divya Menon', phone: '+91-9876543220', email: 'menon.a@email.com', address: 'Kondapur, Hyderabad', attendance: 98, avgScore: 94 },
      { id: 2, name: 'Rohan Desai', roll: '002', dob: '2009-09-25', father: 'Karan Desai', mother: 'Anjali Desai', phone: '+91-9876543221', email: 'desai.k@email.com', address: 'Hitech City, Hyderabad', attendance: 95, avgScore: 91 },
      { id: 3, name: 'Saanvi Iyer', roll: '003', dob: '2009-06-08', father: 'Raman Iyer', mother: 'Priya Iyer', phone: '+91-9876543222', email: 'iyer.r@email.com', address: 'Kukatpally, Hyderabad', attendance: 97, avgScore: 93 },
      { id: 4, name: 'Vihaan Chopra', roll: '004', dob: '2009-12-15', father: 'Sandeep Chopra', mother: 'Ritu Chopra', phone: '+91-9876543223', email: 'chopra.s@email.com', address: 'Secunderabad, Hyderabad', attendance: 93, avgScore: 88 },
      { id: 5, name: 'Aadhya Nair', roll: '005', dob: '2009-02-20', father: 'Manoj Nair', mother: 'Sneha Nair', phone: '+91-9876543224', email: 'nair.m@email.com', address: 'Begumpet, Hyderabad', attendance: 96, avgScore: 92 },
    ],
  };

  // Classes Overview Screen
  const ClassesOverview = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Classes Management</h2>
          <p className="text-gray-500 mt-1">Manage all classes, sections, and students</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setShowAddClassModal(true)}
        >
          <Plus className="w-4 h-4" />
          Add New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classesData.map((classItem: typeof classesData[0]) => (
          <div
            key={classItem.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group relative"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <School className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded hover:bg-blue-100 text-blue-600"
                  title="Edit Class"
                  onClick={e => {
                    e.stopPropagation();
                    // Open edit modal (reuse AddClassModal with prefilled values)
                    setAddClassForm({
                      name: classItem.name,
                      sections: String(classItem.sections),
                      teachers: String(classItem.teachers),
                      subjects: classItem.subjects.join(', '),
                      classTeacher: classItem.classTeacher,
                    });
                    setShowAddClassModal(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded hover:bg-red-100 text-red-600"
                  title="Delete Class"
                  onClick={e => {
                    e.stopPropagation();
                    if (window.confirm(`Are you sure you want to delete ${classItem.name}?`)) {
                      setClassesData(prev => prev.filter(c => c.id !== classItem.id));
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div onClick={() => setSelectedClass(classItem)} className="cursor-pointer">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{classItem.name}</h3>
              <p className="text-sm text-gray-500 mb-4">Class Teacher: {classItem.classTeacher}</p>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{classItem.totalStudents}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{classItem.sections}</p>
                  <p className="text-xs text-gray-500">Sections</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{classItem.teachers}</p>
                  <p className="text-xs text-gray-500">Teachers</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Subjects</p>
                <div className="flex flex-wrap gap-1">
                  {classItem.subjects.slice(0, 3).map((subject: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {subject}
                    </span>
                  ))}
                  {classItem.subjects.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{classItem.subjects.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Add Class Modal
  const AddClassModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={() => {
            setShowAddClassModal(false);
            setAddClassForm({ name: '', sections: '', teachers: '', subjects: '', classTeacher: '' });
            setAddClassError(null);
          }}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-6 text-gray-900">Add New Class</h2>
        {addClassError && <div className="mb-4 text-red-600 text-sm">{addClassError}</div>}
        <form
          onSubmit={e => {
            e.preventDefault();
            // Validation
            if (!addClassForm.name.trim() || !addClassForm.sections.trim() || !addClassForm.teachers.trim() || !addClassForm.subjects.trim() || !addClassForm.classTeacher.trim()) {
              setAddClassError('All fields are required.');
              return;
            }
            if (isNaN(Number(addClassForm.sections)) || isNaN(Number(addClassForm.teachers))) {
              setAddClassError('Sections and Teachers must be numbers.');
              return;
            }
            // Add new class
            setClassesData((prev: typeof classesData) => [
              ...prev,
              {
                id: prev.length ? Math.max(...prev.map((c: typeof classesData[0]) => c.id)) + 1 : 1,
                name: addClassForm.name,
                totalStudents: 0,
                sections: Number(addClassForm.sections),
                teachers: Number(addClassForm.teachers),
                subjects: addClassForm.subjects.split(',').map((s: string) => s.trim()).filter(Boolean),
                classTeacher: addClassForm.classTeacher,
              },
            ]);
            setShowAddClassModal(false);
            setAddClassForm({ name: '', sections: '', teachers: '', subjects: '', classTeacher: '' });
            setAddClassError(null);
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Class Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addClassForm.name}
              onChange={e => setAddClassForm((f: typeof addClassForm) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Sections</label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addClassForm.sections}
              onChange={e => setAddClassForm((f: typeof addClassForm) => ({ ...f, sections: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Teachers</label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addClassForm.teachers}
              onChange={e => setAddClassForm((f: typeof addClassForm) => ({ ...f, teachers: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Subjects <span className="text-xs text-gray-400">(comma separated)</span></label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addClassForm.subjects}
              onChange={e => setAddClassForm((f: typeof addClassForm) => ({ ...f, subjects: e.target.value }))}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Class Teacher</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addClassForm.classTeacher}
              onChange={e => setAddClassForm((f: typeof addClassForm) => ({ ...f, classTeacher: e.target.value }))}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setShowAddClassModal(false);
                setAddClassForm({ name: '', sections: '', teachers: '', subjects: '', classTeacher: '' });
                setAddClassError(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            >
              Add Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Sections View Screen
  const SectionsView = () => {
    const sections =
      selectedClass && sectionsData[selectedClass.id]
        ? sectionsData[selectedClass.id]
        : [];
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setSelectedClass(null)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 flex items-center gap-1"
          >
            ← Back to Classes
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedClass ? `${selectedClass.name} - Sections` : 'Sections'}</h2>
              <p className="text-gray-500 mt-1">Class Teacher: {selectedClass ? selectedClass.classTeacher : ''}</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setShowAddSectionModal(true)}
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section: Section) => (
            <div
              key={section.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow group relative"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded hover:bg-green-100 text-green-600"
                    title="Edit Section"
                    onClick={e => {
                      e.stopPropagation();
                      // Open edit modal (reuse AddSectionModal with prefilled values)
                      setAddSectionForm({
                        id: section.id,
                        name: section.name,
                        students: String(section.students),
                        teacher: section.teacher,
                        room: section.room,
                        avgAttendance: String(section.avgAttendance),
                      });
                      setShowAddSectionModal(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded hover:bg-red-100 text-red-600"
                    title="Delete Section"
                    onClick={e => {
                      e.stopPropagation();
                      if (window.confirm(`Are you sure you want to delete ${section.name}?`)) {
                        if (selectedClass) {
                          setSectionsData(prev => {
                            const classId = selectedClass.id;
                            return {
                              ...prev,
                              [classId]: prev[classId].filter(s => s.id !== section.id),
                            };
                          });
                        }
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div onClick={() => setSelectedSection(section)} className="cursor-pointer">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{section.name}</h3>
                <p className="text-sm text-gray-500 mb-1">Teacher: {section.teacher}</p>
                <p className="text-sm text-gray-500 mb-4">Room: {section.room}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{section.students}</p>
                    <p className="text-xs text-gray-500">Students</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{section.avgAttendance}%</p>
                    <p className="text-xs text-gray-500">Attendance</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">View Students</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Add Section Modal
  const AddSectionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={() => {
            setShowAddSectionModal(false);
            setAddSectionForm({ id: '', name: '', students: '', teacher: '', room: '', avgAttendance: '' });
            setAddSectionError(null);
          }}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-6 text-gray-900">Add New Section</h2>
        {addSectionError && <div className="mb-4 text-red-600 text-sm">{addSectionError}</div>}
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!addSectionForm.id.trim() || !addSectionForm.name.trim() || !addSectionForm.students.trim() || !addSectionForm.teacher.trim() || !addSectionForm.room.trim() || !addSectionForm.avgAttendance.trim()) {
              setAddSectionError('All fields are required.');
              return;
            }
            if (isNaN(Number(addSectionForm.students)) || isNaN(Number(addSectionForm.avgAttendance))) {
              setAddSectionError('Students and Attendance must be numbers.');
              return;
            }
            if (!selectedClass) {
              setAddSectionError('No class selected.');
              return;
            }
            setSectionsData(prev => {
              const classId = selectedClass.id;
              const newSection: Section = {
                id: addSectionForm.id,
                name: addSectionForm.name,
                students: Number(addSectionForm.students),
                teacher: addSectionForm.teacher,
                room: addSectionForm.room,
                avgAttendance: Number(addSectionForm.avgAttendance),
              };
              return {
                ...prev,
                [classId]: prev[classId] ? [...prev[classId], newSection] : [newSection],
              };
            });
            setShowAddSectionModal(false);
            setAddSectionForm({ id: '', name: '', students: '', teacher: '', room: '', avgAttendance: '' });
            setAddSectionError(null);
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Section ID (e.g. A, B, C)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addSectionForm.id}
              onChange={e => setAddSectionForm((f: typeof addSectionForm) => ({ ...f, id: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Section Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addSectionForm.name}
              onChange={e => setAddSectionForm((f: typeof addSectionForm) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Number of Students</label>
            <input
              type="number"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addSectionForm.students}
              onChange={e => setAddSectionForm((f: typeof addSectionForm) => ({ ...f, students: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Section Teacher</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addSectionForm.teacher}
              onChange={e => setAddSectionForm((f: typeof addSectionForm) => ({ ...f, teacher: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Room</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addSectionForm.room}
              onChange={e => setAddSectionForm((f: typeof addSectionForm) => ({ ...f, room: e.target.value }))}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Average Attendance (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={addSectionForm.avgAttendance}
              onChange={e => setAddSectionForm((f: typeof addSectionForm) => ({ ...f, avgAttendance: e.target.value }))}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setShowAddSectionModal(false);
                setAddSectionForm({ id: '', name: '', students: '', teacher: '', room: '', avgAttendance: '' });
                setAddSectionError(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            >
              Add Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Students List Screen
  const StudentsList = () => {
    const sectionKey =
      selectedClass && selectedSection
        ? `${selectedClass.id}-${selectedSection.id}`
        : '';
    const students = sectionKey ? studentsData[sectionKey] || [] : [];
    
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setSelectedSection(null)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3 flex items-center gap-1"
          >
            ← Back to Sections
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedClass ? selectedClass.name : ''}{selectedSection ? ` - ${selectedSection.name}` : ''}
              </h2>
              <p className="text-gray-500 mt-1">
                {selectedSection
                  ? <>Section Teacher: {selectedSection.teacher} &bull; Room: {selectedSection.room}</>
                  : 'Section details unavailable'}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Add Student
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.filter((student: Student) => 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.roll.includes(searchTerm)
          ).map((student: Student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-500">Roll: {student.roll}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Attendance</p>
                  <p className="text-lg font-bold text-blue-600">{student.attendance}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Avg Score</p>
                  <p className="text-lg font-bold text-green-600">{student.avgScore}%</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{student.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Student Details Modal
  const StudentDetailsModal = () => {
    if (!selectedStudent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h3>
                  <p className="text-gray-500">
                    Roll No: {selectedStudent.roll}
                    {selectedClass && selectedSection
                      ? ` • ${selectedClass.name} - ${selectedSection.name}`
                      : ''}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)} 
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Academic Performance</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-bold text-blue-600">{selectedStudent.avgScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attendance</span>
                    <span className="font-bold text-green-600">{selectedStudent.attendance}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Quick Stats</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth</span>
                    <span className="font-medium text-gray-900">{selectedStudent.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age</span>
                    <span className="font-medium text-gray-900">15 years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-blue-600" />
                Personal Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Father's Name</p>
                  <p className="font-medium text-gray-900">{selectedStudent.father}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mother's Name</p>
                  <p className="font-medium text-gray-900">{selectedStudent.mother}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {selectedStudent.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {selectedStudent.email}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {selectedStudent.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Details
              </button>
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Report
              </button>
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderClassesContent = () => {
    if (selectedSection) {
      return <SectionDetailsScreen selectedSection={selectedSection} selectedClass={selectedClass} setSelectedSection={setSelectedSection} />;
    }
    if (selectedClass) {
      return <SectionsView />;
    }
    return <ClassesOverview />;
  };

  const renderContent = () => {
    if (activeScreen === 'classes') {
      return renderClassesContent();
    }

    return (
      <div className="text-center py-12">
       {renderClassesContent()}
      </div>
    );
  };

  // const menuItems = [
  
  //   { id: 'classes', label: 'Classes', icon: <School className="w-5 h-5" /> },
  
  // ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Removed StudentDetailsModal - student details are not shown on section click anymore */}
      {showAddClassModal && <AddClassModal />}
      {showAddSectionModal && <AddSectionModal />}
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;