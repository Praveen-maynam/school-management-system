import React, { useState, useEffect } from 'react';
import { FileText, Download, BookOpen, Atom, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HomeworkManager from '../../utils/homeworkManager';

interface Homework {
    id: number;
    class: string;
    date: string;
    subject: string;
    title: string;
    document?: string;
    dueDate: string;
    status: 'active' | 'completed';
}

// Parent Portal
const HomeWork = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('active');
    const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
    const studentClass = 'Class 6-A'; // This could come from user context/auth

    const loadHomework = () => {
        const allHomework = HomeworkManager.getByClass(studentClass);
        setHomeworkList(allHomework);
    };

    useEffect(() => {
        loadHomework();

        const handleUpdate = () => loadHomework();
        window.addEventListener('homeworkUpdated', handleUpdate);

        return () => window.removeEventListener('homeworkUpdated', handleUpdate);
    }, [studentClass]);

    const currentData = homeworkList.filter(hw => hw.status === activeTab);
    const activeCount = homeworkList.filter(hw => hw.status === 'active').length;
    const completedCount = homeworkList.filter(hw => hw.status === 'completed').length;

    const getIcon = (subject: string) => {
        if (subject === 'Mathematics') return <BookOpen className="w-6 h-6 text-blue-600" />;
        if (subject === 'Science') return <Atom className="w-6 h-6 text-green-600" />;
        return <BookOpen className="w-6 h-6 text-purple-600" />;
    };

    return (
        <div className="flex-1 bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg p-6 mb-6">
                    <div className="flex items-center mb-4">
                        <button onClick={() => navigate('/parent/dashboard')} className="mr-4">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-semibold">Homework - {studentClass}</h1>
                    </div>

                    <div className="bg-white rounded-lg p-4 flex justify-around">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-500">{activeCount}</div>
                            <div className="text-sm text-gray-600">Active</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-500">{completedCount}</div>
                            <div className="text-sm text-gray-600">Completed</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white px-4 pt-4 pb-2 rounded-t-lg flex gap-2">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                            activeTab === 'active'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        <FileText className="w-4 h-4 inline mr-2" />
                        Active
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
                            activeTab === 'completed'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        ✓ Completed
                    </button>
                </div>

                <div className="bg-white rounded-b-lg p-4 space-y-3">
                    {currentData.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                            <div className="text-gray-400 text-5xl mb-4">📚</div>
                            <p className="text-gray-500 font-medium">No {activeTab} homework</p>
                        </div>
                    ) : (
                        currentData.map((homework) => (
                            <div key={homework.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        {getIcon(homework.subject)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-semibold text-gray-900">{homework.subject}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                homework.status === 'active'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-green-100 text-green-700'
                                            }`}>
                                                {homework.status === 'active' ? 'Pending' : 'Completed'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{homework.title}</p>
                                        <p className="text-xs text-gray-500 mb-3">Due: {homework.dueDate}</p>
                                        {homework.document && (
                                            <button className="w-full bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-purple-700 transition-colors">
                                                <Download className="w-4 h-4" />
                                                Download: {homework.document}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeWork;