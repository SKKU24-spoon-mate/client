import React, { useCallback, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

import { RegisterModal } from '@/renderer/containers/Registers/RegisterModal';
import { ReactComponent as AlarmIcon } from '@assets/svg/Alarm.svg';
import { Footer, RegisterArea, RegisteredComponents } from '@containers';
import { RegisteredComponents as RegiComs, baseUrl } from '@interfaces';
import { registeredEntitiesAtom, userStateAtom } from '@states';

import { AlarmWrapper, RegiEntitiesWrapper, MainWrapper } from './styled';

export const RegisterPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userState = useRecoilValue(userStateAtom);
  const [regiComponents, setRegiComponents] = useRecoilState(registeredEntitiesAtom);

  const getList = useCallback(async () => {
    await axios.get(baseUrl + `/match/list`).then((res) => {
      const resData: RegiComs = res.data;
      setRegiComponents(resData);
    });
  }, [setRegiComponents]);

  React.useEffect(() => {
    getList();
  }, [getList]);

  console.log(regiComponents);

  return (
    <MainWrapper>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '3%' }}>
        <AlarmWrapper>
          <AlarmIcon onClick={() => navigate(`/alarms`)} style={{ width: '12%' }} />
        </AlarmWrapper>
        <Box sx={{ height: '32%' }}>
          <RegisterArea handleOpen={handleOpen} />
        </Box>
        <RegiEntitiesWrapper>
          {_.isArray(regiComponents) ? (
            <RegisteredComponents users={regiComponents} />
          ) : (
            <Typography
              sx={{
                display: ' flex',
                justifyContent: 'center',
                height: '40%',
                alignItems: 'center',
                fontSize: '2rem',
                color: '#9a9a9a',
              }}
            >
              등록된 게시글이 없습니다.
            </Typography>
          )}
        </RegiEntitiesWrapper>
      </Box>
      <RegisterModal open={open} handleClose={handleClose} />
      <Footer />
    </MainWrapper>
  );
};
