import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './PortfolioChat.module.css';

type ChatRole = 'user' | 'assistant';

interface Line {
  role: ChatRole;
  content: string;
}

const MAX_INPUT = 2000;

function messagesForApi(lines: Line[]): Line[] {
  const start = lines.findIndex((m) => m.role === 'user');
  if (start === -1) return [];
  return lines.slice(start);
}

export interface PortfolioChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PortfolioChat({ open, onOpenChange }: PortfolioChatProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [lines, setLines] = useState<Line[]>(() => [
    {
      role: 'assistant',
      content:
        'Hi — ask me anything about Sana’s experience, stack, or projects. I only answer from this portfolio’s content.',
    },
  ]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
      const el = listRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
  }, [lines, open, pending]);

  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || pending) return;

    setInput('');
    setError(null);
    const nextLines: Line[] = [
      ...lines,
      { role: 'user' as const, content: text },
    ];
    setLines(nextLines);
    setPending(true);

    try {
      const forApi = messagesForApi(nextLines);
      const payload = {
        messages: forApi.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errMsg =
          typeof (data as { error?: string })?.error === 'string'
            ? (data as { error: string }).error
            : `Request failed (${res.status})`;
        throw new Error(errMsg);
      }
      const reply = (data as { reply?: string }).reply;
      if (typeof reply !== 'string' || !reply.trim()) {
        throw new Error('No reply from assistant.');
      }
      setLines((prev) => [...prev, { role: 'assistant', content: reply.trim() }]);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : 'Something went wrong. Try again.';
      setError(msg);
      setLines((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry — I could not answer that right now. If the problem persists, your API key or network may need checking.',
        },
      ]);
    } finally {
      setPending(false);
    }
  }, [input, pending, lines]);

  return (
    <div
      className={styles.root}
      data-open={open ? '' : undefined}
      data-motion={reducedMotion ? 'reduced' : undefined}
    >
      <div
        id="portfolio-chat-panel"
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-label="Portfolio assistant chat"
        aria-modal="false"
        hidden={!open}
      >
        <header className={styles.head}>
          <div>
            <h2 className={styles.title}>Ask about me</h2>
            <p className={styles.sub}>Answers use this site’s content only.</p>
          </div>
          <button
            type="button"
            className={styles.close}
            aria-label="Close chat"
            onClick={() => onOpenChange(false)}
          >
            ×
          </button>
        </header>

        <div ref={listRef} className={styles.messages}>
          {lines.map((line, i) => (
            <div
              key={`${i}-${line.role}-${line.content.slice(0, 24)}`}
              className={
                line.role === 'user' ? styles.bubbleUser : styles.bubbleBot
              }
            >
              {line.content}
            </div>
          ))}
          {pending && (
            <div className={`${styles.bubbleBot} ${styles.typing}`}>
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        {error && (
          <p className={styles.err} title={error}>
            {error.length > 220 ? `${error.slice(0, 220)}…` : error}
          </p>
        )}

        <div className={styles.composer}>
          <textarea
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) =>
              setInput(e.target.value.slice(0, MAX_INPUT))
            }
            placeholder="e.g. What backend frameworks has Ubaid used?"
            rows={2}
            disabled={pending}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <button
            type="button"
            className={styles.send}
            disabled={pending || !input.trim()}
            onClick={() => void send()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
