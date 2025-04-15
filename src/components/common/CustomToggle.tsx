'use client';
import React from 'react';
import styled from '@emotion/styled';

interface Props {
  isOn: boolean;
  onToggle: () => void;
}

export default function CustomToggle({ isOn, onToggle }: Props) {
  return (
    <ToggleWrapper onClick={onToggle} role="switch" aria-checked={isOn}>
      <Track isOn={isOn} />
      <Thumb isOn={isOn} />
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.button`
  width: 48px;
  height: 24px;
  border-radius: 12px;
  position: relative;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
`;

const Track = styled.div<{ isOn: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: ${({ isOn }) => (isOn ? '#2196F3' : '#ccc')};
  transition: background-color 0.3s ease;
`;

const Thumb = styled.div<{ isOn: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 2px;
  left: 2px;
  transform: ${({ isOn }) => (isOn ? 'translateX(24px)' : 'translateX(0)')};
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;
