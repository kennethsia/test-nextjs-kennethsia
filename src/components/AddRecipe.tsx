import Add from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';

/**
 * AddRecipe: Link component to navigate to the recipe creation page.
 */
export default function AddRecipe() {
  return (
    <Link href="/recipes/create">
      <IconButton
        sx={{
          bgcolor: 'primary.main',
          position: 'absolute',
          top: 10,
          right: 10,
          '&:hover': { bgcolor: 'primary.dark' },
          zIndex: 1,
        }}
      >
        <Add sx={{ color: 'white' }} />
      </IconButton>
    </Link>
  );
}
