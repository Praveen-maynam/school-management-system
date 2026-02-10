import { useState, useMemo, ReactNode } from "react";
import "./DeductionManagementScreen.css";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Info,
  Shield,
  TrendingDown,
  Layers,
  Zap,
  Users,
  ChevronDown,
} from "lucide-react";

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────
interface Deduction {
  id: number;
  name: string;
  short: string;
  amount: number;
  category: string;
  status: string;
  appliesTo: { teaching: boolean; nonTeaching: boolean };
  usageCount: number;
  tooltip: string;
}

interface DeductionForm {
  id?: number;
  name: string;
  amount: number | string;
  category: string;
  short?: string;
  status?: string;
  appliesTo: { teaching: boolean; nonTeaching: boolean };
  usageCount?: number;
  tooltip?: string;
}

interface FormErrors {
  name?: string;
  amount?: string;
  appliesTo?: string;
}

// ─── DUMMY DATA ─────────────────────────────────────────────────────────────
const INITIAL_DEDUCTIONS = [
  {
    id: 1,
    name: "Provident Fund",
    short: "PF",
    amount: 1200,
    category: "Statutory",
    status: "Active",
    appliesTo: { teaching: true, nonTeaching: true },
    usageCount: 42,
    tooltip: "Employees contribute 12% of basic salary. Matched by employer. Managed by EPFO under the Employees' Provident Fund Act.",
  },
  {
    id: 2,
    name: "Employees' State Insurance",
    short: "ESI",
    amount: 800,
    category: "Statutory",
    status: "Active",
    appliesTo: { teaching: true, nonTeaching: true },
    usageCount: 38,
    tooltip: "Covers medical, sickness, maternity & family benefits. Applicable to employees earning ≤ ₹21,000/month gross.",
  },
  {
    id: 3,
    name: "Tax Deducted at Source",
    short: "TDS",
    amount: 500,
    category: "Statutory",
    status: "Active",
    appliesTo: { teaching: true, nonTeaching: false },
    usageCount: 28,
    tooltip: "Income tax deducted at the point of salary payment. Rate depends on the employee's tax slab and declarations under Form 80C/HRA.",
  },
  {
    id: 4,
    name: "Professional Tax",
    short: "PT",
    amount: 200,
    category: "Statutory",
    status: "Active",
    appliesTo: { teaching: true, nonTeaching: true },
    usageCount: 40,
    tooltip: "State-level tax levied on salaried individuals. Max ₹2,400/year. Varies by state — some states exempt certain salary slabs.",
  },
  {
    id: 5,
    name: "Group Insurance Premium",
    short: "GIP",
    amount: 350,
    category: "Optional",
    status: "Active",
    appliesTo: { teaching: true, nonTeaching: true },
    usageCount: 35,
    tooltip: "Optional group life & health insurance plan offered by the school. Covers the employee and optionally spouse/children at reduced premiums.",
  },
  {
    id: 6,
    name: "Lunch Allowance Advance",
    short: "LAA",
    amount: 150,
    category: "Other",
    status: "Inactive",
    appliesTo: { teaching: false, nonTeaching: true },
    usageCount: 12,
    tooltip: "Advance deduction for the monthly lunch/canteen allowance. Automatically reversed if employee is absent for the full month.",
  },
];

const CATEGORIES = ["Statutory", "Optional", "Other"];
const CAT_STYLES = {
  Statutory: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Optional: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Other: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
};

// ─── TOOLTIP COMPONENT ──────────────────────────────────────────────────────
function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="tooltip-box absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-64 bg-slate-800 text-white text-xs rounded-xl p-3.5 shadow-xl leading-relaxed">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </div>
      )}
    </div>
  );
}

