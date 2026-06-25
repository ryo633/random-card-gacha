'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';

// ── Default word list (replace with your own) ──────────────────────────────
const DEFAULT_WORDS = [
  'サンプル単語1', 'サンプル単語2', 'サンプル単語3',
  'サンプル単語4', 'サンプル単語5', 'サンプル単語6',
  'サンプル単語7', 'サンプル単語8', 'サンプル単語9',
  'サンプル単語10',
];

const FAN_COUNT = 11;
type Phase = 'idle' | 'shuffling' | 'centering' | 'flipping' | 'revealed';

// ── Card back: real image with SVG fallback ────────────────────────────────
// Place your image as /public/card-back.jpg to use it automatically.
function CardBackFace() {
  const [err, setErr] = useState(false);
  if (!err) {
    return (
      <img
        src="/card-back.jpg"
        className="w-full h-full object-cover"
        alt=""
        draggable={false}
        onError={() => setErr(true)}
      />
    );
  }
  return <CardBackSVG />;
}

function CardBackSVG() {
  return (
    <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
        <linearGradient id="goldG" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="35%" stopColor="#d97706" />
          <stop offset="65%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
        <linearGradient id="blueG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="flameG" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="200" height="280" fill="url(#bgG)" rx="10" />

      {/* Flowing wave lines (left side) */}
      <path d="M-10 180 Q50 155 100 175 Q150 195 210 170" fill="none" stroke="#93c5fd" strokeWidth="1.5" opacity="0.5" />
      <path d="M-10 200 Q60 178 110 198 Q160 218 210 195" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.35" />
      <path d="M-10 220 Q45 200 90 215 Q140 232 210 212" fill="none" stroke="#bfdbfe" strokeWidth="1" opacity="0.4" />

      {/* Water drop fragments */}
      <ellipse cx="18" cy="210" rx="5" ry="7" fill="#93c5fd" opacity="0.65" />
      <ellipse cx="32" cy="228" rx="3.5" ry="5.5" fill="#60a5fa" opacity="0.55" />
      <ellipse cx="10" cy="245" rx="3" ry="4.5" fill="#93c5fd" opacity="0.5" />

      {/* Large overlapping blue rings */}
      <circle cx="158" cy="195" r="78" fill="none" stroke="#1d4ed8" strokeWidth="26" opacity="0.72" />
      <circle cx="132" cy="155" r="62" fill="none" stroke="#2563eb" strokeWidth="22" opacity="0.78" />
      <circle cx="172" cy="238" r="56" fill="none" stroke="#3b82f6" strokeWidth="18" opacity="0.62" />

      {/* Small solid blue circle */}
      <circle cx="88" cy="245" r="19" fill="url(#blueG)" />
      <line x1="78" y1="245" x2="98" y2="245" stroke="url(#goldG)" strokeWidth="4.5" />
      <line x1="88" y1="235" x2="88" y2="255" stroke="url(#goldG)" strokeWidth="4.5" />

      {/* Gold diagonal stripe */}
      <path d="M72 280 L178 55 L200 70 L96 280 Z" fill="url(#goldG)" opacity="0.82" />

      {/* Second narrower gold stripe */}
      <path d="M110 280 L196 90 L200 95 L115 280 Z" fill="url(#goldG)" opacity="0.35" />

      {/* Flame 1 – outer (gold) */}
      <path d="M162 25 C158 38 138 52 143 76 C146 90 162 95 170 84 C178 73 182 52 162 25 Z" fill="url(#flameG)" opacity="0.9" />
      {/* Flame 1 – inner (blue) */}
      <path d="M162 33 C159 44 147 56 151 72 C153 80 163 83 168 76 C174 68 176 50 162 33 Z" fill="url(#blueG)" opacity="0.8" />

      {/* Flame 2 – outer (gold) */}
      <path d="M185 40 C182 50 167 61 171 80 C173 89 184 92 190 83 C196 74 198 57 185 40 Z" fill="url(#flameG)" opacity="0.88" />
      {/* Flame 2 – inner (blue) */}
      <path d="M185 48 C183 56 174 65 177 78 C179 85 186 87 190 81 C194 74 195 60 185 48 Z" fill="url(#blueG)" opacity="0.75" />

      {/* Scattered geometric fragments */}
      <polygon points="105,85 111,97 99,97" fill="#fbbf24" opacity="0.75" />
      <polygon points="145,205 151,217 139,217" fill="#1d4ed8" opacity="0.6" />
      <polygon points="55,120 60,128 50,128" fill="#fbbf24" opacity="0.65" />
      <rect x="118" y="130" width="8" height="8" fill="#fbbf24" opacity="0.55" transform="rotate(30 122 134)" />

      {/* Sparkle dots */}
      <circle cx="38" cy="78" r="3.5" fill="#fbbf24" opacity="0.85" />
      <circle cx="62" cy="145" r="2.5" fill="#fbbf24" opacity="0.7" />
      <circle cx="25" cy="175" r="2.5" fill="#93c5fd" opacity="0.8" />
      <circle cx="50" cy="258" r="2" fill="#fbbf24" opacity="0.7" />
      <circle cx="150" cy="118" r="3" fill="#fbbf24" opacity="0.9" />
      <circle cx="190" cy="150" r="2" fill="#fbbf24" opacity="0.6" />

      {/* Sparkle stars */}
      <g transform="translate(38,78)" opacity="0.85">
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="-4" y1="-4" x2="4" y2="4" stroke="#fbbf24" strokeWidth="1" />
        <line x1="4" y1="-4" x2="-4" y2="4" stroke="#fbbf24" strokeWidth="1" />
      </g>
      <g transform="translate(150,118)" opacity="0.9">
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#fbbf24" strokeWidth="1.5" />
        <line x1="-3" y1="-3" x2="3" y2="3" stroke="#fbbf24" strokeWidth="1" />
        <line x1="3" y1="-3" x2="-3" y2="3" stroke="#fbbf24" strokeWidth="1" />
      </g>
    </svg>
  );
}

// ── Card face (word side) ──────────────────────────────────────────────────
function CardFace({ word }: { word: string }) {
  const isLong = word.length > 6;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white relative" style={{ borderRadius: 12 }}>
      {/* Corner decorations */}
      {[['top-3 left-3', 'border-t-2 border-l-2'],
        ['top-3 right-3', 'border-t-2 border-r-2'],
        ['bottom-3 left-3', 'border-b-2 border-l-2'],
        ['bottom-3 right-3', 'border-b-2 border-r-2']].map(([pos, border], i) => (
        <div key={i} className={`absolute ${pos} ${border} border-amber-400 w-6 h-6 rounded-sm`} />
      ))}
      {/* Word */}
      <div
        className="word-pop flex items-center justify-center text-center px-4"
        style={{
          fontSize: isLong ? 'clamp(1.1rem, 4vw, 1.6rem)' : 'clamp(1.5rem, 5vw, 2.2rem)',
          fontWeight: 700,
          color: '#1e3a8a',
          fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', Georgia, serif",
          lineHeight: 1.4,
          letterSpacing: '0.05em',
        }}
      >
        {word}
      </div>
      {/* Bottom label */}
      <div className="absolute bottom-4 text-xs text-gray-300 tracking-widest">
        ランダムカードガチャ
      </div>
    </div>
  );
}

