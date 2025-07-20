import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

type Props = {
  error: Error;
};

/**
 * ErrorComponent: Common error component to display error messages in the application.
 * @param error - An object containing the error information
 */
export default function ErrorComponent({ error }: Props) {
  return (
    <Stack sx={{ width: '100%', p: 2 }}>
      <Alert severity="error" variant="filled">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    </Stack>
  );
}
