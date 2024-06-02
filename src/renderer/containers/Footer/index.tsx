import React from 'react';

import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ChatHeader } from '@assets/svg/ChatHeader.svg';
import { ReactComponent as ProfileHeader } from '@assets/svg/ProfileHeader.svg';
import { ReactComponent as RegisterHeader } from '@assets/svg/RegisterHeader.svg';
import { NavItem } from '@pages/Chat/chatliststyled';

import { MenuIconWrapper, MenuTypo } from './styled';

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#DCE4D7', padding: '1rem 0' }}>
        <NavItem sx={{ flex: 1 }}>
          <MenuIconWrapper onClick={() => navigate(`/spoon-mate`)}>
            <RegisterHeader style={{ width: '50%', height: '50%' }} />
            <MenuTypo>지금 밥약!</MenuTypo>
          </MenuIconWrapper>
        </NavItem>
        <NavItem sx={{ flex: 1 }}>
          <MenuIconWrapper onClick={() => navigate(`/chat`)}>
            <ChatHeader style={{ width: '50%', height: '50%' }} />
            <MenuTypo>채팅</MenuTypo>
          </MenuIconWrapper>
        </NavItem>
        <NavItem sx={{ flex: 1 }}>
          <MenuIconWrapper onClick={() => navigate(`/profile`)}>
            <ProfileHeader style={{ width: '50%', height: '50%' }} />
            <MenuTypo>나의 프로필</MenuTypo>
          </MenuIconWrapper>
        </NavItem>
      </Box>
    </>
  );
};
