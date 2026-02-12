import React, { useState } from "react";
import { MoreVertical, ChevronLeft, Plus, Calendar, Clock, User } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Leave {
  id: number;
  type: string;
  from: string;
  to: string;
  days: number;
  description: string;
  status: "Approved" | "Pending" | "Not Approved";
  timeAgo: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────
const LEAVES: Leave[] = [
  {
    id: 1,
    type: "Sick Leave",
    from: "30-10-2025",
    to: "30-10-2025",
    days: 1,
    description:
      "Feeling unwell since yesterday evening. Visited the doctor and was advised to rest for a day.",
    status: "Approved",
    timeAgo: "2 Hours ago",
  },
  {
    id: 2,
    type: "Casual Leave",
    from: "28-10-2025",
    to: "29-10-2025",
    days: 2,
    description:
      "Personal work at home. Need to attend to some family matters that require my presence.",
    status: "Not Approved",
    timeAgo: "1 Day ago",
  },
  {
    id: 3,
    type: "Annual Leave",
    from: "25-10-2025",
    to: "27-10-2025",
    days: 3,
    description:
      "Planning a short trip with family. All pending tasks have been handed over to the team.",
    status: "Approved",
    timeAgo: "3 Days ago",
  },
  {
    id: 4,
    type: "Sick Leave",
    from: "20-10-2025",
    to: "20-10-2025",
    days: 1,
    description: "Sudden migraine. Doctor advised bed rest for the day.",
    status: "Pending",
    timeAgo: "2 Weeks ago",
  },
];

// ─── Colour palette (single indigo family) ───────────────────────────────────
// indigo-600 → #4f46e5   (primary solid)
// indigo-500 → #6366f1   (primary lighter)
// indigo-100 → #e0e7ff   (light accent bg)
// indigo-50  → #eef2ff   (card / pill bg)
// indigo-800 → #3730a3   (dark text accent)

// ─── Status helpers ──────────────────────────────────────────────────────────
function statusStyle(status: string) {
  switch (status) {
    case "Approved":
      return { bg: "bg-indigo-100", text: "text-indigo-700", dot: "bg-indigo-500" };
    case "Pending":
      return { bg: "bg-indigo-50", text: "text-indigo-500", dot: "bg-indigo-400" };
    default:                          // Not Approved
      return { bg: "bg-indigo-100", text: "text-indigo-400", dot: "bg-indigo-300" };
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
const AppliedLeavesPage: React.FC = () => {
  const [leaves] = useState<Leave[]>(LEAVES);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  // summary counts
  const approved = leaves.filter((l) => l.status === "Approved").length;
  const pending = leaves.filter((l) => l.status === "Pending").length;
  const rejected = leaves.filter((l) => l.status === "Not Approved").length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f0f4ff" }}>
      {/* ─── global tweaks ─── */}
      <style>{`
        * { -webkit-tap-highlight-color: transparent; }
        .card-enter {
          animation: cardUp 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .menu-pop {
          animation: menuPop 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes menuPop {
          from { opacity:0; transform:scale(0.92) translateY(-4px); }
          to   { opacity:1; transform:scale(1)    translateY(0);    }
        }
      `}</style>

      {/* ─── Header ─── */}
      <header
        className="relative z-10 flex items-center px-5 pt-12 pb-6"
        style={{ background: "linear-gradient(160deg, #4f46e5 0%, #6366f1 100%)" }}
      >
        {/* subtle circle decoration */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
          style={{ background: "#fff", filter: "blur(30px)", top: "-30px", right: "-30px" }}
        />

        <button className="relative z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-white/20 mr-3">
          <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
        </button>

        <div className="relative z-10">
          <h1 className="text-white text-lg font-bold tracking-tight">Leave History</h1>
          <p className="text-indigo-200 text-xs mt-0.5">Track all your leave requests</p>
        </div>
      </header>

      {/* ─── Summary pills ─── */}
      <div className="px-5 -mt-3 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-3 flex justify-around">
          {[
            { label: "Approved", count: approved, shade: "text-indigo-600" },
            { label: "Pending", count: pending, shade: "text-indigo-400" },
            { label: "Rejected", count: rejected, shade: "text-indigo-300" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className={`text-xl font-extrabold ${s.shade}`}>{s.count}</span>
              <span className="text-xs text-gray-400 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Section title ─── */}
      <div className="px-5 pt-5 pb-2">
        <h2 className="text-sm font-semibold text-indigo-800 uppercase tracking-widest">
          All Requests
        </h2>
      </div>

      {/* ─── Cards list ─── */}
      <div className="flex-1 overflow-y-auto px-5 pb-28 space-y-3">
        {leaves.map((leave, i) => {
          const st = statusStyle(leave.status);
          const isOpen = openMenu === leave.id;

          return (
            <div
              key={leave.id}
              className="card-enter bg-white rounded-2xl border border-indigo-100 shadow-sm overflow-visible"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* top colour strip */}
              <div
                className="h-1 rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, #4f46e5, #818cf8)" }}
              />

              <div className="p-4">
                {/* ── row 1: avatar + type + menu ── */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {/* avatar circle */}
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-indigo-600" strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-indigo-800">{leave.type}</h3>

                      {/* status badge inline */}
                      <div className={`inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full ${st.bg}`}>
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        <span className={`text-xs font-semibold ${st.text}`}>{leave.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* ── kebab menu ── */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(isOpen ? null : leave.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-indigo-50 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-indigo-300" />
                    </button>

                    {isOpen && (
                      <div className="menu-pop absolute right-0 top-9 z-20 w-36 bg-white border border-indigo-100 rounded-xl shadow-lg py-1">
                        {["View Details", "Cancel Request"].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setOpenMenu(null)}
                            className="block w-full text-left px-4 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-50 transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── row 2: date pills ── */}
                <div className="flex items-center gap-2 mt-3.5">
                  <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2} />
                    <span className="text-xs text-indigo-600 font-medium">From</span>
                    <span className="text-xs text-indigo-800 font-bold">{leave.from}</span>
                  </div>

                  {/* arrow */}
                  <svg className="w-4 h-4 text-indigo-300" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-lg px-2.5 py-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2} />
                    <span className="text-xs text-indigo-600 font-medium">To</span>
                    <span className="text-xs text-indigo-800 font-bold">{leave.to}</span>
                  </div>

                  {/* days badge */}
                  <span className="ml-auto text-xs font-bold text-indigo-600 bg-indigo-100 rounded-lg px-2 py-0.5">
                    {leave.days}d
                  </span>
                </div>

                {/* ── row 3: description ── */}
                <p className="text-xs text-gray-500 leading-relaxed mt-3 line-clamp-2">
                  {leave.description}
                </p>

                {/* ── row 4: time ── */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  <Clock className="w-3 h-3 text-indigo-300" strokeWidth={2} />
                  <span className="text-xs text-indigo-300">{leave.timeAgo}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Sticky "Apply" button ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 px-5 py-4" style={{ background: "linear-gradient(to top, #f0f4ff 60%, transparent)" }}>
        <button
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-indigo-500 bg-white shadow-md hover:shadow-lg transition-shadow"
          style={{ background: "linear-gradient(135deg, #fff 0%, #eef2ff 100%)" }}
        >
          {/* Plus icon inside a small indigo circle */}
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600">
            <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-sm font-bold text-indigo-600">Apply for Leave</span>
        </button>
      </div>
    </div>
  );
};

export default AppliedLeavesPage;