import { techStack } from '../data/timeline';

/** Extra slugs for skill labels that are not in the About tech wall list. */
const EXTRA_TECH_ICONS: Record<string, { slug: string; color: string }> = {
  Figma: { slug: 'figma', color: '#F24E1E' },
  'WebSockets': { slug: 'socketdotio', color: '#010101' },
  'CI/CD': { slug: 'githubactions', color: '#2088FF' },
  'React Native': { slug: 'react', color: '#61DAFB' },
  'PWA': { slug: 'pwa', color: '#5A0FC8' },
  'Capacitor': { slug: 'capacitor', color: '#119EFF' },
  'Design Systems': { slug: 'storybook', color: '#FF4785' },
  Prototyping: { slug: 'figma', color: '#F24E1E' },
  'A/B Testing': { slug: 'googleanalytics', color: '#E37400' },
  'REST APIs': { slug: 'swagger', color: '#85EA2D' },
  'Google Maps API': { slug: 'googlemaps', color: '#4285F4' },
  'E-Commerce': { slug: 'magento', color: '#EE672F' },
};

export const ICON_SOURCE_OVERRIDES: Record<string, string[]> = {
  magento: [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/magento/magento-original.svg',
  ],
  amazonaws: [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  ],
};

export function getTechIconSources(icon: string, color: string): string[] {
  const hex = color.replace('#', '');
  return [
    `https://cdn.simpleicons.org/${icon}/${hex}`,
    `https://cdn.simpleicons.org/${icon}`,
    ...(ICON_SOURCE_OVERRIDES[icon] ?? []),
  ];
}

export function resolveTechIcon(label: string): { slug: string; color: string } | undefined {
  const fromStack = techStack.find((t) => t.name === label);
  if (fromStack) return { slug: fromStack.icon, color: fromStack.color };
  return EXTRA_TECH_ICONS[label];
}
