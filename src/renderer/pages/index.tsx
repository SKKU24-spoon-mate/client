import React, { useMemo } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { themeSelector } from '@theme/themeSelector';

import ChatPage from './Chat/chat';
import ChatListPage from './Chat/chatlist';
import { HomePage } from './Login_page';
import { ProfilePage } from './Profile_page';
import MyProfile from './Profile_page/myprofile';
import UserProfile from './Profile_page/user_profile';
import { ProtectedRoute } from './ProtectedRouter';
import { RegisterPage } from './RegisterPage';
import { AlarmPage } from './RegisterPage/Alarm';

const AppRenderer: React.FC = () => {
  const themeMode = useMemo(() => createTheme(themeSelector('light')), []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
        <Router>
          <AppRoute />
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export const AppRoute: React.FC = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route index path="/spoon-mate" element={<RegisterPage />} />
          <Route path="/alarms" element={<AlarmPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route index path="/chatlist" element={<ChatListPage />} />
          <Route index path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<Navigate to={'/spoon-mate'} />} />
      </Routes>
    </React.Fragment>
  );
};

export default AppRenderer;
