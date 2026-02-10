"use client";

import React, { useState, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  fromDate: string;
  toDate: string;
  leaveType: string;
  reason: string;
}

interface LeaveType {
  label: string;
  icon: string;
  color: {
    border: string;       // Tailwind border class when active
    bg: string;           // Tailwind bg class when active
    text: string;         // Tailwind text class when active
    shadow: string;       // Tailwind shadow class when active
    ring: string;         // Tailwind ring class when active
  };
}

// ─── Static Data ─────────────────────────────────────────────────────────────
const LEAVE_TYPES: LeaveType[] = [
  {
    label: "Sick Leave",
    icon: "🏥",
    color: {
      border: "border-red-400",
      bg: "bg-red-50",
      text: "text-red-500",
      shadow: "shadow-red-200",
      ring: "ring-red-200",
    },
  },
  {
    label: "Casual Leave",
    icon: "☀️",
    color: {
      border: "border-amber-400",
      bg: "bg-amber-50",
      text: "text-amber-500",
      shadow: "shadow-amber-200",
      ring: "ring-amber-200",
    },
  },
  {
    label: "Annual Leave",
    icon: "✈️",
    color: {
      border: "border-emerald-400",
      bg: "bg-emerald-50",
      text: "text-emerald-500",
      shadow: "shadow-emerald-200",
      ring: "ring-emerald-200",
    },
  },
  {
    label: "Emergency Leave",
    icon: "🚨",
    color: {
      border: "border-violet-400",
      bg: "bg-violet-50",
      text: "text-violet-500",
      shadow: "shadow-violet-200",
      ring: "ring-violet-200",
    },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function calcDays(from: string, to: string): string {
  if (!from || !to) return "—";
  const diff = (new Date(to).getTime() - new Date(from).getTime()) / 86_400_000 + 1;
  return diff > 0 ? String(Math.round(diff)) : "—";
}

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Animated decorative blobs behind everything */
const Blobs: React.FC = () => (
  <>
    <div className="blob blob-1" />
    <div className="blob blob-2" />
    <div className="blob blob-3" />
  </>
);

/** Green success toast */
const Toast: React.FC<{ show: boolean }> = ({ show }) =>
  show ? (
    <div className="toast">
      <span>✅</span>
      <span>Leave request submitted successfully!</span>
    </div>
  ) : null;

/** Glass card wrapper with staggered entrance */
const Card: React.FC<{ delay?: string; children: React.ReactNode }> = ({
  delay = "0ms",
  children,
}) => (
  <div
    className="glass-card"
    style={{ animationDelay: delay }}
  >
    {children}
  </div>
);

/** Section heading inside a card */
const SectionHead: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-2 mb-4">
    <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
    <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
      {label}
    </span>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const ApplyLeaveForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fromDate: "",
    toDate: "",
    leaveType: "Sick Leave",
    reason: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  // ── handlers ──
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
    setTimeout(() => setSubmitted(false), 3000);
  }, []);

  // ── derived ──
  const activeLeave = LEAVE_TYPES.find((l) => l.label === formData.leaveType)!;
  const days = calcDays(formData.fromDate, formData.toDate);

  // ── render ──
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-page">
      {/* ── global keyframes & utility classes ── */}
      <style>{`
        /* ── gradient background ── */
        .bg-gradient-page {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 60%, #f5576c 100%);
        }

        /* ── animated blobs ── */
        .blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          top: -80px; left: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%);
          animation: blobFloat 6s ease-in-out infinite;
        }
        .blob-2 {
          bottom: -60px; right: -60px;
          width: 250px; height: 250px;
          background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
          animation: blobFloat 8s ease-in-out infinite reverse;
        }
        .blob-3 {
          top: 40%; left: 60%;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(255,200,255,0.14) 0%, transparent 70%);
          animation: blobFloat 5s ease-in-out infinite 1s;
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(20px,-20px) scale(1.08); }
        }

        /* ── glass card with slide-up entrance ── */
        .glass-card {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 1.5rem;           /* 24px */
          padding: 1.5rem;                 /* 24px */
          margin-bottom: 1rem;             /* 16px */
          box-shadow: 0 8px 32px rgba(102,126,234,0.18), 0 2px 8px rgba(0,0,0,0.06);
          animation: slideUp 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── toast ── */
        .toast {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
          padding: 14px 28px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(16,185,129,0.4);
          animation: toastIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);     }
        }

        /* ── leave pill hover ── */
        .leave-pill { transition: transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s; }
        .leave-pill:hover { transform: translateY(-2px); }

        /* ── submit button gradient + hover ── */
        .btn-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 6px 24px rgba(102,126,234,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(102,126,234,0.5);
        }
        .btn-submit:active { transform: translateY(0); }

        /* ── back button hover ── */
        .btn-back { transition: background 0.2s; }
        .btn-back:hover { background: rgba(255,255,255,0.3); }

        /* ── input focus ring (indigo) ── */
        .input-field:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102,126,234,0.2);
          background: #fff;
        }

        /* ── native date-picker icon colour ── */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: hue-rotate(220deg) saturate(1.5);
          cursor: pointer;
        }

        /* ── summary gradient text ── */
        .gradient-text {
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── summary row bg ── */
        .summary-row-bg {
          background: linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.08));
        }

        /* ── summary icon bg ── */
        .summary-icon-bg {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        * { -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* ── decorative blobs ── */}
      <Blobs />

      {/* ── toast ── */}
      <Toast show={submitted} />

      {/* ── header ── */}
      <header className="relative z-10 flex items-start gap-3 px-5 pt-6 pb-4">
        <button
          className="btn-back flex items-center justify-center w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/10"
          aria-label="Go back"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex flex-col">
          <h1 className="text-white text-xl font-bold drop-shadow-sm" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
            Apply Leave
          </h1>
          <p className="text-white/70 text-xs mt-0.5">Fill in the details below</p>
        </div>
      </header>

      {/* ── scrollable body ── */}
      <main className="relative z-10 flex-1 overflow-y-auto px-5 pb-5">

        {/* Date card */}
        <Card delay="0ms">
          <SectionHead label="Pick Your Dates" />

          <div className="grid grid-cols-2 gap-3.5">
            {(["fromDate", "toDate"] as const).map((field, i) => (
              <div key={field} className="flex flex-col">
                <label className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-2">
                  <span>📅</span>
                  {field === "fromDate" ? "From Date" : "To Date"}
                </label>
                <input
                  type="date"
                  value={formData[field]}
                  onChange={update(field)}
                  className="input-field w-full px-3.5 py-3 rounded-2xl border-2 border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none transition-all"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Leave Type card */}
        <Card delay="100ms">
          <SectionHead label="Leave Type" />

          <div className="grid grid-cols-2 gap-2.5">
            {LEAVE_TYPES.map((lt) => {
              const isActive = formData.leaveType === lt.label;
              return (
                <button
                  key={lt.label}
                  type="button"
                  onClick={() => selectLeave(lt.label)}
                  className={[
                    "leave-pill",
                    "flex items-center gap-2.5 px-3.5 py-3 rounded-2xl border-2 text-left",
                    isActive
                      ? `${lt.color.border} ${lt.color.bg} shadow-md ${lt.color.shadow}`
                      : "border-gray-200 bg-gray-50 hover:border-gray-300",
                  ].join(" ")}
                >
                  <span className="text-xl leading-none">{lt.icon}</span>
                  <span
                    className={[
                      "text-xs",
                      isActive ? `font-bold ${lt.color.text}` : "font-medium text-gray-500",
                    ].join(" ")}
                  >
                    {lt.label}
                  </span>
                  {isActive && (
                    <span className={`ml-auto text-sm ${lt.color.text}`}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Reason card */}
        <Card delay="200ms">
          <SectionHead label="Reason" />
          <textarea
            placeholder="Tell us why you need leave…"
            value={formData.reason}
            onChange={update("reason")}
            rows={4}
            className="input-field w-full px-3.5 py-3 rounded-2xl border-2 border-gray-200 bg-gray-50 text-sm text-gray-700 resize-none outline-none transition-all"
          />
        </Card>

        {/* Summary card */}
        <Card delay="300ms">
          <SectionHead label="Summary" />

          <div className="summary-row-bg flex items-center justify-between rounded-2xl px-4 py-3">
            {/* left: icon + leave name */}
            <div className="flex items-center gap-3">
              <div className="summary-icon-bg flex items-center justify-center w-10 h-10 rounded-2xl text-lg">
                {activeLeave.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400">Leave Type</p>
                <p className="text-sm font-bold text-gray-700">{formData.leaveType}</p>
              </div>
            </div>

            {/* right: days counter */}
            <div className="text-center">
              <p className="gradient-text text-2xl font-extrabold leading-none">{days}</p>
              <p className="text-xs text-gray-400 mt-0.5">Days</p>
            </div>
          </div>
        </Card>
      </main>

      {/* ── sticky submit footer ── */}
      <footer className="relative z-10 px-5 py-4 pb-7">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-submit w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white text-base font-bold tracking-wide"
        >
          <span>📤</span>
          Submit Request
        </button>
      </footer>
    </div>
  );
};

export default ApplyLeaveForm;