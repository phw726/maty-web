'use client';

import BottomUI from '@components/calendar/bottomSheet/BottomUI';
import { WebCalendarUI } from '@components/calendar/calendarUI/WebCalendart';
import FloatingUtils from '@components/common/FloatingUtils';
import styled from '@emotion/styled';
import { useFetchAllCalendarData } from '@hooks/useFetchCalendar';
import React, { useEffect } from 'react';

export default function CalenderPage() {
  const getAllData = useFetchAllCalendarData();

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <Wrapper>
      <FloatingUtils />
      <WebCalendarUI />
      <BottomUI />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 80px;
  /* width: 100%; */
`;
