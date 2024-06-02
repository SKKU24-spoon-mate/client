import React, { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Typography, Avatar, IconButton, Button, SvgIcon } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { ReactComponent as UserDefaultIcon } from '@assets/svg/UserDefault.svg';
import { Footer } from '@containers';
import { baseUrl } from '@interfaces';
import { userStateAtom } from '@states';
import LogoImage from 'src/assets/png/Logo.png';
import spoonIcon from 'src/assets/svg/Spoon.svg';

import EditProfile from './edit_profile';
import {
  ReviewBox,
  CommentBox,
  ProfileContainer,
  InfoBox,
  ScrollableCommentBox,
  CircleBox,
  SquareBox,
  MyCommentBox,
} from './styled';

interface Review {
  message: string;
  rating: number;
}

interface UserProfileData {
  status_message: string;
  age: number;
  nickname: string;
  profile_image: string;
  favorite_food: string;
  mbti: string;
  average_spoons: number;
  total_mates: number;
  reviews: Review[];
}
const fetchMyProfile = async (userId: string) => {
  try {
    const response = await axios.get(baseUrl + `/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const updateProfile = async (userId: string, updatedData: Partial<UserProfileData>) => {
  try {
    const response = await axios.put(baseUrl + `/profile/edit`, {
      userId,
      ...updatedData,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const MyProfile: React.FC = () => {
  const userState = useRecoilValue(userStateAtom);
  const location = useLocation();
  const userId = location.state.userId;

  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchMyProfile(userState.userId);
        setProfileData(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfile();
  }, [userId]);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSaveProfileData = async (newProfileData: {
    favorite_food: string;
    age: number;
    status_message: string;
  }) => {
    try {
      const updatedProfile = await updateProfile(userId, newProfileData);

      setProfileData((prevState) => ({
        ...prevState!,
        favorite_food: newProfileData.favorite_food,
        age: newProfileData.age,
        status_message: newProfileData.status_message,
      }));

      setOpenEditModal(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!profileData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ProfileContainer>
      <Avatar src={LogoImage} sx={{ width: '30%', height: '30%', marginBottom: 2, mt: 15 }} />
      <Typography variant="h5" sx={{ mb: 10, fontSize: '3rem' }}>
        나의 프로필
      </Typography>

      <ReviewBox>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Box
            sx={{
              textAlign: 'center',
              mt: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: 10,
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '2rem' }}>
              매칭 횟수 x{profileData.total_mates}
            </Typography>
            <CircleBox sx={{ width: '10vw', height: '5vh' }}>
              <Avatar src={spoonIcon} sx={{ width: 60, height: 60 }} />
            </CircleBox>
          </Box>
          <Box
            sx={{
              textAlign: 'center',
              mt: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginrig: 10,
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '2rem' }}>
              평균 숟가락 {profileData.average_spoons.toFixed(1)}
            </Typography>
            <SquareBox sx={{ width: 'fit-content', height: '5vh', padding: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                {[...Array(Math.round(profileData.average_spoons))].map((_, index) => (
                  <Avatar key={index} src={spoonIcon} sx={{ width: 60, height: 60 }} />
                ))}
              </Box>
            </SquareBox>
          </Box>
        </Box>
      </ReviewBox>

      <Box sx={{ width: '100%', mt: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box></Box>
          <Typography variant="body1" sx={{ mb: 1, fontSize: '2rem', textAlign: 'center', marginLeft: 12 }}>
            나의 한마디
          </Typography>
          <IconButton onClick={handleOpenEditModal} sx={{ display: 'flex', justifyContent: 'right' }}>
            <SvgIcon component={MoreVertIcon} sx={{ fontSize: '70px' }} />
          </IconButton>
        </Box>
        <EditProfile
          open={openEditModal}
          onClose={handleCloseEditModal}
          onSave={handleSaveProfileData}
          profileData={{
            favorite_food: profileData.favorite_food,
            age: profileData.age,
            status_message: profileData.status_message,
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <MyCommentBox>
            <Typography sx={{ fontSize: '2rem', width: '70%' }}>{profileData.status_message}</Typography>
          </MyCommentBox>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <InfoBox>
            <Typography sx={{ mt: 1, fontSize: '1.5rem' }}>좋아하는 음식 : {profileData.favorite_food}</Typography>
          </InfoBox>
          <InfoBox>
            <Typography sx={{ mt: 1, fontSize: '1.5rem' }}>나이 : {profileData.age}</Typography>
          </InfoBox>
        </Box>
      </Box>

      <Box sx={{ width: '100%', height: '100%', mt: 10 }}>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '2rem' }}>
          밥 친구들의 한마디
        </Typography>
        <ScrollableCommentBox>
          {profileData.reviews.map((review, index) => (
            <CommentBox key={index}>
              <UserDefaultIcon width="10%" />
              <Typography sx={{ fontSize: '1.5rem' }}>{review.message}</Typography>
            </CommentBox>
          ))}
        </ScrollableCommentBox>
      </Box>

      <Footer />
    </ProfileContainer>
  );
};

export default MyProfile;
