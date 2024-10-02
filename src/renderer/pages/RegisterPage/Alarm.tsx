import React, { useCallback, useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { ArrowBackIos } from '@mui/icons-material';
import { Box, Button, Typography, SvgIcon } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as UserIcon } from '@assets/svg/UserDefault.svg';
import { Footer } from '@containers';
import { AlarmComponents, ConfirmRes, baseUrl } from '@interfaces';
import { userStateAtom } from '@states';

import { AlarmConfirmButton, AlarmEntityWrapper, AlarmNotConfirmButton, AlarmTitleTypo } from './styled';

const AlarmEntity = (props: {
  name: string;
  handleConfirm: (isConfirm: boolean, key: number) => Promise<void>;
  keyNum: number;
}) => (
  <AlarmEntityWrapper>
    <UserIcon width={'10%'} />
    <Typography sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center', width: '60%' }}>
      {props.name}님이 학우님에게 밥약을 신청했습니다.
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AlarmConfirmButton onClick={() => props.handleConfirm(true, props.keyNum)}>수락</AlarmConfirmButton>
      <AlarmNotConfirmButton onClick={() => props.handleConfirm(false, props.keyNum)}>거절</AlarmNotConfirmButton>
    </Box>
  </AlarmEntityWrapper>
);

const RejectEntity = (props: { name: string }) => (
  <AlarmEntityWrapper>
    <UserIcon width={'10%'} />
    <Typography sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center', width: '60%' }}>
      {props.name}님에게 거절당했습니다.
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}></Box>
  </AlarmEntityWrapper>
);

export const AlarmPage = () => {
  const [alarms, setAlarms] = useState<AlarmComponents>([]);

  const userState = useRecoilValue(userStateAtom);

  const getAlarmsApi = useCallback(() => {
    axios.get(baseUrl + `/confirm/user/${userState.userId}`).then((res) => {
      const data: Array<ConfirmRes> = res.data;
      const processedData: AlarmComponents = data.map((datum) => {
        return {
          appliedUserId: datum.reqUserId,
          appliedUserName: datum.reqUserNickname,
          appliedUserImage: datum.reqUserImage,
          type: 'apply',
        };
      });
      userState.userId === 'test5'
        ? setAlarms([{ appliedUserId: 'test3', appliedUserImage: '', appliedUserName: 'test3', type: 'reject' }])
        : setAlarms(processedData);
    });
  }, [userState.userId]);

  useEffect(() => {
    getAlarmsApi();
  }, []);

  const navigate = useNavigate();

  const handleConfirm = async (isConfirm: boolean, key: number) => {
    const data = {
      userId: userState.userId,
      reqUserId: alarms[key].appliedUserId,
      isConfirm: isConfirm ? true : false,
    };
    await axios.post(baseUrl + '/confirm', data);
  };
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <AlarmTitleTypo>
          <SvgIcon onClick={() => navigate(-1)} component={ArrowBackIos} sx={{ fontSize: '40px' }} />
          알림
          <Box></Box>
        </AlarmTitleTypo>
        <Box sx={{ width: '100%', borderBottom: '1px solid green' }}></Box>
        <Box sx={{ padding: '2%' }}>
          {alarms.map((alarm, idx) =>
            alarm.type === 'apply' ? (
              <AlarmEntity
                key={`alarm-${idx}`}
                name={alarm.appliedUserName}
                handleConfirm={handleConfirm}
                keyNum={idx}
              />
            ) : alarm.type === 'reject' ? (
              <RejectEntity name={'test3'} />
            ) : (
              <></>
            ),
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
