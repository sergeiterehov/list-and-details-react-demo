export function getFilmIdByUrl(url: string): string {
  return url.split("/").filter(Boolean).pop() || "";
}
