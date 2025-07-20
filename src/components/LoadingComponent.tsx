// create a loading component that can be used in your application
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * LoadingComponent: Common loading component to display
 * a loading indicator in the application.
 */
export default function LoadingComponent() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
