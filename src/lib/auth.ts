// Lightweight browser-only account storage. This is a client-side demo of the
// account flow — accounts live in localStorage on the user's device.

export interface User {
  name: string;
  email: string;
  role: "admin" | "member";
  createdAt: string;
}

const USERS_KEY = "mmp-users";
const SESSION_KEY = "mmp-session";

// Accounts created with these names or emails get admin powers automatically.
const ADMIN_NAMES = ["ibz"];
const ADMIN_EMAILS = ["ibrahimg2023@icloud.com"];

interface StoredUser extends User {
  password: string;
}

export function isAdminCredentials(name: string, email: string): boolean {
  return (
    ADMIN_NAMES.includes(name.trim().toLowerCase()) ||
    ADMIN_EMAILS.includes(email.trim().toLowerCase())
  );
}

function loadUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as StoredUser[];
  } catch {
    return [];
  }
}

function toUser(u: StoredUser): User {
  return {
    name: u.name,
    email: u.email,
    role: u.role ?? (isAdminCredentials(u.name, u.email) ? "admin" : "member"),
    createdAt: u.createdAt ?? new Date().toISOString(),
  };
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
  const user: StoredUser = {
    name,
    email,
    password,
    role: isAdminCredentials(name, email) ? "admin" : "member",
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, JSON.stringify(toUser(user)));
  return { ok: true, user: toUser(user) };
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
  const user = toUser(match);
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

export function isAdmin(): boolean {
  return currentUser()?.role === "admin";
}

export function listUsers(): User[] {
  if (typeof window === "undefined") return [];
  return loadUsers().map(toUser);
}

export function usersCreatedToday(): number {
  const today = new Date().toDateString();
  return listUsers().filter((u) => new Date(u.createdAt).toDateString() === today).length;
}
