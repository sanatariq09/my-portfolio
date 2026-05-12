import { projects }   from './projects';
import { skills }     from './skills';
import { timelineItems } from './timeline';

/** Plain-text context for portfolio Q&A (Gemini system prompt). */
export function buildPortfolioKnowledge(): string {
  const work = timelineItems
    .filter((t) => t.type === 'work')
    .map(
      (t) =>
        `- ${t.role} at ${t.org} (${t.period}, ${t.location})\n  ${t.desc}\n  Tags: ${t.tags.join(', ')}`
    )
    .join('\n');

  const education = timelineItems
    .filter((t) => t.type === 'education')
    .map(
      (t) =>
        `- ${t.role}, ${t.org} (${t.period}, ${t.location})\n  ${t.desc}`
    )
    .join('\n');

  const skillBlocks = skills
    .map(
      (s) =>
        `### ${s.name}\n${s.description}\nProficiency (self-reported): ${s.proficiency}%\nTags: ${s.tags.join(', ')}`
    )
    .join('\n\n');

  const projectBlocks = projects
    .map((p) => {
      const cs = p.caseStudy;
      return (
        `### ${p.name} (${p.label})\n${p.description}\n` +
        `Tags: ${p.tags.join(', ')}\n` +
        `Role: ${cs.role} · ${cs.duration}\n` +
        `Problem: ${cs.problem}\n` +
        `Solution: ${cs.solution}\n` +
        `Results: ${cs.results.map((r) => `• ${r}`).join(' ')}`
      );
    })
    .join('\n\n');

  return [
    'You are answering questions about Sana Tariq, a full-stack software engineer based in Karachi, Pakistan.',
    'Use ONLY the facts below. If something is not covered, say you do not have that detail and suggest contacting via the portfolio contact section (email is on the site).',
    'Be concise, friendly, and professional. Do not invent employers, dates, or technologies not listed.',
    '',
    '## Experience',
    work,
    '',
    '## Education',
    education,
    '',
    '## Skill areas',
    skillBlocks,
    '',
    '## Featured projects',
    projectBlocks,
  ].join('\n');
}
