// import React, { useState, useEffect } from 'react';
// import { BookOpen, ChevronLeft, Plus, Edit, Trash2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import HomeworkManager from '../../../utils/homeworkManager';

// interface Homework {
//     id: number;
//     class: string;
//     date: string;
//     subject: string;
//     title: string;
//     document?: string;
//     dueDate: string;
//     status: 'active' | 'completed';
//     createdAt?: string;
//     updatedAt?: string;
// }

// // Teacher Portal
// const CreateHomeWorkScreen = () => {
//     const navigate = useNavigate();
//     const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
//     const [selectedClass, setSelectedClass] = useState('Class 6-A');
//     const [homeworkTab, setHomeworkTab] = useState('active');
//     const [isAddingNew, setIsAddingNew] = useState(false);
//     const [editingHomework, setEditingHomework] = useState<Homework | null>(null);

//     const classes = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 8-A'];

//     const loadHomework = () => {
//         setHomeworkList(HomeworkManager.getAll());
//     };

//     useEffect(() => {
//         loadHomework();

//         const handleUpdate = () => loadHomework();
//         window.addEventListener('homeworkUpdated', handleUpdate);

//         return () => window.removeEventListener('homeworkUpdated', handleUpdate);
//     }, []);

//     const handleDelete = (id: number) => {
//         if (window.confirm('Are you sure you want to delete this homework?')) {
//             if (HomeworkManager.delete(id)) {
//                 alert('Homework deleted successfully!');
//             }
//         }
//     };

//     const handleEdit = (homework: Homework) => {
//         setEditingHomework(homework);
//         setIsAddingNew(true);
//     };

//     const filteredHomework = homeworkList.filter(hw =>
//         hw.class === selectedClass && hw.status === homeworkTab
//     );

//     const activeCount = homeworkList.filter(hw => hw.status === 'active').length;
//     const completedCount = homeworkList.filter(hw => hw.status === 'completed').length;

//     if (isAddingNew) {
//         return (
//             <AddHomeworkForm
//                 onBack={() => {
//                     setIsAddingNew(false);
//                     setEditingHomework(null);
//                 }}
//                 editingHomework={editingHomework}
//             />
//         );
//     }

//     return (
//         <div className="flex-1 bg-gray-50">
//             <div className="max-w-7xl mx-auto p-6 space-y-6">
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
//                     <button
//                         onClick={() => navigate('/teacher/dashboard')}
//                         className="mb-4 flex items-center gap-2 text-white hover:text-blue-100"
//                     >
//                         <ChevronLeft size={20} />
//                         <span>Back to Dashboard</span>
//                     </button>
//                     <h1 className="text-2xl font-bold">📚 Homework Management</h1>
//                     <p className="text-blue-100 text-sm mt-1">Create, edit, and manage homework assignments</p>
//                 </div>

//                 <div className="bg-white rounded-2xl border border-gray-200 p-6">
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
//                         <select
//                             value={selectedClass}
//                             onChange={(e) => setSelectedClass(e.target.value)}
//                             className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
//                         >
//                             {classes.map(cls => (
//                                 <option key={cls} value={cls}>{cls}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                         <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
//                             <div className="text-3xl font-bold text-yellow-700">{activeCount}</div>
//                             <div className="text-sm text-yellow-600">Active Homework</div>
//                         </div>
//                         <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
//                             <div className="text-3xl font-bold text-green-700">{completedCount}</div>
//                             <div className="text-sm text-green-600">Completed Homework</div>
//                         </div>
//                     </div>

//                     <div className="flex gap-2 mb-6">
//                         <button
//                             onClick={() => setHomeworkTab('active')}
//                             className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
//                                 homeworkTab === 'active'
//                                     ? 'bg-blue-600 text-white shadow-lg'
//                                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                             }`}
//                         >
//                             📋 Active
//                         </button>
//                         <button
//                             onClick={() => setHomeworkTab('completed')}
//                             className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
//                                 homeworkTab === 'completed'
//                                     ? 'bg-blue-600 text-white shadow-lg'
//                                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                             }`}
//                         >
//                             ✅ Completed
//                         </button>
//                     </div>

//                     <div className="space-y-3 mb-6">
//                         {filteredHomework.length === 0 ? (
//                             <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
//                                 <div className="text-gray-400 text-5xl mb-4">📚</div>
//                                 <p className="text-gray-500 font-medium">No {homeworkTab} homework</p>
//                                 <p className="text-sm text-gray-400 mt-2">
//                                     {homeworkTab === 'active'
//                                         ? 'Click "Add New Homework" to create your first assignment'
//                                         : 'No completed homework for this class'}
//                                 </p>
//                             </div>
//                         ) : (
//                             filteredHomework.map((homework) => (
//                                 <div key={homework.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 gap-4">
//                                     <div className="flex items-center gap-3 flex-1">
//                                         <div className="bg-blue-100 p-3 rounded-lg">
//                                             <BookOpen className="text-blue-600" size={24} />
//                                         </div>
//                                         <div className="flex-1">
//                                             <div className="font-semibold text-gray-800">{homework.subject}</div>
//                                             <div className="text-sm text-gray-600">{homework.title}</div>
//                                             <div className="text-xs text-gray-500 mt-1">
//                                                 Posted: {homework.date} | Due: {homework.dueDate}
//                                             </div>
//                                             {homework.document && (
//                                                 <div className="text-xs text-blue-600 mt-1">📎 {homework.document}</div>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <button
//                                             onClick={() => handleEdit(homework)}
//                                             className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
//                                         >
//                                             <Edit size={16} />
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(homework.id)}
//                                             className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
//                                         >
//                                             <Trash2 size={16} />
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     <button
//                         onClick={() => setIsAddingNew(true)}
//                         className="w-full border-2 border-dashed border-blue-300 rounded-lg py-4 text-blue-600 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
//                     >
//                         <Plus size={24} />
//                         Add New Homework
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Add/Edit Homework Form
// const AddHomeworkForm = ({ onBack, editingHomework }: { onBack: () => void; editingHomework: Homework | null }) => {
//     const [formData, setFormData] = useState(
//         editingHomework || {
//             class: 'Class 6-A',
//             subject: '',
//             title: '',
//             document: '',
//             dueDate: '',
//             status: 'active'
//         }
//     );

//     const classes = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 8-A'];
//     const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'];

//     const handleSubmit = () => {
//         if (!formData.subject || !formData.title || !formData.dueDate) {
//             alert('Please fill in all required fields');
//             return;
//         }

//         const homeworkData = {
//             ...formData,
//             date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
//         };

//         if (editingHomework) {
//             HomeworkManager.update(editingHomework.id, homeworkData);
//             alert('Homework updated successfully!');
//         } else {
//             HomeworkManager.add(homeworkData);
//             alert('Homework created successfully!');
//         }

//         onBack();
//     };

//     return (
//         <div className="flex-1 bg-gray-50">
//             <div className="max-w-4xl mx-auto p-6 space-y-6">
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
//                     <button onClick={onBack} className="mb-4 flex items-center gap-2 text-white hover:text-blue-100">
//                         <ChevronLeft size={20} />
//                         <span>Back</span>
//                     </button>
//                     <h1 className="text-2xl font-bold">{editingHomework ? 'Edit' : 'Add New'} Homework</h1>
//                 </div>

//                 <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
//                         <select
//                             value={formData.class}
//                             onChange={(e) => setFormData({ ...formData, class: e.target.value })}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             {classes.map(cls => (
//                                 <option key={cls} value={cls}>{cls}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
//                         <select
//                             value={formData.subject}
//                             onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">Select Subject</option>
//                             {subjects.map(subj => (
//                                 <option key={subj} value={subj}>{subj}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Homework Title *</label>
//                         <input
//                             type="text"
//                             value={formData.title}
//                             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="e.g., Chapter 5 - Algebra Problems"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Document Name (Optional)</label>
//                         <input
//                             type="text"
//                             value={formData.document}
//                             onChange={(e) => setFormData({ ...formData, document: e.target.value })}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="e.g., worksheet.pdf"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
//                         <input
//                             type="date"
//                             value={formData.dueDate}
//                             onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                         <select
//                             value={formData.status}
//                             onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'completed' })}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="active">Active</option>
//                             <option value="completed">Completed</option>
//                         </select>
//                     </div>

//                     <div className="flex gap-3 pt-4">
//                         <button
//                             onClick={handleSubmit}
//                             className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//                         >
//                             {editingHomework ? 'Update' : 'Create'} Homework
//                         </button>
//                         <button
//                             onClick={onBack}
//                             className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateHomeWorkScreen;








