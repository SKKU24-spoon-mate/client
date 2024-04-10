import React from 'react';

import { useRecoilValue } from 'recoil';

import { Box, Button, styled } from '@mui/material';

import { isMobileAtom } from '@states';

// export const HomeIcon = () => {
//   const isMobile = useRecoilValue(isMobileAtom);
//   return <HomeImg style={{ height: isMobile ? '15%' : 22, width: isMobile ? '16%' : 21 }} />;
// };

// export const MessageIcon = () => {
//   const isMobile = useRecoilValue(isMobileAtom);
//   return <MessageImg style={{ color: 'black', width: isMobile ? '21%' : 25, height: isMobile ? '20%' : 24 }} />;
// };

// export const UserIcon = () => {
//   const isMobile = useRecoilValue(isMobileAtom);
//   return <UserImg style={{ width: isMobile ? '20%' : 24, height: isMobile ? '20%' : 24 }} />;
// };

// export const LoginIcon = () => {
//   const isMobile = useRecoilValue(isMobileAtom);
//   return <LoginImg style={{ height: isMobile ? '20%' : 24, width: isMobile ? '20%' : 24 }} />;
// };

export const IconButton = styled(Button)(() => {
  const isMobile = useRecoilValue(isMobileAtom);
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
    fontSize: isMobile ? '1.4rem' : '1rem',
  };
});

export const MainWrapper = styled(Box)(() => ({
  width: '100vw',
  height: '60px',
  backgroundColor: '#F9FAFA',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
}));
