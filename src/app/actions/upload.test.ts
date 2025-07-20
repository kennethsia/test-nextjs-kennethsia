import { uploadFile } from './upload';

jest.mock('fs/promises', () => ({
  writeFile: jest.fn(),
}));

import { writeFile } from 'fs/promises';

describe('uploadFile', () => {
  const mockWriteFile = writeFile as jest.MockedFunction<typeof writeFile>;
  const fileContent = 'hello world';
  const fileName = 'test.txt';
  let formData: FormData;
  let file: { arrayBuffer: jest.Mock };

  beforeEach(() => {
    file = {
      arrayBuffer: jest.fn().mockResolvedValue(Buffer.from(fileContent)),
    };
    formData = {
      get: jest.fn((key: string) => {
        if (key === 'file') return file;
        if (key === 'fileName') return fileName;
        return undefined;
      }),
    } as unknown as FormData;
    jest.clearAllMocks();
  });

  it('uploads a file successfully', async () => {
    mockWriteFile.mockResolvedValueOnce(undefined);
    const result = await uploadFile(formData);
    expect(result).toEqual({
      message: 'File uploaded successfully',
      data: null,
    });
    expect(mockWriteFile).toHaveBeenCalled();
  });

  it('returns error if no file is provided', async () => {
    const emptyForm = new FormData();
    const result = await uploadFile(emptyForm);
    expect(result).toEqual({ error: 'No file provided' });
  });

  it('returns error if writeFile throws', async () => {
    mockWriteFile.mockRejectedValueOnce(new Error('fail'));
    const result = await uploadFile(formData);
    expect(result).toEqual({ error: 'fail' });
  });
});
