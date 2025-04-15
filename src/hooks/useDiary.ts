'use client';

import { useUserStore } from '@store/useUserStore';
import { useSelectedDateStore } from '@store/useSelectDateStore';
import { Diary } from 'utils/type';

// ✅ 하나의 훅에서 모든 Diary 관련 상태와 액션을 반환
export function useDiary() {
  const userId = useUserStore((state) => state.profile?.userId);
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const diary: Diary | undefined = useSelectedDateStore(
    (state) => state.dataByDate[selectedDate]?.diary
  );

  const updateDiary = useSelectedDateStore((state) => state.updateDiary);
  const deleteDiary = useSelectedDateStore((state) => state.deleteDiary);

  return { userId, selectedDate, diary, updateDiary, deleteDiary };
}
