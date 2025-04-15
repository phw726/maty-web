'use client';

import React from 'react';
import styled from '@emotion/styled';
import { usePlanDetail } from '@hooks/usePlan';

const PlanDetailPanel = () => {
  const plan = usePlanDetail();

  if (!plan) {
    return <EmptyBox>선택된 커리큘럼이 없습니다.</EmptyBox>;
  }

  return (
    <PanelWrapper>
      <PanelTitle>{plan.title}</PanelTitle>
      <StepsBox>
        {plan.steps.map((step, idx) => (
          <StepItem key={step.id}>
            <StepIndex>{idx + 1}.</StepIndex>
            <ResultParagraph dangerouslySetInnerHTML={{ __html: step.content }} />
          </StepItem>
        ))}
      </StepsBox>
    </PanelWrapper>
  );
};

export default PlanDetailPanel;

const PanelWrapper = styled.div`
  width: auto;
  max-height: 80vh;
  overflow-y: auto;
  background: #fafafa;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #ddd;
`;

const PanelTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 40px;
  color: #333;
`;

const StepsBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StepItem = styled.div`
  display: flex;
  gap: 12px;
`;

const StepIndex = styled.span`
  display: flex;
  font-weight: bold;
  color: #6e4eff;
  padding-top: 4px;
`;

const ResultParagraph = styled.p`
  margin-bottom: 18px;
  line-height: 1.8;
  font-size: 16px;
  color: #444;
  margin-top: 0;
  margin-left: 4px;
  text-align: start;
`;

const EmptyBox = styled.div`
  padding: 40px;
  text-align: center;
  color: #aaa;
  font-size: 16px;
`;
