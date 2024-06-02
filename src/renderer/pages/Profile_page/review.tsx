import React, { useState } from 'react';

import { Box, Typography, Modal, Backdrop, Fade, IconButton, TextField, Button } from '@mui/material';
import axios from 'axios';

import { baseUrl } from '@interfaces';
import spoonIcon from 'src/assets/svg/Spoon.svg';

import { CircleBox } from './styled';

interface ReviewProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  onReviewSubmit: (review: { message: string; rating: number }) => void;
}

const ReviewProfile: React.FC<ReviewProps> = ({ open, onClose, userId, onReviewSubmit }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState('');

  const handleSubmit = async () => {
    const review = {
      message: reviewMessage,
      rating: selectedRating,
    };
    try {
      await axios.post(`/api/review/${userId}`, review); // Adjust the endpoint according to your API
      onReviewSubmit(review);
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
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
            height: '50vh',
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
              mb: 5,
              mt: 5,
            }}
          >
            숟가락 주기
          </Typography>

          <Typography
            variant="body1"
            sx={{ mt: 5, mb: 1, fontSize: '2rem', display: 'flex', justifyContent: 'center' }}
          >
            숟가락을 터치하세요
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4 }}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <IconButton key={rating} onClick={() => setSelectedRating(rating)}>
                <CircleBox>
                  <img
                    src={spoonIcon}
                    alt={`Spoon ${rating}`}
                    style={{ width: 40, height: 40, opacity: selectedRating >= rating ? 1 : 0.5 }}
                  />
                </CircleBox>
              </IconButton>
            ))}
          </Box>

          <Typography
            variant="body1"
            sx={{ mt: 5, mb: 1, fontSize: '2rem', display: 'flex', justifyContent: 'center' }}
          >
            후기를 작성해주세요
          </Typography>

          <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            sx={{ backgroundColor: '#D1DBC9', borderRadius: 1 }}
            InputProps={{
              style: {
                fontSize: '1.5rem',
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                mt: 5,
                width: '50%',
                height: '4vh',
                backgroundColor: '#477A2F',
                '&:hover': { backgroundColor: '#477A2F' },
              }}
            >
              <Typography sx={{ fontSize: '2rem' }}>제출</Typography>
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ReviewProfile;
