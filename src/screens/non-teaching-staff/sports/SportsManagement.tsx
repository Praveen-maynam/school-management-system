import React, { useState } from 'react';
import { Eye, Edit2, Plus } from 'lucide-react';

// Types
interface Sport {
  id: string;
  name: string;
  category: 'Outdoor' | 'Indoor' | 'Water';
  players: number;
  teams: number;
  season: string;
  status: 'active' | 'inactive';
  icon: string;
}

// Mock Data
const sportsData: Sport[] = [
  {
    id: '1',
    name: 'Cricket',
    category: 'Outdoor',
    players: 45,
    teams: 4,
    season: 'Winter',
    status: 'active',
    icon: '🏏',
  },
  {
    id: '2',
    name: 'Football',
    category: 'Outdoor',
    players: 38,
    teams: 3,
    season: 'Monsoon',
    status: 'active',
    icon: '⚽',
  },
  {
    id: '3',
    name: 'Basketball',
    category: 'Indoor',
    players: 28,
    teams: 3,
    season: 'All Year',
    status: 'active',
    icon: '🏀',
  },
  {
    id: '4',
    name: 'Badminton',
    category: 'Indoor',
    players: 24,
    teams: 0,
    season: 'All Year',
    status: 'active',
    icon: '🏸',
  },
  {
    id: '5',
    name: 'Swimming',
    category: 'Water',
    players: 22,
    teams: 0,
    season: 'Summer',
    status: 'active',
    icon: '🏊',
  },
  {
    id: '6',
    name: 'Table Tennis',
    category: 'Indoor',
    players: 18,
    teams: 0,
    season: 'All Year',
    status: 'active',
    icon: '🏓',
  },
  {
    id: '7',
    name: 'Volleyball',
    category: 'Outdoor',
    players: 32,
    teams: 3,
    season: 'Winter',
    status: 'active',
    icon: '🏐',
  },
  {
    id: '8',
    name: 'Chess',
    category: 'Indoor',
    players: 16,
    teams: 0,
    season: 'All Year',
    status: 'active',
    icon: '♟️',
  },
];

const SportsManagement: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<{ id: string; type: 'view' | 'edit' } | null>(null);
  const [sports, setSports] = useState<Sport[]>(sportsData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    category: 'Outdoor' as Sport['category'],
    players: 0,
    teams: 0,
    season: '',
    status: 'active' as Sport['status'],
    icon: ''
  });

  const handleAddSport = () => {
    setShowAddModal(true);
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSport: Sport = {
      id: (sports.length + 1).toString(),
      ...addForm,
    };
    setSports([...sports, newSport]);
    setShowAddModal(false);
    setAddForm({
      name: '',
      category: 'Outdoor',
      players: 0,
      teams: 0,
      season: '',
      status: 'active',
      icon: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Sports Management
          </h1>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={handleAddSport}
          >
            <Plus className="w-5 h-5" />
            Add Sport
          </button>
        </div>

        {/* Add Sport Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowAddModal(false)}>
                <span className="text-2xl">×</span>
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Sport</h2>
              <form onSubmit={handleAddSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sport Name *</label>
                  <input
                    type="text"
                    required
                    value={addForm.name}
                    onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Cricket"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={addForm.category}
                    onChange={e => setAddForm({ ...addForm, category: e.target.value as Sport['category'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Outdoor">Outdoor</option>
                    <option value="Indoor">Indoor</option>
                    <option value="Water">Water</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Players *</label>
                    <input
                      type="number"
                      min={0}
                      required
                      value={addForm.players}
                      onChange={e => setAddForm({ ...addForm, players: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teams *</label>
                    <input
                      type="number"
                      min={0}
                      required
                      value={addForm.teams}
                      onChange={e => setAddForm({ ...addForm, teams: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Season *</label>
                  <input
                    type="text"
                    required
                    value={addForm.season}
                    onChange={e => setAddForm({ ...addForm, season: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Summer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    value={addForm.status}
                    onChange={e => setAddForm({ ...addForm, status: e.target.value as Sport['status'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={addForm.icon}
                    onChange={e => setAddForm({ ...addForm, icon: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 🏏"
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
                    Add Sport
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport) => (
            <div
              key={sport.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-xl hover:border-orange-200/60 transition-all duration-300"
              onMouseEnter={() => setHoveredCard(sport.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center text-2xl transform transition-transform duration-300 hover:scale-110">
                      {sport.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-0.5">
                        {sport.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {sport.category}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    {sport.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Players</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {sport.players}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Teams</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {sport.teams}
                    </p>
                  </div>
                </div>

                {/* Season */}
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <span className="text-sm text-slate-600">Season:</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {sport.season}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 border-t border-slate-100">
                <button
                  className={`flex items-center justify-center gap-2 py-3 text-orange-600 hover:bg-orange-50 font-medium transition-all duration-200 ${
                    hoveredButton?.id === sport.id && hoveredButton?.type === 'view' ? 'bg-orange-50' : ''
                  }`}
                  onMouseEnter={() => setHoveredButton({ id: sport.id, type: 'view' })}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View</span>
                </button>
                <button
                  className={`flex items-center justify-center gap-2 py-3 text-slate-700 hover:bg-slate-50 font-medium transition-all duration-200 border-l border-slate-100 ${
                    hoveredButton?.id === sport.id && hoveredButton?.type === 'edit' ? 'bg-slate-50' : ''
                  }`}
                  onMouseEnter={() => setHoveredButton({ id: sport.id, type: 'edit' })}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsManagement;