import { styled, Box } from '@mui/material';

export const MainWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '3%',
}));

export const AlarmWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  '&:hover': {
    path: {
      fill: '#E8E9A2',
    },
  },
  '& path': {
    transition: 'fill 0.3s',
  },
  '&:hover path:last-of-type': {
    fill: 'black',
  },
}));

export const InvitationsWrapper = styled(Box)(() => ({
  marginTop: '10%',
  height: '50vh',
}));
