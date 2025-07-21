/**
 * Builds a query string from the given search parameters.
 * @param searchParams - An object containing the search parameters
 * @returns A query string representing the search parameters
 */
export const buildQueryString = (searchParams: {
  [key: string]: string | string[] | undefined;
}): string => {
  if (!searchParams) return '';

  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    }
  });

  return params.toString();
};

/**
 * waits for a specified number of milliseconds.
 * @param ms - The number of milliseconds to wait
 * @returns A promise that resolves after the specified time
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const cleanFileName = (fileName: string): string => {
  return fileName.replace(/\s+/g, '-').toLowerCase();
};
