import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React from 'react';

type Props = {
  filter: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Home Page Layout: A layout component for the home page that includes a filter section
 * and a main content area.
 * @param filter - A React node representing the filter section
 * @param children - A React node representing the main content area
 * @returns A Grid layout with a filter section and a main content area
 */
export default function Home({ filter, children }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid component="nav" size={4}>
        <Stack gap={2}>{filter}</Stack>
      </Grid>
      <Grid component="section" size={8} sx={{ height: 'calc(100vh - 150px)' }}>
        <Paper
          sx={{ position: 'relative', height: '100%', overflowY: 'hidden' }}
        >
          <Stack
            gap={2}
            sx={{
              p: 2,
              overflowY: 'auto',
              height: '100%',
              maxHeight: 'calc(100vh - 100px)',
            }}
          >
            {children}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
