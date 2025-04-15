'use client';

import styled from '@emotion/styled';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIPlanRequest, usePlanSave } from '@hooks/usePlan';
import { parsePlanFromAI } from 'utils/ParseFromAI';
import { useRouter } from 'next/navigation';
import { isPlanValidGoal } from 'utils/aiValidation';

export default function PlanFormFlow() {
  const router = useRouter();
  const [goal, setGoal] = useState('');
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [aiResult, setAiResult] = useState('');
  const [error, setError] = useState('');

  const { askPlan, loading } = useAIPlanRequest();
  const savePlan = usePlanSave();

  const handleSubmit = async () => {
    if (!isPlanValidGoal(goal)) {
      setError('목표를 다시 입력해주세요. (예: 정처기 자격증 따기)');
      return;
    }
    setError('');
    const result = await askPlan(goal);
    setAiResult(result);
    setStep('result');
  };

  const handleReset = () => {
    setGoal('');
    setAiResult('');
    setStep('form');
  };

  const handleSave = async () => {
    if (aiResult && goal) {
      const parsed = parsePlanFromAI(aiResult, goal);
      await savePlan(parsed);
      alert('커리큘럼이 저장되었습니다!');
      router.push('/maty/plan');
    }
  };

  return (
    <Wrapper>
      <AnimatePresence mode="wait">
        {step === 'form' && (
          <MotionStep
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Title>📚 목표 기반 커리큘럼 생성</Title>
            <InputBox
              placeholder="예: 정처기 자격증 따기"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <SubmitBtn onClick={handleSubmit} disabled={loading}>
              {loading ? '🔮 AI 커리큘럼 생성 중...' : '🔮 AI 커리큘럼 받기'}
            </SubmitBtn>
          </MotionStep>
        )}

        {step === 'result' && (
          <MotionStep
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Title>🔮 추천 커리큘럼</Title>
            <ResultBox>
              {parsePlanFromAI(aiResult, goal).steps.map((step, idx) => (
                <Paragraph key={step.id}>
                  <strong>{idx + 1}.</strong>{' '}
                  <ResultParagraph dangerouslySetInnerHTML={{ __html: step.content }} />
                </Paragraph>
              ))}
            </ResultBox>
            <ButtonRow>
              <PrimaryButton onClick={handleReset}>다시 추천받기</PrimaryButton>
              <PrimaryButton onClick={handleSave}>저장하기</PrimaryButton>
            </ButtonRow>
          </MotionStep>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 600px;
  margin: 60px auto;
  padding: 24px;
`;

const MotionStep = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 50px;
  text-align: center;
  justify-content: center;
  color: #4a3aff;
`;

const InputBox = styled.textarea`
  width: auto;
  display: flex;

  height: 100px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  font-size: 16px;
  resize: none;
  outline: none;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
    border: 2px solid #4a3aff;
    background-color: #eae8ff29;
  }
`;

const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  margin: 20px auto;
  width: 100%;
  margin-top: 20px;
  color: white;
  padding: 16px 100px;
  border-radius: 8px;
  font-size: 16px;
  background-color: #22272b;
  cursor: pointer;
  outline: none;
  border: none;
  transition: 0.2s all;

  &:hover {
    background-color: #4a3aff;
  }
`;

const ResultBox = styled.div`
  margin-top: 40px;
  background: #f8f9ff;
  padding: 24px;
  border-radius: 12px;
`;
const ResultParagraph = styled.p`
  margin-bottom: 18px;
  line-height: 1.8;
  font-size: 16px;
  color: #333;
  margin-top: 0;
  margin-left: 10px;
`;

const Paragraph = styled.div`
  display: flex;
  font-size: 16px;
  margin-bottom: 16px;
  line-height: 1.7;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
`;

const PrimaryButton = styled.button`
  background-color: #4a3aff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #22272b;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;
