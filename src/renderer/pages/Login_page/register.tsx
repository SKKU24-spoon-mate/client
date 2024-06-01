import React, { useState } from 'react';

import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { UserRegister, Sex, baseUrl } from '@interfaces';

interface RegisterProps {
  open: boolean;
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ open, onClose }) => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<number | ''>('');
  const [error, setError] = useState<string>('');

  const ageOptions = Array.from({ length: 100 - 18 + 1 }, (_, i) => 18 + i);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const sendData: UserRegister = {
        id: id,
        pw: pw,
        nickname: name,
        sex: gender as Sex,
        age: age as number,
      };

      await axios.post(baseUrl + '/register', sendData).then((res) => {
        console.log('회원가입 성공!');
        console.log(res.data);

        // 값 초기화
        setId('');
        setPw('');
        setName('');
        setGender('');
        setAge('');
      });
      // Handle successful registration (e.g., redirect to login or home page)
    } catch (err: any) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backgroundColor: 'rgba(0, 0, 0, 0.85)' },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            backgroundColor: 'white',
            boxShadow: 24,
            padding: 4,
            width: '80vw',
            height: '70vh',
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
            id="register-modal-title"
            sx={{
              fontSize: '4rem',
              color: '#477A2F',
              display: 'flex',
              mb: 2,
            }}
          >
            회원가입
          </Typography>
          <form onSubmit={handleSubmit}>
            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                {error}
              </Typography>
            )}
            <Typography variant="body1" sx={{ fontSize: '2rem', mb: 0.5 }}>
              *아이디
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
            <Typography variant="body1" sx={{ fontSize: '2rem', mt: 2, mb: 0.5 }}>
              *비밀번호
            </Typography>
            <TextField
              margin="normal"
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
            <Typography variant="body1" sx={{ fontSize: '2rem', mt: 2, mb: 0.5 }}>
              *이름
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <Typography variant="body1" sx={{ fontSize: '2rem', mt: 2, mb: 0.5 }}>
              *성별
            </Typography>
            <FormControl fullWidth required margin="normal">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
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
              >
                <MenuItem value="Male">남성</MenuItem>
                <MenuItem value="Female">여성</MenuItem>
                <MenuItem value="Other">기타</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body1" sx={{ fontSize: '2rem', mt: 2, mb: 0.5 }}>
              *나이(만)
            </Typography>
            <FormControl fullWidth required margin="normal">
              <InputLabel id="age-label">Age</InputLabel>
              <Select
                labelId="age-label"
                id="age"
                value={age}
                label="Age"
                onChange={(e) => setAge(Number(e.target.value) || '')}
                sx={{
                  '& .MuiInputBase-root': {
                    height: '5vh',
                  },
                }}
              >
                {ageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ width: '100%', height: '10%', mt: 7, backgroundColor: '#477A2F' }}
            >
              <Typography variant="body1" sx={{ fontSize: '2rem', mt: 2, mb: 0.5 }}>
                회원가입
              </Typography>
            </Button>
          </form>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ width: '100%', height: '7%', mt: 7 }}
            onClick={onClose}
          >
            <Typography variant="body1" sx={{ fontSize: '2rem', mt: 2, mb: 0.5 }}>
              취소
            </Typography>
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Register;
