import { styled, Box } from '@mui/material';

export const MainBox = styled(Box)(() => ({
  display: 'flex',
  paddingTop: '180px',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
}));

export const SearchBarWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '30px',
}));

export const SearchBox = styled(Box)(() => ({
  border: '1px solid rgb(255, 140, 68)',
  borderRadius: '5px',
  '&:focus': {
    border: '1px solid rgb(235, 127, 56)',
    boxShadow: '1px 2px 9px #F4AAB9',
  },
}));
