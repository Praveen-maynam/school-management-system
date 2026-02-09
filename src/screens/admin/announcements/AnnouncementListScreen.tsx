import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  Send,
  Users,
  Calendar,
  Clock,
  Bell,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  X,
  Pin,
  Archive,
  Download,
  Upload,
} from "lucide-react";

// Types
interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "general" | "academic" | "event" | "urgent" | "holiday";
  priority: "low" | "medium" | "high";
  targetAudience: string[];
  publishDate: string;
  expiryDate?: string;
  status: "draft" | "published" | "scheduled" | "archived";
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  isPinned: boolean;
  views: number;
  attachments?: { name: string; url: string; size: string }[];
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Annual Sports Day - December 15th",
    content:
      "Dear Students and Parents, We are excited to announce our Annual Sports Day on December 15th. All students are requested to participate. Parents are welcome to attend.",
    category: "event",
    priority: "high",
    targetAudience: ["students", "parents"],
    publishDate: "2026-02-01",
    expiryDate: "2026-12-15",
    status: "published",
    author: {
      name: "Principal Smith",
      role: "Principal",
    },
    isPinned: true,
    views: 1245,
    createdAt: "2026-01-28",
    updatedAt: "2026-02-01",
  },
  {
    id: "2",
    title: "Mid-term Examination Schedule Released",
    content:
      "The mid-term examination schedule for all classes has been released. Please check the academic portal for detailed timetables.",
    category: "academic",
    priority: "high",
    targetAudience: ["students", "teachers", "parents"],
    publishDate: "2026-02-02",
    status: "published",
    author: {
      name: "Academic Coordinator",
      role: "Coordinator",
    },
    isPinned: true,
    views: 2134,
    attachments: [
      { name: "exam_schedule.pdf", url: "#", size: "245 KB" },
    ],
    createdAt: "2026-02-01",
    updatedAt: "2026-02-02",
  },
  {
    id: "3",
    title: "School Closure - Public Holiday",
    content:
      "The school will remain closed on February 10th due to a public holiday. Regular classes will resume on February 11th.",
    category: "holiday",
    priority: "medium",
    targetAudience: ["students", "parents", "staff"],
    publishDate: "2026-02-02",
    status: "published",
    author: {
      name: "Admin Office",
      role: "Administrator",
    },
    isPinned: false,
    views: 856,
    createdAt: "2026-02-01",
    updatedAt: "2026-02-02",
  },
  {
    id: "4",
    title: "Parent-Teacher Meeting Next Week",
    content:
      "Parent-teacher meetings are scheduled for February 8th-9th. Please book your slot through the parent portal.",
    category: "general",
    priority: "medium",
    targetAudience: ["parents"],
    publishDate: "2026-02-01",
    status: "published",
    author: {
      name: "Vice Principal",
      role: "Vice Principal",
    },
    isPinned: false,
    views: 432,
    createdAt: "2026-01-30",
    updatedAt: "2026-02-01",
  },
];

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter announcements
  useEffect(() => {
    let filtered = announcements;

    if (searchQuery) {
      filtered = filtered.filter(
        (ann) =>
          ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ann.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((ann) => ann.category === selectedCategory);
    }

    if (selectedPriority !== "all") {
      filtered = filtered.filter((ann) => ann.priority === selectedPriority);
    }

    setFilteredAnnouncements(filtered);
  }, [searchQuery, selectedCategory, selectedPriority, announcements]);

  // Stats
  const stats = {
    total: announcements.length,
    published: announcements.filter((a) => a.status === "published").length,
    drafts: announcements.filter((a) => a.status === "draft").length,
    scheduled: announcements.filter((a) => a.status === "scheduled").length,
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      general: "bg-blue-100 text-blue-700 border-blue-200",
      academic: "bg-purple-100 text-purple-700 border-purple-200",
      event: "bg-green-100 text-green-700 border-green-200",
      urgent: "bg-red-100 text-red-700 border-red-200",
      holiday: "bg-orange-100 text-orange-700 border-orange-200",
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      low: "bg-gray-100 text-gray-600 border-gray-200",
      medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
      high: "bg-red-100 text-red-700 border-red-200",
    };
    return badges[priority as keyof typeof badges] || badges.low;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Announcements
              </h1>
              <p className="text-lg text-gray-600">
                Manage and broadcast important information to your school community
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={22} />
              Create Announcement
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Bell className="text-blue-600" size={24} />}
              label="Total Announcements"
              value={stats.total}
              color="bg-blue-50"
            />
            <StatCard
              icon={<CheckCircle className="text-green-600" size={24} />}
              label="Published"
              value={stats.published}
              color="bg-green-50"
            />
            <StatCard
              icon={<Edit2 className="text-orange-600" size={24} />}
              label="Drafts"
              value={stats.drafts}
              color="bg-orange-50"
            />
            <StatCard
              icon={<Clock className="text-purple-600" size={24} />}
              label="Scheduled"
              value={stats.scheduled}
              color="bg-purple-50"
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search announcements by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
                >
                  <option value="all">All Categories</option>
                  <option value="general">General</option>
                  <option value="academic">Academic</option>
                  <option value="event">Event</option>
                  <option value="urgent">Urgent</option>
                  <option value="holiday">Holiday</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No announcements found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onView={() => {
                  setSelectedAnnouncement(announcement);
                  setShowViewModal(true);
                }}
                getCategoryColor={getCategoryColor}
                getPriorityBadge={getPriorityBadge}
              />
            ))
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateAnnouncementModal onClose={() => setShowCreateModal(false)} />
      )}

      {/* View Modal */}
      {showViewModal && selectedAnnouncement && (
        <ViewAnnouncementModal
          announcement={selectedAnnouncement}
          onClose={() => {
            setShowViewModal(false);
            setSelectedAnnouncement(null);
          }}
          getCategoryColor={getCategoryColor}
          getPriorityBadge={getPriorityBadge}
        />
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) => (
  <div className={`${color} rounded-xl p-5 border-2 border-gray-100`}>
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <span className="text-sm font-semibold text-gray-600">{label}</span>
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
  </div>
);

// Announcement Card Component
const AnnouncementCard = ({
  announcement,
  onView,
  getCategoryColor,
  getPriorityBadge,
}: {
  announcement: Announcement;
  onView: () => void;
  getCategoryColor: (category: string) => string;
  getPriorityBadge: (priority: string) => string;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {announcement.isPinned && (
              <Pin size={18} className="text-blue-600 fill-blue-600" />
            )}
            <h3 className="text-xl font-bold text-gray-900">
              {announcement.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                announcement.category
              )}`}
            >
              {announcement.category.toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityBadge(
                announcement.priority
              )}`}
            >
              {announcement.priority.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
              {announcement.status.toUpperCase()}
            </span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2 text-base">
            {announcement.content}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{announcement.targetAudience.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(announcement.publishDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{announcement.views} views</span>
            </div>
          </div>
        </div>

        <div className="relative ml-4">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical size={20} className="text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
              <button
                onClick={onView}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 text-gray-700 font-medium transition-colors"
              >
                <Eye size={18} />
                View Details
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 text-gray-700 font-medium transition-colors">
                <Edit2 size={18} />
                Edit
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-3 text-gray-700 font-medium transition-colors">
                <Archive size={18} />
                Archive
              </button>
              <button className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-3 text-red-600 font-medium transition-colors">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {announcement.attachments && announcement.attachments.length > 0 && (
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Upload size={16} />
            <span>{announcement.attachments.length} attachment(s)</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Create Announcement Modal Component
const CreateAnnouncementModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
    priority: "medium",
    targetAudience: [] as string[],
    publishDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    status: "draft",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Create New Announcement
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
              placeholder="Enter announcement title"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base resize-none"
              placeholder="Enter announcement content"
              required
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
              >
                <option value="general">General</option>
                <option value="academic">Academic</option>
                <option value="event">Event</option>
                <option value="urgent">Urgent</option>
                <option value="holiday">Holiday</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priority *
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Target Audience *
            </label>
            <div className="flex flex-wrap gap-3">
              {["students", "parents", "teachers", "staff"].map((audience) => (
                <label
                  key={audience}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={formData.targetAudience.includes(audience)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          targetAudience: [...formData.targetAudience, audience],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          targetAudience: formData.targetAudience.filter(
                            (a) => a !== audience
                          ),
                        });
                      }
                    }}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="font-medium text-gray-700 capitalize">
                    {audience}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Publish Date *
              </label>
              <input
                type="date"
                value={formData.publishDate}
                onChange={(e) =>
                  setFormData({ ...formData, publishDate: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
              />
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, status: "draft" })
              }
              className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              Publish Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// View Announcement Modal Component
const ViewAnnouncementModal = ({
  announcement,
  onClose,
  getCategoryColor,
  getPriorityBadge,
}: {
  announcement: Announcement;
  onClose: () => void;
  getCategoryColor: (category: string) => string;
  getPriorityBadge: (priority: string) => string;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            {announcement.isPinned && (
              <Pin size={24} className="text-blue-600 fill-blue-600" />
            )}
            <h2 className="text-2xl font-bold text-gray-900">
              Announcement Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {announcement.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold border ${getCategoryColor(
                  announcement.category
                )}`}
              >
                {announcement.category.toUpperCase()}
              </span>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold border ${getPriorityBadge(
                  announcement.priority
                )}`}
              >
                {announcement.priority.toUpperCase()}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                {announcement.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-lg">
                <Users size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Target Audience</p>
                <p className="text-base font-semibold text-gray-900">
                  {announcement.targetAudience.join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-lg">
                <Calendar size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Publish Date</p>
                <p className="text-base font-semibold text-gray-900">
                  {new Date(announcement.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-lg">
                <Eye size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Views</p>
                <p className="text-base font-semibold text-gray-900">
                  {announcement.views.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-lg">
                <TrendingUp size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Author</p>
                <p className="text-base font-semibold text-gray-900">
                  {announcement.author.name}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Content</h3>
            <div className="prose max-w-none">
              <p className="text-base text-gray-700 leading-relaxed">
                {announcement.content}
              </p>
            </div>
          </div>

          {/* Attachments */}
          {announcement.attachments && announcement.attachments.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Attachments
              </h3>
              <div className="space-y-2">
                {announcement.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Upload size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-600">{file.size}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      <Download size={18} />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <button className="flex-1 px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all">
              Edit Announcement
            </button>
            <button className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPage;