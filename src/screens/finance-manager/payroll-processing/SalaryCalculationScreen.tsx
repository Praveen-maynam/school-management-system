import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Search,
  Download,
  Edit2,
  CheckCircle2,
  Users,
  BookOpen,
  Bus,
  Shield,
  Building2,
  Package,
  Sparkles,
  ChevronRight,
  Calendar,
  DollarSign,
  TrendingDown,
  Wallet,
  X,
  Check,
  GraduationCap,
  Briefcase,
} from "lucide-react";

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────
interface Employee {
  id: number;
  name: string;
  designation?: string;
  role?: string;
  base: number;
  deductions: number;
  status: string;
  dept?: string;
}

interface DeptData {
  [key: string]: Employee[];
}

// ─── DUMMY DATA ─────────────────────────────────────────────────────────────
const teachingStaff = [
  { id: 1, name: "Amit Kumar", designation: "Maths Teacher", base: 40000, deductions: 2000, status: "Paid", dept: "Mathematics" },
  { id: 2, name: "Priya Singh", designation: "English Teacher", base: 35000, deductions: 1500, status: "Unpaid", dept: "English" },
  { id: 3, name: "Rahul Mehta", designation: "Science Teacher", base: 42000, deductions: 2200, status: "Paid", dept: "Science" },
  { id: 4, name: "Sneha Patel", designation: "History Teacher", base: 33000, deductions: 1800, status: "Unpaid", dept: "History" },
  { id: 5, name: "Vikram Rao", designation: "Physics Teacher", base: 41000, deductions: 2100, status: "Paid", dept: "Physics" },
  { id: 6, name: "Ananya Das", designation: "Chemistry Teacher", base: 38000, deductions: 1900, status: "Unpaid", dept: "Chemistry" },
  { id: 7, name: "Saurabh Jain", designation: "Geography Teacher", base: 32000, deductions: 1400, status: "Paid", dept: "Geography" },
  { id: 8, name: "Meera Nair", designation: "Art Teacher", base: 28000, deductions: 1200, status: "Paid", dept: "Art" },
];

const nonTeachingDepts = [
  { id: "library", name: "Library Staff", icon: BookOpen, color: { bg: "from-violet-50 to-purple-100", border: "border-violet-200", accent: "text-violet-600", iconBg: "bg-violet-100", badge: "bg-violet-50 text-violet-700" }, employees: 3 },
  { id: "transport", name: "Transport Staff", icon: Bus, color: { bg: "from-sky-50 to-blue-100", border: "border-sky-200", accent: "text-sky-600", iconBg: "bg-sky-100", badge: "bg-sky-50 text-sky-700" }, employees: 4 },
  { id: "cleaning", name: "Cleaning Staff", icon: Sparkles, color: { bg: "from-emerald-50 to-green-100", border: "border-emerald-200", accent: "text-emerald-600", iconBg: "bg-emerald-100", badge: "bg-emerald-50 text-emerald-700" }, employees: 5 },
  { id: "security", name: "Security Staff", icon: Shield, color: { bg: "from-red-50 to-rose-100", border: "border-red-200", accent: "text-red-600", iconBg: "bg-red-100", badge: "bg-red-50 text-red-700" }, employees: 3 },
  { id: "office", name: "Office / Admin Staff", icon: Building2, color: { bg: "from-amber-50 to-yellow-100", border: "border-amber-200", accent: "text-amber-600", iconBg: "bg-amber-100", badge: "bg-amber-50 text-amber-700" }, employees: 4 },
  { id: "inventory", name: "Inventory / Store Staff", icon: Package, color: { bg: "from-orange-50 to-orange-100", border: "border-orange-200", accent: "text-orange-600", iconBg: "bg-orange-100", badge: "bg-orange-50 text-orange-700" }, employees: 2 },
];

