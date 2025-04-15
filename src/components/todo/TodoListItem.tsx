'use client';
import React from 'react';
import styled from '@emotion/styled';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from 'react-icons/md';
import { Todo } from 'utils/type';

interface Props {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isViewMode: boolean;
}

export default function TodoListItem({ item, onToggle, onDelete, isViewMode }: Props) {
  return (
    <TodoRow>
      <IconButton onClick={() => onToggle(item.id)} aria-label="toggle complete">
        {item.isComplete ? (
          <MdCheckBox size={20} color="#8f70ff9e" />
        ) : (
          <MdCheckBoxOutlineBlank size={20} color="#8f70ff9e" />
        )}
      </IconButton>
      <TodoText $isComplete={item.isComplete}>{item.content}</TodoText>
      {!isViewMode && (
        <IconButton
          onClick={() => onDelete(item.id)}
          aria-label="delete todo"
          style={{ marginLeft: 'auto' }}
        >
          <MdRemoveCircleOutline size={20} color="#cdcdcd" />
        </IconButton>
      )}
    </TodoRow>
  );
}

const TodoRow = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 16px 12px;
  border-bottom: 1px solid #d2d2d24a;
`;

const TodoText = styled.span<{ $isComplete?: boolean }>`
  margin-left: 8px;
  margin-bottom: 3px;
  font-size: 16px;
  color: ${({ $isComplete }) => ($isComplete ? '#ccc' : '#333')};
  text-decoration: ${({ $isComplete }) => ($isComplete ? 'line-through' : 'none')};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
