export function truncate(title: string): string {
  if (title.length > 24) {
    return title.substring(0, 21) + "...";
  } else {
    return title;
  }
}
