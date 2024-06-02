import { Box, styled, Button } from '@mui/material';

export const ProfileContainer = styled(Box)(({ theme }) => ({
  // padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  height: '100%',
}));

export const ReviewBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#DCE4D7',
  width: '100vw',
  height: '30vh',
  textAlign: 'center',
  mt: 5,
}));

export const ScrollableCommentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflowY: 'auto',
  width: '100%',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    maxHeight: '30vh', // Adjust as needed for larger screens
  },
}));

export const CommentBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#E5EAE1',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginTop: theme.spacing(1),
  borderRadius: '10px',
  width: '60%',
  height: '100%',
  textAlign: 'center',
  justifyContent: 'flex-start',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const MyCommentBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#E5EAE1',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginTop: theme.spacing(1),
  borderRadius: '10px',
  width: '80%',
  height: '100%',
  textAlign: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#D0E0C4',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  width: 'fit-content',
  height: 'fit-content',
  textAlign: 'center',
  borderRadius: '10px',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1),
  },
}));

export const Footer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: '#E1ECCB',
  padding: theme.spacing(1),
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '10%',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const CircleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#477A2F',
  borderRadius: '50%',
  width: '7vw',
  height: '4vh',
  marginTop: theme.spacing(1),
}));

export const SquareBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#477A2F',
  borderRadius: '10px',
  width: 'fit-content',
  height: '4vh',
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
}));
