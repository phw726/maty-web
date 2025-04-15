import { create } from 'zustand';
import { PlanStore } from './types';
import { createPlanActions } from './actions/plan';

export const usePlanStore = create<PlanStore>()((...a) => ({
  ...createPlanActions(...a),
}));
