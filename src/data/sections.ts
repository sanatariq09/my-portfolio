/** `id` on each portfolio `<section>` — URLs are `/` (home) or `/{id}` */
export const PORTFOLIO_SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'projects',
  'github',
  'services',
  'testimonials',
  'contact',
] as const;

export type PortfolioSectionId = (typeof PORTFOLIO_SECTION_IDS)[number];

export function isPortfolioSectionId(id: string): id is PortfolioSectionId {
  return (PORTFOLIO_SECTION_IDS as readonly string[]).includes(id);
}

export function pathForSection(sectionId: PortfolioSectionId): string {
  return sectionId === 'hero' ? '/' : `/${sectionId}`;
}
