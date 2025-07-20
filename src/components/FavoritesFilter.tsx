'use client';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

/**
 * FavoritesFilter:
 * Radio button group to control 'favorite' query parameter for filtering recipes.
 */
export default function FavoritesFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [favorite, setFavorite] = useState(searchParams.get('favorite') || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFavorite(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === '') {
      params.delete('favorite');
    } else {
      params.set('favorite', value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Stack gap={2} flexGrow={1} sx={{ minWidth: 120 }}>
      <Typography variant="body1">Filter</Typography>
      <Paper sx={{ padding: 2 }}>
        <FormControl>
          <FormLabel id="favorites-radio-group-label">Favorites</FormLabel>
          <RadioGroup
            aria-labelledby="favorites-radio-group-label"
            defaultValue={favorite}
            name="radio-buttons-group"
            onChange={handleChange}
          >
            <FormControlLabel value="" control={<Radio />} label="All" />
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Paper>
    </Stack>
  );
}
