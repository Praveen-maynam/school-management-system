import React, { useState } from 'react';
import { Award, Calendar, Plus, User } from 'lucide-react';

// Type definitions
export type AwardTier = 'GOLD' | 'SILVER' | 'BRONZE';

export interface Achievement {
  id: string;
  title: string;
  eventName: string;
  description: string;
  recipientName: string;
  recipientAvatar?: string;
  date: string;
  points: number;
  tier: AwardTier;
}

// Badge component for award tiers
interface TierBadgeProps {
  tier: AwardTier;
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const tierStyles = {
    GOLD: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    SILVER: 'bg-gray-100 text-gray-700 border-gray-300',
    BRONZE: 'bg-orange-100 text-orange-700 border-orange-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${tierStyles[tier]}`}
    >
      {tier}
    </span>
  );
};

// Avatar component
interface AvatarProps {
  name: string;
  image?: string;
  tier: AwardTier;
}

const Avatar: React.FC<AvatarProps> = ({ name, image, tier }) => {
  const tierColors = {
    GOLD: 'bg-yellow-100',
    SILVER: 'bg-gray-100',
    BRONZE: 'bg-orange-100',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`w-10 h-10 rounded-full ${tierColors[tier]} flex items-center justify-center text-sm font-semibold`}
    >
      {image ? (
        <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span className="text-gray-700">{initials}</span>
      )}
    </div>
  );
};

// Achievement Card component
interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const iconBgColors = {
    GOLD: 'bg-yellow-100',
    SILVER: 'bg-gray-100',
    BRONZE: 'bg-orange-100',
  };

  const iconColors = {
    GOLD: 'text-yellow-600',
    SILVER: 'text-gray-600',
    BRONZE: 'text-orange-600',
  };

  const pointsColors = {
    GOLD: 'text-orange-600',
    SILVER: 'text-orange-600',
    BRONZE: 'text-orange-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300">
      <div className="flex items-start gap-4">
        {/* Award Icon */}
        <div
          className={`flex-shrink-0 w-16 h-16 rounded-full ${iconBgColors[achievement.tier]} flex items-center justify-center`}
        >
          <Award className={`w-8 h-8 ${iconColors[achievement.tier]}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600">{achievement.eventName}</p>
            </div>
            <TierBadge tier={achievement.tier} />
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">{achievement.description}</p>

          {/* Footer */}
          <div className="flex items-center gap-6 text-sm">
            {/* Recipient */}
            <div className="flex items-center gap-2">
              <Avatar
                name={achievement.recipientName}
                image={achievement.recipientAvatar}
                tier={achievement.tier}
              />
              <span className="font-medium text-gray-900">
                {achievement.recipientName}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{achievement.date}</span>
            </div>

            {/* Points */}
            <div className={`font-semibold ${pointsColors[achievement.tier]}`}>
              {achievement.points} points
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const AchievementsAndAwardsApp: React.FC = () => {
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'State Badminton Champion',
      eventName: 'State Championship 2023',
      description: 'Won the state-level singles championship',
      recipientName: 'Priya Singh',
      date: '15/12/2023',
      points: 100,
      tier: 'GOLD',
    },
    {
      id: '2',
      title: 'Best Batsman Award',
      eventName: 'Inter-University Cricket',
      description: 'Highest run scorer in the tournament',
      recipientName: 'Rahul Sharma',
      date: '20/11/2023',
      points: 95,
      tier: 'GOLD',
    },
    {
      id: '3',
      title: 'National Swimming Meet',
      eventName: 'National Aquatics 2023',
      description: 'Second place in 100m freestyle',
      recipientName: 'Sneha Reddy',
      date: '10/10/2023',
      points: 85,
      tier: 'SILVER',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Achievements & Awards
          </h1>
          <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-150">
            <Plus className="w-5 h-5" />
            Add Achievement
          </button>
        </div>

        {/* Achievements List */}
        <div className="space-y-6">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>

        {/* Empty State */}
        {achievements.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Award className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No achievements yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start recognizing excellence by adding your first achievement
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-150">
              <Plus className="w-5 h-5" />
              Add Achievement
            </button>
          </div>
        )}

        {/* Stats Summary (Optional) */}
        {achievements.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Achievements</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {achievements.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-orange-600">Σ</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Points</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {achievements.reduce((sum, a) => sum + a.points, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gold Awards</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {achievements.filter((a) => a.tier === 'GOLD').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsAndAwardsApp;