import React, { useMemo } from 'react';

import { Box } from '@mui/material';
import _ from 'lodash';

import { LogoImage } from '@/renderer/components/Icons';
import {
  ApplyIconWrapper,
  CommentTypo,
  LettersWrapper,
  TagWrapper,
  TagsWrapper,
} from '@/renderer/components/InvitationBox/styled';
import { ReactComponent as RegiEditIcon } from '@assets/svg/RegisterEdit.svg';
import { ReactComponent as UserDefaultIcon } from '@assets/svg/UserDefault.svg';
import { DarkGreenButton } from '@components';
import { RegisteredComponent } from '@interfaces';

import { MainWrapper, QuestionTypo } from './styled';

export const RegisterArea = (props: { myRegi: RegisteredComponent | undefined; handleOpen: () => void }) => {
  const favoriteFood: string = useMemo(
    () =>
      props.myRegi?.menu == 'kor'
        ? '한식'
        : props.myRegi?.menu == 'jpn'
          ? '일식'
          : props.myRegi?.menu == 'chn'
            ? '중식'
            : props.myRegi?.menu == 'west'
              ? '양식'
              : '아무거나',
    [props.myRegi?.menu],
  );

  return (
    <>
      {props.myRegi?.userId === '' || _.isUndefined(props.myRegi) ? (
        <MainWrapper>
          <QuestionTypo>지금 밥 먹을 사람?</QuestionTypo>
          <LogoImage width="25%" height="40%" />
          <DarkGreenButton onClick={props.handleOpen}>등록하기</DarkGreenButton>
        </MainWrapper>
      ) : (
        <MainWrapper>
          <Box
            sx={{
              width: '95%',
              height: '40%',
              backgroundColor: '#F0F2DF',
              display: 'flex',
              borderRadius: 20,
              padding: '4%',
              justifyContent: 'space-between',
            }}
          >
            <UserDefaultIcon width="15%" />
            <LettersWrapper>
              <CommentTypo>{props.myRegi.comment}</CommentTypo>
              <TagsWrapper>
                <TagWrapper sx={{ backgroundColor: '#EDEF71' }}>선호 음식: {favoriteFood}</TagWrapper>
                <TagWrapper sx={{ backgroundColor: '#EDEF71' }}>
                  {props.myRegi.sex == 'Male' ? '남자' : '여자'}
                </TagWrapper>
                {props.myRegi.isAge && <TagWrapper>{props.myRegi.age}살</TagWrapper>}
              </TagsWrapper>
            </LettersWrapper>
            <ApplyIconWrapper>
              <RegiEditIcon width="100%" />
            </ApplyIconWrapper>
          </Box>
          <Box sx={{ width: '100%', height: '2px', borderBottom: '1px dashed green', marginTop: '10%' }}></Box>
        </MainWrapper>
      )}
    </>
  );
};
