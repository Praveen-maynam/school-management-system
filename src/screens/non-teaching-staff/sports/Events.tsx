import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Trophy, Eye, Edit, UserPlus, Plus } from 'lucide-react';

// Type definitions
interface Event {
  id: string;
  title: string;
  sport: string;
  type: 'tournament' | 'match' | 'practice';
  status: 'upcoming' | 'ongoing' | 'completed';
  date: string;
  time: string;
  venue: string;
  participants: number;
  prizes: string;
}

// Badge component
const Badge: React.FC<{ 
  variant: 'tournament' | 'match' | 'practice' | 'upcoming' | 'ongoing' | 'completed';
  children: React.ReactNode;
}> = ({ variant, children }) => {
  const variantStyles = {
    tournament: 'bg-orange-100 text-orange-700',
    match: 'bg-teal-100 text-teal-700',
    practice: 'bg-green-100 text-green-700',
    upcoming: 'bg-blue-100 text-blue-700',
    ongoing: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};

// Event card component
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
          <div className="flex gap-2">
            <Badge variant={event.type}>{event.type}</Badge>
            <Badge variant={event.status}>{event.status}</Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600 capitalize">{event.sport}</p>
      </div>

      {/* Event details grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-500 mb-1">Date</p>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <p className="text-sm font-medium text-gray-900">{event.date}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Time</p>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <p className="text-sm font-medium text-gray-900">{event.time}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Venue</p>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <p className="text-sm font-medium text-gray-900">{event.venue}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-1">Participants</p>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <p className="text-sm font-medium text-orange-600">{event.participants}</p>
          </div>
        </div>

        <div className="col-span-2 md:col-span-4">
          <p className="text-xs text-gray-500 mb-1">Prizes</p>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-gray-400" />
            <p className="text-sm font-medium text-gray-900">{event.prizes}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-150">
          <Eye className="w-4 h-4" />
          View Details
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150">
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150">
          <UserPlus className="w-4 h-4" />
          Participants
        </button>
      </div>
    </div>
  );
};

// Main App component
const EventsAndTournamentsApp: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Inter-College Cricket Championship',
      sport: 'Cricket',
      type: 'tournament',
      status: 'upcoming',
      date: '20/2/2024',
      time: '09:00',
      venue: 'University Stadium',
      participants: 8,
      prizes: '₹50,000',
    },
    {
      id: '2',
      title: 'Annual Football League',
      sport: 'Football',
      type: 'tournament',
      status: 'ongoing',
      date: '15/2/2024',
      time: '14:00',
      venue: 'Main Ground',
      participants: 6,
      prizes: '₹40,000',
    },
    {
      id: '3',
      title: 'Badminton Singles Championship',
      sport: 'Badminton',
      type: 'tournament',
      status: 'upcoming',
      date: '25/2/2024',
      time: '10:00',
      venue: 'Indoor Stadium',
      participants: 32,
      prizes: '₹30,000',
    },
    {
      id: '4',
      title: 'Swimming Relay Competition',
      sport: 'Swimming',
      type: 'match',
      status: 'completed',
      date: '10/2/2024',
      time: '08:00',
      venue: 'Aquatic Center',
      participants: 24,
      prizes: '₹25,000',
    },
    {
      id: '5',
      title: 'Basketball Practice Session',
      sport: 'Basketball',
      type: 'practice',
      status: 'ongoing',
      date: '12/2/2024',
      time: '16:00',
      venue: 'Indoor Court',
      participants: 15,
      prizes: 'N/A',
    },
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    sport: '',
    type: 'tournament' as Event['type'],
    status: 'upcoming' as Event['status'],
    date: '',
    time: '',
    venue: '',
    participants: 0,
    prizes: '',
  });

  const handleCreateEvent = () => {
    setShowEventModal(true);
  };

  const handleEventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEvent: Event = {
      id: (events.length + 1).toString(),
      ...eventForm,
    };
    setEvents([...events, newEvent]);
    setShowEventModal(false);
    setEventForm({
      title: '',
      sport: '',
      type: 'tournament',
      status: 'upcoming',
      date: '',
      time: '',
      venue: '',
      participants: 0,
      prizes: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events & Tournaments</h1>
          <button
            className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-150"
            onClick={handleCreateEvent}
          >
            <Plus className="w-5 h-5" />
            Create Event
          </button>
        </div>

        {/* Create Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowEventModal(false)}>
                <span className="text-2xl">×</span>
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Create New Event</h2>
              <form onSubmit={handleEventSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Inter-College Cricket Championship"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sport *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.sport}
                    onChange={e => setEventForm({ ...eventForm, sport: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Cricket"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                    <select
                      value={eventForm.type}
                      onChange={e => setEventForm({ ...eventForm, type: e.target.value as Event['type'] })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="tournament">Tournament</option>
                      <option value="match">Match</option>
                      <option value="practice">Practice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                    <select
                      value={eventForm.status}
                      onChange={e => setEventForm({ ...eventForm, status: e.target.value as Event['status'] })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={eventForm.date}
                      onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                    <input
                      type="time"
                      required
                      value={eventForm.time}
                      onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.venue}
                    onChange={e => setEventForm({ ...eventForm, venue: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., University Stadium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Participants *</label>
                    <input
                      type="number"
                      min={0}
                      required
                      value={eventForm.participants}
                      onChange={e => setEventForm({ ...eventForm, participants: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prizes *</label>
                    <input
                      type="text"
                      required
                      value={eventForm.prizes}
                      onChange={e => setEventForm({ ...eventForm, prizes: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., ₹50,000"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Events grid */}
        <div className="space-y-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Empty state (shown when no events) */}
        {events.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first event or tournament</p>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-150"
              onClick={handleCreateEvent}
            >
              <Plus className="w-5 h-5" />
              Create Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsAndTournamentsApp;