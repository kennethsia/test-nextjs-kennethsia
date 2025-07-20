'use client';

import ErrorComponent from '@/components/ErrorComponent';

// Error boundaries must be Client Components

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <ErrorComponent error={error} />;
}
