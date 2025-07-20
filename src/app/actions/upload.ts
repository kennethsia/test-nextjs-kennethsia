'use server';

import { ApiResponse } from '@/models';
import { writeFile } from 'fs/promises';
import path from 'path';

/**
 * Handles file upload from a FormData object and saves it to the public directory.
 * @param formData - The FormData object containing the file to be uploaded
 * The FormData should have 'file' and 'fileName' fields.
 * @returns An ApiResponse containing {data, error, message}
 */
export async function uploadFile(
  formData: FormData
): Promise<ApiResponse<null>> {
  // Extract the file and fileName from the FormData
  const file: File | null = formData.get('file') as unknown as File;
  const fileName = formData.get('fileName') as string;

  if (!file) {
    return { error: 'No file provided' };
  }

  // writes the file to the public directory
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(`${process.cwd()}/public/${fileName}`);
    await writeFile(filePath, buffer);
    console.log(`file has been uploaded to ${filePath}`);
    return { message: 'File uploaded successfully', data: null };
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : 'File upload failed',
    };
  }
}
