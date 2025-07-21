describe('fetchFromJsonServer', () => {
  const OLD_ENV = process.env;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      NEXT_PUBLIC_JSON_SERVER_URL: 'http://localhost:3000',
    };
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockResponse = { foo: 'bar' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const { default: fetchFromJsonServer } = await import('../../lib/client');
    const result = await fetchFromJsonServer('test-endpoint');
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/test-endpoint',
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      })
    );
    expect(result).toEqual({ data: mockResponse, ok: true, status: 200 });
  });

  it('should handle fetch errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    const { default: fetchFromJsonServer } = await import('../../lib/client');
    const result = await fetchFromJsonServer('test-endpoint');
    expect(result).toEqual({
      data: null,
      error: 'Internal server error',
      ok: false,
      status: 500,
    });
  });
});
