import React, { useState, useEffect } from 'react';
import { Calendar, Upload, ChevronDown, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const STORAGE_KEY = 'teacherHomeworkList';

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

const AddHomeWorkScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editingHomework = location.state?.homework as Homework | null;

    const [homeworkForm, setHomeworkForm] = useState({
        class: 'Class 6-A',
        date: new Date().toISOString().split('T')[0],
        subject: 'Mathematics',
        title: '',
        document: '',
        dueDate: ''
    });

    const classes = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 8-A'];
    const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];

    useEffect(() => {
        if (editingHomework) {
            setHomeworkForm({
                class: editingHomework.class,
                date: editingHomework.date,
                subject: editingHomework.subject,
                title: editingHomework.title,
                document: editingHomework.document || '',
                dueDate: editingHomework.dueDate
            });
        }
    }, [editingHomework]);

    const handleHomeworkSubmit = () => {
        if (!homeworkForm.title || !homeworkForm.dueDate) {
            alert('Please fill in all required fields (Title and Due Date)');
            return;
        }

        const stored = localStorage.getItem(STORAGE_KEY);
        let homeworkList: Homework[] = [];
        if (stored) {
            try {
                homeworkList = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading homework:', e);
            }
        }

        let updatedList: Homework[];
        
        if (editingHomework) {
            // Update existing homework
            updatedList = homeworkList.map(hw => 
                hw.id === editingHomework.id 
                    ? { ...hw, ...homeworkForm, status: hw.status }
                    : hw
            );
            alert('Homework updated successfully!');
        } else {
            // Add new homework
            const newHomework: Homework = {
                id: Date.now(),
                ...homeworkForm,
                status: 'active'
            };
            updatedList = [newHomework, ...homeworkList];
            alert('Homework posted successfully!');
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        navigate('/teacher/homework/create');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setHomeworkForm({ ...homeworkForm, document: file.name });
        }
    };

    return (
        <div className="flex-1 bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 shadow-lg">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/teacher/homework/create')}
                        className="mb-3 flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span>Back to List</span>
                    </button>
                    <h1 className="text-2xl font-bold">
                        {editingHomework ? 'Edit Homework' : 'Add New Homework'}
                    </h1>
                    <p className="text-blue-100 text-sm mt-1">
                        {editingHomework ? 'Update homework assignment details' : 'Create a new homework assignment'}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                {editingHomework ? 'Edit Details' : 'Homework Details'}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {/* Class Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Class <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={homeworkForm.class}
                                        onChange={(e) => setHomeworkForm({ ...homeworkForm, class: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {classes.map(cls => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Assignment Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={homeworkForm.date}
                                        onChange={(e) => setHomeworkForm({ ...homeworkForm, date: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={homeworkForm.subject}
                                        onChange={(e) => setHomeworkForm({ ...homeworkForm, subject: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {subjects.map(subj => (
                                            <option key={subj} value={subj}>{subj}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Homework Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Homework Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={homeworkForm.title}
                                    onChange={(e) => setHomeworkForm({ ...homeworkForm, title: e.target.value })}
                                    placeholder="e.g., Chapter 5 - Algebra Problems"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Upload Document */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Document (Optional)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <Upload className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                                        {homeworkForm.document ? (
                                            <p className="text-sm text-gray-600 font-medium">📄 {homeworkForm.document}</p>
                                        ) : (
                                            <p className="text-sm text-gray-600">Click to upload document</p>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={homeworkForm.dueDate}
                                        onChange={(e) => setHomeworkForm({ ...homeworkForm, dueDate: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-2">
                                <button
                                    onClick={handleHomeworkSubmit}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    {editingHomework ? '✓ Update Homework' : '+ Post Homework'}
                                </button>

                                <button
                                    onClick={() => navigate('/teacher/homework/create')}
                                    className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Homework Preview */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Recent Homework</h2>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {(() => {
                                    const stored = localStorage.getItem(STORAGE_KEY);
                                    let list = [];
                                    if (stored) {
                                        try {
                                            list = JSON.parse(stored);
                                        } catch (e) {}
                                    }
                                    return list.length;
                                })()} total
                            </span>
                        </div>

                        {(() => {
                            const stored = localStorage.getItem(STORAGE_KEY);
                            let homeworkList: Homework[] = [];
                            if (stored) {
                                try {
                                    homeworkList = JSON.parse(stored);
                                } catch (e) {}
                            }
                            const displayedRecent = homeworkList.slice(0, 3);

                            return homeworkList.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-5xl mb-4">📚</div>
                                    <p className="text-gray-500 font-medium">No homework yet</p>
                                    <p className="text-sm text-gray-400 mt-2">Your created homework will appear here</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {displayedRecent.map(hw => (
                                        <div key={hw.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                                                        {hw.class}
                                                    </span>
                                                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium ml-2">
                                                        {hw.subject}
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className="font-semibold text-gray-800 mb-1">{hw.title}</h3>
                                            <div className="text-sm text-gray-600">
                                                <p>Posted: {hw.date}</p>
                                                <p>Due: {hw.dueDate}</p>
                                                {hw.document && <p className="text-blue-600 mt-1">📎 {hw.document}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHomeWorkScreen;
