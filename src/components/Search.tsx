'use client';

import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

/**
 * Search: Text input field to control 'q' query parameter for searching recipes.
 */
export default function Search() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const router = useRouter();

  const debouncedUpdateURL = useCallback(
    debounce((term: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set('q', term);
      } else {
        params.delete('q');
      }
      router.push(`?${params.toString()}`);
    }, 100),
    [router, searchParams]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedUpdateURL(value);
  };

  if (pathname !== '/') {
    return null;
  }

  return (
    <Paper>
      <TextField
        id="search"
        placeholder="Search here..."
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
    </Paper>
  );

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search recipes..."
    />
  );
}
