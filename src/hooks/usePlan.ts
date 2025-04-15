'use client';

import { usePlanStore } from '@store/usePlanData';
import { useState } from 'react';
import { generatePlanPrompt } from '@lib/prompts/plan';
import { useUserId } from './useUser';

export const usePlanList = () => usePlanStore((state) => state.plans);
export const usePlanDetail = () => usePlanStore((state) => state.selectedPlan);
export const usePlanGetAll = () => usePlanStore((state) => state.getAllPlans);
export const usePlanGetDetail = () => usePlanStore((state) => state.getPlanDetail);
export const usePlanSave = () => usePlanStore((state) => state.savePlan);
export const usePlanDelete = () => {
  const userId = useUserId();
  return (planId: string) => {
    if (!userId) return;
    return usePlanStore.getState().removePlan(userId, planId);
  };
};

/** AI 플랜 요청 */
export const useAIPlanRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const askPlan = async (goal: string): Promise<string> => {
    const prompt = generatePlanPrompt(goal);
    try {
      setLoading(true);
      setError('');

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      return data.result || '';
    } catch (e) {
      setError('AI 응답에 실패했습니다.');
      console.error('AI Plan Error:', e);
      return '';
    } finally {
      setLoading(false);
    }
  };

  return { askPlan, loading, error };
};
