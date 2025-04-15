'use client';
import { useUserStore } from '@store/useUserStore';
import { useSelectedDateStore } from '@store/useSelectDateStore';
import { DailyData } from 'utils/type';

/**
 * ✅ 모든 날짜 데이터 불러오기
 * 내부에서 userId도 가져와서 처리함
 */
export const useFetchAllCalendarData = () => {
  const userId = useUserStore((state) => state.profile?.userId);
  const getAllData = useSelectedDateStore((state) => state.getAllData);

  const fetchAll = async () => {
    if (userId) {
      await getAllData(userId);
    }
  };

  return fetchAll;
};

/**
 * ✅ 특정 날짜 데이터 불러오기
 * 내부에서 userId, selectedDate 모두 사용함
 */
export const useFetchDailyCalendarData = () => {
  const userId = useUserStore((state) => state.profile?.userId);
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const getDailyData = useSelectedDateStore((state) => state.getDailyData);

  const fetchDay = async () => {
    if (userId && selectedDate) {
      await getDailyData(userId, selectedDate);
    }
  };

  return fetchDay;
};

/**
 * ✅ selectedDate 기준의 데이터 조회
 */
export function useCalendarData() {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const dataByDate = useSelectedDateStore((state) => state.dataByDate);

  const dailyData: DailyData | undefined = selectedDate ? dataByDate[selectedDate] : undefined;

  return {
    selectedDate,
    dataByDate,
    dailyData,
  };
}
