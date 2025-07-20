import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import React from 'react';

type Props = {
  image: React.ReactNode;
  children: React.ReactNode;
};

export default function Form({ image, children }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid component="nav" size={4}>
        <Stack gap={2}>{image}</Stack>
      </Grid>
      <Grid component="section" size={8}>
        {children}
      </Grid>
    </Grid>
  );
}
