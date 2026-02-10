// import React, { useState, useEffect } from 'react';
// import { Calendar, Upload, ChevronDown, ChevronLeft } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const STORAGE_KEY = 'teacherHomeworkList';

// interface Homework {
//     id: number;
//     class: string;
//     date: string;
//     subject: string;
//     title: string;
//     document?: string;
//     dueDate: string;
//     status: 'active' | 'completed';
// }

// const AddHomeWorkScreen = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const editingHomework = location.state?.homework as Homework | null;

//     const [homeworkForm, setHomeworkForm] = useState({
//         class: 'Class 6-A',
//         date: new Date().toISOString().split('T')[0],
//         subject: 'Mathematics',
//         title: '',
//         document: '',
//         dueDate: ''
//     });

//     const classes = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 8-A'];
//     const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];

//     useEffect(() => {
//         if (editingHomework) {
//             setHomeworkForm({
//                 class: editingHomework.class,
//                 date: editingHomework.date,
//                 subject: editingHomework.subject,
//                 title: editingHomework.title,
//                 document: editingHomework.document || '',
//                 dueDate: editingHomework.dueDate
//             });
//         }
//     }, [editingHomework]);

//     const handleHomeworkSubmit = () => {
//         if (!homeworkForm.title || !homeworkForm.dueDate) {
//             alert('Please fill in all required fields (Title and Due Date)');
//             return;
//         }

//         const stored = localStorage.getItem(STORAGE_KEY);
//         let homeworkList: Homework[] = [];
//         if (stored) {
//             try {
//                 homeworkList = JSON.parse(stored);
//             } catch (e) {
//                 console.error('Error loading homework:', e);
//             }
//         }

//         let updatedList: Homework[];
        
//         if (editingHomework) {
//             // Update existing homework
//             updatedList = homeworkList.map(hw => 
//                 hw.id === editingHomework.id 
//                     ? { ...hw, ...homeworkForm, status: hw.status }
//                     : hw
//             );
//             alert('Homework updated successfully!');
//         } else {
//             // Add new homework
//             const newHomework: Homework = {
//                 id: Date.now(),
//                 ...homeworkForm,
//                 status: 'active'
//             };
//             updatedList = [newHomework, ...homeworkList];
//             alert('Homework posted successfully!');
//         }

//         localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
//         navigate('/teacher/homework/create');
//     };

//     const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setHomeworkForm({ ...homeworkForm, document: file.name });
//         }
//     };

//     return (
//         <div className="flex-1 bg-gray-50">
//             {/* Header */}
//             <div className="bg-blue-600 text-white p-4 shadow-lg">
//                 <div className="max-w-7xl mx-auto">
//                     <button
//                         onClick={() => navigate('/teacher/homework/create')}
//                         className="mb-3 flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
//                     >
//                         <ChevronLeft size={20} />
//                         <span>Back to List</span>
//                     </button>
//                     <h1 className="text-2xl font-bold">
//                         {editingHomework ? 'Edit Homework' : 'Add New Homework'}
//                     </h1>
//                     <p className="text-blue-100 text-sm mt-1">
//                         {editingHomework ? 'Update homework assignment details' : 'Create a new homework assignment'}
//                     </p>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="max-w-7xl mx-auto p-4">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {/* Form */}
//                     <div className="bg-white rounded-lg shadow-md p-6">
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-xl font-bold text-gray-800">
//                                 {editingHomework ? 'Edit Details' : 'Homework Details'}
//                             </h2>
//                         </div>

//                         <div className="space-y-4">
//                             {/* Class Selection */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Class <span className="text-red-500">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <select
//                                         value={homeworkForm.class}
//                                         onChange={(e) => setHomeworkForm({ ...homeworkForm, class: e.target.value })}
//                                         className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     >
//                                         {classes.map(cls => (
//                                             <option key={cls} value={cls}>{cls}</option>
//                                         ))}
//                                     </select>
//                                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>

//                             {/* Date */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Assignment Date <span className="text-red-500">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type="date"
//                                         value={homeworkForm.date}
//                                         onChange={(e) => setHomeworkForm({ ...homeworkForm, date: e.target.value })}
//                                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                     <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>

//                             {/* Subject */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Subject <span className="text-red-500">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <select
//                                         value={homeworkForm.subject}
//                                         onChange={(e) => setHomeworkForm({ ...homeworkForm, subject: e.target.value })}
//                                         className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     >
//                                         {subjects.map(subj => (
//                                             <option key={subj} value={subj}>{subj}</option>
//                                         ))}
//                                     </select>
//                                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>

