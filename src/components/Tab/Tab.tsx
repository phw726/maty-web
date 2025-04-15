'use client';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Tab() {
  const router = useRouter();
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  return (
    <Wrapper>
      <TabItem onClick={() => router.push('/maty')}>MATY</TabItem>
      <TabItem onClick={() => router.push('/calendar')}>캘린더</TabItem>
      <TabItem onClick={() => router.push(`/diary?date=${todayStr}`)}>다이어리</TabItem>
      <TabItem onClick={() => router.push(`/todo?date=${todayStr}`)}>TODO</TabItem>
      <TabItem onClick={() => router.push('/mypage')}>마이페이지</TabItem>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  gap: 5px;
`;

const TabItem = styled.button`
  width: 100px;
  height: auto;
  padding: 4px 10px;
  color: #fff;
  background-color: #000;
  border: none;
  cursor: pointer;
  transition: 0.2s all ease-in-out;

  &:hover {
    color: #8f70ff;
  }
`;
