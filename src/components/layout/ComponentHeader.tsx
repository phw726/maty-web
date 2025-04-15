'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FaChevronLeft, FaCheck, FaEdit } from 'react-icons/fa'; // react-icons 사용
import { useSelectedDateStore } from '@store/useSelectDateStore';
import { WebCalendarUI } from '@components/calendar/calendarUI/WebCalendart';

interface Props {
  title?: React.ReactNode;
  children: React.ReactNode;
  dateEditable?: boolean;
  onSave?: () => void;
  mode?: 'edit' | 'view'; // for deciding check vs pencil
}

export default function EditableHeaderLayout({
  title,
  children,
  dateEditable,
  onSave,
  mode = 'edit',
}: Props) {
  const router = useRouter();
  const [showCalendar, setShowCalendar] = useState(false);
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate);

  let formattedDate = '날짜 선택';
  try {
    const dateObj = new Date(selectedDate);
    if (!isNaN(dateObj.getTime())) {
      formattedDate = format(dateObj, 'yyyy년 MM월 dd일', { locale: ko });
    }
  } catch (error) {
    console.error('Invalid selectedDate:', selectedDate, error);
  }

  useEffect(() => {
    if (!selectedDate) {
      const today = new Date().toISOString().slice(0, 10);
      setSelectedDate(today);
    }
  }, [selectedDate, setSelectedDate]);

  return (
    <Container>
      <TopHeader>
        <IconButton onClick={() => router.back()}>
          <FaChevronLeft size={24} color="#000000" />
        </IconButton>

        <HeaderTitleWrapper>{title && <HeaderTitle>{title}</HeaderTitle>}</HeaderTitleWrapper>

        <IconButton onClick={onSave}>
          {mode === 'edit' ? (
            <FaCheck size={24} color="#000000" />
          ) : (
            <FaEdit size={24} color="#000000" />
          )}
        </IconButton>
      </TopHeader>

      <DateRow>
        <DateText>{formattedDate}</DateText>
        {dateEditable !== false && (
          <DateButton onClick={() => setShowCalendar(true)}>날짜 변경</DateButton>
        )}
      </DateRow>

      <Content>{children}</Content>

      {showCalendar && (
        <CalendarModal>
          <WebCalendarUI
            onSelectDate={(date) => {
              setSelectedDate(date);
              setShowCalendar(false);
            }}
          />
        </CalendarModal>
      )}
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  background-color: #fff;
  margin-top: 30px;
  padding: 0 80px;
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding: 0 16px;
`;

const IconButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
`;

const HeaderTitleWrapper = styled.div`
  flex: 1;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #22272b;
  text-shadow: 0px 1px 1px rgb(0, 0, 0, 0.2);
`;

const DateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 20px 18px;
  border-bottom: 1px solid #e0e0e029;
`;

const DateText = styled.span`
  font-size: 18px;
  color: #22272b;
  font-weight: bold;
  padding-left: 8px;
`;

const DateButton = styled.button`
  color: #ffffff;
  padding: 6px 12px;
  background-color: #22272b9b;
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  align-items: center;
  border: none;
`;

const Content = styled.div`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const CalendarModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
