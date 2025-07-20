'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

/**
 * SortBy:
 * Select input to control '_sort' query parameter for sorting recipes.
 */
export default function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('_sort') || '');

  const handleSort = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setSort(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('_sort', value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Stack gap={2} flexGrow={1} sx={{ minWidth: 120 }}>
      <Typography variant="body1">Sort by Title</Typography>
      <Paper>
        <FormControl fullWidth>
          <InputLabel id="sort-by-title-label">Select</InputLabel>
          <Select
            labelId="sort-by-title-label"
            id="sort-by-title"
            value={sort}
            label="Select"
            onChange={handleSort}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="title">TITLE</MenuItem>
            <MenuItem value="name">NAME</MenuItem>
            <MenuItem value="createdDate">DATE</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Stack>
  );
}
