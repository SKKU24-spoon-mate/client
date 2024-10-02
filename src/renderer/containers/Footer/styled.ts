import { styled, Box, Typography } from '@mui/material';

import { IconWrapper } from '@pages/Chat/chatliststyled';

export const MenuTypo = styled(Typography)(() => ({
  fontSize: '1.5rem',
  color: '#000',
}));

export const MenuIconWrapper = styled(IconWrapper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));
