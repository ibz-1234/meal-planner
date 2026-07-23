const FAVOURITES_KEY = "mmp-favourites";

export function getFavourites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAVOURITES_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

export function isFavourite(name: string): boolean {
  return getFavourites().includes(name);
}

export function toggleFavourite(name: string): boolean {
  const favourites = getFavourites();
  const next = favourites.includes(name)
    ? favourites.filter((f) => f !== name)
    : [...favourites, name];
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(next));
  return next.includes(name);
}
