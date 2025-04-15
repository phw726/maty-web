import { v4 as uuidv4 } from 'uuid';
import { Plan } from './type';

export const parsePlanFromAI = (aiResult: string, title: string): Plan => {
  const lines = aiResult
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const steps: Plan['steps'] = [];

  let currentStepTitle = '';
  let currentStepDetails: string[] = [];

  lines.forEach((line) => {
    const match = line.match(/^(\d+)\.\s*(.+)/);

    if (match) {
      if (currentStepTitle) {
        const fullContent = [currentStepTitle, ...currentStepDetails].join('<br/>'); // ⭐ 줄바꿈 치환
        steps.push({
          id: uuidv4(),
          content: fullContent,
          isComplete: false,
        });
      }

      currentStepTitle = match[2].trim();
      currentStepDetails = [];
    } else {
      currentStepDetails.push(line);
    }
  });

  if (currentStepTitle) {
    const fullContent = [currentStepTitle, ...currentStepDetails].join('<br/>');
    steps.push({
      id: uuidv4(),
      content: fullContent,
      isComplete: false,
    });
  }

  return {
    planId: uuidv4(),
    title,
    steps,
  };
};

export const parseSajuFromAI = (aiResult: string): string[] => {
  return aiResult
    .split(/\d+\.\s+/) // 숫자. 공백 기준으로 분리
    .filter(Boolean)
    .map((item) => item.trim());
};
