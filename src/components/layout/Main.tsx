import Box from '@mui/material/Box';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

/**
 * Main Layout: Layout component for the application main content area.
 */
export default function Main({ children }: Props) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 2,
        overflowY: 'hidden',
      }}
    >
      {children}
    </Box>
  );
}
