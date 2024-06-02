import React, { useState } from 'react';

import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import Logo from 'src/assets/png/Logo.png';

import Login from './login';
import Register from './register';
import { MainBox } from './styled';

export const HomePage: React.FC = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleOpenRegisterModal = () => {
    setOpenRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };

  return (
    <React.Fragment>
      <MainBox>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mb: 30,
            fontSize: '7rem',
            color: '#477A2F',
            display: 'flex',
          }}
        >
          스푼메이트
        </Typography>
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: '30%',
            height: '15%',
            display: 'flex',
          }}
        />
        <Box sx={{ mt: 10, width: '100%' }}>
          <Button
            onClick={handleOpenLoginModal}
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              backgroundColor: '#477A2F',
              '&:hover': { backgroundColor: '#477A2F' },
              width: '70%',
              height: '70%',
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '3rem' }}>
              로그인
            </Typography>
          </Button>
          <Button
            onClick={handleOpenRegisterModal}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#477A2F',
              '&:hover': { backgroundColor: '#477A2F' },
              width: '70%',
              height: '70%',
              mt: 5,
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '3rem' }}>
              회원가입
            </Typography>
          </Button>
        </Box>
        <Login open={openLoginModal} onClose={handleCloseLoginModal} />
        <Register open={openRegisterModal} onClose={handleCloseRegisterModal} />
      </MainBox>
    </React.Fragment>
  );
};
