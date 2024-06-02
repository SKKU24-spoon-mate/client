import React, { useMemo } from 'react';

import { Box } from '@mui/material';

import { HeaderM } from '@containers';

export const Home: React.FC = () => {
  const MobileUI = useMemo(
    () => (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          padding: '10% 0 5% 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontWeight: 100,
        }}
      >
        Hello!
        <HeaderM />
      </Box>
    ),
    [],
  );
  return <React.Fragment>{MobileUI}</React.Fragment>;
};
