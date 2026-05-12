import { getTechIconSources, resolveTechIcon } from '../../utils/techIcons';

type TechIconProps = {
  label: string;
  className?: string;
};

export function TechIcon({ label, className }: TechIconProps) {
  const meta = resolveTechIcon(label);
  if (!meta) return null;

  const sources = getTechIconSources(meta.slug, meta.color);

  return (
    <img
      src={sources[0]}
      alt=""
      aria-hidden
      className={className}
      loading="lazy"
      data-tech-slug={meta.slug}
      data-tech-color={meta.color}
      onError={(e) => {
        const img = e.currentTarget;
        const slug = img.dataset.techSlug ?? meta.slug;
        const color = img.dataset.techColor ?? meta.color;
        const list = getTechIconSources(slug, color);
        const idx = Number(img.dataset.fallbackIdx ?? '0') + 1;
        if (idx < list.length) {
          img.dataset.fallbackIdx = String(idx);
          img.src = list[idx];
          return;
        }
        img.remove();
      }}
    />
  );
}
