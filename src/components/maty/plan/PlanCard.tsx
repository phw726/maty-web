'use client';

import React from 'react';
import styled from '@emotion/styled';
import { Plan } from 'utils/type';

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected, onSelect }) => {
  return (
    <CardWrapper isSelected={isSelected} onClick={() => onSelect(plan.planId)}>
      <Title>{plan.title}</Title>
      <StepCount>{plan.steps.length}단계</StepCount>
    </CardWrapper>
  );
};

const CardWrapper = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 16px;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#6e4eff' : '#eee')};
  border-radius: 12px;
  background-color: ${({ isSelected }) => (isSelected ? '#f8f5ff' : '#fff')};
  box-shadow: ${({ isSelected }) => (isSelected ? '0 0 0 2px rgba(110, 78, 255, 0.2)' : 'none')};
  transition: 0.2s ease-in-out;
  cursor: pointer;
  text-align: left;

  &:hover {
    border-color: #6e4eff;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
  word-break: keep-all;
  line-height: 1.2;
`;

const StepCount = styled.p`
  font-size: 14px;
  color: #888;
`;
