'use client';

import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useRef, useState } from 'react';

type Props = {
  fileName: string | null;
  onImageChange: (file: File | null) => void;
};

/**
 * ImageViewer: Client Component to display and change an image.
 * @param fileName - The name of the file to display, using public folder as source
 * @param onImageChange - Callback function to handle image changes
 */
export default function ImageViewer({ fileName, onImageChange }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    fileName ? `/${fileName}` : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageChange(file);
    // Clean up the object URL when the component unmounts or file changes
    return () => URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: 300,
        cursor: 'pointer',
        flexShrink: 0,
      }}
      onClick={() => fileInputRef.current?.click()}
    >
      <Tooltip title="Click to upload an image" placement="top" color="success">
        <Image
          src={previewUrl ?? '/placeholder.jpg'}
          alt="Preview"
          fill
          style={{ objectFit: 'cover', borderRadius: '15px' }}
          onError={
            () => setPreviewUrl('/placeholder.jpg') // Fallback to placeholder if image fails to load
          }
        />
      </Tooltip>
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        accept="image/jpg,image/jpeg,image"
        required
        data-testid="file-input"
        onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
        hidden
      />
    </Box>
  );
}
