import React from 'react';

// Mock data
const leaveBalance = {
  total: 20,
  used: 7,
  remaining: 13,
};

const LeaveBalanceScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Leave Balance</h1>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <div className="mb-2 text-lg">Total Leaves: <span className="font-bold">{leaveBalance.total}</span></div>
        <div className="mb-2 text-lg">Used: <span className="font-bold text-yellow-600">{leaveBalance.used}</span></div>
        <div className="mb-2 text-lg">Remaining: <span className="font-bold text-green-600">{leaveBalance.remaining}</span></div>
      </div>
    </div>
  );
};

export default LeaveBalanceScreen;
