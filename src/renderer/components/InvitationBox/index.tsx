import React, { useMemo } from 'react';

import { ReactComponent as ApplyIcon } from '@assets/svg/Invitation.svg';
import { ReactComponent as UserDefaultIcon } from '@assets/svg/UserDefault.svg';
import { RegisteredComponent } from '@interfaces';

import { ApplyIconWrapper, CommentTypo, InviEntityWrapper, LettersWrapper, TagWrapper, TagsWrapper } from './styled';

interface InvitationBoxProps {
  user: RegisteredComponent;
}

export const InvitationBox: React.FC<InvitationBoxProps> = ({ user }) => {
  const favoriteFood: string = useMemo(
    () =>
      user.menu == 'kor'
        ? '한식'
        : user.menu == 'jpn'
          ? '일식'
          : user.menu == 'chn'
            ? '중식'
            : user.menu == 'west'
              ? '양식'
              : '아무거나',
    [user.menu],
  );
  return (
    <InviEntityWrapper sx={{ borderRadius: 24 }}>
      <UserDefaultIcon width="15%" />
      <LettersWrapper>
        <CommentTypo>{user.comment}</CommentTypo>
        <TagsWrapper>
          <TagWrapper>선호 음식: {favoriteFood}</TagWrapper>
          <TagWrapper>{user.sex == 'male' ? '남자' : '여자'}</TagWrapper>
          {user.isAge && <TagWrapper>{user.age}살</TagWrapper>}
        </TagsWrapper>
      </LettersWrapper>
      <ApplyIconWrapper>
        <ApplyIcon width="100%" />
      </ApplyIconWrapper>
    </InviEntityWrapper>
  );
};
