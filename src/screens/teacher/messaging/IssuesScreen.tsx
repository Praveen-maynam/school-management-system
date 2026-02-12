import React, { useState } from "react";
import { MoreVertical, ChevronLeft, Plus, Calendar, Clock, User } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */
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

/* ─── Data ──────────────────────────────────────────────────────────────── */
const LEAVES: Leave[] = [
  {
    id: 1, type: "Sick Leave", from: "30-10-2025", to: "30-10-2025", days: 1,
    description: "Feeling unwell since yesterday evening. Visited the doctor and was advised to rest for a day.",
    status: "Approved", timeAgo: "2 Hours ago",
  },
  {
    id: 2, type: "Casual Leave", from: "28-10-2025", to: "29-10-2025", days: 2,
    description: "Personal work at home. Need to attend to some family matters that require my presence.",
    status: "Not Approved", timeAgo: "1 Day ago",
  },
  {
    id: 3, type: "Annual Leave", from: "25-10-2025", to: "27-10-2025", days: 3,
    description: "Planning a short trip with family. All pending tasks have been handed over to the team.",
    status: "Approved", timeAgo: "3 Days ago",
  },
  {
    id: 4, type: "Sick Leave", from: "20-10-2025", to: "20-10-2025", days: 1,
    description: "Sudden migraine. Doctor advised bed rest for the day.",
    status: "Pending", timeAgo: "2 Weeks ago",
  },
];

/* ─── Rose palette map ──────────────────────────────────────────────────── */
// 700 → #be123c  |  600 → #e11d48  |  500 → #f43f5e
// 400 → #fb7185  |  300 → #fda4af  |  200 → #fecdd5
// 100 → #ffe4e6  |  50  → #fff1f2  |  page → #fdf2f4

function statusBadge(status: string) {
  if (status === "Approved")  return { bg: "#fff1f2", border: "#fecdd5", text: "#be123c", dot: "#e11d48" };
  if (status === "Pending")   return { bg: "#fff1f2", border: "#fda4af", text: "#fb7185", dot: "#fb7185" };
  /* Not Approved */            return { bg: "#fff1f2", border: "#fecdd5", text: "#fda4af", dot: "#fda4af" };
}

