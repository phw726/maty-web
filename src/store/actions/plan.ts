import { StateCreator } from 'zustand';
import { fetchAllPlans, fetchPlanDetail, updatePlan, deletePlan } from '../../api/aws/plan';
import { PlanStore } from '@store/types';
import { useUserStore } from '@store/useUserStore';

export const createPlanActions: StateCreator<
  PlanStore,
  [],
  [],
  Pick<
    PlanStore,
    | 'plans'
    | 'selectedPlan'
    | 'setPlans'
    | 'setSelectedPlan'
    | 'getAllPlans'
    | 'getPlanDetail'
    | 'savePlan'
    | 'removePlan'
  >
> = (set) => ({
  plans: [],
  selectedPlan: null,

  setPlans: (plans) => set({ plans }),
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),

  getAllPlans: async (userId) => {
    const data = await fetchAllPlans(userId);
    if (data) set({ plans: data });
  },

  getPlanDetail: async (userId, planId) => {
    const data = await fetchPlanDetail(userId, planId);
    if (data) set({ selectedPlan: data });
  },

  savePlan: async (plan) => {
    const userId = useUserStore.getState().profile?.userId;
    if (!userId) return;

    const success = await updatePlan(userId, plan);
    if (success) {
      set((state) => {
        const updatedPlans = [...state.plans.filter((p) => p.planId !== plan.planId), plan];
        // 필요 시 정렬 추가 가능
        return {
          plans: updatedPlans,
          selectedPlan: plan, // 저장 후 selectedPlan 동기화
        };
      });
    } else {
      console.error('❌ Failed to save plan');
    }
  },

  removePlan: async (userId, planId) => {
    if (!userId || !planId) return;

    const success = await deletePlan(userId, planId);

    if (success) {
      set((state) => ({
        plans: state.plans.filter((p) => p.planId !== planId),
        selectedPlan: null,
      }));
    } else {
      console.error('❌ Failed to delete plan');
    }
  },
});
