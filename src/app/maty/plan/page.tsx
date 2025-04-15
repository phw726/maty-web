'use client';

import React from 'react';
import styled from '@emotion/styled';
import { PlanList } from '@components/maty/plan/PlanList';
import PlanDetailPanel from '@components/maty/plan/PlanDetailPanel';
import { usePlanDetail } from '@hooks/usePlan';
import { usePlanStore } from '@store/usePlanData';
import { useUserId } from '@hooks/useUser';

export default function PlanMainPage() {
  const selectedPlan = usePlanDetail();
  const userId = useUserId();
  const deletePlan = usePlanStore((state) => state.removePlan);

  const handleDelete = () => {
    if (selectedPlan && confirm('정말 이 플랜을 삭제하시겠습니까?')) {
      deletePlan(userId, selectedPlan.planId);
    }
  };

  return (
    <Container>
      <LeftSection>
        <PlanList />
      </LeftSection>
      <RightSection>
        <PlanDetailPanel />
        {selectedPlan && <DeleteButton onClick={handleDelete}>🗑 해당 플랜 삭제하기</DeleteButton>}
      </RightSection>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  padding: 60px 40px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
`;

const LeftSection = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: 20px;
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 0px;
`;

const DeleteButton = styled.button`
  display: block;
  width: 180px;
  margin: 30px 0px 0 auto;
  background-color: #bdbdbd;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #22272b;
  }
`;
