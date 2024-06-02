import React, { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { Box, Typography, Avatar, IconButton, Button, bottomNavigationActionClasses } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as UserDefaultIcon } from '@assets/svg/UserDefault.svg';
import { Footer } from '@containers';
import { baseUrl } from '@interfaces';
import { userStateAtom } from '@states';
import spoonIcon from 'src/assets/svg/Spoon.svg';

import ReviewProfile from './review';
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
  average_spoons: number;
  total_mates: number;
  reviews: Review[];
}

const fetchUserProfile = async (userId: string) => {
  try {
    const response = await axios.get(baseUrl + `/profile/${userId}`);
    // const response = await axios.get(baseUrl + `/profile/665c943fbc4466228cebf936`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const submitReview = async (userId: string, review: Review) => {
  try {
    const response = await axios.post(baseUrl + `/review/submit`, { userId, ...review });
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

const UserProfile: React.FC = () => {
  // const userState = useRecoilValue(userStateAtom);
  const location = useLocation();
  const { userId } = location.state as { userId: string };
  // const userId = '665c943fbc4466228cebf936';
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await fetchUserProfile(userId!);
        setProfileData(data);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    };

    loadUserProfile();
  }, [userId]);

  const handleOpenReviewModal = () => {
    setOpenReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setOpenReviewModal(false);
  };

  const handleReviewSubmit = async (review: Review) => {
    try {
      const response = await submitReview(userId, review);
      if (profileData) {
        setProfileData((prevState) => {
          if (!prevState) return null;
          return {
            ...prevState,
            reviews: [...prevState.reviews, review],
            average_spoons: response.average_spoons,
          };
        });
        setReviewSubmitted(true);
        setOpenReviewModal(false); // Close the review modal
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const handleChatClick = () => {
    navigate('/chat', { state: { to: userId } });
  };

  if (!profileData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ProfileContainer>
      <Box sx={{ mt: 10 }}>
        <UserDefaultIcon width="50%"></UserDefaultIcon>
      </Box>
      <Typography variant="h5" sx={{ mt: 5, mb: 5, fontSize: '2rem' }}>
        {profileData.nickname}의 프로필
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 5 }}>
        <Button
          onClick={handleOpenReviewModal}
          variant="contained"
          sx={{
            backgroundColor: '#477A2F',
            '&:hover': { backgroundColor: '#477A2F' },
            width: '20vw',
            height: '30%',
            fontSize: '1.5rem',
          }}
          disabled={reviewSubmitted}
        >
          숟가락 주기
        </Button>
        <ReviewProfile
          open={openReviewModal}
          onClose={handleCloseReviewModal}
          onReviewSubmit={handleReviewSubmit}
          userId={userId}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#D9D9D9',
            '&:hover': { backgroundColor: '#D9D9D9' },
            color: '#000000',
            width: '20vw',
            height: '30%',
            fontSize: '1.5rem',
          }}
          onClick={handleChatClick}
        >
          채팅하기
        </Button>
      </Box>

      <ReviewBox>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Box
            sx={{
              textAlign: 'center',
              mt: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: 5,
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '2rem' }}>
              매칭 횟수 x{profileData.total_mates}
            </Typography>
            <CircleBox sx={{ width: '10vw', height: '5vh' }}>
              <Avatar src={spoonIcon} sx={{ width: 60, height: 60 }} />
            </CircleBox>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 5 }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1, fontSize: '2rem', textAlign: 'center' }}>
            나의 한마디
          </Typography>
        </Box>

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

export default UserProfile;
