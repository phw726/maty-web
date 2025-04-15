import { API_BASE_URL } from 'constants/api';
import { Plan } from 'utils/type';

// 전체 계획 가져오기
export const fetchAllPlans = async (userId: string): Promise<Plan[] | null> => {
  const res = await fetch(`${API_BASE_URL}/plan?userId=${userId}`);
  if (!res.ok) return null;
  const result = await res.json();
  return result.plans || [];
};

// 계획 상세 조회
export const fetchPlanDetail = async (userId: string, planId: string): Promise<Plan | null> => {
  const res = await fetch(`${API_BASE_URL}/plan/detail?userId=${userId}&planId=${planId}`);
  if (!res.ok) return null;
  const result = await res.json();
  return result.plan || null;
};

// 계획 추가/수정
export const updatePlan = async (userId: string, plan: Plan): Promise<boolean> => {
  const res = await fetch(`${API_BASE_URL}/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      planId: plan.planId,
      title: plan.title,
      steps: plan.steps,
    }),
  });

  const result = await res.json();
  return result.success;
};

// 계획 삭제
export const deletePlan = async (userId: string, planId: string): Promise<boolean> => {
  const res = await fetch(`${API_BASE_URL}/plan?userId=${userId}&planId=${planId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await res.json();
  return result.success;
};
