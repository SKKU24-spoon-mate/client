import { styled, Box, Typography } from '@mui/material';

export const MainWrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '10%',
}));

export const QuestionTypo = styled(Typography)(() => ({
  color: '#477A2F',
  fontSize: '4rem',
}));

export const InvitationWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    height: 9,
    width: 9,
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}));
