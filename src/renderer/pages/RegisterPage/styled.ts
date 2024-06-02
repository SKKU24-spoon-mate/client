import { styled, Box, Button, Typography } from '@mui/material';

export const MainWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  // padding: '3%',
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

export const AlarmConfirmButton = styled(Button)(() => ({
  backgroundColor: 'green',
  color: 'white',
  fontSize: '1.6rem',
  fontWeight: 700,
  height: '60%',
  marginRight: '5%',
  width: '10%',
  minWidth: '120px',
}));

export const AlarmNotConfirmButton = styled(Button)(() => ({
  backgroundColor: '#D9D9D9',
  color: 'black',
  fontSize: '1.6rem',
  fontWeight: 700,
  height: '60%',
  width: '10%',
  minWidth: '120px',
}));

export const AlarmEntityWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  maxHeight: '160px',
  margin: '4% 0',
}));

export const AlarmTitleTypo = styled(Typography)(() => ({
  fontSize: '3rem',
  color: '#477A2F',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5%',
}));
