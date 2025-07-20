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