// ─── TOGGLE SWITCH ──────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      title="Toggle status"
      className={`toggle-button relative w-10 h-5.5 rounded-full transition-colors duration-300 focus:outline-none ${checked ? "bg-emerald-500" : "bg-slate-300"}`}
    >
      <span
        className={`toggle-span absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

// ─── MODAL: ADD / EDIT ──────────────────────────────────────────────────────
function DeductionModal({ mode, initial, onClose, onSave }: { mode: "add" | "edit"; initial?: Deduction; onClose: () => void; onSave: (item: Deduction) => void }) {
  const blank: DeductionForm = { name: "", amount: "", category: "Statutory", status: "Active", appliesTo: { teaching: true, nonTeaching: true } };
  const [form, setForm] = useState<DeductionForm>(mode === "edit" && initial ? { name: initial.name, amount: initial.amount, category: initial.category, short: initial.short, status: initial.status, appliesTo: initial.appliesTo, tooltip: initial.tooltip } : blank);
  const [errors, setErrors] = useState<FormErrors>();

  const validate = () => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Deduction type name is required";
    if (!form.amount || Number(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (!form.appliesTo.teaching && !form.appliesTo.nonTeaching) e.appliesTo = "Select at least one staff type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    onSave({
      name: form.name,
      amount: Number(form.amount),
      category: form.category,
      appliesTo: form.appliesTo,
      id: mode === "edit" && form.id ? form.id : Date.now(),
      status: form.status || "Active",
      short: form.short || form.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 3),
      usageCount: mode === "edit" && form.usageCount ? form.usageCount : 0,
      tooltip: form.tooltip || `${form.category} deduction: ${form.name}`,
    });
  };

  const labelCls = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5";
  const inputCls = (hasError?: boolean): string =>
    `w-full border-2 ${hasError ? "border-red-300 bg-red-50" : "border-slate-200 focus:border-blue-400"} rounded-lg px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className={`px-6 py-4.5 flex items-center justify-between border-b ${mode === "edit" ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100" : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"}`}>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{mode === "edit" ? "Edit Deduction" : "Add New Deduction"}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{mode === "edit" ? `Editing: ${initial?.name}` : "Fill in details below"}</p>
          </div>
          <button onClick={onClose} className="bg-slate-100 hover:bg-slate-200 rounded-lg p-1.5 transition-all" title="Close">
            <X className="w-4.5 h-4.5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {/* Name */}
          <div>
            <label className={labelCls}>Deduction Type</label>
            <input
              type="text"
              placeholder="e.g. Provident Fund"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputCls(!!errors?.name)}
            />
            {errors?.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Short Code + Amount Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Short Code</label>
              <input
                type="text"
                placeholder="e.g. PF"
                value={form.short || ""}
                onChange={(e) => setForm({ ...form, short: e.target.value.toUpperCase().slice(0, 4) })}
                className={inputCls(false)}
                maxLength={4}
              />
              <p className="text-xs text-slate-400 mt-1">Auto-generated if left blank</p>
            </div>
            <div>
              <label className={labelCls}>Amount (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className={inputCls(!!errors?.amount)}
              />
              {errors?.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={labelCls}>Category</label>
            <div className="relative">
              <select
                title="Select category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full appearance-none border-2 border-slate-200 focus:border-blue-400 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 outline-none bg-white cursor-pointer transition-all"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="flex gap-2 mt-2">
              {CATEGORIES.map((c) => {
                const s = CAT_STYLES[c as keyof typeof CAT_STYLES];
                return (
                  <span key={c} className={`text-xs font-semibold px-2 py-0.5 rounded-md ${s.bg} ${s.text} border ${s.border}`}>{c}</span>
                );
              })}
            </div>
          </div>

          {/* Applies To */}
          <div>
            <label className={labelCls}>Applies To</label>
            <div className="flex gap-3">
              {[
                { key: "teaching", label: "Teaching Staff", icon: "🎓" },
                { key: "nonTeaching", label: "Non-Teaching Staff", icon: "💼" },
              ].map((item) => {
                const active = form.appliesTo[item.key as keyof typeof form.appliesTo];
                return (
                  <button
                    key={item.key}
                    onClick={() => setForm({ ...form, appliesTo: { ...form.appliesTo, [item.key]: !active } })}
                    className={`flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${active ? "border-blue-400 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {active && <Check className="w-3.5 h-3.5 ml-auto text-blue-500" />}
                  </button>
                );
              })}
            </div>
            {errors?.appliesTo && <p className="text-red-500 text-xs mt-1.5">{errors.appliesTo}</p>}
          </div>

          {/* Status */}
          <div>
            <label className={labelCls}>Status</label>
            <div className="flex gap-3">
              {["Active", "Inactive"].map((s) => {
                const isActive = (form.status || "Active") === s;
                const isGreen = s === "Active";
                return (
                  <button
                    key={s}
                    onClick={() => setForm({ ...form, status: s })}
                    className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${isActive ? (isGreen ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-red-300 bg-red-50 text-red-600") : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isActive ? (isGreen ? "bg-emerald-500" : "bg-red-500") : "bg-slate-300"}`} />
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button onClick={onClose} className="px-4 py-2 border-2 border-slate-200 text-slate-600 rounded-lg hover:bg-slate-100 text-sm font-medium transition-all">
            Cancel
          </button>
          <button
            onClick={submit}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold shadow-md transition-all ${mode === "edit" ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"}`}
          >
            <Check className="w-4 h-4" />
            {mode === "edit" ? "Update Deduction" : "Add Deduction"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MODAL: DELETE CONFIRMATION ──────────────────────────────────────────────
function DeleteModal({ deduction, onClose, onConfirm }: { deduction: Deduction; onClose: () => void; onConfirm: (id: number) => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-50 to-rose-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 rounded-full p-2">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Delete Deduction</h3>
          </div>
          <button onClick={onClose} className="bg-slate-100 hover:bg-slate-200 rounded-lg p-1.5 transition-all" title="Close">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete <strong className="text-slate-800">"{deduction.name}"</strong>?
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3.5 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-xs text-red-700 leading-relaxed">
              This deduction is currently applied to <strong>{deduction.usageCount} employees</strong>. Deleting it will remove it from all salary calculations going forward. This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="flex-1 px-4 py-2.5 border-2 border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium transition-all">Cancel</button>
            <button onClick={() => onConfirm(deduction.id)} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-1.5">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SCREEN ────────────────────────────────────────────────────────────
export default function DeductionManagement() {
  const [deductions, setDeductions] = useState(INITIAL_DEDUCTIONS);
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Deduction | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Deduction | null>(null);

  // Filtered
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return deductions.filter((d) => d.name.toLowerCase().includes(q) || d.short.toLowerCase().includes(q) || d.category.toLowerCase().includes(q));
  }, [deductions, search]);

  // Summary stats
  const totalTypes = deductions.length;
  const activeCount = deductions.filter((d) => d.status === "Active").length;
  const monthlyImpact = deductions.filter((d) => d.status === "Active").reduce((s, d) => s + d.amount, 0);

  // Handlers
  const handleSave = (item: Deduction): void => {
    if (modalMode === "edit") {
      setDeductions((prev) => prev.map((d) => (d.id === item.id ? item : d)));
    } else {
      setDeductions((prev) => [...prev, item]);
    }
    setModalMode(null);
    setEditTarget(null);
  };

  const handleDelete = (id: number): void => {
    setDeductions((prev) => prev.filter((d) => d.id !== id));
    setDeleteTarget(null);
  };

  const handleToggle = (id: number): void => {
    setDeductions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" } : d))
    );
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Deduction Management</h1>
              <p className="text-slate-500 mt-0.5">Manage PF, ESI, TDS and other salary deductions</p>
            </div>
            <button
              onClick={() => { setModalMode("add"); setEditTarget(null); }}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg text-sm font-semibold"
            >
              <Plus className="w-4.5 h-4.5" /> Add Deduction
            </button>
          </div>
        </div>

        {/* ── SUMMARY CARDS ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Types */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white rounded-lg p-2.5 shadow-sm">
                <Layers className="w-5.5 h-5.5 text-blue-600" style={{ width: "22px", height: "22px" }} />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Total</span>
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deduction Types</p>
            <p className="text-3xl font-bold text-blue-700 mt-0.5">{totalTypes} <span className="text-sm font-medium text-slate-400">Types</span></p>
          </div>

          {/* Monthly Impact */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl border border-amber-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white rounded-lg p-2.5 shadow-sm">
                <TrendingDown className="w-5.5 h-5.5 text-amber-600" style={{ width: "22px", height: "22px" }} />
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Monthly</span>
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deduction Impact</p>
            <p className="text-3xl font-bold text-amber-700 mt-0.5">₹{monthlyImpact.toLocaleString("en-IN")}</p>
          </div>

          {/* Active Count */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-white rounded-lg p-2.5 shadow-sm">
                <Zap className="w-5.5 h-5.5 text-emerald-600" style={{ width: "22px", height: "22px" }} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Live</span>
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Deductions</p>
            <p className="text-3xl font-bold text-emerald-700 mt-0.5">{activeCount} <span className="text-sm font-medium text-slate-400">Active</span></p>
          </div>
        </div>

        {/* ── TABLE SECTION ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table toolbar */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-slate-500" />
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">All Deductions</h2>
              <span className="text-xs font-semibold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full">{filtered.length} Results</span>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, code, or category…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border-2 border-slate-200 focus:border-blue-400 rounded-lg text-sm outline-none transition-all w-64"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider opacity-70">#</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider opacity-70">Deduction Type</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider opacity-70">Category</th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider opacity-70">Amount</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider opacity-70">Applies To</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider opacity-70">Usage</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider opacity-70">Status</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider opacity-70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, idx) => {
                  const isPaid = d.status === "Active";
                  const catStyle = CAT_STYLES[d.category as keyof typeof CAT_STYLES];
                  return (
                    <tr key={d.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-blue-50 transition-colors border-t border-slate-100`}>
                      {/* # */}
                      <td className="px-5 py-4 text-slate-400 text-xs font-semibold">{idx + 1}</td>

                      {/* Name + Short + Tooltip */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg w-9 h-9 flex items-center justify-center shadow-sm">
                            <span className="text-white text-xs font-bold">{d.short}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800">{d.name}</span>
                            <Tooltip text={d.tooltip}>
                              <Info className="w-3.5 h-3.5 text-slate-300 hover:text-blue-500 cursor-help transition-colors" />
                            </Tooltip>
                          </div>
                        </div>
                      </td>

                      {/* Category badge */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex text-xs font-bold px-2.5 py-1 rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                          {d.category}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4 text-right">
                        <span className="font-bold text-slate-800 text-sm">₹{d.amount.toLocaleString("en-IN")}</span>
                      </td>

                      {/* Applies To */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {d.appliesTo.teaching && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">🎓 Teaching</span>}
                          {d.appliesTo.nonTeaching && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">💼 Non-Teaching</span>}
                        </div>
                      </td>

                      {/* Usage */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs font-semibold text-slate-600">{d.usageCount}</span>
                          <span className="text-xs text-slate-400">employees</span>
                        </div>
                      </td>

                      {/* Toggle */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Toggle checked={isPaid} onChange={() => handleToggle(d.id)} />
                          <span className={`text-xs font-semibold ${isPaid ? "text-emerald-600" : "text-slate-400"}`}>
                            {d.status}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => { setEditTarget(d); setModalMode("edit"); }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(d)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* Empty State */}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <div className="text-4xl text-slate-200 mb-3">🔍</div>
                      <p className="text-slate-500 font-semibold">No deductions found</p>
                      <p className="text-slate-400 text-xs mt-1">Try adjusting your search or add a new deduction</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ── MODALS ────────────────────────────────────────────────────────── */}
      {modalMode && <DeductionModal mode={modalMode} initial={editTarget || undefined} onClose={() => { setModalMode(null); setEditTarget(null); }} onSave={handleSave} />}
      {deleteTarget && <DeleteModal deduction={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />}
    </div>
  );
}