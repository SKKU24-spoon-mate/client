import React, { useState } from 'react';

import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RegisterModal } from '@/renderer/containers/Registers/RegisterModal';
import { ReactComponent as AlarmIcon } from '@assets/svg/Alarm.svg';
import { dummyRegiUsers } from '@constants';
import { RegisterArea, RegisteredComponents } from '@containers';

import { AlarmWrapper, RegiEntitiesWrapper, MainWrapper } from './styled';

export const RegisterPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <MainWrapper>
      <AlarmWrapper>
        <AlarmIcon onClick={() => navigate(`/alarms`)} style={{ width: '12%' }} />
      </AlarmWrapper>
      <Box sx={{ height: '25%' }}>
        <RegisterArea handleOpen={handleOpen} />
      </Box>
      <RegiEntitiesWrapper>
        <RegisteredComponents users={dummyRegiUsers} />
      </RegiEntitiesWrapper>
      <RegisterModal open={open} handleClose={handleClose} />
    </MainWrapper>
  );
};
