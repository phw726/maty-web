'use client';
import React, { useEffect } from 'react';
import Schedule from './Schedule';
import styled from '@emotion/styled';
import { DiaryForm, TodoForm } from './ContentsForm';
import { useRouter } from 'next/navigation';
import { useUserId } from '@hooks/useUser';
import { useCalendarData } from '@hooks/useCalendarData';
import { useTodo } from '@hooks/useTodo';
import { useFetchDailyCalendarData } from '@hooks/useFetchCalendar';

export default function BottomUI() {
  const router = useRouter();
  const userId = useUserId();
  const { selectedDate, dailyData } = useCalendarData();
  const { toggleTodo } = useTodo();
  const fetchDayData = useFetchDailyCalendarData();

  useEffect(() => {
    fetchDayData();
  }, [fetchDayData, selectedDate]);

  const handleToggleTodo = (id: string) => {
    if (!selectedDate || !userId) return;
    toggleTodo(userId, selectedDate, id);
  };

  const handleDiaryPress = () => router.push('/diary');
  const handleTodoPress = () => router.push('/todo');

  const schedules = dailyData?.schedule ?? [];
  const todos = dailyData?.todos ?? [];
  const diary = dailyData?.diary;

  return (
    <SummeryWrapper>
      <SheetWrapper>
        <Schedule schedules={schedules} />
        <TodoForm todos={todos} onToggleTodo={handleToggleTodo} onPress={handleTodoPress} />
        <DiaryForm diary={diary} onPress={handleDiaryPress} />
      </SheetWrapper>
    </SummeryWrapper>
  );
}

const SummeryWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SheetWrapper = styled.div`
  min-height: 500px;
  padding: 10px;
`;
