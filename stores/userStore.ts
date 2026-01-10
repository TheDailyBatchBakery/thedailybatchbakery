'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      
      setUser: (user) => {
        set({ user });
      },
      
      clearUser: () => {
        set({ user: null });
      },
      
      isLoggedIn: () => {
        return get().user !== null;
      },
    }),
    {
      name: 'app-user',
    }
  )
);

