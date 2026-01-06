


// import React, { useState } from 'react';
// import { Bell, Calendar, DollarSign, FileText, AlertCircle, Shield, Info, ChevronRight } from 'lucide-react';

// function TeacherProfile() {
//   const [notificationEnabled, setNotificationEnabled] = useState(true);

//   const profileOptions = [
//     { icon: Bell, label: 'Notification', hasToggle: true },
//     { icon: Calendar, label: 'Timetable' },
//     { icon: DollarSign, label: 'Pay Slips' },
//     { icon: FileText, label: 'Apply Leave' },
//     { icon: AlertCircle, label: 'Raise an Issue' },
//     { icon: Shield, label: 'Privacy Policy' },
//     { icon: Info, label: 'About Us' },
//     { icon: Info, label: 'Help' },
//     { icon: Info, label: 'Logout' }
//   ];

//   return (
//     <div className="w-full h-screen bg-gray-50 overflow-y-auto">
//       <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
//         {/* Profile Card */}
//         <div className="bg-blue-600 rounded-xl shadow-lg p-6 md:p-8 lg:p-10 mb-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Profile</h2>
          
//           <div className="bg-white rounded-xl p-6 md:p-8">
//             <div className="flex flex-col items-center">
//               {/* Avatar */}
//               <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl md:text-5xl font-bold mb-4 md:mb-6">
//                 S
//               </div>
              
//               {/* Name and Subject */}
//               <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-1 md:mb-2">Teacher Name</h3>
//               <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-8">Subject Name</p>
              
//               {/* Contact Info */}
//               <div className="w-full max-w-2xl space-y-4">
//                 <div className="flex items-center bg-purple-50 rounded-xl p-4 md:p-5">
//                   <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <svg className="w-6 h-6 md:w-7 md:h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4 overflow-hidden">
//                     <p className="text-xs md:text-sm text-gray-500 mb-1">Email</p>
//                     <p className="text-sm md:text-base lg:text-lg text-gray-800 truncate">Example@gmail.com</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center bg-green-50 rounded-xl p-4 md:p-5">
//                   <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <svg className="w-6 h-6 md:w-7 md:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-xs md:text-sm text-gray-500 mb-1">Phone</p>
//                     <p className="text-sm md:text-base lg:text-lg text-gray-800">+91 1234567890</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Options List */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {profileOptions.map((option, index) => (
//             <div
//               key={index}
//               className={`flex items-center justify-between p-4 md:p-5 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
//                 index !== profileOptions.length - 1 ? 'border-b border-gray-100' : ''
//               }`}
//             >
//               <div className="flex items-center">
//                 <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
//                   <option.icon className="text-blue-600" size={20} />
//                 </div>
//                 <span className="ml-4 text-gray-700 font-medium text-sm md:text-base lg:text-lg">{option.label}</span>
//               </div>
              
//               {option.hasToggle ? (
//                 <button
//                   onClick={() => setNotificationEnabled(!notificationEnabled)}
//                   className={`relative inline-flex h-7 w-12 md:h-8 md:w-14 items-center rounded-full transition-colors flex-shrink-0 ${
//                     notificationEnabled ? 'bg-blue-600' : 'bg-gray-300'
//                   }`}
//                 >
//                   <span
//                     className={`inline-block h-5 w-5 md:h-6 md:w-6 transform rounded-full bg-white transition-transform ${
//                       notificationEnabled ? 'translate-x-6 md:translate-x-7' : 'translate-x-1'
//                     }`}
//                   />
//                 </button>
//               ) : (
//                 <ChevronRight className="text-gray-400 flex-shrink-0" size={20} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TeacherProfile;







import React, { useState } from 'react';
import { Bell, Calendar, DollarSign, FileText, AlertCircle, Shield, Info, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TeacherProfile() {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const navigate = useNavigate();

  const profileOptions = [
    { icon: Bell, label: 'Notification', hasToggle: true },
    { icon: Calendar, label: 'Timetable' },
    { icon: DollarSign, label: 'Pay Slips' },
    { icon: FileText, label: 'Apply Leave' },
    { icon: AlertCircle, label: 'Raise an Issue' },
    { icon: Shield, label: 'Privacy Policy' },
    { icon: Info, label: 'About Us' },
    { icon: Info, label: 'Help' },
    { icon: Info, label: 'Logout' }
  ];

  return (
    <div className="w-full h-screen bg-gray-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Profile Card */}
        <div className="bg-blue-600 rounded-xl shadow-lg p-6 md:p-8 lg:p-10 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Profile</h2>

          <div className="bg-white rounded-xl p-6 md:p-8">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                S
              </div>

              {/* Name and Subject */}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-1 md:mb-2">
                Teacher Name
              </h3>
              <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-8">
                Subject Name
              </p>

              {/* Contact Info */}
              <div className="w-full max-w-2xl space-y-4">
                <div className="flex items-center bg-purple-50 rounded-xl p-4 md:p-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4 overflow-hidden">
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-sm md:text-base lg:text-lg text-gray-800 truncate">
                      Example@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-green-50 rounded-xl p-4 md:p-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-sm md:text-base lg:text-lg text-gray-800">
                      +91 1234567890
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Options List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {profileOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                if (option.label === 'Pay Slips') {
                    navigate('/teacher/payroll/payslips');
                }
                 if (option.label === 'Apply Leave') {
                    navigate('/teacher/leave/apply');
                }
                  if (option.label === 'Raise an Issue') {
                    navigate('/teacher/messaging/issues');
                }
                if (option.label === 'Timetable') {
                    navigate('/teacher/exams/entermarks');
                }
              
                if (option.label === 'Privacy Policy') {
                    navigate('/teacher/privacy-policy');
                }
                if (option.label === 'About Us') {
                    navigate('/teacher/about-us');
                }
                if (option.label === 'Help') {
                    navigate('/teacher/Help');
                }
              }}
              className={`flex items-center justify-between p-4 md:p-5 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                index !== profileOptions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <option.icon className="text-blue-600" size={20} />
                </div>
                <span className="ml-4 text-gray-700 font-medium text-sm md:text-base lg:text-lg">
                  {option.label}
                </span>
              </div>

              {option.hasToggle ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationEnabled(!notificationEnabled);
                  }}
                  className={`relative inline-flex h-7 w-12 md:h-8 md:w-14 items-center rounded-full transition-colors flex-shrink-0 ${
                    notificationEnabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 md:h-6 md:w-6 transform rounded-full bg-white transition-transform ${
                      notificationEnabled ? 'translate-x-6 md:translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              ) : (
                <ChevronRight className="text-gray-400 flex-shrink-0" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
