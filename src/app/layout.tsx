'use client';
import 'normalize.css';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@components/layout/Header';
import styled from '@emotion/styled';
import Footer from '@components/layout/Footer';
import EmotionProvider from './emotion/EmotionProvider';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <EmotionProvider>
          <BodyWrapper>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </BodyWrapper>
        </EmotionProvider>
      </body>
    </html>
  );
}
const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #ffffff;
`;

const Main = styled.main`
  width: 100%;
  flex: 1;
`;
