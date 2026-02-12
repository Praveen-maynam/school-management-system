"use client";

import React, { useState, useCallback } from "react";
import { Calendar, Clock, FileText, Send, ArrowLeft, CheckCircle2, TrendingUp } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  fromDate: string;
  toDate: string;
  leaveType: string;
  reason: string;
}

interface LeaveType {
  label: string;
  icon: React.ReactNode;
  description: string;
  color: {
    primary: string;
    light: string;
    border: string;
    gradient: string;
  };
}

// ─── Static Data ─────────────────────────────────────────────────────────────
const LEAVE_TYPES: LeaveType[] = [
  {
    label: "Sick Leave",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    description: "Medical or health-related absence",
    color: {
      primary: "text-rose-600",
      light: "bg-rose-50",
      border: "border-rose-200",
      gradient: "from-rose-500 to-pink-600",
    },
  },
  {
    label: "Casual Leave",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: "Personal matters and short breaks",
    color: {
      primary: "text-amber-600",
      light: "bg-amber-50",
      border: "border-amber-200",
      gradient: "from-amber-500 to-orange-600",
    },
  },
  {
    label: "Annual Leave",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    description: "Planned vacation and time off",
    color: {
      primary: "text-emerald-600",
      light: "bg-emerald-50",
      border: "border-emerald-200",
      gradient: "from-emerald-500 to-teal-600",
    },
  },
  {
    label: "Emergency Leave",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    description: "Urgent and unforeseen circumstances",
    color: {
      primary: "text-violet-600",
      light: "bg-violet-50",
      border: "border-violet-200",
      gradient: "from-violet-500 to-purple-600",
    },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function calcDays(from: string, to: string): number {
  if (!from || !to) return 0;
  const diff = (new Date(to).getTime() - new Date(from).getTime()) / 86_400_000 + 1;
  return diff > 0 ? Math.round(diff) : 0;
}

// ─── Main Component ──────────────────────────────────────────────────────────
const ApplyLeaveForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fromDate: "",
    toDate: "",
    leaveType: "Sick Leave",
    reason: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const update = useCallback(
    (field: keyof FormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData((prev) => ({ ...prev, [field]: e.target.value })),
    []
  );

  const selectLeave = useCallback((label: string) => {
    setFormData((prev) => ({ ...prev, leaveType: label }));
  }, []);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  }, []);

  const activeLeave = LEAVE_TYPES.find((l) => l.label === formData.leaveType)!;
  const days = calcDays(formData.fromDate, formData.toDate);

  return (
    <div className="flex-1 bg-gray-50">
      {/* Success Toast */}
      {submitted && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-white border border-emerald-200 rounded-2xl shadow-2xl shadow-emerald-500/20 px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Request Submitted!</p>
              <p className="text-sm text-slate-600">Your leave application is being processed</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <button className="mb-4 flex items-center gap-2 text-white hover:text-indigo-100 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">Apply for Leave</h1>
              <p className="text-indigo-100 mt-1">Submit your leave request for approval</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Date Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Select Dates</h2>
                <p className="text-xs text-slate-500">Choose your leave period</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.fromDate}
                  onChange={update("fromDate")}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.toDate}
                  onChange={update("toDate")}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Duration Display */}
            {days > 0 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-100 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-600">Leave Duration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {days}
                    </span>
                    <span className="text-sm font-semibold text-slate-600">
                      {days === 1 ? 'Day' : 'Days'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Leave Type Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Leave Type</h2>
                <p className="text-xs text-slate-500">Select your leave category</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {LEAVE_TYPES.map((lt) => {
                const isActive = formData.leaveType === lt.label;
                return (
                  <button
                    key={lt.label}
                    type="button"
                    onClick={() => selectLeave(lt.label)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
                      isActive
                        ? `${lt.color.border} ${lt.color.light} shadow-md`
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                        isActive
                          ? `bg-gradient-to-br ${lt.color.gradient} text-white shadow-md`
                          : 'bg-slate-200 text-slate-500 group-hover:bg-slate-300'
                      }`}>
                        {lt.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-sm mb-0.5 ${isActive ? lt.color.primary : 'text-slate-700'}`}>
                          {lt.label}
                        </h3>
                        <p className={`text-xs ${isActive ? 'text-slate-600' : 'text-slate-500'}`}>
                          {lt.description}
                        </p>
                      </div>
                      {isActive && (
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${lt.color.gradient} flex items-center justify-center flex-shrink-0`}>
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Reason and Summary */}
        <div className="lg:col-span-1 space-y-6">

          {/* Reason */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Reason</h2>
                <p className="text-xs text-slate-500">Why are you taking leave?</p>
              </div>
            </div>

            <textarea
              placeholder="Please describe the reason for your leave request..."
              value={formData.reason}
              onChange={update("reason")}
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-700 font-medium placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 resize-none"
            />
          </div>

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Summary</h2>
                <p className="text-xs text-white/80">Review your details</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 space-y-4">
              <div>
                <p className="text-white/70 text-xs font-semibold mb-2">Leave Type</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                    {activeLeave.icon}
                  </div>
                  <p className="text-white font-bold text-sm">{formData.leaveType}</p>
                </div>
              </div>
              
              <div>
                <p className="text-white/70 text-xs font-semibold mb-2">Duration</p>
                <p className="text-white text-2xl font-black">
                  {days > 0 ? days : '—'} {days === 1 ? 'Day' : 'Days'}
                </p>
              </div>
              
              <div>
                <p className="text-white/70 text-xs font-semibold mb-2">Date Range</p>
                <p className="text-white font-bold text-xs">
                  {formData.fromDate && formData.toDate 
                    ? `${new Date(formData.fromDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(formData.toDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                    : 'Not selected'}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full mt-4 bg-white text-indigo-600 rounded-xl py-3 font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              Submit Leave Request
            </button>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
      `}} />
    </div>
  );
};

export default ApplyLeaveForm;