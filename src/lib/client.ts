const JSON_SERVER_URL = process.env.NEXT_PUBLIC_JSON_SERVER_URL;

export default async function fetchFromJsonServer(
  query: string,
  options?: RequestInit
) {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/${query}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      ...options,
    });
    const data = await response.json();
    return { data, ok: response.ok, status: response.status };
  } catch {
    return {
      data: null,
      error: 'Internal server error',
      ok: false,
      status: 500,
    };
  }
}
