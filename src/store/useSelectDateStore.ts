import { SelectedDateStore } from './types';
import { createTodoActions } from './actions/todo';
import { createScheduleActions } from './actions/schedule';
import { createDiaryActions } from './actions/diary';
import { createFetchActions } from './actions/fetch';
import { create } from 'zustand';
import { DailyData } from 'utils/type';
import { format } from 'date-fns';

export const useSelectedDateStore = create<SelectedDateStore>()((...a) => {
  const base = {
    selectedDate: format(new Date(), 'yyyy-MM-dd'),
    dataByDate: {},
    setSelectedDate: (date: string) => a[0]({ selectedDate: date }),
    setDailyData: (date: string, data: DailyData) =>
      a[0]((state) => ({
        dataByDate: {
          ...state.dataByDate,
          [date]: data,
        },
      })),
  };

  return {
    ...base,
    ...createTodoActions(...a),
    ...createScheduleActions(...a),
    ...createDiaryActions(...a),
    ...createFetchActions(...a),
  } as SelectedDateStore;
});
