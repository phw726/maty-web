'use client';
import React from 'react';
import styled from '@emotion/styled';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import { Diary, Todo } from 'utils/type';

interface DiaryFormProps {
  diary?: Diary;
  onPress: () => void;
}

interface TodoFormProps {
  todos?: Todo[];
  onToggleTodo: (id: string) => void;
  onPress: () => void;
}

export const DiaryForm = ({ diary, onPress }: DiaryFormProps) => {
  return (
    <FormWrapper onClick={onPress}>
      <FormTitle>DIARY</FormTitle>
      {diary ? (
        <FormText>{diary.content}</FormText>
      ) : (
        <FormText $disabled>오늘 하루는 어땠나요?</FormText>
      )}
    </FormWrapper>
  );
};

export const TodoForm = ({ todos, onToggleTodo, onPress }: TodoFormProps) => {
  return (
    <FormWrapper onClick={onPress}>
      <FormTitle>TODO LIST</FormTitle>
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <TodoRow key={todo.id}>
            <div
              onClick={() => onToggleTodo(todo.id)}
              style={{ cursor: 'pointer', marginRight: 4 }}
            >
              {todo.isComplete ? (
                <FaCheckSquare size={16} color="#8f70ff9e" />
              ) : (
                <FaRegSquare size={16} color="#8f70ff9e" />
              )}
            </div>
            <FormText $isComplete={todo.isComplete}>{todo.content}</FormText>
          </TodoRow>
        ))
      ) : (
        <FormText $disabled>오늘은 어떤 목표를 가지고 계신가요?</FormText>
      )}
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 16px;
  padding: 10px 14px 5px;
  border: 1px solid #5a5a5a3d;
  border-radius: 10px;
  cursor: pointer;
`;

const FormTitle = styled.span`
  font-size: 13px;
  font-family: 'Exo2-VariableFont_wght';
  color: #22272b;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 4px;
`;

const FormText = styled.span<{ $isComplete?: boolean; $disabled?: boolean }>`
  font-size: 14px;
  margin-bottom: 5px;
  align-items: center;
  /* text-align: center; */
  color: ${({ $isComplete, $disabled }) =>
    $isComplete ? '#c2c2c2' : $disabled ? '#c4c4c4' : '#4f4f4f'};
  text-decoration-line: ${({ $isComplete }) => ($isComplete ? 'line-through' : 'none')};
`;

const TodoRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 7px;
  align-items: center;
  text-align: center;
  gap: 5px;
`;
