import { useState, useRef, FormEvent, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { GITHUB_URL, LINKEDIN_URL } from '../../data/social';
import styles from './Contact.module.css';

// 🎵 Fun "success" jingle via Web Audio API — no sound file needed
function playSuccessJingle() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    const notes = [
      { freq: 523, start: 0,    dur: 0.12 },  // C5
      { freq: 659, start: 0.13, dur: 0.12 },  // E5
      { freq: 784, start: 0.26, dur: 0.12 },  // G5
      { freq: 1047,start: 0.39, dur: 0.25 },  // C6  ← the "ding!" note
      { freq: 880, start: 0.65, dur: 0.08 },  // A5  ← quick wobble
      { freq: 988, start: 0.74, dur: 0.08 },  // B5
      { freq: 1047,start: 0.83, dur: 0.3  },  // C6  ← hold
    ];

    notes.forEach(({ freq, start, dur }) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);

      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur + 0.05);
    });

    // tiny "womp" bass thump at the start for fun
    const bass = ctx.createOscillator();
    const bGain = ctx.createGain();
    bass.connect(bGain);
    bGain.connect(ctx.destination);
    bass.type = 'triangle';
    bass.frequency.setValueAtTime(200, ctx.currentTime);
    bass.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.12);
    bGain.gain.setValueAtTime(0.3, ctx.currentTime);
    bGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    bass.start(ctx.currentTime);
    bass.stop(ctx.currentTime + 0.2);
  } catch {
    // silently ignore — browsers without AudioContext
  }
}

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

interface FormState {
  name: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
}

const INITIAL: FormState = {
  name: '', email: '', service: '', budget: 'Under $1,000',
  timeline: 'ASAP', message: '',
};

function validate(form: FormState): Errors {
  const err: Errors = {};
  if (!form.name.trim())                        err.name    = 'Name is required.';
  if (!form.email.trim())                       err.email   = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                                err.email   = 'Enter a valid email.';
  if (!form.service)                            err.service = 'Please select a service.';
  if (!form.message.trim())                     err.message = 'Tell me about your project.';
  else if (form.message.trim().length < 20)     err.message = 'Please write at least 20 characters.';
  return err;
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const EMAIL = 'sanatarique17@gmail.com';

export function Contact() {
  const [form, setForm]       = useState<FormState>(INITIAL);
  const [errors, setErrors]   = useState<Errors>({});
  const [status, setStatus]   = useState<SubmitStatus>('idle');
  const [copied, setCopied]   = useState(false);
  const formRef               = useRef<HTMLDivElement>(null);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          service:    form.service,
          budget:     form.budget,
          timeline:   form.timeline,
          message:    form.message,
          to_email:   'sanatarique17@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm(INITIAL);
      playSuccessJingle();
      // 🎉 confetti burst
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.65 }, colors: ['#ff6b35','#ff9f1c','#06d6a0','#3b82f6','#a855f7'] });
      setTimeout(() => confetti({ particleCount: 60, spread: 120, origin: { y: 0.65 }, startVelocity: 20 }), 300);
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className={styles.section} id="contact">
      <div className="sec">
        <div className="sec-tag reveal">Get In Touch</div>
        <h2 className="sec-title reveal">
          Let's build something <em className={styles.em}>great</em> together
        </h2>

        <div className={styles.grid}>
          {/* ── Left info ── */}
          <div className="reveal-l">
            <p className={styles.intro}>
              Have a project in mind? Looking for a developer? I respond within 24 hours.
            </p>

            {/* ── toast ── */}
            {copied && (
              <div className={styles.toast}>✓ Email copied to clipboard!</div>
            )}

            <div className={styles.contactItems}>
              {/* email with copy button */}
              <div className={`${styles.ci} ${styles.ciClickable} ci`} onClick={copyEmail} title="Click to copy email">
                <div className={`${styles.ciIcon} ${styles.cio}`}>✉</div>
                <div>
                  <div className={styles.ciLabel}>Email <span className={styles.copyHint}>(click to copy)</span></div>
                  <div className={styles.ciVal}>{EMAIL}</div>
                </div>
                <span className={`${styles.copyBtn} ${copied ? styles.copyDone : ''}`}>
                  {copied ? '✓' : '⎘'}
                </span>
              </div>

              <div className={`${styles.ci} ci`}>
                <div className={`${styles.ciIcon} ${styles.cig}`}>📍</div>
                <div>
                  <div className={styles.ciLabel}>Location</div>
                  <div className={styles.ciVal}>Karachi, Pakistan · Remote Worldwide</div>
                </div>
              </div>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.ci} ci ${styles.ciExternal}`}
              >
                <div className={`${styles.ciIcon} ${styles.cib}`}>⎋</div>
                <div>
                  <div className={styles.ciLabel}>GitHub</div>
                  <div className={styles.ciVal}>{GITHUB_URL.replace(/^https:\/\//, '')}</div>
                </div>
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.ci} ci ${styles.ciExternal}`}
              >
                <div className={`${styles.ciIcon} ${styles.cil}`}>in</div>
                <div>
                  <div className={styles.ciLabel}>LinkedIn</div>
                  <div className={styles.ciVal}>{LINKEDIN_URL.replace(/^https:\/\//, '')}</div>
                </div>
              </a>
            </div>

          </div>

          {/* ── Form ── */}
          <div ref={formRef} className="reveal-r">
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name" name="name" type="text"
                    placeholder="Jane Smith"
                    value={form.name} onChange={handleChange}
                    className={errors.name ? styles.inputError : ''}
                  />
                  {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="jane@company.com"
                    value={form.email} onChange={handleChange}
                    className={errors.email ? styles.inputError : ''}
                  />
                  {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="service">Service Needed</label>
                <select
                  id="service" name="service"
                  value={form.service} onChange={handleChange}
                  className={errors.service ? styles.inputError : ''}
                >
                  <option value="" disabled>Select a service...</option>
                  <option>Full-Stack Development</option>
                  <option>Responsive &amp; Websites</option>
                  <option>API &amp; Backend Engineering</option>
                  <option>Wordpress &amp; Websites</option>
                  <option>CMS &amp; Panels</option>
                </select>
                {errors.service && <span className={styles.errorMsg}>{errors.service}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="budget">Budget Range</label>
                  <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
                    <option>Under $1,000</option>
                    <option>$1,000 – $5,000</option>
                    <option>$5,000 – $15,000</option>
                    <option>$15,000+</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="timeline">Timeline</label>
                  <select id="timeline" name="timeline" value={form.timeline} onChange={handleChange}>
                    <option>ASAP</option>
                    <option>Within 1 month</option>
                    <option>1–3 months</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Project Description</label>
                <textarea
                  id="message" name="message"
                  placeholder="Tell me about your project, goals, and any technical requirements..."
                  value={form.message} onChange={handleChange}
                  className={errors.message ? styles.inputError : ''}
                />
                {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={`${styles.submitBtn} ${styles[status]}`}
                disabled={status === 'sending'}
              >
                {status === 'idle'    && 'Send Message →'}
                {status === 'sending' && <><span className={styles.spinner} /> Sending…</>}
                {status === 'success' && '✓ Message Sent!'}
                {status === 'error'   && '✗ Failed — Try Again'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
