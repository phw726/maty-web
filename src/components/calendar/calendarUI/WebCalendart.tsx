'use client';
import React, { useCallback } from 'react';
import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import { DotGroup } from './DotGroup';
import { useCalendarData } from '@hooks/useCalendarData';
import { useUserId } from '@hooks/useUser';

interface Props {
  onSelectDate?: (date: string) => void;
}

export const WebCalendarUI = ({ onSelectDate }: Props) => {
  const userId = useUserId();
  const { selectedDate, setSelectedDate, dataByDate, getDailyData } = useCalendarData();

  const handleDayClick = useCallback(
    (date: Date) => {
      const newDateStr = format(date, 'yyyy-MM-dd');
      const isSameDate = newDateStr === selectedDate;
      const next = isSameDate ? '' : newDateStr;

      setSelectedDate(next);
      if (next && userId) getDailyData(userId, next);

      onSelectDate?.(next);
    },
    [selectedDate, setSelectedDate, userId, getDailyData, onSelectDate]
  );

  const getTileContent = ({ date }: { date: Date }) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const schedules = dataByDate?.[dateStr]?.schedule || [];

    if (schedules.length === 0) return null;
    return <DotGroup schedules={schedules} />;
  };

  return (
    <CalendarWrapper>
      <StyledCalendar
        locale="ko-KR"
        calendarType="gregory"
        value={selectedDate ? new Date(selectedDate) : new Date()}
        onClickDay={handleDayClick}
        tileContent={getTileContent}
        formatDay={(_, date) => format(date, 'd일')}
      />
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.section`
  padding: 1rem;
  width: 100%;
  min-height: 600px;

  .react-calendar {
    border: none;
    width: auto;
  }
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  /* min-width: 600px; */
  border: none;

  .react-calendar__navigation {
    margin: 20px 0;
  }

  .react-calendar__month-view__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;
    color: #424242;
    text-align: center;

    abbr {
      text-decoration: none;
      border-bottom: none !important;
    }
  }

  .react-calendar__month-view__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    & > button {
      border-bottom: 1px solid #eaeaea66;
    }
  }

  .react-calendar__tile {
    position: relative;
    height: 92px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-family: Pretendard;
    font-size: 14px;
    padding: 10px 0 20px;
    background: transparent;
    transition: 0.1s background-color ease-out;

    &:hover {
      background-color: #e1d9ff60 !important;
    }

    abbr {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      font-weight: normal;
    }
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    background-color: #f3f3f3b9 !important;
    color: #222;
    font-weight: 500;
    /* z-index: 100; */

    abbr {
      background: none !important;
      border-radius: 0;
    }
  }

  /* 선택 날짜 */
  .react-calendar__tile--active {
    background: transparent !important;

    abbr {
      background-color: #8f70ff9e;
      color: #fff;
      border-radius: 50%;
      font-weight: 500;
    }
  }

  /* ✅ 오늘 + 선택 날짜 둘 다인 경우에도 보라색 원 유지 */
  .react-calendar__tile--now.react-calendar__tile--active abbr {
    background-color: #8f70ff9e !important;
    color: #fff !important;
    border-radius: 50%;
  }

  /* hover + 선택 조합일 때도 강제 스타일 */
  .react-calendar__tile--active:hover {
    background: #ffffff !important;

    abbr {
      background-color: #8f70ff9e !important;
      color: #fff !important;
    }
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #fff;
    border: none;
  }

  /* 요일별 색상 */
  .react-calendar__month-view__weekdays__weekday:first-of-type,
  .react-calendar__month-view__days__day:nth-of-type(7n + 1) {
    color: #ff8a7b;
  }

  .react-calendar__month-view__weekdays__weekday:last-of-type,
  .react-calendar__month-view__days__day:nth-of-type(7n) {
    color: #519fff;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #bdbdbd !important;
  }

  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__navigation__label__labelText,
  .react-calendar__navigation__label__labelText--from {
    color: #22272b;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 500;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  }
`;
