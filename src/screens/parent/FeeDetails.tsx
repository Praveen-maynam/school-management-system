// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp, Download, AlertCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

//  function FeeDetails() {
//   const [activeCategory, setActiveCategory] = useState('Academic');
//   const [activeTab, setActiveTab] = useState('due');
  
// const [expandedFees, setExpandedFees] = useState<Record<number, boolean>>({});
// const navigate = useNavigate();

// type DueFee = {
//   id: number;
//   name: string;
//   amount: number;
//   dueDate: string;
//   status: string;
//   totalFee: number;
//   lateFee: number;
//   feeToBePaid: number;
// };

// type PaidFee = {
//   id: number;
//   name: string;
//   amount: number;
//   paidDate: string;
//   status: string;
//   totalFee: number;
//   lateFee: number;
//   feePaid: number;
// };

// type Fee = DueFee | PaidFee;



//   // Sample fee data
//   const feeData = {
//     due: [
//       {
//         id: 1,
//         name: 'Academic Fee',
//         amount: 16000,
//         dueDate: 'Dec 15, 2025',
//         status: 'Due',
//         totalFee: 16000,
//         lateFee: 0,
//         feeToBePaid: 16000
//       },
//       {
//         id: 2,
//         name: 'Academic Fee',
//         amount: 16000,
//         dueDate: 'Dec 15, 2025',
//         status: 'Due',
//         totalFee: 16000,
//         lateFee: 0,
//         feeToBePaid: 16000
//       }
//     ],
//     paid: [
//       {
//         id: 3,
//         name: 'Academic Fee',
//         amount: 16000,
//         paidDate: 'Dec 15, 2025',
//         status: 'Paid',
//         totalFee: 16000,
//         lateFee: 0,
//         feePaid: 16000
//       },
//       {
//         id: 4,
//         name: 'Academic Fee',
//         amount: 16000,
//         paidDate: 'Dec 15, 2025',
//         status: 'Paid',
//         totalFee: 16000,
//         lateFee: 0,
//         feePaid: 16000
//       }
//     ]
//   };

//   const dueCount = feeData.due.length;
//   const paidCount = feeData.paid.length;
// const currentData: Fee[] =
//   activeTab === 'due' ? feeData.due : feeData.paid;



//   const toggleExpand = (id: number) => {
//     setExpandedFees(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const categories = ['Academic', 'Exams', 'Transport', 'Activities', 'Others'];

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="bg-blue-600 text-white rounded-lg p-4 mb-6">
//         <div className="flex items-center mb-4">
//           <button onClick={() => navigate(-1)} className="mr-4">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <h1 className="text-xl font-semibold">Fee Details</h1>
//         </div>

//         {/* Stats Cards */}
//         <div className="bg-white rounded-lg p-4 flex justify-around">
//           <div className="text-center">
//             <div className="text-3xl font-bold text-yellow-500">{dueCount}</div>
//             <div className="text-sm text-gray-600">Due's</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-green-500">{paidCount}</div>
//             <div className="text-sm text-gray-600">Paid</div>
//           </div>
//         </div>
//       </div>

//       {/* Category Tabs */}
//       <div className="bg-white px-4 pt-4 pb-2 overflow-x-auto">
//         <div className="flex gap-6 border-b border-gray-200">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`pb-3 px-1 whitespace-nowrap font-medium transition-colors relative ${
//                 activeCategory === category
//                   ? 'text-blue-600'
//                   : 'text-gray-600'
//               }`}
//             >
//               {category}
//               {activeCategory === category && (
//                 <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Due/Paid Tab Navigation */}
//       <div className="bg-white px-4 pt-4 pb-2 flex gap-2">
//         <button
//           onClick={() => setActiveTab('due')}
//           className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
//             activeTab === 'due'
//               ? 'bg-blue-600 text-white'
//               : 'bg-gray-100 text-gray-600'
//           }`}
//         >
//           <AlertCircle className="w-4 h-4 inline mr-2" />
//           Due
//         </button>
//         <button
//           onClick={() => setActiveTab('paid')}
//           className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
//             activeTab === 'paid'
//               ? 'bg-blue-600 text-white'
//               : 'bg-gray-100 text-gray-600'
//           }`}
//         >
//           <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           Paid
//         </button>
//       </div>

//       {/* Fee List */}
//       <div className="p-4 space-y-3">
//         {currentData.map((fee) => (
//           <div key={fee.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="p-4">
//               <div className="flex items-start justify-between mb-2">
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-600 mb-1">{fee.name}</p>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xl font-bold text-gray-900">₹ {fee.amount.toLocaleString()}</span>
//                     <span className={`text-xs px-2 py-1 rounded-full ${
//                       fee.status === 'Due' 
//                         ? 'bg-yellow-100 text-yellow-700' 
//                         : 'bg-green-100 text-green-700'
//                     }`}>
//                       {fee.status}
//                     </span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => toggleExpand(fee.id)}
//                   className="p-1 hover:bg-gray-100 rounded"
//                 >
//                   {expandedFees[fee.id] ? (
//                     <ChevronUp className="w-5 h-5 text-gray-600" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5 text-gray-600" />
//                   )}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500">
//              {activeTab === 'due'
//   ? `Due: ${(fee as DueFee).dueDate}`
//   : `Paid: ${(fee as PaidFee).paidDate}`}

