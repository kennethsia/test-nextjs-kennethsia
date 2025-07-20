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
 * OrderByAscDesc:
 * Select input to control '_order' query parameter for sorting recipes.
 */
export default function OrderByAscDesc() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(searchParams.get('_order') || '');

  const handleSort = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setOrder(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('_order', value);
    } else {
      params.delete('_order');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Stack gap={2} flexGrow={1} sx={{ minWidth: 120 }}>
      <Typography variant="body1">Order by ASC/DESC</Typography>
      <Paper>
        <FormControl fullWidth>
          <InputLabel id="sort-by-title-label">Select</InputLabel>
          <Select
            labelId="sort-by-title-label"
            id="sort-by-title"
            value={order}
            label="Select"
            onChange={handleSort}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="asc">ASC</MenuItem>
            <MenuItem value="desc">DESC</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Stack>
  );
}
