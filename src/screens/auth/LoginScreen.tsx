import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import usersData from '../../data/users.json';

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const students = [
    { id: 1, name: 'John Doe', class: 'Class 6-A', rollNo: '22' },
    { id: 2, name: 'Jane Smith', class: 'Class 7-B', rollNo: '15' },
  ];

  const handleLogin = () => {
    setErrorMessage('');

    // Check in parents
    const parent = usersData.parents.find(p => p.email === email && p.password === password);
    if (parent) {
      setModalVisible(true);
      return;
    }

    // Check in teachers
    const teacher = usersData.teachers.find(t => t.email === email && t.password === password);
    if (teacher) {
      navigate('/teacher/dashboard', { replace: true });
      return;
    }

    // No match
    setErrorMessage('Invalid email or password');
  };

  const toggleStudent = (id: number) => {
    setSelectedStudents(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleProceed = () => {
    setModalVisible(false);
    navigate('/parent/dashboard', { 
      replace: true,
      state: { selectedStudents }
    });
  };

  return (
    <div className="min-h-screen bg-white overflow-auto">
      {/* Wave Background */}
      <div className="relative bg-blue-600 h-48">
        <svg className="absolute bottom-0 w-full" height="200" preserveAspectRatio="none" viewBox="0 0 1440 200">
          <path
            d="M0,64 C240,100 480,20 720,50 C960,80 1200,40 1440,70 L1440,200 L0,200 Z"
            fill="#C7D5F4"
          />
          <path
            d="M0,80 C240,50 480,100 720,70 C960,40 1200,90 1440,60 L1440,200 L0,200 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-20 pb-10">
        {/* Login Card with Illustration */}
        <div className="relative bg-white rounded-3xl shadow-xl p-8 mb-8">
          {/* Floating Icon - Image (Left Top) */}
          <div className="absolute -left-4 top-12 bg-blue-100 p-3 rounded-xl">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#2563eb" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="#2563eb"/>
              <path d="M21 15L16 10L5 21" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Floating Icon - Message (Right) */}
          <div className="absolute -right-4 top-20 bg-gray-200 p-3 rounded-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#374151" strokeWidth="2"/>
              <path d="M7 8h10M7 12h6" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Floating Icon - Message (Left Bottom) */}
          <div className="absolute -left-4 bottom-16 bg-gray-200 p-3 rounded-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#374151" strokeWidth="2"/>
              <path d="M7 8h10M7 12h6" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Inner Card */}
          <div className="border-2 border-gray-800 rounded-2xl p-6">
            <div className="border-2 border-gray-800 rounded-xl px-6 py-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Login</h2>
            </div>

            <div className="border-2 border-gray-800 rounded-xl px-6 py-4 mb-4 flex justify-center gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-blue-600"></div>
              ))}
            </div>

            <div className="bg-blue-600 rounded-full py-4"></div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">ID or Email</label>
            <input
              type="text"
              placeholder="Enter your ID Number or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button className="text-gray-600 text-sm hover:text-blue-600">
              Forgot Your Password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl text-xl font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          {errorMessage && (
            <div className="text-red-600 text-center mt-4">
              {errorMessage}
            </div>
          )}
        </div>
      </div>

      {/* Student Selection Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Your children's Names</h3>
                <p className="text-sm text-gray-600 mt-1">Parent Name</p>
              </div>
              <button
                onClick={() => setModalVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Student List */}
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {students.map((student) => (
                <div
                  key={student.id}
                  onClick={() => toggleStudent(student.id)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition ${
                    selectedStudents.includes(student.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">
                        {student.class} • Roll No: {student.rollNo}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedStudents.includes(student.id)
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedStudents.includes(student.id) && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                          <path d="M13.5 4L6 11.5L2.5 8" strokeWidth="2" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={handleProceed}
                disabled={selectedStudents.length === 0}
                className={`w-full py-4 rounded-xl font-semibold transition ${
                  selectedStudents.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Proceed ({selectedStudents.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginScreen;









// import React, { useState } from 'react';
// import { Eye, EyeOff, X } from 'lucide-react';

// function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
// const [selectedStudents, setSelectedStudents] = useState<number[]>([]);


//   const students = [
//     { id: 1, name: 'Alex Brown', class: 'Class 8-A', rollNo: '10', initial: 'A' },
//     { id: 2, name: 'Jane Smith', class: 'Class 7-B', rollNo: '15', initial: 'J' },
//   ];

//   const handleLogin = () => {
//     setErrorMessage('');
//     // Simulating parent login
//     if (email && password) {
//       setModalVisible(true);
//       return;
//     }
//     setErrorMessage('Invalid email or password');
//   };

//   const toggleStudent = (id: number) => {
//     setSelectedStudents(prev =>
//       prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
//     );
//   };

//   const handleProceed = () => {
//     setModalVisible(false);
//     console.log('Selected students:', selectedStudents);
//     // Navigate to dashboard
//   };

//   return (
//     <div className="min-h-screen bg-white overflow-auto">
//       {/* Wave Background */}
//       <div className="relative bg-blue-600 h-48">
//         <svg className="absolute bottom-0 w-full" height="200" preserveAspectRatio="none" viewBox="0 0 1440 200">
//           <path
//             d="M0,64 C240,100 480,20 720,50 C960,80 1200,40 1440,70 L1440,200 L0,200 Z"
//             fill="#C7D5F4"
//           />
//           <path
//             d="M0,80 C240,50 480,100 720,70 C960,40 1200,90 1440,60 L1440,200 L0,200 Z"
//             fill="white"
//           />
//         </svg>
//       </div>

//       <div className="max-w-md mx-auto px-6 -mt-20 pb-10">
//         {/* Login Card with Illustration */}
//         <div className="relative bg-white rounded-3xl shadow-xl p-8 mb-8">
//           {/* Floating Icon - Image (Left Top) */}
//           <div className="absolute -left-4 top-12 bg-blue-100 p-3 rounded-xl">
//             <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
//               <rect x="3" y="3" width="18" height="18" rx="2" stroke="#2563eb" strokeWidth="2"/>
//               <circle cx="8.5" cy="8.5" r="1.5" fill="#2563eb"/>
//               <path d="M21 15L16 10L5 21" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </div>

//           {/* Floating Icon - Message (Right) */}
//           <div className="absolute -right-4 top-20 bg-gray-200 p-3 rounded-xl">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//               <rect x="3" y="3" width="18" height="18" rx="2" stroke="#374151" strokeWidth="2"/>
//               <path d="M7 8h10M7 12h6" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </div>

//           {/* Floating Icon - Message (Left Bottom) */}
//           <div className="absolute -left-4 bottom-16 bg-gray-200 p-3 rounded-xl">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//               <rect x="3" y="3" width="18" height="18" rx="2" stroke="#374151" strokeWidth="2"/>
//               <path d="M7 8h10M7 12h6" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </div>

//           {/* Inner Card */}
//           <div className="border-2 border-gray-800 rounded-2xl p-6">
//             <div className="border-2 border-gray-800 rounded-xl px-6 py-4 mb-4">
//               <h2 className="text-2xl font-bold text-gray-800">Login</h2>
//             </div>

//             <div className="border-2 border-gray-800 rounded-xl px-6 py-4 mb-4 flex justify-center gap-2">
//               {[...Array(6)].map((_, i) => (
//                 <div key={i} className="w-3 h-3 rounded-full bg-blue-600"></div>
//               ))}
//             </div>

//             <div className="bg-blue-600 rounded-full py-4"></div>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">ID or Email</label>
//             <input
//               type="text"
//               placeholder="Enter your ID Number or Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
//               >
//                 {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
//               </button>
//             </div>
//           </div>

//           <div className="text-right">
//             <button className="text-gray-600 text-sm hover:text-blue-600">
//               Forgot Your Password?
//             </button>
//           </div>

//           <button
//             onClick={handleLogin}
//             className="w-full bg-blue-600 text-white py-4 rounded-2xl text-xl font-semibold hover:bg-blue-700 transition"
//           >
//             Login
//           </button>

//           {errorMessage && (
//             <div className="text-red-600 text-center mt-4">
//               {errorMessage}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* NEW DESIGN - Student Selection Modal */}
//       {modalVisible && (
//         <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-white flex items-center justify-center p-4 z-50">
//           {/* Decorative Elements */}
//           <div className="absolute top-10 left-10 w-16 h-16 bg-gray-300 rounded-lg opacity-50"></div>
//           <div className="absolute top-40 left-20 w-12 h-12 bg-gray-300 rounded-lg opacity-40"></div>
//           <div className="absolute bottom-20 right-20 w-20 h-20 bg-gray-300 rounded-lg opacity-30"></div>
//           <div className="absolute top-1/4 right-10 w-16 h-16 bg-gray-400 rounded-lg opacity-40"></div>
//           <div className="absolute bottom-40 left-1/4 w-14 h-14 bg-gray-300 rounded-lg opacity-35"></div>

//           <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative z-10">
//             {/* Header with Gradient */}
//             <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-10 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
//               <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
              
//               <div className="relative z-10">
//                 <h2 className="text-3xl font-bold mb-1">
//                   Welcome, Parent Two 👋
//                 </h2>
//                 <p className="text-blue-100 text-sm">Track your Child's Progress</p>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-8">
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Your children's Names</h3>

//               {/* Student List */}
//               <div className="space-y-4 mb-6">
//                 {students.map((student) => (
//                   <div
//                     key={student.id}
//                     onClick={() => toggleStudent(student.id)}
//                     className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${
//                       selectedStudents.includes(student.id)
//                         ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
//                         : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
//                     }`}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
//                         {student.initial}
//                       </div>
//                       <div>
//                         <h4 className="font-bold text-gray-900 text-lg">{student.name}</h4>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-sm text-gray-600">{student.class}</span>
//                           <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium text-gray-700">
//                             Roll No: {student.rollNo}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
//                         selectedStudents.includes(student.id)
//                           ? 'bg-blue-600 border-blue-600'
//                           : 'border-gray-300 bg-white'
//                       }`}
//                     >
//                       {selectedStudents.includes(student.id) && (
//                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                           <path d="M13 4L6 11L3 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//                         </svg>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Proceed Button */}
//               <button
//                 onClick={handleProceed}
//                 disabled={selectedStudents.length === 0}
//                 className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
//                   selectedStudents.length === 0
//                     ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
//                 }`}
//               >
//                 Proceed
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginScreen;