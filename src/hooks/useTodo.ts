'use client';

import { useSelectedDateStore } from '@store/useSelectDateStore';
import { useUserStore } from '@store/useUserStore';
import { Todo } from 'utils/type';

export function useTodo() {
  const userId = useUserStore((state) => state.profile?.userId);
  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const dataByDate = useSelectedDateStore((state) => state.dataByDate);

  const toggleTodo = useSelectedDateStore((state) => state.toggleTodo);
  const updateTodo = useSelectedDateStore((state) => state.updateTodo);
  const deleteTodo = useSelectedDateStore((state) => state.deleteTodo);

  const getTodoById = (id: string) => todos.find((todo) => todo.id === id);

  const todos: Todo[] = selectedDate ? (dataByDate[selectedDate]?.todos ?? []) : [];

  return {
    userId,
    selectedDate,
    todos,
    getTodoById,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
}
