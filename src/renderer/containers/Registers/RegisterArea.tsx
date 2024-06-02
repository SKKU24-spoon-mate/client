import React from 'react';

import _ from 'lodash';

import { LogoImage } from '@/renderer/components/Icons';
import { DarkGreenButton } from '@components';
import { RegisteredComponent } from '@interfaces';

import { MainWrapper, QuestionTypo } from './styled';

export const RegisterArea = (props: { myRegi: RegisteredComponent | undefined; handleOpen: () => void }) => {
  return (
    <>
      {props.myRegi?.userId === '' || _.isUndefined(props.myRegi) ? (
        <MainWrapper>
          <QuestionTypo>지금 밥 먹을 사람?</QuestionTypo>
          <LogoImage width="25%" height="40%" />
          <DarkGreenButton onClick={props.handleOpen}>등록하기</DarkGreenButton>
        </MainWrapper>
      ) : (
        <></>
      )}
    </>
  );
};
