'use client';

import Tab from '@components/Tab/Tab';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaSnapchatGhost } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();
  return (
    <Wrapper>
      <LogoWrapper onClick={() => router.push('/')}>
        <GhostIcon size={40} color="#000" />
        <Image
          src="/logo1.png"
          alt="로고"
          width={80}
          height={60}
          style={LogoImageStyled}
          priority
        />
      </LogoWrapper>
      <Tab />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: auto;
  height: auto;
  background-color: #000000;
  justify-content: space-between;
  padding: 20px 80px;
`;

const LogoWrapper = styled.button`
  position: relative;
  display: flex;
  flex-shrink: 0;
  width: 100px;
  height: 62px;
  /* padding: 20px 100px; */
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: #fff;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
`;

const GhostIcon = styled(FaSnapchatGhost)`
  position: absolute;
  top: 20;
  left: 0;
  z-index: 2;
`;

const LogoImageStyled = {
  position: 'absolute',
  top: '-2px',
  left: '20px',
  zIndex: 1,
  border: '1px solid #fff',
  borderRadius: '10px',
} as const;