/* ─── Component ─────────────────────────────────────────────────────────── */
const AppliedLeavesPage: React.FC = () => {
  const [leaves]   = useState<Leave[]>(LEAVES);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const approved = leaves.filter((l) => l.status === "Approved").length;
  const pending  = leaves.filter((l) => l.status === "Pending").length;
  const rejected = leaves.filter((l) => l.status === "Not Approved").length;

  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: "#fdf2f4", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── global styles ── */}
      <style>{`
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box}
        .deco{position:absolute;border-radius:50%;pointer-events:none;z-index:0}
        .card-in{animation:cardSlide .4s cubic-bezier(.16,1,.3,1) both}
        @keyframes cardSlide{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .menu-pop{animation:popIn .18s cubic-bezier(.16,1,.3,1) both}
        @keyframes popIn{from{opacity:0;transform:scale(.9) translateY(-6px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .card-hover{transition:box-shadow .25s,transform .25s}
        .card-hover:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(190,18,60,.13)!important}
        .pill-hover{transition:background .2s}
        .pill-hover:hover{background:rgba(190,18,60,.06)}
        .menu-item{transition:background .15s}
        .menu-item:hover{background:#fff1f2}
        .btn-apply{transition:box-shadow .25s,transform .2s}
        .btn-apply:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(190,18,60,.28)!important}
        .btn-apply:active{transform:translateY(0)}
      `}</style>

      {/* ── decorative bg circles ── */}
      <div className="deco" style={{ width:220, height:220, top:-60, right:-60, background:"radial-gradient(circle,rgba(244,63,94,.08) 0%,transparent 70%)" }}/>
      <div className="deco" style={{ width:160, height:160, top:"38%", left:-50, background:"radial-gradient(circle,rgba(253,164,175,.1) 0%,transparent 70%)" }}/>
      <div className="deco" style={{ width:120, height:120, bottom:160, right:24, background:"radial-gradient(circle,rgba(190,18,60,.06) 0%,transparent 70%)" }}/>

      {/* ── Header ── */}
      <header className="relative z-10 px-5 pt-14 pb-7" style={{ background:"linear-gradient(155deg,#be123c 0%,#e11d48 50%,#f43f5e 100%)" }}>
        {/* glow orbs */}
        <div style={{ position:"absolute", top:-40, right:-30, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,.12)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-20, left:30, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,.07)", pointerEvents:"none" }}/>

        {/* back + title */}
        <div className="relative z-10 flex items-center">
          <button className="w-9 h-9 flex items-center justify-center rounded-2xl mr-3" style={{ background:"rgba(255,255,255,.18)" }}>
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2.5}/>
          </button>
          <div>
            <h1 className="text-white text-lg font-bold tracking-tight">Leave History</h1>
            <p className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,.7)" }}>Track all your leave requests</p>
          </div>
        </div>

        {/* frosted summary bar */}
        <div className="relative z-10 flex justify-around mt-5 rounded-2xl px-2 py-3" style={{ background:"rgba(255,255,255,.15)", backdropFilter:"blur(6px)" }}>
          {[
            { label:"Approved", count:approved, color:"#fff" },
            { label:"Pending",  count:pending,  color:"rgba(255,255,255,.7)" },
            { label:"Rejected", count:rejected, color:"rgba(255,255,255,.5)" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl font-extrabold" style={{ color:s.color }}>{s.count}</span>
              <span className="text-xs font-medium" style={{ color:"rgba(255,255,255,.6)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* ── section label ── */}
      <div className="relative z-10 px-5 pt-5 pb-2 flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background:"#e11d48" }}/>
        <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color:"#be123c" }}>All Requests</h2>
      </div>

      {/* ── cards ── */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-28 space-y-3">
        {leaves.map((leave, i) => {
          const badge  = statusBadge(leave.status);
          const isOpen = openMenu === leave.id;

          return (
            <div
              key={leave.id}
              className="card-in card-hover rounded-2xl"
              style={{ animationDelay:`${i*65}ms`, background:"#fff", border:"1.5px solid #ffe4e6", boxShadow:"0 2px 12px rgba(190,18,60,.07)" }}
            >
              {/* top colour stripe */}
              <div className="rounded-t-2xl" style={{ height:4, background:"linear-gradient(90deg,#be123c,#f43f5e,#fb7185)" }}/>

              <div className="p-4">
                {/* row 1 – avatar | type + badge | menu */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background:"linear-gradient(135deg,#ffe4e6,#fecdd5)" }}>
                      <User className="w-5 h-5" style={{ color:"#e11d48" }} strokeWidth={1.8}/>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold" style={{ color:"#be123c" }}>{leave.type}</h3>
                      <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full" style={{ background:badge.bg, border:`1px solid ${badge.border}` }}>
                        <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background:badge.dot }}/>
                        <span className="text-xs font-semibold" style={{ color:badge.text }}>{leave.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* kebab */}
                  <div className="relative">
                    <button onClick={() => setOpenMenu(isOpen ? null : leave.id)} className="w-8 h-8 flex items-center justify-center rounded-xl pill-hover">
                      <MoreVertical className="w-4 h-4" style={{ color:"#fda4af" }}/>
                    </button>
                    {isOpen && (
                      <div className="menu-pop absolute right-0 top-9 z-20 rounded-xl py-1.5 overflow-hidden" style={{ width:148, background:"#fff", border:"1px solid #ffe4e6", boxShadow:"0 8px 24px rgba(190,18,60,.14)" }}>
                        {["View Details","Cancel Request"].map((opt) => (
                          <button key={opt} onClick={() => setOpenMenu(null)} className="menu-item block w-full text-left px-4 py-2 text-xs font-semibold" style={{ color:"#be123c" }}>{opt}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* row 2 – date pills */}
                <div className="flex items-center gap-2 mt-3.5 flex-wrap">
                  <div className="flex items-center gap-1.5 rounded-xl px-2.5 py-1" style={{ background:"#fff1f2", border:"1px solid #fecdd5" }}>
                    <Calendar className="w-3.5 h-3.5" style={{ color:"#e11d48" }} strokeWidth={2}/>
                    <span className="text-xs font-medium" style={{ color:"#fb7185" }}>From</span>
                    <span className="text-xs font-bold" style={{ color:"#be123c" }}>{leave.from}</span>
                  </div>
                  <svg className="w-4 h-4" style={{ color:"#fda4af" }} viewBox="0 0 16 16" fill="none">
                    <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex items-center gap-1.5 rounded-xl px-2.5 py-1" style={{ background:"#fff1f2", border:"1px solid #fecdd5" }}>
                    <Calendar className="w-3.5 h-3.5" style={{ color:"#e11d48" }} strokeWidth={2}/>
                    <span className="text-xs font-medium" style={{ color:"#fb7185" }}>To</span>
                    <span className="text-xs font-bold" style={{ color:"#be123c" }}>{leave.to}</span>
                  </div>
                  <span className="ml-auto text-xs font-bold rounded-lg px-2 py-0.5" style={{ background:"linear-gradient(135deg,#ffe4e6,#fecdd5)", color:"#be123c" }}>{leave.days}d</span>
                </div>

                {/* row 3 – description clamped */}
                <p className="text-xs leading-relaxed mt-3" style={{ color:"#9ca3af", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                  {leave.description}
                </p>

                {/* row 4 – time */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  <Clock className="w-3 h-3" style={{ color:"#fda4af" }} strokeWidth={2}/>
                  <span className="text-xs" style={{ color:"#fda4af" }}>{leave.timeAgo}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── sticky apply button ── */}
      <div className="fixed bottom-0 left-0 right-0 z-10 px-5 py-4" style={{ background:"linear-gradient(to top,#fdf2f4 55%,transparent)" }}>
        <button
          className="btn-apply w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl"
          style={{ background:"linear-gradient(135deg,#fff 0%,#fff1f2 100%)", border:"2px solid #f43f5e", boxShadow:"0 4px 18px rgba(190,18,60,.18)" }}
        >
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full" style={{ background:"linear-gradient(135deg,#e11d48,#f43f5e)" }}>
            <Plus className="w-4 h-4 text-white" strokeWidth={2.5}/>
          </span>
          <span className="text-sm font-bold" style={{ color:"#be123c" }}>Apply for Leave</span>
        </button>
      </div>
    </div>
  );
};

export default AppliedLeavesPage;