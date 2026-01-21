import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  subject: string;
}

type AttendanceStatus = 'Present' | 'Fullday Absent';

interface AttendanceRecord {
  teacherId: number;
  status: AttendanceStatus;
}

const mockTeachers: Teacher[] = [
  { id: 1, name: 'Alice Johnson', subject: 'English' },
  { id: 2, name: 'Bob Smith', subject: 'Math' },
  { id: 3, name: 'Carol Brown', subject: 'Science' },
  { id: 4, name: 'David Lee', subject: 'History' },
  { id: 5, name: 'Eva Green', subject: 'Art' },
];

const AttendanceScreen: React.FC = () => {
  const [date, setDate] = useState('2025-12-24');
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(
    mockTeachers.map((t) => ({ teacherId: t.id, status: 'Present' }))
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalTeachers = mockTeachers.length;
  const presentCount = attendance.filter((a) => a.status === 'Present').length;

  const handleStatusChange = (teacherId: number, status: AttendanceStatus) => {
    setAttendance((prev) =>
      prev.map((a) =>
        a.teacherId === teacherId ? { ...a, status } : a
      )
    );
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setSuccess(false);
  };

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-8 bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button className="text-blue-600 hover:bg-blue-100 rounded-full p-2">
          {/* Back icon placeholder */}
          <span className="sr-only">Back</span>
        </button>
        <h1 className="text-2xl font-bold text-blue-700">Attendance</h1>
      </div>

      {/* Selector Card */}
      <div className="bg-gray-50 rounded-xl shadow p-4 mb-4">
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Teachers</label>
          <select className="w-full rounded border-gray-300 px-3 py-2" disabled>
            <option>Teachers</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="border rounded px-3 py-2 w-full max-w-[180px]"
          />
        </div>
        <div className="flex justify-between mt-4 border-t pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">{totalTeachers}</div>
            <div className="text-gray-500 text-xs">Total Teachers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
            <div className="text-gray-500 text-xs">Present</div>
          </div>
        </div>
      </div>

      {/* Upload Attendance Button */}
      <button
        className="w-full border-2 border-blue-500 text-blue-600 font-semibold rounded-lg py-2 mb-4 flex items-center justify-center gap-2 hover:bg-blue-50"
        onClick={handleUpload}
        disabled={loading}
      >
        <span className="text-lg">&#8682;</span> Upload Attendance
      </button>
      {success && <div className="text-green-600 text-center mb-2">Attendance uploaded!</div>}

      {/* Teacher List */}
      <div className="flex-1 overflow-y-auto mb-4">
        {mockTeachers.map((teacher, idx) => {
          const record = attendance.find((a) => a.teacherId === teacher.id)!;
          return (
            <div
              key={teacher.id}
              className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4 border"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {teacher.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{teacher.name}</div>
                <div className="text-gray-500 text-sm">Subject : {teacher.subject}</div>
                <div className="inline-block bg-gray-100 border px-2 py-0.5 rounded text-xs mt-1 text-gray-700">ID:- {teacher.id.toString().padStart(5, '0')}</div>
              </div>
              <div className="flex flex-col gap-2 min-w-[160px]">
                <div className="flex gap-2">
                  <button
                    className={`px-4 py-1 rounded-full border-2 font-semibold text-sm transition ${record.status === 'Present' ? 'border-green-500 text-green-600 bg-green-50' : 'border-gray-300 text-gray-600 bg-white'}`}
                    onClick={() => handleStatusChange(teacher.id, 'Present')}
                  >
                    Present
                  </button>
                  <div className="relative">
                    <button
                      className={`px-4 py-1 rounded-full border-2 font-semibold text-sm transition ${record.status === 'Fullday Absent' ? 'border-red-500 text-red-600 bg-red-50' : 'border-gray-300 text-gray-600 bg-white'}`}
                      onClick={() => handleStatusChange(teacher.id, 'Fullday Absent')}
                    >
                      Fullday Absent
                    </button>
                  </div>
                </div>
              </div>
              <div className="ml-2 text-gray-400 font-bold">{idx + 1}</div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg text-lg mt-auto hover:bg-blue-700 transition"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default AttendanceScreen;
