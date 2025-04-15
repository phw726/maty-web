export const generateSajuPrompt = ({
  name,
  birthDate,
  birthTime,
  lunarType,
  currentJob,
}: {
  name?: string;
  birthDate: string;
  birthTime?: string;
  lunarType?: boolean;
  currentJob?: string;
}) => {
  const lunarText = lunarType ? '음력' : '양력';
  const jobText = currentJob
    ? `현재 직업은 "${currentJob}"이며, 해당 직업이 사주상 잘 맞는지 평가해주세요.`
    : '현재 직업 정보는 없습니다. 사주상 적합한 직업을 추천해주세요.';

  return `
당신은 사주 분석 전문가입니다. 아래 정보를 바탕으로 진로 상담을 제공해주세요:

- 이름: ${name || '이름 없음'}
- 생년월일: ${birthDate} (${lunarText})
- 태어난 시간: ${birthTime || '시간 정보 없음'}

${jobText}

요구사항:
1. 사주팔자 분석 결과 요약 (사주팔자, 비견, 식신, 정관 등을 참고하여 분석)
2. 성향 분석 및 결과에 대한 이유 제시시 (성격, 재물, 사회성 등)
3. 적합한 직업 3가지 추천 + 이유
4. ${currentJob ? `현재 직업(${currentJob})과의 궁합 분석` : '추가적으로 주의할 점이나 피해야 할 직업군도 알려주세요'}

한국어로 친절하고 구어체로 대답해주세요. 불필요하게 긴 해석은 피하고, 핵심 중심으로 말해주세요.
`;
};
