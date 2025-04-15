'use client';

import styled from '@emotion/styled';
import React from 'react';

export default function Footer() {
  return <FooterText>ⓒ Copyright 2025 Maty Project. All Rights Reserved.</FooterText>;
}

const FooterText = styled.div`
  display: flex;
  color: #ffffffb0;
  background-color: #000;
  width: 100%;
  height: auto;
  padding: 40px 0 30px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
