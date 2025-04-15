import { getUserData, updateUserData } from '../../api/aws/user';
import { StateCreator } from 'zustand';
import { UserStore } from '../types';
import { UserProfile } from 'utils/type';

export const createUserActions: StateCreator<
  UserStore,
  [],
  [],
  Pick<UserStore, 'updateUserData' | 'getUserData' | 'setSajuResult'>
> = (set, get) => ({
  updateUserData: (profile: UserProfile) => {
    set({ profile });
  },

  getUserData: async (userId: string) => {
    const profile = await getUserData(userId);
    if (profile) {
      set({ profile });
    }
  },

  setSajuResult: async (result: string) => {
    const currentProfile = get().profile;
    if (!currentProfile) return;

    const updated = { ...currentProfile, sajuResult: result };

    set({ profile: updated });

    await updateUserData(updated);
  },
});
