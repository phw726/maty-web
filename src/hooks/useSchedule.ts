'use client';

import { useUserStore } from '@store/useUserStore';
import { useSelectedDateStore } from '@store/useSelectDateStore';
import { Schedule } from 'utils/type';

export function useSchedule() {
  const userId = useUserStore((state) => state.profile?.userId);
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const dataByDate = useSelectedDateStore((state) => state.dataByDate);

  const updateSchedule = useSelectedDateStore((state) => state.updateSchedule);
  const deleteSchedule = useSelectedDateStore((state) => state.deleteSchedule);

  const schedules: Schedule[] = selectedDate ? (dataByDate[selectedDate]?.schedule ?? []) : [];

  const getScheduleById = (id: string): Schedule | undefined => schedules.find((s) => s.id === id);

  return {
    userId,
    selectedDate,
    schedules,
    updateSchedule,
    deleteSchedule,
    getScheduleById,
  };
}
