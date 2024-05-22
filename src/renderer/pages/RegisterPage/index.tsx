import React from 'react';

import { ReactComponent as AlarmIcon } from '@assets/svg/Alarm.svg';
import { dummyRegiUsers } from '@constants';
import { RegisterArea, RegisteredComponents } from '@containers';

import { AlarmWrapper, InvitationsWrapper, MainWrapper } from './styled';

export const RegisterPage = () => {
  return (
    <MainWrapper>
      <AlarmWrapper>
        <AlarmIcon style={{ width: '12%' }} />
      </AlarmWrapper>
      <RegisterArea />
      <InvitationsWrapper>
        <RegisteredComponents users={dummyRegiUsers} />
      </InvitationsWrapper>
    </MainWrapper>
  );
};
