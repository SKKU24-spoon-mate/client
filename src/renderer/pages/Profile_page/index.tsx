import React, { useMemo, useState } from 'react';

import { Box, Button } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { HeaderM } from '@containers';

import MyProfile from './myprofile';
import OtherProfile from './user_profile';
import UserProfile from './user_profile';

export const ProfilePage: React.FC = () => {
  const [opeMyProfileModal, setOpenMyProfileModal] = useState(false);

  const handleOpenMyProfileModal = () => {
    setOpenMyProfileModal(true);
  };

  const handleCloseMyProfileModal = () => {
    setOpenMyProfileModal(false);
  };

  // const MobileUI = useMemo(
  //   () => (

  //         /* <Route
  //           index
  //           element={
  //             <MyProfile
  //               user={{
  //                 name: 'my profile test name',
  //                 matchCount: 5,
  //                 averageSpoonRating: 4.7,
  //                 statusMessage: '마이 상태메세지 테스트',
  //                 favoriteFood: '마이 음식 테스트',
  //                 age: 20,
  //                 comments: [
  //                   { id: 1, text: '마이 테스트1' },
  //                   { id: 2, text: '테스트2' },
  //                   { id: 3, text: '테스트3' },
  //                   { id: 4, text: '테스트4' },
  //                   { id: 5, text: '테스트5' },
  //                   { id: 6, text: '테스트6' },
  //                   { id: 7, text: '테스트7' },
  //                 ],
  //               }}
  //             />
  //           }
  //         /> */
  //         // <Route
  //         //   index
  //         //   element={
  //         //     <UserProfile
  //             // user={{
  //             //   name: 'test name',
  //             //   matchCount: 10,
  //             //   averageSpoonRating: 3.2,
  //             //   statusMessage: '상태메세지 테스트',
  //             //   favoriteFood: '음식 테스트',
  //             //   age: 21,
  //             //   comments: [
  //             //     { id: 1, text: '테스트1' },
  //             //     { id: 2, text: '테스트2' },
  //             //     { id: 3, text: '테스트3' },
  //             //     { id: 4, text: '테스트4' },
  //             //     { id: 5, text: '테스트5' },
  //             //     { id: 6, text: '테스트6' },
  //             //     { id: 7, text: '테스트7' },
  //             //   ],
  //             // }}
  //         //     />
  //         //   }
  //         // />

  //     </React.Fragment>
  //   ),
  //   [],
  // );

  return <React.Fragment>{}</React.Fragment>;
};
