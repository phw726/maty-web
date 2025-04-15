'use client';
import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import EditableHeaderLayout from '@components/layout/ComponentHeader';
import DeleteBtn from '@components/common/DeleteBtn';
import FloatingUtils from '@components/common/FloatingUtils';
import { useDiary } from '@hooks/useDiary';

export default function DiaryScreen() {
  const router = useRouter();
  const { userId, selectedDate, diary, deleteDiary } = useDiary();

  const hasContent = !!diary?.content;
  const content = diary?.content ?? '작성된 내용이 없습니다.';

  const handleEdit = () => {
    router.push('/diary/form?mode=edit');
  };

  const handleDelete = async () => {
    if (!userId || !selectedDate) return;
    await deleteDiary(userId, selectedDate);
  };

  return (
    <EditableHeaderLayout title="오늘의 기록" mode="view" onSave={handleEdit}>
      <FloatingUtils />
      <Wrapper>
        <DiaryText $placeholder={!hasContent}>{content}</DiaryText>
      </Wrapper>

      {userId && hasContent && (
        <DeleteBtn mode="create" hasContent={hasContent} deleteFn={handleDelete} />
      )}
    </EditableHeaderLayout>
  );
}

const Wrapper = styled.div`
  flex: 1;
  padding: 16px;
`;

const DiaryText = styled.p<{ $placeholder?: boolean }>`
  font-size: 16px;
  color: ${({ $placeholder }) => ($placeholder ? '#c0c0c0' : '#333')};
  line-height: 24px;
`;
