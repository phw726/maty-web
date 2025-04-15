'use client';

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { FaCalendarPlus } from 'react-icons/fa';
import { FiList, FiPlusSquare } from 'react-icons/fi';
import { GoPencil } from 'react-icons/go';

const BUTTONS = [
  { icon: <FaCalendarPlus size={20} color="#fff" />, path: '/schedule/form?mode=edit' },
  { icon: <FiList size={20} color="#fff" />, path: '/todo?mode=edit' },
  { icon: <GoPencil size={20} color="#fff" />, path: '/diary/form?mode=edit' },
];

export default function FloatingUtils() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [visibleStates, setVisibleStates] = useState<boolean[]>(BUTTONS.map(() => false));

  const handleToggle = () => {
    if (isOpen) {
      // 순차 Fade-out
      BUTTONS.forEach((_, i) => {
        setTimeout(() => {
          setVisibleStates((prev) => {
            const updated = [...prev];
            updated[i] = false;
            return updated;
          });
        }, i * 100);
      });
      setTimeout(
        () => {
          setButtonsVisible(false);
          setIsOpen(false);
        },
        BUTTONS.length * 100 + 100
      );
    } else {
      setButtonsVisible(true);
      setIsOpen(true);
    }
  };

  // 열렸을 때 순차 Fade-in
  useEffect(() => {
    if (buttonsVisible) {
      // 아래에서 위로 순차 fade-in
      BUTTONS.forEach((_, i) => {
        const reverseIndex = BUTTONS.length - 1 - i;
        setTimeout(() => {
          setVisibleStates((prev) => {
            const updated = [...prev];
            updated[reverseIndex] = true;
            return updated;
          });
        }, i * 100);
      });
    }
  }, [buttonsVisible]);

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
    setButtonsVisible(false);
    setVisibleStates(BUTTONS.map(() => false));
  };

  return (
    <Wrapper>
      {buttonsVisible &&
        BUTTONS.map((btn, idx) => (
          <ActionWrapper key={idx} $visible={visibleStates[idx]}>
            <ActionButton onClick={() => handleNavigate(btn.path)}>{btn.icon}</ActionButton>
          </ActionWrapper>
        ))}
      <MainButton onClick={handleToggle}>
        <FiPlusSquare size={22} color="#fff" />
      </MainButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 135px;
  right: 40px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const MainButton = styled.button`
  width: 52px;
  height: 52px;
  background-color: #8f70ff9e;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const ActionWrapper = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0px' : '10px')});
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
`;

const ActionButton = styled(MainButton)`
  background-color: #252525;
`;
