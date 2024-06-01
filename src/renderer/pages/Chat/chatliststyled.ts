import { styled, Box } from '@mui/material';

export const HeaderBox = styled(Box)(() => ({
  textAlign: 'center',
  fontSize: '3rem',
  color: '#477A2F',
  height: '10vh',
  backgroundColor: '#FFFEF3',
  fontWeight: 'bold',
  padding: '2rem 0',
  borderBottom: '0.3rem solid #549A1E',
}));

export const ListBox = styled(Box)(() => ({
  borderTopLeftRadius: '5px',
  backgroundColor: '#FFFEF3',
  height: '80vh',
  overflow: 'auto',
  padding: '1rem',
}));

export const ChatBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  borderBottom: '1px solid #ccc',
  cursor: 'pointer',
}));

export const IconWrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
}));

export const NavItem = styled(Box)(() => ({
  flex: '1',
  color: '#fff',
  backgroundColor: '#E1ECCB',
  textAlign: 'center',
  lineHeight: '50px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
}));