//               </p>
//             </div>

//             {/* Expanded Details */}
//             {expandedFees[fee.id] && (
//               <div className="px-4 pb-4 border-t border-gray-100 pt-3">
//                 <div className="space-y-2 mb-4">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Total Fee</span>
//                     <span className="text-gray-900">₹ {fee.totalFee.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">Late Fee</span>
//                     <span className="text-gray-900">₹{fee.lateFee}</span>
//                   </div>
//                   <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-200">
//                     <span className="text-gray-900">
//                       {activeTab === 'due' ? 'Fee to be Paid' : 'Fee Paid'}
//                     </span>
//                     <span className="text-gray-900">
//                      ₹ {(activeTab === 'due'
//   ? (fee as DueFee).feeToBePaid
//   : (fee as PaidFee).feePaid
// ).toLocaleString()}

//                     </span>
//                   </div>
//                 </div>

//                 {activeTab === 'due' ? (
//                   <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
//                     Pay Now
//                   </button>
//                 ) : (
//                   <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-blue-700 transition-colors">
//                     <Download className="w-4 h-4" />
//                     Download Invoice
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default FeeDetails;





import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download, AlertCircle, ArrowLeft } from 'lucide-react';

function FeeDetails() {
  const [activeCategory, setActiveCategory] = useState('Academic');
  const [activeTab, setActiveTab] = useState('due');
  const [expandedFees, setExpandedFees] = useState<Record<number, boolean>>({});

  type DueFee = {
    id: number;
    name: string;
    amount: number;
    dueDate: string;
    status: string;
    totalFee: number;
    lateFee: number;
    feeToBePaid: number;
  };

  type PaidFee = {
    id: number;
    name: string;
    amount: number;
    paidDate: string;
    status: string;
    totalFee: number;
    lateFee: number;
    feePaid: number;
  };

  type Fee = DueFee | PaidFee;

  // Fee data by category
  const feeDataByCategory = {
    Academic: {
      due: [
        {
          id: 1,
          name: 'Academic Fee - Term 1',
          amount: 16000,
          dueDate: 'Dec 15, 2025',
          status: 'Due',
          totalFee: 16000,
          lateFee: 0,
          feeToBePaid: 16000
        },
        {
          id: 2,
          name: 'Academic Fee - Term 2',
          amount: 16000,
          dueDate: 'Mar 15, 2026',
          status: 'Due',
          totalFee: 16000,
          lateFee: 0,
          feeToBePaid: 16000
        }
      ],
      paid: [
        {
          id: 3,
          name: 'Academic Fee - Previous Term',
          amount: 16000,
          paidDate: 'Sep 15, 2025',
          status: 'Paid',
          totalFee: 16000,
          lateFee: 0,
          feePaid: 16000
        }
      ]
    },
    Exams: {
      due: [
        {
          id: 11,
          name: 'Term 1 Exam Fee',
          amount: 2500,
          dueDate: 'Dec 20, 2025',
          status: 'Due',
          totalFee: 2500,
          lateFee: 0,
          feeToBePaid: 2500
        },
        {
          id: 12,
          name: 'Term 2 Exam Fee',
          amount: 2500,
          dueDate: 'Mar 20, 2026',
          status: 'Due',
          totalFee: 2500,
          lateFee: 0,
          feeToBePaid: 2500
        },
        {
          id: 13,
          name: 'Term 3 Exam Fee',
          amount: 2500,
          dueDate: 'Jun 20, 2026',
          status: 'Due',
          totalFee: 2500,
          lateFee: 0,
          feeToBePaid: 2500
        }
      ],
      paid: [
        {
          id: 14,
          name: 'Term 4 Exam Fee',
          amount: 2500,
          paidDate: 'Sep 20, 2025',
          status: 'Paid',
          totalFee: 2500,
          lateFee: 0,
          feePaid: 2500
        },
        {
          id: 15,
          name: 'Term 5 Exam Fee',
          amount: 2500,
          paidDate: 'Jun 20, 2025',
          status: 'Paid',
          totalFee: 2500,
          lateFee: 0,
          feePaid: 2500
        }
      ]
    },
    Transport: {
      due: [
        {
          id: 21,
          name: 'Transport Fee (0-5 km)',
          amount: 3000,
          dueDate: 'Dec 25, 2025',
          status: 'Due',
          totalFee: 3000,
          lateFee: 0,
          feeToBePaid: 3000
        },
        {
          id: 22,
          name: 'Transport Fee (5-10 km)',
          amount: 5000,
          dueDate: 'Jan 25, 2026',
          status: 'Due',
          totalFee: 5000,
          lateFee: 200,
          feeToBePaid: 5200
        }
      ],
      paid: [
        {
          id: 23,
          name: 'Transport Fee (0-5 km)',
          amount: 3000,
          paidDate: 'Sep 25, 2025',
          status: 'Paid',
          totalFee: 3000,
          lateFee: 0,
          feePaid: 3000
        },
        {
          id: 24,
          name: 'Transport Fee (10-15 km)',
          amount: 7000,
          paidDate: 'Aug 25, 2025',
          status: 'Paid',
          totalFee: 7000,
          lateFee: 0,
          feePaid: 7000
        }
      ]
    },
    Activities: {
      due: [
        {
          id: 31,
          name: 'Annual Sports Day',
          amount: 1500,
          dueDate: 'Jan 10, 2026',
          status: 'Due',
          totalFee: 1500,
          lateFee: 0,
          feeToBePaid: 1500
        },
        {
          id: 32,
          name: 'Science Exhibition',
          amount: 2000,
          dueDate: 'Feb 15, 2026',
          status: 'Due',
          totalFee: 2000,
          lateFee: 0,
          feeToBePaid: 2000
        },
        {
          id: 33,
          name: 'Cultural Fest',
          amount: 2500,
          dueDate: 'Mar 20, 2026',
          status: 'Due',
          totalFee: 2500,
          lateFee: 0,
          feeToBePaid: 2500
        }
      ],
      paid: [
        {
          id: 34,
          name: 'Independence Day Event',
          amount: 1000,
          paidDate: 'Aug 10, 2025',
          status: 'Paid',
          totalFee: 1000,
          lateFee: 0,
          feePaid: 1000
        },
        {
          id: 35,
          name: 'Annual Function',
          amount: 3000,
          paidDate: 'Nov 20, 2025',
          status: 'Paid',
          totalFee: 3000,
          lateFee: 0,
          feePaid: 3000
        }
      ]
    },
    Others: {
      due: [
        {
          id: 41,
          name: 'Library Fee',
          amount: 500,
          dueDate: 'Jan 30, 2026',
          status: 'Due',
          totalFee: 500,
          lateFee: 0,
          feeToBePaid: 500
        }
      ],
      paid: [
        {
          id: 42,
          name: 'ID Card Fee',
          amount: 200,
          paidDate: 'Sep 05, 2025',
          status: 'Paid',
          totalFee: 200,
          lateFee: 0,
          feePaid: 200
        }
      ]
    }
  };

  // Get current category data
  const currentCategoryData = feeDataByCategory[activeCategory as keyof typeof feeDataByCategory];
  const dueCount = currentCategoryData.due.length;
  const paidCount = currentCategoryData.paid.length;
  const currentData: Fee[] =
    activeTab === 'due' ? currentCategoryData.due : currentCategoryData.paid;

  const toggleExpand = (id: number) => {
    setExpandedFees(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = ['Academic', 'Exams', 'Transport', 'Activities', 'Others'];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white rounded-b-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <button className="mr-4 hover:bg-blue-700 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Fee Details</h1>
        </div>

        {/* Stats Cards */}
        <div className="bg-white rounded-lg p-4 flex justify-around">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500">{dueCount}</div>
            <div className="text-sm text-gray-600">Due's</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{paidCount}</div>
            <div className="text-sm text-gray-600">Paid</div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white px-4 pt-4 pb-2 overflow-x-auto">
        <div className="flex gap-6 border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`pb-3 px-1 whitespace-nowrap font-medium transition-colors relative ${
                activeCategory === category
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              {category}
              {activeCategory === category && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Due/Paid Tab Navigation */}
      <div className="bg-white px-4 pt-4 pb-2 flex gap-2">
        <button
          onClick={() => setActiveTab('due')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'due'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <AlertCircle className="w-4 h-4 inline mr-2" />
          Due
        </button>
        <button
          onClick={() => setActiveTab('paid')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
            activeTab === 'paid'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Paid
        </button>
      </div>

      {/* Fee List */}
      <div className="p-4 space-y-3">
        {currentData.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            No {activeTab} fees in {activeCategory} category
          </div>
        ) : (
          currentData.map((fee) => (
            <div key={fee.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{fee.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">₹ {fee.amount.toLocaleString()}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        fee.status === 'Due' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {fee.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(fee.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {expandedFees[fee.id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {activeTab === 'due'
                    ? `Due: ${(fee as DueFee).dueDate}`
                    : `Paid: ${(fee as PaidFee).paidDate}`}
                </p>
              </div>

              {/* Expanded Details */}
              {expandedFees[fee.id] && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Fee</span>
                      <span className="text-gray-900">₹ {fee.totalFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Late Fee</span>
                      <span className="text-gray-900">₹{fee.lateFee}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-200">
                      <span className="text-gray-900">
                        {activeTab === 'due' ? 'Fee to be Paid' : 'Fee Paid'}
                      </span>
                      <span className="text-gray-900">
                        ₹ {(activeTab === 'due'
                          ? (fee as DueFee).feeToBePaid
                          : (fee as PaidFee).feePaid
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {activeTab === 'due' ? (
                    <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Pay Now
                    </button>
                  ) : (
                    <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-blue-700 transition-colors">
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FeeDetails;