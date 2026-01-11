const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("Missing VITE_API_BASE_URL");
}

export async function getJson<T>(
  path: string,
  signal?: AbortSignal
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`Request failed: GET ${path} (${response.status})`);
  }

  return response.json();
}