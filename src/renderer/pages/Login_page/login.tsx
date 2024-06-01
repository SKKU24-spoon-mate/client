import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { Box, Button, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { UserLogin, UserLoginRes, baseUrl } from '@interfaces';
import { userStateAtom } from '@states';

interface LoginProps {
  open: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ open, onClose }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const setUserState = useSetRecoilState(userStateAtom);

  const navigate = useNavigate();
  //매칭 페이지로 navigate 하는 코드 짜야함
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const sendData: UserLogin = {
        id: id,
        pw: pw,
      };
      await axios.post(baseUrl + '/login', sendData).then((res) => {
        const data: UserLoginRes = res.data;
        setUserState({
          token: data.token,
          userId: data.userId,
          userAge: data.userAge,
          userName: data.userNickname,
          userSex: data.userSex,
        });
      });

      navigate(`/spoon-mate`);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
    >
      <Fade in={open}>
        <Box
          sx={{
            backgroundColor: 'white',
            boxShadow: 24,
            padding: 4,
            width: '80vw',
            height: '40vh',
            margin: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto',
            borderRadius: 4,
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <Typography
            variant="h5"
            id="login-modal-title"
            sx={{
              fontSize: '4rem',
              color: '#477A2F',
              display: 'flex',
              mb: 7,
            }}
          >
            로그인
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography variant="body1" sx={{ fontSize: '2rem', mb: 0.5 }}>
              아이디를 입력해주세요
            </Typography>
            <TextField
              margin="dense"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={id}
              onChange={(e) => setId(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  height: '5vh',
                },
                padding: 0,
                width: '100%',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  padding: '1%',
                  fontWeight: 700,
                  fontSize: '1.8rem',
                  textAlign: 'justify',
                },
              }}
            />
            <Typography variant="body1" sx={{ fontSize: '2rem', mt: 3, mb: 0.5 }}>
              비밀번호를 입력해주세요
            </Typography>
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  height: '5vh',
                },
                padding: 0,
                width: '100%',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  padding: '1%',
                  fontWeight: 700,
                  fontSize: '1.8rem',
                  textAlign: 'justify',
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ width: '100%', height: '25%', mt: 5, mb: 5, backgroundColor: '#477A2F' }}
            >
              <Typography variant="body1" sx={{ fontSize: '1.5rem', mt: 2, mb: 0.5 }}>
                로그인
              </Typography>
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Login;
