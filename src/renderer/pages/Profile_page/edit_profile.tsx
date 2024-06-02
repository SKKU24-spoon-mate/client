import React, { useState } from 'react';

import { Box, Button, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
import axios from 'axios';

import { InfoBox } from './styled';

interface EditProps {
  open: boolean;
  onClose: () => void;
  onSave: (profileData: { favoriteFood: string; age: number; statusMessage: string }) => void;
  profileData: { favoriteFood: string; age: number; statusMessage: string };
}

const EditProfile: React.FC<EditProps> = ({ open, onClose, onSave, profileData }) => {
  const [favoriteFood, setFavoriteFood] = useState(profileData.favoriteFood);
  const [age, setAge] = useState(profileData.age);
  const [statusMessage, setStatusMessage] = useState(profileData.statusMessage);

  const handleSave = () => {
    onSave({ favoriteFood, age, statusMessage });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
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
            backgroundColor: '#EBEEE1',
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
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              mb: 7,
            }}
          >
            정보 수정하기
          </Typography>
          {/* <InfoBox>
            <Typography sx={{ fontSize: '1.5rem', mt: 1 }}>좋아하는 음식 : 짬뽕, 파스타</Typography>
          </InfoBox>
          <InfoBox sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: '1.5rem', mt: 1 }}>나이 : 24</Typography>
          </InfoBox> */}
          <TextField
            label="좋아하는 음식"
            variant="outlined"
            fullWidth
            value={favoriteFood}
            onChange={(e) => setFavoriteFood(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="나이"
            variant="outlined"
            fullWidth
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            sx={{ mb: 2 }}
          />
          <Typography
            variant="body1"
            sx={{ mt: 5, mb: 1, fontSize: '2rem', display: 'flex', justifyContent: 'center' }}
          >
            나의 한마디
          </Typography>
          {/* <Box sx={{ backgroundColor: '#D1DBC9', width: '100%', height: '20%' }}>
            <Typography sx={{ fontSize: '2rem', textAlign: 'center', mt: 5 }}>배고프다</Typography>
          </Box> */}
          <TextField
            label="나의 한마디"
            variant="outlined"
            fullWidth
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ backgroundColor: '#477A2F', '&:hover': { backgroundColor: '#477A2F' } }}
          >
            저장
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditProfile;
