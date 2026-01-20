import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HomeworkManager from '../../../utils/homeworkManager';

interface Homework {
    id: number;
    class: string;
    date: string;
    subject: string;
    title: string;
    document?: string;
    dueDate: string;
    status: 'active' | 'completed';
    createdAt?: string;
    updatedAt?: string;
}

// Teacher Portal
const CreateHomeWorkScreen = () => {
    const navigate = useNavigate();
    const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
    const [selectedClass, setSelectedClass] = useState('Class 6-A');
    const [homeworkTab, setHomeworkTab] = useState('active');
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingHomework, setEditingHomework] = useState<Homework | null>(null);

    const classes = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 8-A'];

    const loadHomework = () => {
        setHomeworkList(HomeworkManager.getAll());
    };

    useEffect(() => {
        loadHomework();

        const handleUpdate = () => loadHomework();
        window.addEventListener('homeworkUpdated', handleUpdate);

        return () => window.removeEventListener('homeworkUpdated', handleUpdate);
    }, []);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this homework?')) {
            if (HomeworkManager.delete(id)) {
                alert('Homework deleted successfully!');
            }
        }
    };

    const handleEdit = (homework: Homework) => {
        setEditingHomework(homework);
        setIsAddingNew(true);
    };

    const filteredHomework = homeworkList.filter(hw =>
        hw.class === selectedClass && hw.status === homeworkTab
    );

    const activeCount = homeworkList.filter(hw => hw.status === 'active').length;
    const completedCount = homeworkList.filter(hw => hw.status === 'completed').length;

    if (isAddingNew) {
        return (
            <AddHomeworkForm
                onBack={() => {
                    setIsAddingNew(false);
                    setEditingHomework(null);
                }}
                editingHomework={editingHomework}
            />
        );
    }

    return (
        <div className="flex-1 bg-gray-50">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
                    <button
                        onClick={() => navigate('/teacher/dashboard')}
                        className="mb-4 flex items-center gap-2 text-white hover:text-blue-100"
                    >
                        <ChevronLeft size={20} />
                        <span>Back to Dashboard</span>
                    </button>
                    <h1 className="text-2xl font-bold">📚 Homework Management</h1>
                    <p className="text-blue-100 text-sm mt-1">Create, edit, and manage homework assignments</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                        >
                            {classes.map(cls => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                            <div className="text-3xl font-bold text-yellow-700">{activeCount}</div>
                            <div className="text-sm text-yellow-600">Active Homework</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                            <div className="text-3xl font-bold text-green-700">{completedCount}</div>
                            <div className="text-sm text-green-600">Completed Homework</div>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setHomeworkTab('active')}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                                homeworkTab === 'active'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            📋 Active
                        </button>
                        <button
                            onClick={() => setHomeworkTab('completed')}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                                homeworkTab === 'completed'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            ✅ Completed
                        </button>
                    </div>

                    <div className="space-y-3 mb-6">
                        {filteredHomework.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                                <div className="text-gray-400 text-5xl mb-4">📚</div>
                                <p className="text-gray-500 font-medium">No {homeworkTab} homework</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    {homeworkTab === 'active'
                                        ? 'Click "Add New Homework" to create your first assignment'
                                        : 'No completed homework for this class'}
                                </p>
                            </div>
                        ) : (
                            filteredHomework.map((homework) => (
                                <div key={homework.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 gap-4">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="bg-blue-100 p-3 rounded-lg">
                                            <BookOpen className="text-blue-600" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-800">{homework.subject}</div>
                                            <div className="text-sm text-gray-600">{homework.title}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Posted: {homework.date} | Due: {homework.dueDate}
                                            </div>
                                            {homework.document && (
                                                <div className="text-xs text-blue-600 mt-1">📎 {homework.document}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(homework)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(homework.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <button
                        onClick={() => setIsAddingNew(true)}
                        className="w-full border-2 border-dashed border-blue-300 rounded-lg py-4 text-blue-600 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                    >
                        <Plus size={24} />
                        Add New Homework
                    </button>
                </div>
            </div>
        </div>
    );
};

// Add/Edit Homework Form
const AddHomeworkForm = ({ onBack, editingHomework }: { onBack: () => void; editingHomework: Homework | null }) => {
    const [formData, setFormData] = useState(
        editingHomework || {
            class: 'Class 6-A',
            subject: '',
            title: '',
            document: '',
            dueDate: '',
            status: 'active'
        }
    );

    const classes = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 8-A'];
    const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'];

    const handleSubmit = () => {
        if (!formData.subject || !formData.title || !formData.dueDate) {
            alert('Please fill in all required fields');
            return;
        }

        const homeworkData = {
            ...formData,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        if (editingHomework) {
            HomeworkManager.update(editingHomework.id, homeworkData);
            alert('Homework updated successfully!');
        } else {
            HomeworkManager.add(homeworkData);
            alert('Homework created successfully!');
        }

        onBack();
    };

    return (
        <div className="flex-1 bg-gray-50">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
                    <button onClick={onBack} className="mb-4 flex items-center gap-2 text-white hover:text-blue-100">
                        <ChevronLeft size={20} />
                        <span>Back</span>
                    </button>
                    <h1 className="text-2xl font-bold">{editingHomework ? 'Edit' : 'Add New'} Homework</h1>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                        <select
                            value={formData.class}
                            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {classes.map(cls => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Subject</option>
                            {subjects.map(subj => (
                                <option key={subj} value={subj}>{subj}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Homework Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Chapter 5 - Algebra Problems"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Document Name (Optional)</label>
                        <input
                            type="text"
                            value={formData.document}
                            onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., worksheet.pdf"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                        <input
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'completed' })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            {editingHomework ? 'Update' : 'Create'} Homework
                        </button>
                        <button
                            onClick={onBack}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateHomeWorkScreen;
