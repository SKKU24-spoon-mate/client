import React, { useCallback, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { Box, Typography } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

import { RegisterModal } from '@/renderer/containers/Registers/RegisterModal';
import { ReactComponent as AlarmIcon } from '@assets/svg/Alarm.svg';
import { Footer, RegisterArea, RegisteredComponents } from '@containers';
import { RegisteredComponents as RegiComs, RegisteredComponent, baseUrl } from '@interfaces';
import { registeredEntitiesAtom, userStateAtom } from '@states';

import { AlarmWrapper, RegiEntitiesWrapper, MainWrapper } from './styled';

export const RegisterPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userState = useRecoilValue(userStateAtom);
  const [regiComponents, setRegiComponents] = useRecoilState(registeredEntitiesAtom);

  const [myRegi, setMyRegi] = useState<RegisteredComponent>({
    userId: '',
    age: 0,
    comment: '',
    deadline: 20,
    distance: 200,
    isAge: false,
    menu: 'kor',
    sex: 'Male',
    userImage: '',
    userName: '',
  });

  const getList = useCallback(async () => {
    await axios.get(baseUrl + `/match/list`).then((res) => {
      const resData: RegiComs = res.data;
      if (!_.isUndefined(resData)) {
        console.log('userState: ' + userState.userId);
        console.log('resData: ' + resData);
        const myData = _.find(resData, { userId: userState.userId }) as RegisteredComponent;
        console.log('myData: ' + myData);
        setMyRegi(myData);
        setRegiComponents(resData);
      }
    });
  }, [setRegiComponents, userState.userId]);

  React.useEffect(() => {
    getList();
  }, []);

  console.log(regiComponents);

  return (
    <MainWrapper>
      <Box sx={{ padding: '3%', height: '100%' }}>
        <AlarmWrapper>
          <AlarmIcon onClick={() => navigate(`/alarms`)} style={{ width: '12%' }} />
        </AlarmWrapper>
        <Box sx={{ height: '30%' }}>
          <RegisterArea myRegi={myRegi as RegisteredComponent} handleOpen={handleOpen} />
        </Box>
        <RegiEntitiesWrapper>
          {!_.isUndefined(regiComponents) && _.isArray(regiComponents) ? (
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
