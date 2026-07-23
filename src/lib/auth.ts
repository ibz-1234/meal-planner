// Lightweight browser-only account storage. This is a client-side demo of the
// account flow — accounts live in localStorage on the user's device.

export interface User {
  name: string;
  email: string;
}

const USERS_KEY = "mmp-users";
const SESSION_KEY = "mmp-session";

interface StoredUser extends User {
  password: string;
}

function loadUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as StoredUser[];
  } catch {
    return [];
  }
}

export function signUp(
  name: string,
  email: string,
  password: string
): { ok: true; user: User } | { ok: false; error: string } {
  const users = loadUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "An account with this email already exists. Try logging in." };
  }
  const user: StoredUser = { name, email, password };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email }));
  return { ok: true, user: { name, email } };
}

export function logIn(
  email: string,
  password: string
): { ok: true; user: User } | { ok: false; error: string } {
  const users = loadUsers();
  const match = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!match) return { ok: false, error: "Wrong email or password." };
  const user = { name: match.name, email: match.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { ok: true, user };
}

export function logOut(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function currentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}
