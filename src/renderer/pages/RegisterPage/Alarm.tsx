import React, { useCallback, useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { ArrowBackIos } from '@mui/icons-material';
import { Box, Button, Typography, SvgIcon } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as UserIcon } from '@assets/svg/UserDefault.svg';
import { AlarmComponents, ConfirmRes, baseUrl } from '@interfaces';
import { userStateAtom } from '@states';

import { AlarmConfirmButton, AlarmEntityWrapper, AlarmNotConfirmButton, AlarmTitleTypo } from './styled';

const AlarmEntity = (props: { name: string; handleConfirm: (isConfirm: boolean) => Promise<void> }) => (
  <AlarmEntityWrapper>
    <UserIcon width={'10%'} />
    <Typography sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center', width: '60%' }}>
      {props.name}님이 학우님에게 밥약을 신청했습니다.
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AlarmConfirmButton onClick={() => props.handleConfirm(true)}>수락</AlarmConfirmButton>
      <AlarmNotConfirmButton onClick={() => props.handleConfirm(false)}>거절</AlarmNotConfirmButton>
    </Box>
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
      setAlarms(processedData);
    });
  }, [userState.userId]);

  useEffect(() => {
    getAlarmsApi();
  }, []);

  const navigate = useNavigate();

  const handleConfirm = async (isConfirm: boolean) => {
    const data = {
      userId: 0,
      isConfirm: isConfirm ? true : false,
    };
    await axios.post(baseUrl, data);
  };
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <AlarmTitleTypo>
        <SvgIcon onClick={() => navigate(-1)} component={ArrowBackIos} sx={{ fontSize: '40px' }} />
        알림
        <Box></Box>
      </AlarmTitleTypo>
      <Box sx={{ width: '100%', borderBottom: '1px solid green' }}></Box>
      <Box sx={{ padding: '2%' }}>
        {alarms.map((alarm, idx) =>
          alarm.type === 'apply' ? (
            <AlarmEntity key={`alarm-${idx}`} name={alarm.appliedUserName} handleConfirm={handleConfirm} />
          ) : (
            <></>
          ),
        )}
      </Box>
    </Box>
  );
};
