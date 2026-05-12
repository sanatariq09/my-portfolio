/** High-res favicons for timeline company / school marks */
export function faviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
}

/** Two-letter mark from org name when no logo loads */
export function orgInitials(org: string): string {
  const parts = org.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0][0] ?? '';
    const b = parts[1][0] ?? '';
    return (a + b).toUpperCase();
  }
  const w = parts[0] ?? '?';
  return w.slice(0, 2).toUpperCase();
}
