'use client';
import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import { MdCheckBox } from 'react-icons/md';
import EditableHeaderLayout from '@components/layout/ComponentHeader';
import TodoListItem from '@components/todo/TodoListItem';
import TodoForm from '@components/todo/TodoForm';
import DeleteBtn from '@components/common/DeleteBtn';
import FloatingUtils from '@components/common/FloatingUtils';
import { useCalendarData } from '@hooks/useCalendarData';
import { useTodo } from '@hooks/useTodo';
import { useUserId } from '@hooks/useUser';

export default function TodoScreen() {
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  const userId = useUserId();
  const { selectedDate, getDailyData, dataByDate } = useCalendarData();
  const { todos, updateTodo, toggleTodo, deleteTodo } = useTodo();

  const isViewMode = mode === 'view';

  const handleSubmit = async () => {
    if (!userId || !selectedDate || !content.trim()) return;

    const todo = {
      id: editingId ?? uuidv4(),
      content,
      isComplete: editingId ? (todos.find((t) => t.id === editingId)?.isComplete ?? false) : false,
    };

    await updateTodo(userId, selectedDate, todo);
    setContent('');
    setEditingId(null);
  };

  const handleToggle = useCallback(
    async (id: string) => {
      if (!userId || !selectedDate) return;
      await toggleTodo(userId, selectedDate, id);
    },
    [userId, selectedDate, toggleTodo]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (!userId || !selectedDate) return;
      await deleteTodo(userId, selectedDate, id);
    },
    [userId, selectedDate, deleteTodo]
  );

  useEffect(() => {
    if (!dataByDate[selectedDate]) {
      getDailyData(userId!, selectedDate);
    }
  }, [userId, selectedDate, dataByDate, getDailyData]);

  return (
    <EditableHeaderLayout
      title="오늘의 목표"
      mode={mode}
      onSave={() => setMode(isViewMode ? 'edit' : 'view')}
    >
      {isViewMode && <FloatingUtils />}

      <Wrapper>
        <TodoWrapper>
          {todos.length > 0 ? (
            todos.map((item) => (
              <TodoListItem
                key={item.id}
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
                isViewMode={isViewMode}
              />
            ))
          ) : isViewMode ? (
            <EmptyWrapper>
              <MdCheckBox size={20} color="#8686869e" />
              <EmptyText>오늘의 목표를 추가해보세요!</EmptyText>
            </EmptyWrapper>
          ) : null}
        </TodoWrapper>

        {!isViewMode && (
          <BottomWrapper>
            <TodoForm content={content} onChange={setContent} onSubmit={handleSubmit} />
          </BottomWrapper>
        )}

        {isViewMode && todos.length > 0 && (
          <DeleteBtn
            mode="edit"
            hasContent={true}
            deleteFn={async () => {
              if (!userId || !selectedDate) return;
              for (const todo of todos) {
                await deleteTodo(userId, selectedDate, todo.id);
              }
            }}
            onDone={() => getDailyData(userId!, selectedDate)}
          />
        )}
      </Wrapper>
    </EditableHeaderLayout>
  );
}

const Wrapper = styled.div`
  padding-bottom: 200px;
`;

const TodoWrapper = styled.div`
  margin-bottom: 100px;
`;
const BottomWrapper = styled.div`
  margin-top: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: #fff;
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  margin-left: 10px;
`;

const EmptyText = styled.span`
  color: #c4c4c4;
  font-size: 15px;
  margin-left: 10px;
`;
