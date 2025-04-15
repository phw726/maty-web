'use client';

import { useEffect } from 'react';
import { useUserStore } from '@store/useUserStore';

// ✅ 전체 유저 프로필 가져오기
export const useUserProfile = () => useUserStore((state) => state.profile);

// ✅ userId만 가져오기
export const useUserId = () => useUserStore((state) => state.profile?.userId ?? 'mock-user-id');

// ✅ 사주 정보 + 이름만 필드별로 안전하게 가져오기 (무한 루프 방지)
export const useUserBirthInfo = () => {
  const name = useUserStore((state) => state.profile?.name ?? '');
  const birthDate = useUserStore((state) => state.profile?.birthDate ?? '');
  const birthTime = useUserStore((state) => state.profile?.birthTime ?? '');
  const isLunar = useUserStore((state) => state.profile?.lunarType ?? false);

  return { name, birthDate, birthTime, isLunar };
};

// ✅ 사주 결과 저장
export const useSaveSajuResult = () => useUserStore((state) => state.setSajuResult);

// ✅ 사주 분석 결과 가져오기
export const useSajuResult = () => useUserStore((state) => state.profile?.sajuResult ?? '');

// ✅ 유저 정보 업데이트 핸들러
export const useUpdateUser = () => useUserStore((state) => state.updateUserData);

// ✅ 유저 정보 불러오기 핸들러
export const useFetchUser = () => useUserStore((state) => state.getUserData);

// ✅ 마운트 시 userId가 있으면 자동으로 유저 정보 fetch
export const useInitUserData = () => {
  const userId = useUserId();
  const fetchUser = useFetchUser();

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId, fetchUser]);
};
