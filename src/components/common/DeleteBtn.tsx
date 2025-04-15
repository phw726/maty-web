/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import styled from '@emotion/styled';
import { FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useSelectedDateStore } from '@store/useSelectDateStore';

type Props = {
  mode: 'edit' | 'create';
  deleteFn?: () => Promise<void>;
  hasContent?: boolean;
  onDone?: () => void;
};

export default function DeleteBtn({ mode, deleteFn, hasContent: _hasContent, onDone }: Props) {
  const router = useRouter();
  const selectedDate = useSelectedDateStore.getState().selectedDate;
  const current = useSelectedDateStore.getState().dataByDate[selectedDate];
  const setDailyData = useSelectedDateStore.getState().setDailyData;

  const handleClick = async () => {
    const confirmed = window.confirm(
      mode === 'edit'
        ? '정말 삭제할까요?\n삭제한 내용은 복구할 수 없습니다.'
        : '작성 취소할까요?\n작성 중인 내용이 사라집니다.'
    );

    if (!confirmed) return;

    // ✅ 옵티미스틱 UI 처리
    if (selectedDate && current) {
      setDailyData(selectedDate, {
        ...current,
        diary: undefined,
      });
    }

    // ✅ 서버 요청
    if (mode === 'edit' && deleteFn) {
      try {
        await deleteFn();
      } catch (e) {
        window.alert('삭제 실패: 네트워크 상태를 확인해주세요.');
        console.log('deleteBtn Error', e);
      }
    }

    // ✅ 뒤로가기 or 콜백 실행
    if (onDone) {
      onDone();
    } else {
      router.back();
    }
  };

  return (
    <DeleteButton onClick={handleClick}>
      {/* <FiTrash2 size={24} color="#fff" /> */}
      삭제하기
    </DeleteButton>
  );
}

const DeleteButton = styled.button`
  position: absolute;
  width: 120px;
  height: 40px;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  margin: 20px 0;
  bottom: 120px;
  background-color: #22272b;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  align-self: center;
  color: #fff;
  font-weight: 500;
`;
