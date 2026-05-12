import { useEffect, useRef, useState } from 'react';
import styles from './SnakeGame.module.css';

const CELL  = 16;
const COLS  = 20;
const ROWS  = 16;
const W     = COLS * CELL;
const H     = ROWS * CELL;
const SPEED = 130;

type Dir = 'U' | 'D' | 'L' | 'R';
type Pt  = { x: number; y: number };

const rand = (max: number) => Math.floor(Math.random() * max);
const newFood = (snake: Pt[]): Pt => {
  let f: Pt;
  do { f = { x: rand(COLS), y: rand(ROWS) }; }
  while (snake.some((s) => s.x === f.x && s.y === f.y));
  return f;
};

interface Props { onClose: () => void; }

export function SnakeGame({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state     = useRef({
    snake: [{ x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }] as Pt[],
    dir:   'R' as Dir,
    next:  'R' as Dir,
    food:  { x: 15, y: 8 } as Pt,
    score: 0,
    alive: true,
  });
  const [score,  setScore]  = useState(0);
  const [dead,   setDead]   = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { dir } = state.current;
      if (e.key === 'ArrowUp'    && dir !== 'D') state.current.next = 'U';
      if (e.key === 'ArrowDown'  && dir !== 'U') state.current.next = 'D';
      if (e.key === 'ArrowLeft'  && dir !== 'R') state.current.next = 'L';
      if (e.key === 'ArrowRight' && dir !== 'L') state.current.next = 'R';
      if (e.key === ' ') {
        pausedRef.current = !pausedRef.current;
        setPaused(pausedRef.current);
      }
      if (e.key === 'Escape') onClose();
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const draw = () => {
      const s = state.current;
      ctx.clearRect(0, 0, W, H);

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= W; x += CELL) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y <= H; y += CELL) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      // food
      const gf = ctx.createRadialGradient(
        (s.food.x + 0.5) * CELL, (s.food.y + 0.5) * CELL, 0,
        (s.food.x + 0.5) * CELL, (s.food.y + 0.5) * CELL, CELL * 0.6
      );
      gf.addColorStop(0, '#06d6a0');
      gf.addColorStop(1, 'rgba(6,214,160,0)');
      ctx.beginPath();
      ctx.arc((s.food.x + 0.5) * CELL, (s.food.y + 0.5) * CELL, CELL * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = gf;
      ctx.fill();

      // snake
      s.snake.forEach((seg, i) => {
        const t = i / s.snake.length;
        ctx.fillStyle = i === 0
          ? '#ff6b35'
          : `rgba(255,${Math.round(107 + t * 100)},53,${1 - t * 0.6})`;
        const pad = i === 0 ? 1 : 2;
        ctx.beginPath();
        ctx.roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, 4);
        ctx.fill();
      });
    };

    const tick = setInterval(() => {
      if (pausedRef.current) { draw(); return; }
      const s = state.current;
      if (!s.alive) return;
      s.dir = s.next;

      const head = { ...s.snake[0] };
      if (s.dir === 'U') head.y--;
      if (s.dir === 'D') head.y++;
      if (s.dir === 'L') head.x--;
      if (s.dir === 'R') head.x++;

      // wall collision
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        s.alive = false; setDead(true); draw(); return;
      }
      // self collision
      if (s.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        s.alive = false; setDead(true); draw(); return;
      }

      s.snake.unshift(head);
      if (head.x === s.food.x && head.y === s.food.y) {
        s.score++;
        setScore(s.score);
        s.food = newFood(s.snake);
      } else {
        s.snake.pop();
      }
      draw();
    }, SPEED);

    draw();
    return () => clearInterval(tick);
  }, []);

  const restart = () => {
    state.current = {
      snake: [{ x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }],
      dir: 'R', next: 'R',
      food: { x: 15, y: 8 },
      score: 0, alive: true,
    };
    setScore(0);
    setDead(false);
  };

  return (
    <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.box}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <div className={styles.header}>
          <span className={styles.title}>🐍 Snake</span>
          <span className={styles.score}>Score: {score}</span>
          <span className={styles.hint}>Arrows to move · Space to pause · ESC to exit</span>
        </div>
        <canvas ref={canvasRef} width={W} height={H} className={styles.canvas} />
        {dead && (
          <div className={styles.overlay2}>
            <p className={styles.gameOver}>Game Over!</p>
            <p className={styles.finalScore}>You scored {score} 🎯</p>
            <button className="btn btn-primary" onClick={restart}>Play Again</button>
          </div>
        )}
        {paused && !dead && (
          <div className={styles.overlay2}>
            <p className={styles.gameOver}>Paused</p>
            <button className="btn btn-outline" onClick={() => { pausedRef.current = false; setPaused(false); }}>Resume</button>
          </div>
        )}
        {/* Mobile controls */}
        <div className={styles.dpad}>
          {([['↑','U'],['',''],['↓','D']] as const).flat().map(([label,dir],i) => dir ? (
            <button key={i} className={styles.dpadBtn} onPointerDown={() => {
              const s = state.current;
              if (dir === 'U' && s.dir !== 'D') s.next = 'U';
              if (dir === 'D' && s.dir !== 'U') s.next = 'D';
            }}>{label}</button>
          ) : <span key={i} />)}
          <button className={styles.dpadBtn} onPointerDown={() => { const s = state.current; if (s.dir !== 'R') s.next = 'L'; }}>←</button>
          <span />
          <button className={styles.dpadBtn} onPointerDown={() => { const s = state.current; if (s.dir !== 'L') s.next = 'R'; }}>→</button>
        </div>
      </div>
    </div>
  );
}
