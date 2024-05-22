import React from 'react';

import { LogoImage } from '@/renderer/components/Icons';
import { DarkGreenButton } from '@components';

import { MainWrapper, QuestionTypo } from './styled';

export const RegisterArea = () => (
  <MainWrapper>
    <QuestionTypo>지금 밥 먹을 사람?</QuestionTypo>
    <LogoImage width="25%" height="25%" />
    <DarkGreenButton>등록하기</DarkGreenButton>
  </MainWrapper>
);
