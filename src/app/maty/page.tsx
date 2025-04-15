'use client';

import MainMaty from '@components/maty/MainMaty';
import React from 'react';
import styled from '@emotion/styled';

export default function Maty() {
  return (
    <Wrapper>
      <MainMaty />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* margin: 10px 0; */
  /* min-height: 400px; */
  padding: 60px 0 60px;
  background-color: #7f7f7f;
`;
