import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      points: 0,
      earnedBadges: [],
      preferences: {
        dietary: [],
        interests: [],
        notifications: true,
        location: true
      },

      addPoints: (points) => {
        set((state) => ({
          points: state.points + points
        }));
      },

      earnBadge: (badgeId) => {
        set((state) => {
          if (state.earnedBadges.includes(badgeId)) return state;
          return {
            earnedBadges: [...state.earnedBadges, badgeId],
            points: state.points + (BADGES[badgeId]?.points || 0)
          };
        });
      },

      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      updateProfile: async (data) => {
        set({ isLoading: true });
        try {
          // TODO: Appel API pour mettre à jour le profil
          set((state) => ({
            user: { ...state.user, ...data },
            isLoading: false,
            error: null
          }));
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      updatePreferences: (preferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...preferences }
        }));
      },

      addBadge: (badge) => {
        set((state) => ({
          badges: [...state.badges, badge]
        }));
      },

      signOut: () => {
        set({ user: null, error: null });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;