//                             {/* Homework Title */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Homework Title <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={homeworkForm.title}
//                                     onChange={(e) => setHomeworkForm({ ...homeworkForm, title: e.target.value })}
//                                     placeholder="e.g., Chapter 5 - Algebra Problems"
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 />
//                             </div>

//                             {/* Upload Document */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Upload Document (Optional)
//                                 </label>
//                                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
//                                     <input
//                                         type="file"
//                                         onChange={handleFileUpload}
//                                         className="hidden"
//                                         id="file-upload"
//                                     />
//                                     <label htmlFor="file-upload" className="cursor-pointer">
//                                         <Upload className="w-10 h-10 text-blue-500 mx-auto mb-2" />
//                                         {homeworkForm.document ? (
//                                             <p className="text-sm text-gray-600 font-medium">📄 {homeworkForm.document}</p>
//                                         ) : (
//                                             <p className="text-sm text-gray-600">Click to upload document</p>
//                                         )}
//                                     </label>
//                                 </div>
//                             </div>

//                             {/* Due Date */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Due Date <span className="text-red-500">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         type="date"
//                                         value={homeworkForm.dueDate}
//                                         onChange={(e) => setHomeworkForm({ ...homeworkForm, dueDate: e.target.value })}
//                                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                     <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                                 </div>
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="space-y-3 pt-2">
//                                 <button
//                                     onClick={handleHomeworkSubmit}
//                                     className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
//                                 >
//                                     {editingHomework ? '✓ Update Homework' : '+ Post Homework'}
//                                 </button>

//                                 <button
//                                     onClick={() => navigate('/teacher/homework/create')}
//                                     className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Recent Homework Preview */}
//                     <div className="bg-white rounded-lg shadow-md p-6">
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-xl font-bold text-gray-800">Recent Homework</h2>
//                             <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                                 {(() => {
//                                     const stored = localStorage.getItem(STORAGE_KEY);
//                                     let list = [];
//                                     if (stored) {
//                                         try {
//                                             list = JSON.parse(stored);
//                                         } catch (e) {}
//                                     }
//                                     return list.length;
//                                 })()} total
//                             </span>
//                         </div>

//                         {(() => {
//                             const stored = localStorage.getItem(STORAGE_KEY);
//                             let homeworkList: Homework[] = [];
//                             if (stored) {
//                                 try {
//                                     homeworkList = JSON.parse(stored);
//                                 } catch (e) {}
//                             }
//                             const displayedRecent = homeworkList.slice(0, 3);

//                             return homeworkList.length === 0 ? (
//                                 <div className="text-center py-12">
//                                     <div className="text-gray-400 text-5xl mb-4">📚</div>
//                                     <p className="text-gray-500 font-medium">No homework yet</p>
//                                     <p className="text-sm text-gray-400 mt-2">Your created homework will appear here</p>
//                                 </div>
//                             ) : (
//                                 <div className="space-y-4">
//                                     {displayedRecent.map(hw => (
//                                         <div key={hw.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//                                             <div className="flex justify-between items-start mb-2">
//                                                 <div>
//                                                     <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
//                                                         {hw.class}
//                                                     </span>
//                                                     <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium ml-2">
//                                                         {hw.subject}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <h3 className="font-semibold text-gray-800 mb-1">{hw.title}</h3>
//                                             <div className="text-sm text-gray-600">
//                                                 <p>Posted: {hw.date}</p>
//                                                 <p>Due: {hw.dueDate}</p>
//                                                 {hw.document && <p className="text-blue-600 mt-1">📎 {hw.document}</p>}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             );
//                         })()}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddHomeWorkScreen;





