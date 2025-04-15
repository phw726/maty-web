'use client';
import React from 'react';
import styled from '@emotion/styled';
import { Schedule as SchduleType } from 'utils/type';
import { useRouter } from 'next/navigation';

interface Props {
  schedules: SchduleType[];
}

export default function Schedule({ schedules }: Props) {
  const router = useRouter();

  const handlePress = (id: string) => {
    router.push(`/schedule?scheduleId=${id}`);
  };

  return (
    <ScheduleWrapper>
      {schedules && schedules.length > 0 ? (
        schedules.map((schedule) => (
          <TouchableScheduleItem key={schedule.id} onClick={() => handlePress(schedule.id)}>
            <ColorDot color={schedule.color} />
            <TextContent>
              <Title>{schedule.content}</Title>
              <SubText>
                {schedule.isAllDay ? '종일' : `${schedule.startTime} ~ ${schedule.endTime}`}
              </SubText>
            </TextContent>
          </TouchableScheduleItem>
        ))
      ) : (
        <NoSchedule>
          <ColorDot color={'#e0e0e0'} />
          <EmptyText>등록된 일정이 없습니다.</EmptyText>
        </NoSchedule>
      )}
    </ScheduleWrapper>
  );
}

const ScheduleWrapper = styled.div`
  padding: 10px 18px;
  margin-top: 8px;
`;

const NoSchedule = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
`;

const EmptyText = styled.span`
  color: #c2c2c2;
`;

const TouchableScheduleItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
`;

const ColorDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${({ color }) => color};
  margin-right: 8px;
`;

const TextContent = styled.div`
  display: flex;
`;

const Title = styled.span`
  display: flex;
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

const SubText = styled.span`
  display: flex;
  font-size: 12px;
  color: #666;
  margin-left: 10px;
`;
