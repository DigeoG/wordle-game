import { useCallback, useEffect, useState } from 'react';
import Keyboard, { Status } from './components/Keyboard';

const ANSWER = 'DATE?';
const MAX_TRIES = 6;

function evaluate(guess: string): Status[] {
  const result: Status[] = Array(5).fill('absent');
  const left = ANSWER.split('');
  for (let i = 0; i < 5; i++) {
    if (guess[i] === ANSWER[i]) {
      result[i] = 'correct';
      left[i] = '';
    }
  }
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue;
    const idx = left.indexOf(guess[i]);
    if (idx > -1) {
      result[i] = 'present';
      left[idx] = '';
    }
  }
  return result;
}

export default function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [shake, setShake] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const won = guesses.includes(ANSWER);
  const lost = !won && guesses.length >= MAX_TRIES;
  const over = won || lost;

  const onKey = useCallback(
    (key: string) => {
      if (over) return;
      if (key === 'ENTER') {
        if (current.length < 5) {
          setShake(true);
          setTimeout(() => setShake(false), 400);
          return;
        }
        setGuesses(g => [...g, current]);
        setCurrent('');
      } else if (key === 'BACKSPACE') {
        setCurrent(c => c.slice(0, -1));
      } else if (current.length < 5) {
        setCurrent(c => c + key);
      }
    },
    [current, over]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k === 'ENTER' || k === 'BACKSPACE' || /^[A-Z?]$/.test(k)) onKey(k);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onKey]);

  const statuses: Record<string, Status> = {};
  const rank = { absent: 0, present: 1, correct: 2 };
  guesses.forEach(g => {
    evaluate(g).forEach((s, i) => {
      const prev = statuses[g[i]];
      if (!prev || rank[s] > rank[prev]) statuses[g[i]] = s;
    });
  });

  const dodge = () =>
    setNoPos({ x: Math.random() * 200 - 100, y: Math.random() * 120 - 60 });

  return (
    <div className="app">
      <h1>💘 LIL SHIII WORDLE 💘</h1>
      <p className="hint">Guess the 5-character word</p>

      <div className="board">
        {Array.from({ length: MAX_TRIES }).map((_, r) => {
          const submitted = r < guesses.length;
          const isCurrent = r === guesses.length;
          const word = submitted ? guesses[r] : isCurrent ? current : '';
          const st = submitted ? evaluate(guesses[r]) : [];
          return (
            <div key={r} className={`row ${isCurrent && shake ? 'shake' : ''}`}>
              {Array.from({ length: 5 }).map((_, c) => (
                <div
                  key={c}
                  className={`tile ${submitted ? st[c] : ''} ${word[c] ? 'filled' : ''}`}
                  style={{ animationDelay: `${c * 120}ms` }}
                >
                  {word[c] ?? ''}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <Keyboard onKey={onKey} statuses={statuses} />

      {won && (
        <div className="modal">
          <div className="card">
            <h2>{answered ? 'Score!! 🎉💖' : 'Will you be my girlfriend? 💘'}</h2>
            {answered ? (
              <p>Pop out your door lil shiii and come to the trunk 🙄</p>
            ) : (
              <div className="buttons">
                <button className="yes" onClick={() => setAnswered(true)}>Yes 💕</button>
                <button
                  className="no"
                  style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
                  onMouseEnter={dodge}
                  onTouchStart={dodge}
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {lost && (
        <div className="modal">
          <div className="card">
            <h2>So close! 😅</h2>
            <p>The answer was <b>{ANSWER}</b></p>
            <button className="yes" onClick={() => window.location.reload()}>Try again</button>
          </div>
        </div>
      )}
    </div>
  );
}