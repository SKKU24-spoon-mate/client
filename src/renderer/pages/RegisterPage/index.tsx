import React, { useCallback, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { RegisterModal } from '@/renderer/containers/Registers/RegisterModal';
import { ReactComponent as AlarmIcon } from '@assets/svg/Alarm.svg';
import { RegisterArea, RegisteredComponents } from '@containers';
import { RegisteredComponents as RegiComs, baseUrl } from '@interfaces';
import { userStateAtom } from '@states';

import { AlarmWrapper, RegiEntitiesWrapper, MainWrapper } from './styled';

export const RegisterPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userState = useRecoilValue(userStateAtom);
  const [regiComponents, setRegiComponents] = useState<RegiComs>([]);

  const getList = useCallback(async () => {
    const resData: RegiComs = await axios.get(baseUrl + `/match/list?userId=${userState.userId}`);
    setRegiComponents(resData);
  }, [userState.userId]);

  React.useEffect(() => {
    getList();
  }, [getList]);

  return (
    <MainWrapper>
      <AlarmWrapper>
        <AlarmIcon onClick={() => navigate(`/alarms`)} style={{ width: '12%' }} />
      </AlarmWrapper>
      <Box sx={{ height: '25%' }}>
        <RegisterArea handleOpen={handleOpen} />
      </Box>
      <RegiEntitiesWrapper>
        <RegisteredComponents users={regiComponents} />
      </RegiEntitiesWrapper>
      <RegisterModal open={open} handleClose={handleClose} />
    </MainWrapper>
  );
};
