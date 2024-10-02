import { styled, Box, Typography } from '@mui/material';

export const InviEntityWrapper = styled(Box)(() => ({
  backgroundColor: '#F0F2DF',
  width: '100%',
  height: '100%',
  maxHeight: '180px',
  display: 'flex',
  margin: '2% 5%',
  padding: '2% 5%',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const CommentTypo = styled(Typography)(() => ({
  fontSize: '2.3rem',
  overflowX: 'hidden',
  display: 'inline-block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const LettersWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '60%',
  alignItems: 'flex-start',
}));

export const TagsWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
}));

export const TagWrapper = styled(Typography)(() => ({
  borderRadius: 10,
  padding: '2% 5%',
  marginRight: '5px',
  width: 'fit-content',
  backgroundColor: '#D0E0C4',
  fontSize: '1.6rem',
  whiteSpace: 'nowrap',
}));

export const ApplyIconWrapper = styled(Box)(() => ({
  width: '10%',
  '&:hover': {
    rect: {
      fill: '#DAD8C0',
      stroke: '#DAD8C0',
    },
  },
  '& rect': {
    transition: 'fill 0.3s',
  },
}));
