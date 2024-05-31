import { styled, Box, Typography, FormControlLabel, Button } from '@mui/material';

export const MainWrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const QuestionTypo = styled(Typography)(() => ({
  color: '#477A2F',
  fontSize: '4rem',
}));

export const InvitationsWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
  overflowY: 'scroll',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    height: 9,
    width: 9,
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'green',
    border: 'none',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}));

export const ModalWrapper = styled(Box)(() => ({
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  backgroundColor: '#FFFEF3',
  border: '2px solid #000',
  borderRadius: 30,
  padding: '3%',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const TitleTypo = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '3rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

export const SubTitleTypo = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '2rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  marginTop: '4%',
}));

export const ImagesBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  marginTop: '1%',
}));

export const FormControlLabelCusto = styled(FormControlLabel)(() => ({
  '& .MuiTypography-root': { fontSize: '1.8rem' },
}));

export const SubmitButton = styled(Button)(() => ({
  backgroundColor: 'green',
  color: 'white',
  fontSize: '1.6rem',
  padding: '2% 5%',
  marginTop: '5%',
  borderRadius: 5,
}));

export const IconWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#FAFEF0',
  justifyContent: 'center',
  width: '80%',
  height: '100%',
  '& .Mui-selected': {
    boxShadow: 5,
    border: '1px solid #6e6e6e',
  },
}));

export const IconButton = styled(Button)(() => ({
  width: '80%',
  height: '100%',
  padding: '10%',
  borderRadius: 50,
  backgroundColor: '#FAFEF0',
  '&:hover': {
    boxShadow: 5,
    border: '1px solid #6e6e6e',
  },
  '& .Mui-selected': {
    border: '1px solid #6e6e6e',
  },
}));