const deptEmployees = {
  library: [
    { id: 101, name: "Ramesh Gupta", role: "Librarian", base: 25000, deductions: 1000, status: "Paid" },
    { id: 102, name: "Sita Yadav", role: "Assistant Librarian", base: 18000, deductions: 500, status: "Unpaid" },
    { id: 103, name: "Neha Roy", role: "Cataloguer", base: 16000, deductions: 600, status: "Paid" },
  ],
  transport: [
    { id: 201, name: "Arvind Tyagi", role: "Head Driver", base: 22000, deductions: 900, status: "Paid" },
    { id: 202, name: "Mohan Das", role: "Driver", base: 18000, deductions: 700, status: "Unpaid" },
    { id: 203, name: "Suresh Pal", role: "Driver", base: 18000, deductions: 650, status: "Paid" },
    { id: 204, name: "Lakshmi Devi", role: "Attendant", base: 14000, deductions: 500, status: "Unpaid" },
  ],
  cleaning: [
    { id: 301, name: "Kamal Singh", role: "Head Cleaner", base: 16000, deductions: 600, status: "Paid" },
    { id: 302, name: "Ravi Kumar", role: "Cleaner", base: 13000, deductions: 450, status: "Paid" },
    { id: 303, name: "Sunita Biswas", role: "Cleaner", base: 13000, deductions: 480, status: "Unpaid" },
    { id: 304, name: "Ajay Yadav", role: "Cleaner", base: 13000, deductions: 500, status: "Paid" },
    { id: 305, name: "Pooja Mehta", role: "Cleaner", base: 12500, deductions: 400, status: "Unpaid" },
  ],
  security: [
    { id: 401, name: "Jagdish Negi", role: "Head Guard", base: 20000, deductions: 800, status: "Paid" },
    { id: 402, name: "Prakash Chandra", role: "Security Guard", base: 16000, deductions: 600, status: "Unpaid" },
    { id: 403, name: "Vikrant Thakur", role: "Security Guard", base: 16000, deductions: 550, status: "Paid" },
  ],
  office: [
    { id: 501, name: "Deepak Sharma", role: "Office Manager", base: 30000, deductions: 1200, status: "Paid" },
    { id: 502, name: "Anita Chaudhary", role: "Receptionist", base: 20000, deductions: 700, status: "Paid" },
    { id: 503, name: "Rajesh Bhandari", role: "Accountant", base: 28000, deductions: 1100, status: "Unpaid" },
    { id: 504, name: "Seema Joshi", role: "HR Coordinator", base: 22000, deductions: 800, status: "Paid" },
  ],
  inventory: [
    { id: 601, name: "Harsh Pandey", role: "Store Manager", base: 21000, deductions: 850, status: "Paid" },
    { id: 602, name: "Asha Kumari", role: "Store Assistant", base: 15000, deductions: 550, status: "Unpaid" },
  ],
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ─── HELPERS ────────────────────────────────────────────────────────────────
const fmt = (n: number): string => "₹" + n.toLocaleString("en-IN");

// ─── REUSABLE: SUMMARY BAR ──────────────────────────────────────────────────
function SummaryBar({ employees }: { employees: Employee[] }) {
  const totalBase = employees.reduce((s: number, e: Employee) => s + e.base, 0);
  const totalDed = employees.reduce((s: number, e: Employee) => s + e.deductions, 0);
  const netPay = totalBase - totalDed;
  const cards = [
    { label: "Total Salary", value: totalBase, icon: DollarSign, grad: "from-emerald-50 to-green-100", border: "border-emerald-200", text: "text-emerald-700", iconBg: "bg-white" },
    { label: "Total Deductions", value: totalDed, icon: TrendingDown, grad: "from-red-50 to-orange-100", border: "border-red-200", text: "text-red-700", iconBg: "bg-white" },
    { label: "Net Payable", value: netPay, icon: Wallet, grad: "from-blue-50 to-indigo-100", border: "border-blue-200", text: "text-blue-700", iconBg: "bg-white" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className={`bg-gradient-to-br ${c.grad} rounded-xl p-4 border ${c.border}`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`${c.iconBg} rounded-lg p-2 shadow-sm`}>
                <Icon className={`w-5 h-5 ${c.text}`} />
              </div>
            </div>
            <p className="text-xs font-medium text-slate-500">{c.label}</p>
            <p className={`text-xl font-bold ${c.text} mt-0.5`}>{fmt(c.value)}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── REUSABLE: SALARY TABLE ─────────────────────────────────────────────────
function SalaryTable({ employees, onEdit, onProcess, showDesignation }: { employees: Employee[]; onEdit: (emp: Employee) => void; onProcess: (emp: Employee) => void; showDesignation: boolean }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
            <th className="px-5 py-3 text-left font-semibold">#</th>
            <th className="px-5 py-3 text-left font-semibold">Employee</th>
            {showDesignation ? (
              <th className="px-5 py-3 text-left font-semibold">Designation</th>
            ) : (
              <th className="px-5 py-3 text-left font-semibold">Role</th>
            )}
            <th className="px-5 py-3 text-right font-semibold">Base Salary</th>
            <th className="px-5 py-3 text-right font-semibold">Deductions</th>
            <th className="px-5 py-3 text-right font-semibold">Net Salary</th>
            <th className="px-5 py-3 text-left font-semibold">Status</th>
            <th className="px-5 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp: Employee, idx: number) => {
            const net = emp.base - emp.deductions;
            const isPaid = emp.status === "Paid";
            return (
              <tr
                key={emp.id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50 transition-colors border-t border-slate-100`}
              >
                <td className="px-5 py-3.5 text-slate-400 font-medium">{idx + 1}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {emp.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                    </div>
                    <span className="font-semibold text-slate-800">{emp.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-600">{showDesignation ? emp.designation : emp.role}</td>
                <td className="px-5 py-3.5 text-right font-semibold text-slate-800">{fmt(emp.base)}</td>
                <td className="px-5 py-3.5 text-right font-semibold text-red-500">{fmt(emp.deductions)}</td>
                <td className="px-5 py-3.5 text-right font-bold text-emerald-700">{fmt(net)}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${isPaid ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? "bg-emerald-500" : "bg-red-500"}`} />
                    {emp.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(emp)}
                      className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    {!isPaid && (
                      <button
                        onClick={() => onProcess(emp)}
                        className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Process
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── EDIT MODAL ─────────────────────────────────────────────────────────────
function EditModal({ employee, onClose, onSave }: { employee: Employee; onClose: () => void; onSave: (emp: Employee) => void }) {
  const [base, setBase] = useState(employee.base);
  const [ded, setDed] = useState(employee.deductions);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex items-center justify-between border-b border-blue-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Edit Salary</h3>
            <p className="text-xs text-slate-500">{employee.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg p-1.5 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Base Salary (₹)</label>
            <input
              type="number"
              value={base}
              onChange={(e) => setBase(Number(e.target.value))}
              className="w-full border-2 border-slate-200 focus:border-blue-400 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Deductions (₹)</label>
            <input
              type="number"
              value={ded}
              onChange={(e) => setDed(Number(e.target.value))}
              className="w-full border-2 border-slate-200 focus:border-red-400 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none transition-all"
            />
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">Net Salary Preview</span>
            <span className="text-base font-bold text-emerald-700">{fmt(base - ded)}</span>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 border-2 border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium text-sm transition-all">Cancel</button>
            <button
              onClick={() => onSave({ ...employee, base, deductions: ded })}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium text-sm shadow-md transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROCESS CONFIRMATION MODAL ─────────────────────────────────────────────
function ProcessModal({ employee, onClose, onConfirm }: { employee: Employee; onClose: () => void; onConfirm: (emp: Employee) => void }) {
  const net = employee.base - employee.deductions;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 flex items-center justify-between border-b border-emerald-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Process Salary</h3>
            <p className="text-xs text-slate-500">{employee.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg p-1.5 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
            <p className="text-xs text-slate-500 mb-1">Amount to be Disbursed</p>
            <p className="text-3xl font-bold text-emerald-700">{fmt(net)}</p>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between"><span>Base Salary</span><span className="font-semibold text-slate-800">{fmt(employee.base)}</span></div>
            <div className="flex justify-between"><span>Deductions</span><span className="font-semibold text-red-500">- {fmt(employee.deductions)}</span></div>
            <div className="border-t border-slate-200 pt-2 flex justify-between"><span className="font-semibold">Net Payable</span><span className="font-bold text-emerald-700">{fmt(net)}</span></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 border-2 border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium text-sm transition-all">Cancel</button>
            <button
              onClick={() => onConfirm(employee)}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 font-medium text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function SalaryCollection() {
  // Navigation: "overview" | "teaching" | "nonteaching" | "dept"
  const [view, setView] = useState<string>("overview");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("January");

  // Data state (mutable copy)
  const [teachData, setTeachData] = useState<Employee[]>(teachingStaff);
  const [deptData, setDeptData] = useState<DeptData>({ ...deptEmployees });

  // Modals
  const [editEmp, setEditEmp] = useState<Employee | null>(null);
  const [processEmp, setProcessEmp] = useState<Employee | null>(null);

  // Derived: current employee list based on view
  const currentList = useMemo(() => {
    let list = view === "teaching" ? teachData : view === "dept" && selectedDept ? (deptData[selectedDept] || []) : [];
    if (search) list = list.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [view, teachData, deptData, selectedDept, search]);

  // Edit / Process handlers
  const handleSave = (updated: Employee): void => {
    if (view === "teaching") {
      setTeachData((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    } else if (view === "dept" && selectedDept) {
      setDeptData((prev) => ({ ...prev, [selectedDept]: prev[selectedDept as keyof DeptData].map((e) => (e.id === updated.id ? updated : e)) }));
    }
    setEditEmp(null);
  };

  const handleProcess = (emp: Employee): void => {
    const updated = { ...emp, status: "Paid" };
    handleSave(updated);
    setProcessEmp(null);
  };

  // ── OVERVIEW ────────────────────────────────────────────────────────────
  if (view === "overview") {
    const totalTeachSalary = teachingStaff.reduce((s, e) => s + e.base - e.deductions, 0);
    const totalNonTeachSalary = Object.values(deptEmployees).flat().reduce((s, e) => s + e.base - e.deductions, 0);
    const totalNonTeachCount = Object.values(deptEmployees).flat().length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Salary Collection</h1>
                <p className="text-slate-500 mt-0.5">Manage and process salaries for all staff</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                  </div>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 border-2 border-slate-200 rounded-lg bg-white text-sm font-medium text-slate-700 outline-none focus:border-blue-400 transition-all cursor-pointer"
                  >
                    {MONTHS.map((m) => <option key={m} value={m}>{m} 2026</option>)}
                  </select>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md text-sm font-medium">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
            </div>
          </div>

          {/* Staff Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Teaching */}
            <button
              onClick={() => setView("teaching")}
              className="group bg-white rounded-2xl shadow-sm border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 overflow-hidden text-left"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-5">
                <div className="flex items-center justify-between">
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <GraduationCap className="w-7 h-7 text-blue-600" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-slate-800 mb-1">Teaching Staff</h2>
                <p className="text-sm text-slate-500 mb-4">View and process teacher salaries</p>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-500">Employees</p>
                    <p className="text-lg font-bold text-blue-700">{teachingStaff.length}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-500">Net Payable</p>
                    <p className="text-lg font-bold text-emerald-700">{fmt(totalTeachSalary)}</p>
                  </div>
                </div>
              </div>
            </button>

            {/* Non-Teaching */}
            <button
              onClick={() => setView("nonteaching")}
              className="group bg-white rounded-2xl shadow-sm border-2 border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 overflow-hidden text-left"
            >
              <div className="bg-gradient-to-r from-emerald-50 to-green-100 p-5">
                <div className="flex items-center justify-between">
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <Briefcase className="w-7 h-7 text-emerald-600" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-slate-800 mb-1">Non-Teaching Staff</h2>
                <p className="text-sm text-slate-500 mb-4">Explore department-wise salary details</p>
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-500">Employees</p>
                    <p className="text-lg font-bold text-emerald-700">{totalNonTeachCount}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-500">Net Payable</p>
                    <p className="text-lg font-bold text-blue-700">{fmt(totalNonTeachSalary)}</p>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Global Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Overall Summary – {selectedMonth} 2026</h2>
            <SummaryBar employees={[...teachingStaff, ...Object.values(deptEmployees).flat()]} />
          </div>
        </div>
      </div>
    );
  }

  // ── NON-TEACHING DEPARTMENTS ─────────────────────────────────────────────
  if (view === "nonteaching") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setView("overview")} className="bg-slate-100 hover:bg-slate-200 rounded-lg p-2 transition-all">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Non-Teaching Staff</h1>
                  <p className="text-sm text-slate-500">Select a department to view salary details</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all shadow-md text-sm font-medium">
                <Download className="w-4 h-4" /> Export All
              </button>
            </div>
          </div>

          {/* Department Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nonTeachingDepts.map((dept) => {
              const Icon = dept.icon;
              const deptKey = dept.id as keyof typeof deptEmployees;
              const emps: Employee[] = deptEmployees[deptKey] || [];
              const netTotal = emps.reduce((s: number, e: Employee): number => s + e.base - e.deductions, 0);
              const unpaidCount = emps.filter((e: Employee) => e.status === "Unpaid").length;
              return (
                <button
                  key={dept.id}
                  onClick={() => { setSelectedDept(dept.id); setView("dept"); setSearch(""); }}
                  className={`group bg-gradient-to-br ${dept.color.bg} rounded-2xl border-2 ${dept.color.border} hover:shadow-lg transition-all duration-300 text-left p-5 hover:scale-[1.02]`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${dept.color.iconBg} rounded-xl p-3 shadow-sm`}>
                      <Icon className={`w-6 h-6 ${dept.color.accent}`} />
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-300 group-hover:${dept.color.accent} group-hover:translate-x-1 transition-all`} />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-0.5">{dept.name}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${dept.color.badge}`}>
                      <Users className="w-3.5 h-3.5" /> {dept.employees} Staff
                    </span>
                    {unpaidCount > 0 && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {unpaidCount} Unpaid
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-slate-700 mt-3">Net: {fmt(netTotal)}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── TEACHING / DEPARTMENT SALARY LIST ───────────────────────────────────
  const isTeaching = view === "teaching";
  const currentDept = nonTeachingDepts.find((d) => d.id === selectedDept);
  const headerGrad = isTeaching ? "from-blue-50 to-indigo-50" : "from-emerald-50 to-green-50";
  const headerBorder = isTeaching ? "border-blue-100" : "border-emerald-100";
  const accentBtnGrad = isTeaching ? "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" : "from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700";
  const Icon = isTeaching ? GraduationCap : (currentDept?.icon || Briefcase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => { setView(isTeaching ? "overview" : "nonteaching"); setSearch(""); }}
                className="bg-slate-100 hover:bg-slate-200 rounded-lg p-2 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div className={`rounded-xl p-2.5 ${isTeaching ? "bg-blue-50" : "bg-emerald-50"}`}>
                <Icon className={`w-6 h-6 ${isTeaching ? "text-blue-600" : "text-emerald-600"}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {isTeaching ? "Teaching Staff" : currentDept?.name}
                </h1>
                <p className="text-sm text-slate-500">{currentList.length} employee{currentList.length !== 1 ? "s" : ""} • {selectedMonth} 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search employee..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2.5 border-2 border-slate-200 focus:border-blue-400 rounded-lg text-sm outline-none transition-all w-48"
                />
              </div>
              <button className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r ${accentBtnGrad} text-white rounded-lg transition-all shadow-md text-sm font-medium`}>
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryBar employees={currentList} />

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className={`bg-gradient-to-r ${headerGrad} px-6 py-3.5 border-b ${headerBorder} flex items-center justify-between`}>
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Salary Details</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">
                {currentList.filter((e) => e.status === "Paid").length} Paid &nbsp;•&nbsp;
                <span className="text-red-500">{currentList.filter((e) => e.status === "Unpaid").length} Unpaid</span>
              </span>
            </div>
          </div>
          {currentList.length > 0 ? (
            <SalaryTable
              employees={currentList}
              showDesignation={isTeaching}
              onEdit={setEditEmp}
              onProcess={setProcessEmp}
            />
          ) : (
            <div className="py-16 text-center">
              <div className="text-slate-300 text-5xl mb-3">🔍</div>
              <p className="text-slate-500 font-medium">No employees found</p>
              <p className="text-slate-400 text-sm">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {editEmp && <EditModal employee={editEmp} onClose={() => setEditEmp(null)} onSave={handleSave} />}
      {processEmp && <ProcessModal employee={processEmp} onClose={() => setProcessEmp(null)} onConfirm={handleProcess} />}
    </div>
  );
}