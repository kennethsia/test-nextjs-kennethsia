'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#435490',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter)',
  },
});

export default theme;
