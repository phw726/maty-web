'use client';
import styled from '@emotion/styled';
import React from 'react';
import { Schedule } from 'utils/type';

type DotGroupProps = {
  schedules: Schedule[];
};

export const DotGroup = ({ schedules }: DotGroupProps) => {
  const limited = schedules.slice(0, 3);

  return (
    <DotWrapper>
      {limited.map((schedule) => (
        <Dot key={schedule.id} color={schedule.color} />
      ))}
    </DotWrapper>
  );
};

const DotWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 2px;
`;

const Dot = styled.div<{ color: string }>`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
`;
