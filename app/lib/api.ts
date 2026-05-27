export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type ApiOptions = RequestInit & {
  token?: string;
};

export async function apiFetch<T>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      if (contentType?.includes("application/json")) {
        const errorData = await response.json();
        message = errorData?.detail || errorData?.message || message;
      } else {
        message = await response.text();
      }
    } catch {
      // keep fallback message
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null as T;
  }

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text() as T;
}

export function buildEticketUrl(token: string) {
  return `/eticket/${token}`;
}

export function buildEticketPdfUrl(token: string) {
  return `${API_BASE_URL}/api/etickets/${token}/pdf`;
}

export function buildQcPdfUrl(token: string) {
  return `${API_BASE_URL}/api/etickets/${token}/qc-pdf`;
}

export function buildCompanyDashboardUrl(companySlug: string) {
  return `/dashboard?company=${companySlug}`;
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}