// ── Sparkle effect ─────────────────────────────────────────────────────────
function Sparkles() {
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360;
    const dist = 60 + Math.random() * 60;
    const dx = Math.cos((angle * Math.PI) / 180) * dist;
    const dy = Math.sin((angle * Math.PI) / 180) * dist;
    const colors = ['#fbbf24', '#f59e0b', '#fde68a', '#60a5fa', '#3b82f6'];
    return {
      color: colors[Math.floor(Math.random() * colors.length)],
      tx: `translate(${dx}px, ${dy}px)`,
      delay: Math.random() * 0.3,
    };
  });
  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="sparkle-particle"
          style={
            {
              background: p.color,
              top: '50%',
              left: '50%',
              marginTop: -4,
              marginLeft: -4,
              '--tx': p.tx,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

// ── Word Editor Modal ──────────────────────────────────────────────────────
function WordEditor({
  words,
  onSave,
  onClose,
}: {
  words: string[];
  onSave: (w: string[]) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState(words.join('\n'));

  const handleSave = () => {
    const parsed = text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    if (parsed.length === 0) return alert('単語を1つ以上入力してください');
    onSave(parsed);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">単語リストを編集</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>
        <p className="text-sm text-gray-500">1行に1単語を入力してください。</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={14}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono"
          placeholder="単語1&#10;単語2&#10;単語3"
        />
        <div className="text-xs text-gray-400 text-right">{text.split('\n').filter((s) => s.trim()).length} 単語</div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function CardGacha() {
  const [words, setWords] = useState<string[]>(DEFAULT_WORDS);
  const [phase, setPhase] = useState<Phase>('idle');
  const [selectedWord, setSelectedWord] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('gacha-words');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setWords(parsed);
      } catch {}
    }
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const handleDraw = () => {
    if (phase !== 'idle' || words.length === 0) return;
    const word = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(word);
    clearTimers();

    setIsShaking(true);
    setPhase('shuffling');

    const t1 = setTimeout(() => {
      setIsShaking(false);
      setPhase('centering');
    }, 600);
    const t2 = setTimeout(() => setPhase('flipping'), 1050);
    const t3 = setTimeout(() => {
      setPhase('revealed');
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 900);
    }, 1750);

    timersRef.current = [t1, t2, t3];
  };

  const handleReset = () => {
    clearTimers();
    setPhase('idle');
    setSelectedWord('');
    setShowSparkles(false);
  };

  const handleSaveWords = (newWords: string[]) => {
    setWords(newWords);
    localStorage.setItem('gacha-words', JSON.stringify(newWords));
    setShowEditor(false);
  };

  // Fan transform for each card
  const getFanStyle = (i: number): CSSProperties => {
    const angle = -24 + (48 / (FAN_COUNT - 1)) * i;
    const yOffset = Math.pow(Math.abs(i - (FAN_COUNT - 1) / 2), 1.5) * 2.5;
    const transform = `rotate(${angle}deg) translateY(${yOffset}px)`;
    return {
      position: 'absolute',
      inset: 0,
      transformOrigin: '50% 100%',
      transform,
      ['--fan-transform' as string]: transform,
      zIndex: i,
      transition: 'transform 0.25s ease',
    };
  };

  const deckVisible = phase === 'idle' || phase === 'shuffling';
  const cardVisible = phase === 'centering' || phase === 'flipping' || phase === 'revealed';
  const isFlipped = phase === 'flipping' || phase === 'revealed';

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 px-4 py-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1
          className="text-3xl sm:text-4xl font-bold text-blue-900 tracking-wide"
          style={{ fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', serif" }}
        >
          ランダムカードガチャ
        </h1>
        <p className="mt-2 text-blue-400 text-sm tracking-widest">RANDOM CARD GACHA</p>
      </header>

      {/* Stage */}
      <div className="relative flex flex-col items-center w-full max-w-sm">
        {/* Fan deck */}
        <div
          className="relative mb-12"
          style={{
            width: 112,
            height: 160,
            opacity: deckVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: deckVisible ? 'auto' : 'none',
          }}
        >
          <div className={isShaking ? 'deck-shake' : ''} style={{ width: '100%', height: '100%', position: 'relative' }}>
            {Array.from({ length: FAN_COUNT }).map((_, i) => (
              <div
                key={i}
                className="fan-card rounded-xl shadow-md cursor-default"
                style={getFanStyle(i)}
              >
                <CardBackFace />
              </div>
            ))}
          </div>
          {/* Card count badge */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-blue-400 whitespace-nowrap">
            {words.length} 枚の単語カード
          </div>
        </div>

        {/* Center revealed card */}
        <div
          className="card-3d-container mb-8"
          style={{
            width: 180,
            height: 252,
            opacity: cardVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
            position: cardVisible ? 'relative' : 'absolute',
          }}
        >
          <div className={`card-entrance card-3d-inner${isFlipped ? ' flipped' : ''}`}>
            {/* Decorated side (face-down) */}
            <div className="card-face shadow-2xl">
              <CardBackFace />
            </div>
            {/* Word side (face-up after flip) */}
            <div className="card-face card-face-word shadow-2xl">
              <CardFace word={selectedWord} />
            </div>
          </div>
          {/* Sparkles */}
          {showSparkles && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
              <Sparkles />
            </div>
          )}
        </div>

        {/* Draw button */}
        {phase === 'idle' && (
          <button
            onClick={handleDraw}
            disabled={words.length === 0}
            className="draw-btn mt-2 w-44 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xl font-bold shadow-lg hover:from-blue-700 hover:to-blue-600 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Hiragino Mincho ProN', 'Yu Mincho', serif" }}
          >
            引く
          </button>
        )}

        {/* Result label */}
        {phase === 'revealed' && (
          <div className="mt-2 text-center">
            <p className="text-blue-400 text-sm mb-4 tracking-widest">カードを引きました！</p>
            <button
              onClick={handleReset}
              className="w-44 h-12 rounded-full border-2 border-blue-400 text-blue-600 font-bold hover:bg-blue-50 active:scale-95 transition-all"
            >
              もう一度
            </button>
          </div>
        )}

        {/* Animating placeholder */}
        {(phase === 'shuffling' || phase === 'centering' || phase === 'flipping') && (
          <div className="mt-2 h-14" />
        )}
      </div>

      {/* Footer controls */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-200 text-blue-500 text-sm hover:bg-blue-50 active:scale-95 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          単語リストを編集
        </button>
        {words.length === 0 && (
          <p className="text-red-400 text-sm">単語がありません。まず単語を追加してください。</p>
        )}
      </div>

      {/* Word editor modal */}
      {showEditor && (
        <WordEditor
          words={words}
          onSave={handleSaveWords}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
