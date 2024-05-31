import React from 'react';

import { InvitationBox } from '@components';
import { RegisteredComponent } from '@interfaces';

import { InvitationsWrapper } from './styled';

interface RegisteredComponentsProps {
  users: Array<RegisteredComponent>;
}
export const RegisteredComponents: React.FC<RegisteredComponentsProps> = ({ users }) => (
  <InvitationsWrapper>
    {users.map((user, idx) => (
      <InvitationBox user={user} key={idx} />
    ))}
  </InvitationsWrapper>
);
