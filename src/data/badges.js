export const BADGES = {
  // Badges d'exploration
  newbie: {
    id: 'newbie',
    name: 'Premier Pas',
    description: 'A visité son premier restaurant',
    icon: '🌱',
    category: 'exploration',
    points: 10
  },
  explorer: {
    id: 'explorer',
    name: 'Explorateur',
    description: 'A visité 10 restaurants différents',
    icon: '🗺️',
    category: 'exploration',
    points: 50
  },
  adventurer: {
    id: 'adventurer',
    name: 'Aventurier',
    description: 'A visité 50 restaurants différents',
    icon: '🌎',
    category: 'exploration',
    points: 200
  },

  // Badges de critique
  reviewer: {
    id: 'reviewer',
    name: 'Critique Culinaire',
    description: 'A laissé 5 avis détaillés',
    icon: '✍️',
    category: 'review',
    points: 30
  },
  influencer: {
    id: 'influencer',
    name: 'Influenceur',
    description: '50 personnes ont trouvé ses avis utiles',
    icon: '🌟',
    category: 'review',
    points: 100
  },

  // Badges de spécialité
  gourmet: {
    id: 'gourmet',
    name: 'Gourmet',
    description: 'A testé 20 restaurants gastronomiques',
    icon: '👨‍🍳',
    category: 'specialty',
    points: 150
  },
  worldTraveler: {
    id: 'worldTraveler',
    name: 'Globe-trotter',
    description: 'A testé 10 cuisines différentes',
    icon: '🌍',
    category: 'specialty',
    points: 80
  },

  // Badges de fidélité
  loyal: {
    id: 'loyal',
    name: 'Client Fidèle',
    description: 'A visité le même restaurant 5 fois',
    icon: '🎯',
    category: 'loyalty',
    points: 40
  },
  ambassador: {
    id: 'ambassador',
    name: 'Ambassadeur',
    description: 'A invité 5 amis qui se sont inscrits',
    icon: '👥',
    category: 'loyalty',
    points: 120
  }
};

export const LEVELS = {
  1: {
    name: 'Débutant',
    minPoints: 0,
    icon: '🌱'
  },
  2: {
    name: 'Apprenti Gourmet',
    minPoints: 100,
    icon: '🍽️'
  },
  3: {
    name: 'Gastronome',
    minPoints: 300,
    icon: '👨‍🍳'
  },
  4: {
    name: 'Connaisseur',
    minPoints: 600,
    icon: '🏆'
  },
  5: {
    name: 'Expert Culinaire',
    minPoints: 1000,
    icon: '⭐'
  },
  6: {
    name: 'Maître Gourmet',
    minPoints: 2000,
    icon: '👑'
  }
};

export const calculateLevel = (points) => {
  const levels = Object.entries(LEVELS);
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i][1].minPoints) {
      return {
        current: parseInt(levels[i][0]),
        ...levels[i][1],
        nextLevel: levels[i + 1] ? {
          level: parseInt(levels[i][0]) + 1,
          ...levels[i + 1][1]
        } : null,
        progress: levels[i + 1] 
          ? (points - levels[i][1].minPoints) / (levels[i + 1][1].minPoints - levels[i][1].minPoints) * 100
          : 100
      };
    }
  }
  return LEVELS[1];
};