import React, { useState, useEffect } from 'react';
import { Calendar, Upload, ChevronDown, ChevronLeft, BookOpen, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
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
    const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Computer Science'];

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

    const getSubjectColor = (subject: string) => {
        const colors: { [key: string]: string } = {
            'Mathematics': 'bg-blue-100 text-blue-700 border-blue-200',
            'Science': 'bg-green-100 text-green-700 border-green-200',
            'English': 'bg-purple-100 text-purple-700 border-purple-200',
            'History': 'bg-orange-100 text-orange-700 border-orange-200',
            'Geography': 'bg-pink-100 text-pink-700 border-pink-200',
            'Computer Science': 'bg-cyan-100 text-cyan-700 border-cyan-200',
        };
        return colors[subject] || 'bg-gray-100 text-gray-700 border-gray-200';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-xl">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/teacher/homework/create')}
                        className="mb-4 flex items-center gap-2 text-white hover:text-blue-100 transition-colors bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30"
                    >
                        <ChevronLeft size={20} />
                        <span className="font-medium">Back to Homework List</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                            {editingHomework ? <BookOpen size={32} /> : <FileText size={32} />}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-1">
                                {editingHomework ? 'Edit Homework Assignment' : 'Create New Homework'}
                            </h1>
                            <p className="text-blue-100">
                                {editingHomework ? 'Update homework assignment details' : 'Add a new homework assignment for your students'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                    <FileText className="text-blue-600" size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingHomework ? 'Edit Details' : 'Assignment Details'}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* Class and Subject Row */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Class Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Class <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={homeworkForm.class}
                                                onChange={(e) => setHomeworkForm({ ...homeworkForm, class: e.target.value })}
                                                className="w-full p-3 border-2 border-gray-300 rounded-xl appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                                            >
                                                {classes.map(cls => (
                                                    <option key={cls} value={cls}>{cls}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Subject <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={homeworkForm.subject}
                                                onChange={(e) => setHomeworkForm({ ...homeworkForm, subject: e.target.value })}
                                                className="w-full p-3 border-2 border-gray-300 rounded-xl appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                                            >
                                                {subjects.map(subj => (
                                                    <option key={subj} value={subj}>{subj}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Homework Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Homework Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={homeworkForm.title}
                                        onChange={(e) => setHomeworkForm({ ...homeworkForm, title: e.target.value })}
                                        placeholder="e.g., Chapter 5 - Algebra Problems"
                                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                                    />
                                </div>

                                {/* Date Row */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Assignment Date */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Assignment Date <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={homeworkForm.date}
                                                onChange={(e) => setHomeworkForm({ ...homeworkForm, date: e.target.value })}
                                                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                                            />
                                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Due Date */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Due Date <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={homeworkForm.dueDate}
                                                onChange={(e) => setHomeworkForm({ ...homeworkForm, dueDate: e.target.value })}
                                                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                                            />
                                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Upload Document */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Upload Document (Optional)
                                    </label>
                                    <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group">
                                        <input
                                            type="file"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                                                <Upload className="w-8 h-8 text-blue-600" />
                                            </div>
                                            {homeworkForm.document ? (
                                                <div className="space-y-2">
                                                    <p className="text-sm font-semibold text-gray-900">Document Uploaded</p>
                                                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
                                                        <FileText size={16} />
                                                        <span className="font-medium">{homeworkForm.document}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-2">Click to change file</p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-700 mb-1">Click to upload document</p>
                                                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid md:grid-cols-2 gap-4 pt-4">
                                    <button
                                        onClick={handleHomeworkSubmit}
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={20} />
                                        {editingHomework ? 'Update Homework' : 'Post Homework'}
                                    </button>

                                    <button
                                        onClick={() => navigate('/teacher/homework/create')}
                                        className="bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tips Card */}
                        <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <AlertCircle size={20} className="text-blue-600" />
                                Quick Tips
                            </h3>
                            <ul className="text-sm text-gray-700 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                                    <span>Use clear and descriptive titles to help students understand the assignment</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                                    <span>Set reasonable due dates giving students adequate time to complete</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                                    <span>Attach reference materials to provide better guidance</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Recent Homework Preview Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900">Recent Homework</h2>
                                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full">
                                    {(() => {
                                        const stored = localStorage.getItem(STORAGE_KEY);
                                        let list = [];
                                        if (stored) {
                                            try {
                                                list = JSON.parse(stored);
                                            } catch (e) {}
                                        }
                                        return list.length;
                                    })()} Total
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
                                const displayedRecent = homeworkList.slice(0, 4);

                                return homeworkList.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <BookOpen className="text-blue-600" size={32} />
                                        </div>
                                        <p className="text-gray-700 font-semibold mb-2">No homework yet</p>
                                        <p className="text-sm text-gray-500">Your created assignments will appear here</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                        {displayedRecent.map(hw => (
                                            <div key={hw.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all">
                                                <div className="flex gap-2 mb-3 flex-wrap">
                                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-lg font-semibold border border-blue-200">
                                                        {hw.class}
                                                    </span>
                                                    <span className={`inline-block text-xs px-2.5 py-1 rounded-lg font-semibold border ${getSubjectColor(hw.subject)}`}>
                                                        {hw.subject}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{hw.title}</h3>
                                                <div className="text-xs text-gray-600 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar size={14} className="text-blue-500" />
                                                        <span>Posted: <span className="font-medium">{hw.date}</span></span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock size={14} className="text-orange-500" />
                                                        <span>Due: <span className="font-medium">{hw.dueDate}</span></span>
                                                    </div>
                                                    {hw.document && (
                                                        <div className="flex items-center gap-2 text-blue-600 mt-2">
                                                            <FileText size={14} />
                                                            <span className="font-medium truncate">{hw.document}</span>
                                                        </div>
                                                    )}
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
        </div>
    );
};

export default AddHomeWorkScreen;