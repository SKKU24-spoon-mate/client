import { styled, Button, Box } from '@mui/material';

export const UnCheckedIcon = styled(Box)(() => ({
  borderRadius: '5px',
  width: 18,
  height: 18,
  border: '1px solid #dd5515',
  backgroundColor: 'transparent',
}));

export const CheckedIcon = styled(Box)(() => ({
  borderRadius: '5px',
  width: 18,
  height: 18,
  border: '1px solid #dd5515',
  backgroundColor: '#ff914d',
  content: 'V',
  color: '#fff',
}));

export const MenuButton = styled(Button)(() => ({
  width: 105,
  height: 36,
  backgroundColor: '#FFE9C2',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: 10,
  marginRight: 25,
  fontSize: 14,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#FFE9C29C',
    color: 'black',
  },
  '&.last-child': {
    marginRight: 0,
  },
}));

export const DarkGreenButton = styled(Button)(() => ({
  backgroundColor: '#477A2F',
  color: 'white',
  fontWeight: 400,
  fontSize: '2rem',
  width: 300,
  height: 80,
  borderRadius: 20,
  '&:hover': {
    backgroundColor: '#759367',
  },
  '& .Mui-selected': {
    backgroundColor: '#759367',
  },
}));
