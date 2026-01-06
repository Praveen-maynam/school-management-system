import React, { useState } from 'react';
import { Calendar, BookOpen, ChevronLeft, Plus, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type HomeworkStatus = 'active' | 'completed';

interface Homework {
    id: number;
    subject: string;
    chapter: string;
    dueDate: string;
    status: HomeworkStatus;
}

const CreateHomeWorkScreen = () => {
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState('Class 6-A');
    const [selectedDate, setSelectedDate] = useState('24-12-2025');
    const [homeworkTab, setHomeworkTab] = useState<HomeworkStatus>('active');

    const homeworks: Homework[] = [
        { id: 1, subject: 'Mathematics', chapter: 'Chapter 5 - Algebra Problems', dueDate: 'Dec 15, 2025', status: 'active' },
        { id: 2, subject: 'Mathematics', chapter: 'Chapter 5 - Algebra Problems', dueDate: 'Dec 15, 2025', status: 'active' },
        { id: 3, subject: 'Mathematics', chapter: 'Chapter 5 - Algebra Problems', dueDate: 'Dec 15, 2025', status: 'active' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="space-y-6 p-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
                    <button
                        onClick={() => navigate('/teacher/dashboard')}
                        className="mb-4 flex items-center gap-2 text-white hover:text-blue-100"
                    >
                        <ChevronLeft size={20} />
                        <span>Back</span>
                    </button>
                    <h1 className="text-2xl font-bold">Add Homework</h1>
                </div>

                {/* Homework Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    {/* Class and Date Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Class 6-A</option>
                            <option>Class 6-B</option>
                            <option>Class 7-A</option>
                        </select>

                        <div className="relative">
                            <input
                                type="text"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Calendar className="absolute right-3 top-3.5 text-gray-400" size={20} />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-3xl font-bold text-gray-800">40</div>
                            <div className="text-sm text-gray-500">
                                {homeworkTab === 'active' ? 'Active homework' : 'Completed homeworks'}
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-3xl font-bold text-gray-800">40</div>
                            <div className="text-sm text-gray-500">
                                {homeworkTab === 'active' ? 'Active homework' : 'Completed homeworks'}
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setHomeworkTab('active')}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${homeworkTab === 'active'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            📋 Active
                        </button>
                        <button
                            onClick={() => setHomeworkTab('completed')}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${homeworkTab === 'completed'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            ✅ Completed
                        </button>
                    </div>

                    {/* Homework List */}
                    <div className="space-y-3 mb-6">
                        {homeworks.map((homework) => (
                            <div key={homework.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <BookOpen className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-800">{homework.subject}</div>
                                        <div className="text-sm text-gray-600">{homework.chapter}</div>
                                        <div className="text-xs text-gray-500">Due: {homework.dueDate}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                                        Pending
                                    </span>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                                        <Edit size={16} />
                                        Edit Homework
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Homework Button */}
                    <button
                        onClick={() => navigate('/teacher/homework/add')}
                        className="w-full border-2 border-dashed border-blue-300 rounded-lg py-3 text-blue-600 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                    >
                        <Plus size={20} />
                        Add Homework
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateHomeWorkScreen;
