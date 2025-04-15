'use client';

import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSajuResult } from '@hooks/useUser';
// import { usePlanDetail } from '@hooks/usePlan';

export default function MainMaty() {
  const router = useRouter();
  const sajuResult = useSajuResult();
  // const plan = usePlanDetail();

  const handleSajuClick = () => {
    if (!sajuResult.trim()) {
      router.push('/maty/saju/form');
    } else {
      router.push('/maty/saju');
    }
  };

  // const handlePlanClick = () => {
  //   if (!plan || plan.steps.length === 0) {
  //     router.push('/maty/plan/form');
  //   } else {
  //     router.push('/maty/plan');
  //   }
  // };

  return (
    <Wrapper>
      <BtnWrapper onClick={handleSajuClick}>
        <Image
          src="/maty진로.png"
          alt="maty진로"
          width={300}
          height={300}
          style={matyImageStyled}
          priority
        />
      </BtnWrapper>
      <BtnWrapper onClick={() => router.push('/maty/plan')}>
        <Image
          src="/maty계획.png"
          alt="maty계획"
          width={300}
          height={300}
          style={matyImageStyled}
          priority
        />
      </BtnWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  gap: 100px;
  justify-content: center;
  padding: 100px 0;
`;

const BtnWrapper = styled.button`
  display: flex;
  flex-shrink: 0;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  background: none;
  transition: 0.3s all ease-in;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow:
      0 0 0 2px white,
      0 0 40px white;
    opacity: 0.9;
  }
`;

const matyImageStyled = {
  borderRadius: '10px',
} as const;
