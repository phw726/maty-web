import { API_BASE_URL } from 'constants/api';
import { UserProfile } from 'utils/type';

export const updateUserData = async (data: UserProfile) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to update user data');
    }

    return await res.json();
  } catch (error) {
    console.error('updateUserData error:', error);
    return null;
  }
};

export const getUserData = async (userId: string): Promise<UserProfile | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/user?userId=${userId}`);
    if (!res.ok) return null;

    const { user } = await res.json();
    return user;
  } catch (error) {
    console.error('getUserData error:', error);
    return null;
  }
};
