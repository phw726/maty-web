'use client';

import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useUserId } from '@hooks/useUser';
import { usePlanDetail, usePlanGetAll, usePlanGetDetail, usePlanList } from '@hooks/usePlan';
import { PlanCard } from './PlanCard';
import { useRouter } from 'next/navigation';

export const PlanList = () => {
  const router = useRouter();
  const userId = useUserId();
  const plans = usePlanList();
  const getAllPlans = usePlanGetAll();
  const selectedPlan = usePlanDetail();
  const getPlanDetail = usePlanGetDetail();

  useEffect(() => {
    if (userId) getAllPlans(userId);
  }, [userId, getAllPlans]);

  const handleSelect = (planId: string) => {
    if (userId) getPlanDetail(userId, planId);
  };

  return (
    <ListWrapper>
      <NewGoalButton onClick={() => router.push('/maty/plan/form')}>
        + 새로운 목표 추가하기
      </NewGoalButton>
      {plans.map((plan) => (
        <PlanCard
          key={plan.planId}
          plan={plan}
          isSelected={selectedPlan?.planId === plan.planId}
          onSelect={handleSelect}
        />
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 210px;
  max-height: 80vh;
  overflow-y: auto;
`;

const NewGoalButton = styled.button`
  padding: 12px 24px;
  background-color: #22272b;
  color: white;
  outline: none;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #4a3aff;
  }
`;
