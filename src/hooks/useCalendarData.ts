'use client';
import { useSelectedDateStore } from '@store/useSelectDateStore';
import { DailyData } from 'utils/type';

// 📌 selectedDate + 해당 날짜 데이터 가져오기
export function useCalendarData() {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate);

  const dataByDate = useSelectedDateStore((state) => state.dataByDate);

  const getAllData = useSelectedDateStore((state) => state.getAllData);
  const getDailyData = useSelectedDateStore((state) => state.getDailyData);

  const dailyData: DailyData | undefined = selectedDate ? dataByDate[selectedDate] : undefined;

  return {
    selectedDate,
    setSelectedDate,
    dataByDate,
    dailyData,
    getAllData,
    getDailyData,
  };
}
