import React from 'react';

import { useRecoilValue } from 'recoil';

import { Navigate, Outlet } from 'react-router-dom';

import { userStateAtom } from '@states/users';

export const ProtectedRoute: React.FC = () => {
  const userState = useRecoilValue(userStateAtom);
  const accessToken = userState.token;

  if (accessToken == '') {
    return <Navigate to={`/login`} />;
  }

  return <Outlet />;
};
