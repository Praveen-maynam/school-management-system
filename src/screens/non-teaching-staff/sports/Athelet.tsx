import React, { useState, useMemo } from 'react';
import { Search, Plus, Eye, Trophy } from 'lucide-react';

// Types
interface Athlete {
  id: string;
  name: string;
  rollNumber: string;
  sport: string;
  position: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  rating: number;
  wins: number;
  status: 'active' | 'inactive';
  avatar: string;
}

// Level color mapping
const levelColors: Record<Athlete['level'], string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-emerald-100 text-emerald-700',
  Advanced: 'bg-blue-100 text-blue-700',
  Professional: 'bg-purple-100 text-purple-700',
};

// Mock Data
const athletesData: Athlete[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    rollNumber: 'CS2021001',
    sport: 'Cricket',
    position: 'Batsman',
    level: 'Advanced',
    rating: 4.8,
    wins: 12,
    status: 'active',
    avatar: '🧑',
  },
  {
    id: '2',
    name: 'Priya Singh',
    rollNumber: 'EC2020045',
    sport: 'Badminton',
    position: 'Singles Player',
    level: 'Professional',
    rating: 4.9,
    wins: 18,
    status: 'active',
    avatar: '👩',
  },
  {
    id: '3',
    name: 'Amit Patel',
    rollNumber: 'ME2021023',
    sport: 'Football',
    position: 'Forward',
    level: 'Advanced',
    rating: 4.6,
    wins: 10,
    status: 'active',
    avatar: '🧑',
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    rollNumber: 'IT2020067',
    sport: 'Swimming',
    position: 'Freestyle',
    level: 'Professional',
    rating: 4.7,
    wins: 15,
    status: 'active',
    avatar: '👩',
  },
  {
    id: '5',
    name: 'Vikram Kumar',
    rollNumber: 'EE2021089',
    sport: 'Basketball',
    position: 'Point Guard',
    level: 'Intermediate',
    rating: 4.5,
    wins: 8,
    status: 'active',
    avatar: '🧑',
  },
];

const AthletesDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [athletes, setAthletes] = useState<Athlete[]>(athletesData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    rollNumber: '',
    sport: '',
    position: '',
    level: 'Beginner' as Athlete['level'],
    rating: 0,
    wins: 0,
    status: 'active' as Athlete['status'],
    avatar: ''
  });

  // Filter athletes based on search query
  const filteredAthletes = useMemo(() => {
    if (!searchQuery.trim()) return athletes;
    const query = searchQuery.toLowerCase();
    return athletes.filter(
      (athlete) =>
        athlete.name.toLowerCase().includes(query) ||
        athlete.rollNumber.toLowerCase().includes(query) ||
        athlete.sport.toLowerCase().includes(query) ||
        athlete.position.toLowerCase().includes(query)
    );
  }, [searchQuery, athletes]);

  const handleAddAthlete = () => {
    setShowAddModal(true);
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAthlete: Athlete = {
      id: (athletes.length + 1).toString(),
      ...addForm,
    };
    setAthletes([...athletes, newAthlete]);
    setShowAddModal(false);
    setAddForm({
      name: '',
      rollNumber: '',
      sport: '',
      position: '',
      level: 'Beginner',
      rating: 0,
      wins: 0,
      status: 'active',
      avatar: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Athletes Directory
          </h1>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={handleAddAthlete}
          >
            <Plus className="w-5 h-5" />
            Add Athlete
          </button>
        </div>

        {/* Add Athlete Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowAddModal(false)}>
                <span className="text-2xl">×</span>
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Athlete</h2>
              <form onSubmit={handleAddSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={addForm.name}
                    onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number *</label>
                  <input
                    type="text"
                    required
                    value={addForm.rollNumber}
                    onChange={e => setAddForm({ ...addForm, rollNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., CS2021001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sport *</label>
                  <input
                    type="text"
                    required
                    value={addForm.sport}
                    onChange={e => setAddForm({ ...addForm, sport: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Cricket"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <input
                    type="text"
                    required
                    value={addForm.position}
                    onChange={e => setAddForm({ ...addForm, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Batsman"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level *</label>
                  <select
                    value={addForm.level}
                    onChange={e => setAddForm({ ...addForm, level: e.target.value as Athlete['level'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                    <input
                      type="number"
                      min={0}
                      max={5}
                      step={0.1}
                      required
                      value={addForm.rating}
                      onChange={e => setAddForm({ ...addForm, rating: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wins *</label>
                    <input
                      type="number"
                      min={0}
                      required
                      value={addForm.wins}
                      onChange={e => setAddForm({ ...addForm, wins: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    value={addForm.status}
                    onChange={e => setAddForm({ ...addForm, status: e.target.value as Athlete['status'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avatar (Emoji)</label>
                  <input
                    type="text"
                    value={addForm.avatar}
                    onChange={e => setAddForm({ ...addForm, avatar: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 🧑"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
                  >
                    Add Athlete
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search athletes by name, roll number, or sport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Athletes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAthletes.length > 0 ? (
            filteredAthletes.map((athlete) => (
              <div
                key={athlete.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-xl hover:border-orange-200/60 transition-all duration-300"
                onMouseEnter={() => setHoveredCard(athlete.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center text-3xl transform transition-transform duration-300 hover:scale-110">
                        {athlete.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-0.5">
                          {athlete.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {athlete.rollNumber}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      {athlete.status}
                    </span>
                  </div>

                  {/* Athlete Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Sport</span>
                      <span className="text-sm font-semibold text-slate-900">
                        {athlete.sport}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Position</span>
                      <span className="text-sm font-semibold text-slate-900">
                        {athlete.position}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Level</span>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          levelColors[athlete.level]
                        }`}
                      >
                        {athlete.level}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-500">⭐</span>
                      <span className="text-lg font-bold text-amber-600">
                        {athlete.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {athlete.wins} wins
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full py-3 bg-orange-50 hover:bg-orange-100 text-orange-600 font-medium transition-all duration-200 flex items-center justify-center gap-2 border-t border-orange-100">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View Profile</span>
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No athletes found
              </h3>
              <p className="text-slate-600 text-center max-w-md">
                Try adjusting your search query or add a new athlete to get started.
              </p>
            </div>
          )}
        </div>

        {/* Results Count */}
        {searchQuery && filteredAthletes.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Showing{' '}
              <span className="font-semibold text-slate-900">
                {filteredAthletes.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-slate-900">
                {athletesData.length}
              </span>{' '}
              athletes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AthletesDirectory;