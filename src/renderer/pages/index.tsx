import React, { useMemo } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { themeSelector } from '@theme/themeSelector';

import ChatPage from './Chat/chat';
import ChatListPage from './Chat/chatlist';
import { Home } from './Home';

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
        <Route index path="/spoon-mate" element={<ChatPage />} />
        <Route path="*" element={<Navigate to={'/spoon-mate'} />} />
      </Routes>
    </React.Fragment>
  );
};

export default AppRenderer;
