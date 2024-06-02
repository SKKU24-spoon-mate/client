import React, { useCallback, useMemo } from 'react';

import { useRecoilValue } from 'recoil';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ApplyIcon } from '@assets/svg/Invitation.svg';
import { ReactComponent as UserDefaultIcon } from '@assets/svg/UserDefault.svg';
import { RegisteredComponent, baseUrl } from '@interfaces';
import { userStateAtom } from '@states';

import { ApplyIconWrapper, CommentTypo, InviEntityWrapper, LettersWrapper, TagWrapper, TagsWrapper } from './styled';

interface InvitationBoxProps {
  counterUser: RegisteredComponent; // 상대방임
}

export const InvitationBox: React.FC<InvitationBoxProps> = ({ counterUser }) => {
  const userState = useRecoilValue(userStateAtom);

  const favoriteFood: string = useMemo(
    () =>
      counterUser.menu == 'kor'
        ? '한식'
        : counterUser.menu == 'jpn'
          ? '일식'
          : counterUser.menu == 'chn'
            ? '중식'
            : counterUser.menu == 'west'
              ? '양식'
              : '아무거나',
    [counterUser.menu],
  );

  const navigate = useNavigate();

  const navigateToProfile = () => {
    const uObjId = counterUser.objectId;
    navigate(`/profile`, { state: { userId: uObjId } }); // profile 페이지로 userId 인자 전달
  };

  const postApply = useCallback(() => {
    const data = {
      from: userState.userId,
      target: counterUser.userId,
    };
    axios.post(baseUrl + '/appointment', data);
  }, [counterUser.userId, userState.userId]);

  return (
    <InviEntityWrapper sx={{ borderRadius: 24 }}>
      <UserDefaultIcon onClick={navigateToProfile} width="15%" />
      <LettersWrapper>
        <CommentTypo>{counterUser.comment}</CommentTypo>
        <TagsWrapper>
          <TagWrapper>선호 음식: {favoriteFood}</TagWrapper>
          <TagWrapper>{counterUser.sex == 'Male' ? '남자' : '여자'}</TagWrapper>
          {counterUser.isAge && <TagWrapper>{counterUser.age}살</TagWrapper>}
        </TagsWrapper>
      </LettersWrapper>
      <ApplyIconWrapper>
        <ApplyIcon onClick={postApply} width="100%" />
      </ApplyIconWrapper>
    </InviEntityWrapper>
  );
};
