'use client';

import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useInitUserData, useSajuResult } from '@hooks/useUser';

export default function SajuPage() {
  useInitUserData();
  const sajuResult = useSajuResult();
  const router = useRouter();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sajuResult);
    alert('복사되었습니다!');
  };

  const handleRetry = () => {
    router.push('/maty/saju/form');
  };

  return (
    <Container>
      <Title>🔮 나의 사주 진로 진단 결과</Title>

      {sajuResult ? (
        <>
          <ResultBox>
            {sajuResult
              .split(/\d+\.\s/)
              .filter(Boolean)
              .map((text, i) => (
                <ResultParagraph key={i}>
                  <Strong>{i + 1}.</Strong> {text.trim()}
                </ResultParagraph>
              ))}
          </ResultBox>
          <ButtonGroup>
            <CopyButton onClick={handleCopy}>결과 복사하기</CopyButton>
            <CopyButton onClick={handleRetry}>다시 진단하기</CopyButton>
          </ButtonGroup>
        </>
      ) : (
        <EmptyBox>저장된 사주 진단 결과가 없습니다.</EmptyBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: 60px auto;
  padding: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
  color: #6e4eff;
`;

const ResultBox = styled.div`
  background: #8686ff12;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`;

const ResultParagraph = styled.p`
  margin-bottom: 18px;
  line-height: 1.8;
  font-size: 16px;
  color: #333;
  white-space: pre-wrap;
`;

const Strong = styled.span`
  font-weight: bold;
  color: #6e4eff;
`;

const EmptyBox = styled.div`
  padding: 60px 0;
  text-align: center;
  color: #999;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
`;

const CopyButton = styled.button`
  background-color: #22272b;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s all ease-in;

  &:hover {
    background-color: #6e4eff;
  }
`;
