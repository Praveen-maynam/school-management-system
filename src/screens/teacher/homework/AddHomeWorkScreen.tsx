import React, { useState } from 'react';
import { Calendar, Upload, X, ChevronDown } from 'lucide-react';

const AddHomeWorkScreen = () => {
    const [homeworkList, setHomeworkList] = useState([
        {
            id: 1,
            class: 'Class 6-A',
            date: '2025-01-15',
            subject: 'Mathematics',
            title: 'Chapter 5 - Algebra Problems',
            dueDate: '2025-01-20',
            document: 'algebra_problems.pdf'
        }
    ]);

    // Homework form state
    const [homeworkForm, setHomeworkForm] = useState({
        class: 'Class 6-A',
        date: '2025-01-02',
        subject: 'Mathematics',
        title: '',
        document: '',
        dueDate: ''
    });

    const classes = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 8-A'];
    const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];

    const handleHomeworkSubmit = () => {
        if (homeworkForm.title && homeworkForm.dueDate) {
            const newHomework = {
                id: homeworkList.length + 1,
                ...homeworkForm
            };
            setHomeworkList([newHomework, ...homeworkList]);
            setHomeworkForm({
                class: 'Class 6-A',
                date: '2025-01-02',
                subject: 'Mathematics',
                title: '',
                document: '',
                dueDate: ''
            });
            alert('Homework posted successfully!');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setHomeworkForm({ ...homeworkForm, document: file.name });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 shadow-lg">
                <h1 className="text-2xl font-bold">Add Homework</h1>
                <p className="text-blue-100 text-sm mt-1">Create and manage homework assignments</p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Add Homework Form */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Add Homework</h2>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Class Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Homework Title</label>
                                <input
                                    type="text"
                                    value={homeworkForm.title}
                                    onChange={(e) => setHomeworkForm({ ...homeworkForm, title: e.target.value })}
                                    placeholder="Enter homework title"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Upload Document */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
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
                                            <p className="text-sm text-gray-600">{homeworkForm.document}</p>
                                        ) : (
                                            <p className="text-sm text-gray-600">Click to upload document</p>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
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

                            {/* Submit Button */}
                            <button
                                onClick={handleHomeworkSubmit}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
                            >
                                Post Homework
                            </button>
                        </div>
                    </div>

                    {/* Homework List */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Homework</h2>
                        <div className="space-y-4">
                            {homeworkList.map(hw => (
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHomeWorkScreen;
