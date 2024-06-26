import React, { useState } from 'react';

import { Box, Button, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
import axios from 'axios';

import { InfoBox } from './styled';

interface EditProps {
  open: boolean;
  onClose: () => void;
  onSave: (profileData: { favorite_food: string; age: number; status_message: string }) => void;
  profileData: { favorite_food: string; age: number; status_message: string };
}

const EditProfile: React.FC<EditProps> = ({ open, onClose, onSave, profileData }) => {
  const [favorite_food, setfavoriteFood] = useState(profileData.favorite_food);
  const [age, setAge] = useState(profileData.age);
  const [status_message, setstatusMessage] = useState(profileData.status_message);

  const handleSave = () => {
    onSave({ favorite_food, age, status_message });
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

          <TextField
            label="좋아하는 음식"
            variant="outlined"
            fullWidth
            value={favorite_food}
            onChange={(e) => setfavoriteFood(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiInputBase-root': {
                height: '5vh',
              },
            }}
            InputProps={{
              style: {
                fontSize: '1.5rem',
              },
            }}
          />
          <TextField
            label="나이"
            variant="outlined"
            fullWidth
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            sx={{
              mb: 2,
              '& .MuiInputBase-root': {
                height: '5vh',
              },
            }}
            InputProps={{
              style: {
                fontSize: '1.5rem',
              },
            }}
          />
          <Typography
            variant="body1"
            sx={{ mt: 5, mb: 1, fontSize: '2rem', display: 'flex', justifyContent: 'center' }}
          >
            나의 한마디
          </Typography>

          <TextField
            label="나의 한마디"
            variant="outlined"
            fullWidth
            value={status_message}
            onChange={(e) => setstatusMessage(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiInputBase-root': {
                height: '5vh',
              },
            }}
            InputProps={{
              style: {
                fontSize: '1.5rem',
              },
            }}
          />
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              width: '100%',
              height: '15%',
              mt: 5,
              backgroundColor: '#477A2F',
              '&:hover': { backgroundColor: '#477A2F' },
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '2rem', mt: 0.5, mb: 0.5 }}>
              저장
            </Typography>
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditProfile;
