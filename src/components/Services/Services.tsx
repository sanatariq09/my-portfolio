import { useRef } from 'react';
import { services } from '../../data/services';
import { useTilt } from '../../hooks/useTilt';
import styles from './Services.module.css';

const delayClass = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'];

// Animated SVG icons per service (Lottie-style CSS animations)
const SERVICE_ICONS = ['💻', '🎨', '⚡', '🔍', '🚀', '🤝'];

function ServiceCard({ service, icon, delay }: {
  service: (typeof services)[number];
  icon: string;
  delay: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref, { max: 8 });

  return (
    <div ref={ref} className={`${styles.card} reveal ${delay}`}>
      <div className={styles.iconWrap}>
        <span className={styles.icon}>{icon}</span>
        <div className={styles.iconRing} />
      </div>
      <div className={styles.num}>{service.num}</div>
      <div className={styles.title}>{service.title}</div>
      <div className={styles.desc}>{service.description}</div>
      <div className={styles.price}>
        {service.price} <span>{service.unit}</span>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className={styles.section} id="services">
      <div className="sec">
        <div className="sec-tag reveal">What I Offer</div>
        <h2 className="sec-title reveal">Services &amp; Pricing</h2>
        <p className="sec-sub reveal">
          Flexible engagement models to fit your project size and timeline.
        </p>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <ServiceCard
              key={service.num}
              service={service}
              icon={SERVICE_ICONS[i] ?? '✦'}
              delay={delayClass[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
