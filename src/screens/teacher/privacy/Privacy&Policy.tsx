import React, { useState, useEffect } from "react";
import { ArrowLeft, Shield, Lock, Eye, Database, Bell, Mail, ChevronRight } from "lucide-react";

/* ─── section data ─────────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: "intro",
    title: "Introduction",
    icon: Shield,
    body: [
      "lipsum.com is committed to protecting your privacy online. This Privacy Policy endeavours to describe to you our practices regarding the personal information we collect from users on our website, located at lipsum.com (the \"Site\"), and the services offered through the Site. If you have any questions about our Privacy Policy, our collection practices, the processing of user information, or if you would like to report a security violation to us directly, please contact us at help@lipsum.com",
      "Please read this policy in conjunction with the Freestar Privacy Policy.",
    ],
  },
  {
    id: "data-collect",
    title: "What Data We Collect",
    icon: Database,
    body: [
      "General Data: The use of our services will automatically create information that will be collected. For example, when you use our Services, your geographic location, how you use the Services, information about the type of device you use, your Open Device Identification Number, date/time stamps for your visit, your unique device identifier, your browser type, operating system, Internet Protocol (IP) address, and domain name are all collected. This information is generally used to help us deliver the most relevant information to you and administer and improve the Site.",
      "Log Files: As is true of most websites, we gather certain information automatically and store it in log files. This information includes IP addresses, browser type, Internet service provider (ISP), referring/exit pages, operating system, date/time stamp, and clickstream data. We use this information to maintain and improve the performance of the Services.",
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: Eye,
    body: [
      "We use analytics services (including, but not limited to, Google Analytics) to help analyze how users use the Site. Analytics services use Cookies to collect information such as how often users visit the Site and we use the information to improve our Site and Services. The analytics services' ability to use and share information collected by them is restricted by their terms of use and privacy policy, which you should refer to for more information about how these entities use this information.",
    ],
  },
  {
    id: "location",
    title: "Location Information",
    icon: Shield,
    body: [
      "If you have enabled location services on your mobile device, we may collect your location information to improve the Services we offer. If you do not want this information collected, you can disable location services on your device.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    icon: Database,
    body: [
      "\"Cookies\" are small pieces of information (text files) that a website sends to your computer's hard drive while you are viewing the website. These text files can be used by websites to make the user experience more efficient. The law states that we can store these cookies on your device if they are strictly necessary for the operation of this site. For all other types of cookies we need your permission. To that end, this site uses different types of cookies. Some cookies are placed by third party services that appear on our pages.",
      "We use both session Cookies (which expire once you close your web browser) and persistent Cookies (which stay on your computer until you delete them). You have the ability to accept or decline Cookies. Most web browsers automatically accept Cookies, but you can usually modify your browser setting to decline Cookies if you prefer. If you choose to decline Cookies, you may not be able to sign in or use other interactive features of our websites and Services that depend on Cookies.",
    ],
  },
  {
    id: "how-use",
    title: "How We Use Information",
    icon: Bell,
    body: [
      "We use the information we collect in the following ways:",
    ],
    list: [
      "To provide, operate, maintain, and improve our Services",
      "To enable you to access and use the Services",
      "To process and complete transactions, and send you related information",
      "To send transactional messages, including responses to your comments, questions, and requests",
      "To send promotional communications, such as providing you with information about services, features, surveys, newsletters, offers, and events",
      "To monitor and analyze trends, usage, and activities in connection with our Services",
      "To detect, prevent, and address technical issues and illegal activities",
    ],
  },
  {
    id: "security",
    title: "Data Security",
    icon: Lock,
    body: [
      "We take the security of your personal information seriously and use appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction, or damage. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.",
    ],
  },
  {
    id: "rights",
    title: "Your Rights",
    icon: Shield,
    body: [
      "Under the General Data Protection Regulation (GDPR), you have certain rights regarding your personal information, including:",
    ],
    list: [
      "The right to access your personal information",
      "The right to rectification of inaccurate personal information",
      "The right to erasure of your personal information",
      "The right to restrict processing of your personal information",
      "The right to data portability",
      "The right to object to processing of your personal information",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    body: [
      "If you have any questions about this Privacy Policy, please contact us at:",
    ],
    contact: true,
  },
];

/* ─── component ────────────────────────────────────────────────────────── */
const PrivacyPolicyPage: React.FC = () => {
  const [active, setActive] = useState("intro");

  /* scroll-spy: highlight whichever section is in view */
  useEffect(() => {
    const onScroll = () => {
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(SECTIONS[i].id);
          break;
        }
      }
    };
    const container = document.getElementById("scroll-body");
    if (container) container.addEventListener("scroll", onScroll);
    return () => { if (container) container.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  return (
    <div className="flex h-screen bg-blue-50" style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      <style>{`
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

        /* scrollbar */
        #scroll-body::-webkit-scrollbar { width: 6px; }
        #scroll-body::-webkit-scrollbar-track { background: transparent; }
        #scroll-body::-webkit-scrollbar-thumb { background: #93c5fd; border-radius: 3px; }
        #scroll-body::-webkit-scrollbar-thumb:hover { background: #60a5fa; }

        /* sidebar nav item */
        .nav-item { transition: background 0.2s, color 0.2s, padding-left 0.2s; cursor: pointer; }
        .nav-item:hover { background: rgba(37,99,235,0.05); }
        .nav-item.active { background: linear-gradient(90deg, #dbeafe, transparent); color: #1e40af !important; padding-left: 18px; }
        .nav-item.active .nav-dot { background: #2563eb; box-shadow: 0 0 6px rgba(37,99,235,0.4); }

        /* section card entrance */
        .section-card { animation: fadeUp 0.35s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

        /* list bullet */
        .blue-bullet { list-style: none; position: relative; padding-left: 22px; }
        .blue-bullet::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
        }

        /* back btn hover */
        .back-btn { transition: background 0.2s; }
        .back-btn:hover { background: rgba(255,255,255,0.25); }
      `}</style>

      {/* ─── Left Sidebar ─── */}
      <aside className="flex flex-col bg-white" style={{ width: 260, minWidth: 260, borderRight: "1.5px solid #dbeafe", height: "100vh" }}>

        {/* logo / brand area */}
        <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: "1px solid #dbeafe" }}>
          <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)" }}>
            <Shield className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-bold text-blue-900">lipsum.com</p>
            <p className="text-xs text-blue-400">Privacy Policy</p>
          </div>
        </div>

        {/* nav links */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <div
                key={s.id}
                className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 ${isActive ? "active" : ""}`}
                onClick={() => scrollTo(s.id)}
              >
                <span className={`nav-dot inline-block w-2 h-2 rounded-full transition-all`} style={{ background: isActive ? "#2563eb" : "#93c5fd" }} />
                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: isActive ? "#1e40af" : "#60a5fa" }} strokeWidth={1.8} />
                <span className="text-xs font-semibold truncate" style={{ color: isActive ? "#1e40af" : "#6b7280" }}>{s.title}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-600" strokeWidth={2.5} />}
              </div>
            );
          })}
        </nav>

        {/* bottom badge */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid #dbeafe" }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50">
            <Lock className="w-3.5 h-3.5 text-blue-600" strokeWidth={2} />
            <span className="text-xs text-blue-900">Last updated: Jan 2026</span>
          </div>
        </div>
      </aside>

      {/* ─── Main content area ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* top header bar */}
        <header className="flex items-center justify-between px-8 py-4 flex-shrink-0 bg-blue-600" style={{ minHeight: 68 }}>
          {/* decorative orb */}
          <div style={{ position: "absolute", top: -30, right: -30, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.1)", pointerEvents: "none" }} />

          <div className="flex items-center gap-3 relative z-10">
            <button className="back-btn flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "rgba(255,255,255,0.18)" }}>
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-white font-bold text-2xl tracking-tight pl-0">Privacy Policy</h1>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>GDPR compliant — lipsum.com</p>
            </div>
          </div>

          {/* right side – shield badge */}
          <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)" }}>
            <Shield className="w-4 h-4 text-white" strokeWidth={2} />
            <span className="text-xs font-semibold text-white">GDPR Compliant</span>
          </div>
        </header>

        {/* scrollable content */}
        <div id="scroll-body" className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 bg-blue-50">
          <div>

            {SECTIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  id={s.id}
                  className="section-card mb-6"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {/* card */}
                  <div className="rounded-2xl overflow-hidden bg-white" style={{ border: "1.5px solid #dbeafe", boxShadow: "0 2px 12px rgba(37,99,235,0.06)" }}>

                    {/* section header row */}
                    <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-white">
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "linear-gradient(135deg, #dbeafe, #93c5fd)" }}>
                        <Icon className="w-4.5 h-4.5 text-blue-600" strokeWidth={1.8} />
                      </div>
                      <h2 className="text-lg font-bold text-blue-900 pl-0">{s.title}</h2>
                      <span className="ml-auto text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-600">
                        #{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* divider */}
                    <div style={{ height: 2, background: "linear-gradient(90deg, #93c5fd, transparent)" }} />

                    {/* body */}
                    <div className="px-6 py-5">
                      {s.body.map((para, j) => (
                        <p key={j} className="text-sm leading-relaxed mb-3 text-gray-700">{para}</p>
                      ))}

                      {/* bullet list */}
                      {s.list && (
                        <ul className="mt-3 space-y-2">
                          {s.list.map((item, j) => (
                            <li key={j} className="blue-bullet text-sm leading-relaxed text-gray-700">{item}</li>
                          ))}
                        </ul>
                      )}

                      {/* contact block */}
                      {s.contact && (
                        <div className="mt-2 rounded-xl p-4 bg-blue-50" style={{ border: "1px solid #93c5fd" }}>
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-blue-600" strokeWidth={2} />
                            <span className="text-xs font-bold text-blue-900">Email</span>
                            <span className="text-xs ml-1 text-gray-700">help@lipsum.com</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-600" strokeWidth={2} />
                            <span className="text-xs font-bold text-blue-900">Website</span>
                            <span className="text-xs ml-1 text-gray-700">www.lipsum.com</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* bottom note */}
            <div className="text-center pb-6">
              <p className="text-xs text-blue-400">© 2026 lipsum.com — All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;