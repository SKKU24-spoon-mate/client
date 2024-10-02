import { styled, Box } from '@mui/material';

export const HeaderBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#DCE4D7',
  height: '15%',
}));

export const ListBox = styled(Box)(() => ({
  flex: 1,
  overflowY: 'auto',
  padding: '1rem',
  backgroundColor: '#FFFEF3',
}));

export const FromContent = styled(Box)(() => ({
  textAlign: 'right',
}));

export const ToContent = styled(Box)(() => ({
  textAlign: 'left',
}));
