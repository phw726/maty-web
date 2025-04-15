import { create } from 'zustand';
import { createUserActions } from './actions/user';
import { UserStore } from './types';

export const useUserStore = create<UserStore>()((set, get, store) => ({
  profile: {
    userId: 'mock-user-id',
    name: '',
    birthDate: '',
    birthTime: '',
    lunarType: false,
    currentJob: '',
    sajuResult: '',
  },
  setSajuResult: (result) => set({ sajuResult: result }),
  ...createUserActions(set, get, store),
}));
