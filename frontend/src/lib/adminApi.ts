export type AdminInfo = {
  _id: string;
  username: string;
  token: string;
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string;
};

export const apiRequest = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data as T;
};

export const loginAdmin = (username: string, password: string) =>
  apiRequest<AdminInfo>("/api/admin/login", {
    method: "POST",
    body: { username, password },
  });
