'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  BarChart as Chart, 
  Award 
} from 'lucide-react';

const ProfileProgress = ({ points = 0, earnedBadges = [] }) => {
  // Calcul du niveau actuel
  const calculateLevel = (points) => {
    const levels = [
      { level: 1, name: 'Débutant', minPoints: 0, maxPoints: 100 },
      { level: 2, name: 'Apprenti Gourmet', minPoints: 100, maxPoints: 300 },
      { level: 3, name: 'Gastronome', minPoints: 300, maxPoints: 600 },
      { level: 4, name: 'Connaisseur', minPoints: 600, maxPoints: 1000 },
      { level: 5, name: 'Expert Culinaire', minPoints: 1000, maxPoints: 2000 }
    ];

    for (let i = levels.length - 1; i >= 0; i--) {
      if (points >= levels[i].minPoints) {
        return {
          ...levels[i],
          nextLevel: levels[i + 1],
          progress: levels[i + 1] 
            ? ((points - levels[i].minPoints) / (levels[i + 1].minPoints - levels[i].minPoints)) * 100
            : 100
        };
      }
    }
    return levels[0];
  };

  const stats = [
    {
      icon: Star,
      label: 'Moyenne des notes',
      value: '4.5',
      color: 'text-yellow-500'
    },
    {
      icon: Award,
      label: 'Badges gagnés',
      value: earnedBadges.length,
      color: 'text-blue-500'
    },
    {
      icon: Chart,
      label: 'Position',
      value: 'Top 10%',
      color: 'text-green-500'
    }
  ];

  const milestones = [
    { points: 50, reward: 'Badge "Explorateur"' },
    { points: 100, reward: 'Niveau 2 - Apprenti Gourmet' },
    { points: 200, reward: 'Badge "Critique Culinaire"' }
  ];

  const currentLevel = calculateLevel(points);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="text-center">
      <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
      <div className="font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Niveau actuel */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
          <Trophy className="w-8 h-8 text-amber-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Niveau {currentLevel.level} - {currentLevel.name}
          </h3>
          <p className="text-gray-600">
            {points} points totaux
          </p>
        </div>
      </div>

      {/* Barre de progression */}
      {currentLevel.nextLevel && (
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Progression vers niveau {currentLevel.nextLevel.level}
            </span>
            <span className="font-medium text-amber-600">
              {Math.round(currentLevel.progress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentLevel.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-amber-500 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-500">
            {currentLevel.nextLevel.minPoints - points} points restants pour le prochain niveau
          </p>
        </div>
      )}

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Prochains paliers */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-900 mb-3">
          Prochains paliers
        </h4>
        <div className="space-y-3">
          {milestones.map((milestone, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-600">{milestone.reward}</span>
              <span className="text-sm font-medium text-amber-600">
                {milestone.points} points
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileProgress;