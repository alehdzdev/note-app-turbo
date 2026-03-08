const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function register(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data as { access: string; refresh: string };
}

export interface Note {
  id: number;
  title: string;
  body: string;
  color: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export async function createNote(
  token: string,
  data: { title: string; body: string; category: string }
): Promise<Note> {
  const response = await fetch(`${API_BASE_URL}/api/v1/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result as Note;
}

export async function getNote(token: string, id: number): Promise<Note> {
  const response = await fetch(`${API_BASE_URL}/api/v1/notes/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data as Note;
}

export async function updateNote(
  token: string,
  id: number,
  data: Partial<{ title: string; body: string; category: string }>
): Promise<Note> {
  const response = await fetch(`${API_BASE_URL}/api/v1/notes/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result as Note;
}

export async function getNotes(token: string, category?: string): Promise<Note[]> {
  const url = new URL(`${API_BASE_URL}/api/v1/notes/`);
  if (category) url.searchParams.set("category", category);

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data as Note[];
}
