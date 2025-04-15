'use client';
import React from 'react';
import styled from '@emotion/styled';
import { MdAddCircle } from 'react-icons/md';

interface Props {
  content: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

export default function TodoForm({ content, onChange, onSubmit }: Props) {
  return (
    <InputRow>
      <TodoInput
        type="text"
        placeholder="오늘의 목표를 입력하세요"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />
      <SubmitButton onClick={onSubmit}>
        <MdAddCircle size={28} color="#8f70ff9e" />
      </SubmitButton>
    </InputRow>
  );
}

const InputRow = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 4px 16px;
  margin-top: 16px;
  margin-bottom: 80px;
  background-color: #fff;
`;

const TodoInput = styled.input`
  flex: 1;
  height: 40px;
  font-size: 16px;
  color: #22272b;
  border: none;
  outline: none;
  background-color: transparent;

  &::placeholder {
    color: #ccc;
  }
`;

const SubmitButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
