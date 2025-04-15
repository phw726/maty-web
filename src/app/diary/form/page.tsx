'use client';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter, useSearchParams } from 'next/navigation';
import EditableHeaderLayout from '@components/layout/ComponentHeader';
import DeleteBtn from '@components/common/DeleteBtn';
import { useDiary } from '@hooks/useDiary';

export default function DiaryFormScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') as 'edit' | 'create') || 'create';

  const { userId, selectedDate, diary, updateDiary, deleteDiary } = useDiary();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (mode === 'edit' && diary?.content) {
      setContent(diary.content);
    }
  }, [mode, diary]);

  const handleSave = async () => {
    if (!userId || !selectedDate || !content.trim()) {
      window.alert('내용을 입력해주세요.');
      return;
    }

    try {
      await updateDiary(userId, selectedDate, content);
      router.push('/diary');
    } catch (err) {
      console.error('📛 저장 실패:', err);
      alert('저장에 실패했어요. 네트워크를 확인해주세요.');
    }
  };

  const handleDelete = async () => {
    if (!userId || !selectedDate) return;

    await deleteDiary(userId, selectedDate);
    router.push('/diary');
  };

  return (
    <EditableHeaderLayout title="오늘의 기록" mode="edit" onSave={handleSave}>
      <Wrapper>
        <DiaryInput
          placeholder="오늘 하루는 어땠나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <DeleteBtn mode="edit" hasContent={!!diary?.content} deleteFn={handleDelete} />
      </Wrapper>
    </EditableHeaderLayout>
  );
}

const Wrapper = styled.div`
  flex: 1;
  padding: 16px 7px;
`;

const DiaryInput = styled.textarea`
  width: 100%;
  min-height: 200px;
  font-size: 16px;
  color: #22272b;
  border-radius: 12px;
  padding: 12px;
  resize: vertical;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  outline: none;
  line-height: 1.6;
`;