import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronLeft, Plus, Edit, Trash2, Calendar, Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';
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

    const getSubjectColor = (subject: string) => {
        const colors: { [key: string]: string } = {
            'Mathematics': 'from-blue-500 to-blue-600',
            'Science': 'from-green-500 to-green-600',
            'English': 'from-purple-500 to-purple-600',
            'Social Studies': 'from-orange-500 to-orange-600',
            'Hindi': 'from-pink-500 to-pink-600',
            'Computer Science': 'from-cyan-500 to-cyan-600',
        };
        return colors[subject] || 'from-gray-500 to-gray-600';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
                    <button
                        onClick={() => navigate('/teacher/dashboard')}
                        className="mb-4 flex items-center gap-2 text-white hover:text-blue-100 transition-colors bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30"
                    >
                        <ChevronLeft size={20} />
                        <span className="font-medium">Back to Dashboard</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                            <BookOpen size={32} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Homework Management</h1>
                            <p className="text-blue-100">Create, edit, and manage homework assignments for all classes</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                <AlertCircle className="text-blue-600" size={28} />
                            </div>
                            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Active</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-1">{activeCount}</div>
                        <div className="text-sm text-gray-600">Active Assignments</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={28} />
                            </div>
                            <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Done</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-1">{completedCount}</div>
                        <div className="text-sm text-gray-600">Completed Assignments</div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                                <BookOpen className="text-purple-600" size={28} />
                            </div>
                            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Total</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-1">{homeworkList.length}</div>
                        <div className="text-sm text-gray-600">Total Assignments</div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                    {/* Class Selector Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-200">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Class</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-80 bg-white font-medium text-gray-900 shadow-sm"
                        >
                            {classes.map(cls => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tab Buttons */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex gap-3">
                            <button
                                onClick={() => setHomeworkTab('active')}
                                className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                                    homeworkTab === 'active'
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <AlertCircle size={20} />
                                Active Homework
                                <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                    homeworkTab === 'active' ? 'bg-white text-blue-600' : 'bg-gray-200 text-gray-700'
                                }`}>
                                    {activeCount}
                                </span>
                            </button>
                            <button
                                onClick={() => setHomeworkTab('completed')}
                                className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                                    homeworkTab === 'completed'
                                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <CheckCircle size={20} />
                                Completed Homework
                                <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                    homeworkTab === 'completed' ? 'bg-white text-green-600' : 'bg-gray-200 text-gray-700'
                                }`}>
                                    {completedCount}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Homework List */}
                    <div className="p-6 space-y-4">
                        {filteredHomework.length === 0 ? (
                            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="text-blue-600" size={40} />
                                </div>
                                <p className="text-gray-700 font-semibold text-lg mb-2">No {homeworkTab} homework</p>
                                <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                                    {homeworkTab === 'active'
                                        ? 'Get started by creating your first homework assignment for this class'
                                        : 'No completed homework assignments for this class yet'}
                                </p>
                                {homeworkTab === 'active' && (
                                    <button
                                        onClick={() => setIsAddingNew(true)}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                                    >
                                        <Plus size={20} />
                                        Create First Homework
                                    </button>
                                )}
                            </div>
                        ) : (
                            filteredHomework.map((homework) => (
                                <div key={homework.id} className="group bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-xl transition-all overflow-hidden">
                                    <div className={`h-2 bg-gradient-to-r ${getSubjectColor(homework.subject)}`}></div>
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className={`bg-gradient-to-br ${getSubjectColor(homework.subject)} p-4 rounded-2xl shadow-lg flex-shrink-0`}>
                                                    <BookOpen className="text-white" size={28} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-bold text-xl text-gray-900">{homework.subject}</span>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            homework.status === 'active' 
                                                                ? 'bg-blue-100 text-blue-700' 
                                                                : 'bg-green-100 text-green-700'
                                                        }`}>
                                                            {homework.status === 'active' ? 'Active' : 'Completed'}
                                                        </span>
                                                    </div>
                                                    <div className="text-gray-700 font-medium mb-3">{homework.title}</div>
                                                    <div className="flex flex-wrap gap-4 text-sm">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Calendar size={16} className="text-blue-500" />
                                                            <span>Posted: <span className="font-medium">{homework.date}</span></span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Clock size={16} className="text-orange-500" />
                                                            <span>Due: <span className="font-medium">{homework.dueDate}</span></span>
                                                        </div>
                                                    </div>
                                                    {homework.document && (
                                                        <div className="mt-3 flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded-lg w-fit">
                                                            <FileText size={16} />
                                                            <span className="font-medium">{homework.document}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                <button
                                                    onClick={() => handleEdit(homework)}
                                                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                                                >
                                                    <Edit size={18} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(homework.id)}
                                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                                                >
                                                    <Trash2 size={18} />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Add Button */}
                    {filteredHomework.length > 0 && (
                        <div className="p-6 pt-0">
                            <button
                                onClick={() => setIsAddingNew(true)}
                                className="w-full border-3 border-dashed border-blue-300 rounded-2xl py-6 text-blue-600 font-bold flex items-center justify-center gap-3 hover:bg-blue-50 hover:border-blue-400 transition-all text-lg group"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                    <Plus size={28} />
                                </div>
                                Add New Homework Assignment
                            </button>
                        </div>
                    )}
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
                    <button 
                        onClick={onBack} 
                        className="mb-4 flex items-center gap-2 text-white hover:text-blue-100 transition-colors bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30"
                    >
                        <ChevronLeft size={20} />
                        <span className="font-medium">Back to Homework List</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                            {editingHomework ? <Edit size={32} /> : <Plus size={32} />}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-1">{editingHomework ? 'Edit' : 'Create New'} Homework</h1>
                            <p className="text-blue-100">{editingHomework ? 'Update homework details' : 'Add a new homework assignment for your class'}</p>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Class *</label>
                            <select
                                value={formData.class}
                                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                            >
                                {classes.map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Subject *</label>
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(subj => (
                                    <option key={subj} value={subj}>{subj}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Homework Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                            placeholder="e.g., Chapter 5 - Algebra Problems"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Document Name (Optional)</label>
                        <input
                            type="text"
                            value={formData.document}
                            onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                            placeholder="e.g., worksheet.pdf"
                        />
                        <p className="mt-2 text-sm text-gray-500">Add document name if you have attached any file</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Due Date *</label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'completed' })}
                                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                            >
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl text-lg"
                        >
                            {editingHomework ? '✓ Update Homework' : '+ Create Homework'}
                        </button>
                        <button
                            onClick={onBack}
                            className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all text-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* Help Card */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <BookOpen size={20} className="text-blue-600" />
                        Tips for Creating Homework
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Make homework titles clear and descriptive</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Set realistic due dates to give students enough time</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>Attach relevant documents to help students understand better</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CreateHomeWorkScreen;