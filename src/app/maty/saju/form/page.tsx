/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { UserProfile } from 'utils/type';
import { useUserId } from '@hooks/useUser';
import { generateSajuPrompt } from '@lib/prompts/saju';
import { useSajuAI } from '@hooks/useSajuAI';
import { useRouter } from 'next/navigation';
import { updateUserData } from 'api/aws/user';
import { parseSajuFromAI } from 'utils/ParseFromAI';

const steps = ['form', 'confirm', 'result'] as const;
type Step = (typeof steps)[number];

export default function SajuFormFlow() {
  const router = useRouter();
  const userId = useUserId();
  const [step, setStep] = useState<Step>('form');
  const { askSaju, result: aiResult, loading, error } = useSajuAI();

  const [input, setInput] = useState<UserProfile>({
    userId: userId,
    name: '',
    birthDate: '',
    birthTime: '',
    lunarType: false,
    currentJob: '',
  });

  const handleNext = async () => {
    if (step === 'form') {
      setStep('confirm');
    } else if (step === 'confirm') {
      setStep('result');
      const prompt = generateSajuPrompt({
        name: input.name,
        birthDate: input.birthDate as string,
        birthTime: input.birthTime,
        lunarType: input.lunarType,
        currentJob: input.currentJob,
      });
      await askSaju(prompt);
    }
  };

  const handleBack = () => setStep('form');

  const handleSaveResult = async () => {
    if (aiResult) {
      const updatedUser = {
        ...input,
        sajuResult: aiResult,
      };
      await updateUserData(updatedUser);
      alert('결과가 저장되었습니다!');
      router.push('/maty/saju');
    }
  };

  return (
    <Container>
      <AnimatePresence mode="wait">
        {step === 'form' && (
          <StepWrapper
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Title>사주팔자로 보는 나의 직업은?</Title>
            <Input
              placeholder="홍길동"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
            <Input
              type="date"
              placeholder="1990-01-01"
              value={input.birthDate}
              onChange={(e) => setInput({ ...input, birthDate: e.target.value })}
            />
            <Input
              type="time"
              placeholder="09:00"
              value={input.birthTime}
              onChange={(e) => setInput({ ...input, birthTime: e.target.value })}
            />
            <LabelRow>
              <label>
                <input
                  type="checkbox"
                  checked={input.lunarType}
                  onChange={(e) => setInput({ ...input, lunarType: e.target.checked })}
                />{' '}
                음력입니다
              </label>
            </LabelRow>
            <Input
              placeholder="현재 직업 (선택사항)"
              value={input.currentJob}
              onChange={(e) => setInput({ ...input, currentJob: e.target.value })}
            />
            <PrimaryButton onClick={handleNext}>다음</PrimaryButton>
          </StepWrapper>
        )}

        {step === 'confirm' && (
          <StepWrapper
            key="confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Title>입력한 정보 확인</Title>
            <InfoItem>이름: {input.name}</InfoItem>
            <InfoItem>생년월일: {input.birthDate}</InfoItem>
            <InfoItem>태어난 시간: {input.birthTime || '미입력'}</InfoItem>
            <InfoItem>음력 여부: {input.lunarType ? '예' : '아니오'}</InfoItem>
            <InfoItem>현재 직업: {input.currentJob || '미입력'}</InfoItem>
            <ButtonRow>
              <PrimaryButton onClick={handleBack}>다시 입력하기</PrimaryButton>
              <PrimaryButton onClick={handleNext}>확인</PrimaryButton>
            </ButtonRow>
          </StepWrapper>
        )}

        {step === 'result' && (
          <StepWrapper
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Title>사주 분석 결과</Title>

            {loading ? (
              <InfoItem>🔮 분석 중입니다. 잠시만 기다려주세요...</InfoItem>
            ) : (
              <>
                <ResultBox>
                  {aiResult &&
                    parseSajuFromAI(aiResult).map((text, i) => (
                      <ResultParagraph key={i}>
                        <Strong>{i + 1}.</Strong> {text}
                      </ResultParagraph>
                    ))}
                </ResultBox>

                <ButtonRow>
                  <PrimaryButton onClick={() => setStep('form')}>다시 진단하기</PrimaryButton>
                  <PrimaryButton
                    onClick={async () => {
                      await navigator.clipboard.writeText(aiResult ?? '');
                      alert('복사되었습니다!');
                    }}
                  >
                    복사하기
                  </PrimaryButton>
                  <PrimaryButton onClick={handleSaveResult}>저장하기</PrimaryButton>
                </ButtonRow>
              </>
            )}
          </StepWrapper>
        )}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

const StepWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 50px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;

  &::placeholder {
    color: #ccc;
  }
`;

const LabelRow = styled.div`
  margin-bottom: 16px;
`;

const InfoItem = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ButtonRow = styled.div`
  position: relative;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
  margin-left: 0;
`;

const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
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

const ResultBox = styled.div`
  background: #f9f9ff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ResultParagraph = styled.p`
  margin-bottom: 20px;
  line-height: 1.8;
  font-size: 16px;
  color: #333;
  white-space: pre-wrap;
`;

const Strong = styled.span`
  font-weight: bold;
  color: #6e4eff;
`;
