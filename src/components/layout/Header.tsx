import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Suspense } from 'react';

/**
 * Header Layout: Layout component for the application header that includes a search component.
 */
export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        p: 2,
        bgcolor: 'primary.main',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: '96px',
      }}
    >
      <Suspense
        fallback={<Skeleton variant="rectangular" width={200} height={40} />}
      >
        {'this is a placeholder for the search component'}
      </Suspense>
    </Box>
  );
}
