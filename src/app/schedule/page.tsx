'use client';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter, useSearchParams } from 'next/navigation';
import EditableHeaderLayout from '@components/layout/ComponentHeader';
import DeleteBtn from '@components/common/DeleteBtn';
import FloatingUtils from '@components/common/FloatingUtils';
import { useCalendarData } from '@hooks/useCalendarData';
import { useSchedule } from '@hooks/useSchedule';

export default function ScheduleScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get('scheduleId');

  const { userId, selectedDate, getScheduleById, deleteSchedule } = useSchedule();
  const { getDailyData } = useCalendarData();

  const schedule = getScheduleById(scheduleId || '');

  useEffect(() => {
    if (userId && selectedDate) {
      getDailyData(userId, selectedDate);
    }
  }, [userId, selectedDate, getDailyData]);

  if (!schedule) {
    return (
      <EditableHeaderLayout title="일정 상세" mode="view">
        <NoContent>일정을 찾을 수 없습니다.</NoContent>
      </EditableHeaderLayout>
    );
  }

  const handleEdit = () => {
    router.push(`/schedule/form?scheduleId=${schedule.id}&mode=edit`);
  };

  return (
    <EditableHeaderLayout title="일정 상세 보기" mode="view" onSave={handleEdit}>
      <FloatingUtils />
      <Wrapper>
        <ScheduleRow>
          <ColorBar style={{ backgroundColor: schedule.color }} />
          <TextContent>
            <ContentText>{schedule.content}</ContentText>
            <Meta>
              {schedule.isAllDay ? '종일 일정' : `${schedule.startTime} ~ ${schedule.endTime}`}
            </Meta>
          </TextContent>
        </ScheduleRow>
      </Wrapper>
      <DeleteBtn
        mode="edit"
        hasContent={!!schedule?.content}
        deleteFn={() => deleteSchedule(userId!, selectedDate!, schedule.id)}
      />
    </EditableHeaderLayout>
  );
}

const ScheduleRow = styled.div`
  display: flex;
  /* align-items: flex-start; */
  align-items: center;
`;

const ColorBar = styled.div`
  display: flex;
  width: 5px;
  height: 50px;
  margin-right: 20px;
  margin-top: 18px;
`;

const TextContent = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  flex: 1;
  padding: 16px;
`;

const ContentText = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 12px;
`;

const Meta = styled.span`
  font-size: 14px;
  color: #888;
`;

const NoContent = styled.p`
  font-size: 16px;
  color: #aaa;
  text-align: center;
  margin-top: 40px;
`;
