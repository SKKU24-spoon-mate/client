import { styled, Box } from '@mui/material';

export const MainWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '3%',
  width: '100vw',
  height: '100vh',
}));

export const AlarmWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: '8%',
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

export const RegiEntitiesWrapper = styled(Box)(() => ({
  // marginTop: '10%',
  height: '60%',
}));
