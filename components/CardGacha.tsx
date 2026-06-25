'use client';

import { useState, useEffect, useRef, useCallback, CSSProperties } from 'react';

// ── Default word list ──────────────────────────────────────────────────────
const DEFAULT_WORDS = [
  'サンプル単語1', 'サンプル単語2', 'サンプル単語3',
  'サンプル単語4', 'サンプル単語5', 'サンプル単語6',
  'サンプル単語7', 'サンプル単語8', 'サンプル単語9',
  'サンプル単語10',
];

const FAN_N = 13;
const CARD_W = 180;
const CARD_H = 252;

// ── Card back: real image with SVG fallback ────────────────────────────────
function CardBackFace({ className = '' }: { className?: string }) {
  const [err, setErr] = useState(false);
  if (!err) {
    return (
      <img
        src="/card-back.webp"
        className={`w-full h-full object-cover ${className}`}
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
        <linearGradient id="bgG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dbeafe" /><stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
        <linearGradient id="gdG" x1=".5" y1="1" x2=".5" y2="0">
          <stop offset="0%" stopColor="#78350f" /><stop offset="20%" stopColor="#b45309" />
          <stop offset="55%" stopColor="#f59e0b" /><stop offset="80%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fef9c3" />
        </linearGradient>
        <linearGradient id="bdG" x1=".5" y1="1" x2=".5" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" /><stop offset="40%" stopColor="#2563eb" />
          <stop offset="75%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="bhG" x1=".5" y1="1" x2=".5" y2="0">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity=".4" />
          <stop offset="100%" stopColor="#bfdbfe" stopOpacity=".7" />
        </linearGradient>
        <radialGradient id="bglow" cx=".5" cy=".9" r=".6">
          <stop offset="0%" stopColor="#fef08a" stopOpacity=".55" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="blcG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <clipPath id="cardClip"><rect width="200" height="280" rx="10" /></clipPath>
      </defs>
      <rect width="200" height="280" fill="url(#bgG)" rx="10" />
      <g clipPath="url(#cardClip)">
        <path d="M-5 195 Q55 172 108 190 Q158 208 212 184" fill="none" stroke="#93c5fd" strokeWidth="1.8" opacity=".5" />
        <path d="M-5 214 Q58 190 110 208 Q162 226 212 204" fill="none" stroke="#bfdbfe" strokeWidth="1.2" opacity=".4" />
        <ellipse cx="15" cy="226" rx="5" ry="7" fill="#93c5fd" opacity=".6" />
        <ellipse cx="30" cy="242" rx="4" ry="5.5" fill="#60a5fa" opacity=".5" />
        <circle cx="162" cy="205" r="105" fill="none" stroke="#1d4ed8" strokeWidth="34" opacity=".72" />
        <circle cx="136" cy="158" r="78" fill="none" stroke="#2563eb" strokeWidth="27" opacity=".8" />
        <circle cx="178" cy="262" r="72" fill="none" stroke="#3b82f6" strokeWidth="23" opacity=".65" />
        <path d="M55 280 L166 38 L198 58 L87 280 Z" fill="url(#gdG)" opacity=".84" />
        <path d="M92 280 L185 68 L200 76 L108 280 Z" fill="url(#gdG)" opacity=".28" />
        <path d="M158 102 C144 102 128 92 122 76 C116 60 120 44 128 34 C124 26 122 16 126 8 C130 2 138 2 140 10 C142 18 142 28 144 26 C146 18 150 10 154 6 C156 2 162 2 164 6 C166 10 164 20 166 26 C168 28 170 18 172 10 C174 2 180 4 182 12 C184 22 180 32 176 40 C184 52 188 66 182 80 C176 94 168 102 158 102 Z" fill="url(#gdG)" opacity=".96" />
        <path d="M158 92 C150 92 140 84 136 72 C132 60 136 48 142 40 C140 34 138 26 140 20 C142 14 146 14 148 20 C150 26 150 34 150 30 C152 22 154 14 156 10 C158 14 158 22 160 30 C160 34 162 24 164 20 C166 14 170 16 170 22 C172 30 168 40 166 46 C172 56 174 68 168 78 C164 88 160 92 158 92 Z" fill="url(#bdG)" opacity=".92" />
        <path d="M158 82 C155 80 152 72 153 60 C154 50 156 42 158 38 C160 42 162 50 162 60 C162 72 160 82 158 82 Z" fill="url(#bhG)" opacity=".8" />
        <ellipse cx="158" cy="12" rx="5" ry="9" fill="#fef9c3" opacity=".65" />
        <ellipse cx="154" cy="100" rx="28" ry="7" fill="url(#bglow)" />
        <circle cx="84" cy="252" r="20" fill="url(#blcG)" />
        <line x1="72" y1="252" x2="96" y2="252" stroke="#fbbf24" strokeWidth="4" opacity=".9" />
        <line x1="84" y1="240" x2="84" y2="264" stroke="#fbbf24" strokeWidth="4" opacity=".9" />
        <polygon points="95,82 102,96 88,96" fill="#fbbf24" opacity=".72" />
        <polygon points="143,216 150,230 136,230" fill="#1d4ed8" opacity=".55" />
        <rect x="57" y="118" width="8" height="8" fill="#fbbf24" opacity=".58" transform="rotate(28 61 122)" />
        <g transform="translate(34,74)" opacity=".85">
          <line x1="-6" y1="0" x2="6" y2="0" stroke="#fbbf24" strokeWidth="1.6" />
          <line x1="0" y1="-6" x2="0" y2="6" stroke="#fbbf24" strokeWidth="1.6" />
          <line x1="-4" y1="-4" x2="4" y2="4" stroke="#fbbf24" strokeWidth="1" />
          <line x1="4" y1="-4" x2="-4" y2="4" stroke="#fbbf24" strokeWidth="1" />
        </g>
        <circle cx="34" cy="74" r="3.5" fill="#fbbf24" opacity=".82" />
        <circle cx="22" cy="174" r="2.5" fill="#93c5fd" opacity=".75" />
      </g>
    </svg>
  );
}

// ── Card word face ─────────────────────────────────────────────────────────
function CardWordFace({ word }: { word: string }) {
  const len = word.length;
  const fontSize = len > 8 ? '1rem' : len > 5 ? '1.25rem' : len > 3 ? '1.6rem' : '2rem';
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white relative rounded-xl">
      {[['top-2.5 left-2.5', 'border-t-2 border-l-2'],
        ['top-2.5 right-2.5', 'border-t-2 border-r-2'],
        ['bottom-2.5 left-2.5', 'border-b-2 border-l-2'],
        ['bottom-2.5 right-2.5', 'border-b-2 border-r-2']].map(([pos, bdr], i) => (
        <div key={i} className={`absolute ${pos} ${bdr} border-amber-400 w-5 h-5`} />
      ))}
      <div className="text-center px-4 font-bold text-blue-900" style={{
        fontSize,
        fontFamily: "'Hiragino Mincho ProN','Yu Mincho',Georgia,serif",
        lineHeight: 1.4,
        letterSpacing: '0.05em',
      }}>
        {word}
      </div>
      <div className="absolute bottom-3 text-[9px] text-gray-300 tracking-widest">ランダムカードガチャ</div>
    </div>
  );
}

// ── Sparkles ───────────────────────────────────────────────────────────────
function Sparkles() {
  const colors = ['#fbbf24', '#f59e0b', '#fde68a', '#60a5fa', '#3b82f6', '#fcd34d'];
  return (
    <>
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * 360;
        const dist = 60 + Math.random() * 60;
        return (
          <div
            key={i}
            className="sparkle-particle"
            style={{
              background: colors[i % colors.length],
              top: '50%', left: '50%',
              marginTop: -4, marginLeft: -4,
              '--tx': `translate(${Math.cos(angle * Math.PI / 180) * dist}px, ${Math.sin(angle * Math.PI / 180) * dist}px)`,
              animationDelay: `${Math.random() * 0.3}s`,
            } as CSSProperties}
          />
        );
      })}
    </>
  );
}

// ── Password Modal ─────────────────────────────────────────────────────────
const EDIT_PASSWORD = process.env.NEXT_PUBLIC_EDIT_PASSWORD ?? 'syogai08';

function PasswordModal({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = () => {
    if (input === EDIT_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800 text-center">パスワードを入力</h2>
        <input
          ref={inputRef}
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          className={`w-full border rounded-xl p-3 text-center text-lg focus:outline-none focus:ring-2 transition-colors ${error ? 'border-red-400 ring-red-300 bg-red-50' : 'border-gray-200 focus:ring-blue-300'}`}
          placeholder="••••••••"
        />
        {error && <p className="text-red-500 text-sm text-center -mt-2">パスワードが違います</p>}
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">キャンセル</button>
          <button onClick={handleSubmit} className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">確認</button>
        </div>
      </div>
    </div>
  );
}

// ── Word Editor Modal ──────────────────────────────────────────────────────
function WordEditor({ words, onSave, onClose }: {
  words: string[];
  onSave: (w: string[]) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState(words.join('\n'));
  const handleSave = () => {
    const parsed = text.split('\n').map(s => s.trim()).filter(Boolean);
    if (!parsed.length) return alert('単語を1つ以上入力してください');
    onSave(parsed);
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">単語リストを編集</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>
        <p className="text-sm text-gray-500">1行に1単語を入力してください。</p>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={14}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono"
          placeholder="単語1&#10;単語2&#10;単語3" />
        <div className="text-xs text-gray-400 text-right">{text.split('\n').filter(s => s.trim()).length} 単語</div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">キャンセル</button>
          <button onClick={handleSave} className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">保存</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function CardGacha() {
  const [words, setWords] = useState<string[]>(DEFAULT_WORDS);
  const [busy, setBusy] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [flyState, setFlyState] = useState<'hidden' | 'fly' | 'flip' | 'done'>('hidden');
  const [flyWord, setFlyWord] = useState('');
  const [showSparkles, setShowSparkles] = useState(false);
  const [deckVisible, setDeckVisible] = useState(true);
  // Mobile: scale down the fan deck to fit the screen
  const [deckScale, setDeckScale] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const flyCardRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Load words from server (shared across all devices)
  useEffect(() => {
    fetch('/api/words')
      .then(r => r.json())
      .then((data: string[]) => {
        if (Array.isArray(data) && data.length > 0) setWords(data);
      })
      .catch(() => {});
  }, []);

  // Responsive deck scale for mobile
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      // Fan with 13 cards at ±32° visually spans ~380px; leave 16px padding each side
      setDeckScale(w < 412 ? Math.min(1, (w - 32) / 380) : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  const T = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); timersRef.current.push(id); };

  const getFanAngle = (i: number) => -32 + (64 / (FAN_N - 1)) * i;
  const getFanYOffset = (i: number) => Math.pow(Math.abs(i - (FAN_N - 1) / 2), 1.3) * 1.8;

  const doDraw = useCallback((fixedIdx?: number) => {
    if (busy || words.length === 0) return;
    setBusy(true);
    setHoveredIdx(null);

    const word = words[Math.floor(Math.random() * words.length)];
    const si = fixedIdx !== undefined ? fixedIdx : Math.floor(Math.random() * FAN_N);
    const angle = getFanAngle(si);
    const cardScale = 150 / CARD_W;
    setFlyWord(word);

    const stage = stageRef.current;
    const deck = deckRef.current;
    const reveal = revealRef.current;
    const flyCard = flyCardRef.current;
    if (!stage || !deck || !reveal || !flyCard) return;

    const sr = stage.getBoundingClientRect();
    const dr = deck.getBoundingClientRect();
    const rr = reveal.getBoundingClientRect();
    const dCX = dr.left - sr.left + dr.width / 2;
    const dCY = dr.top - sr.top + dr.height / 2;
    const rCX = rr.left - sr.left + rr.width / 2;
    const rCY = rr.top - sr.top + rr.height / 2;

    flyCard.style.transition = 'none';
    flyCard.style.left = `${dCX - CARD_W / 2}px`;
    flyCard.style.top = `${dCY - CARD_H / 2}px`;
    flyCard.style.transform = `scale(${cardScale}) rotate(${angle}deg)`;
    flyCard.style.opacity = '1';

    const delay = fixedIdx !== undefined ? 80 : 260;
    clearTimers();

    T(() => {
      setDeckVisible(false);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        flyCard.style.transition = 'left .7s cubic-bezier(.4,0,.15,1), top .65s cubic-bezier(.4,0,.15,1), transform .7s cubic-bezier(.34,1.06,.64,1), box-shadow .7s';
        flyCard.style.left = `${rCX - CARD_W / 2}px`;
        flyCard.style.top = `${rCY - CARD_H / 2}px`;
        flyCard.style.transform = 'scale(1) rotate(0deg)';
        flyCard.style.boxShadow = '0 18px 52px rgba(30,58,138,.32)';
        setFlyState('fly');
      }));
    }, delay);

    T(() => setFlyState('flip'), delay + 800);

    T(() => {
      setFlyState('done');
      setBusy(false);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    }, delay + 1600);
  }, [busy, words]);

  const handleReset = () => {
    clearTimers();
    setBusy(false);
    setHoveredIdx(null);
    setFlyState('hidden');
    setFlyWord('');
    setShowSparkles(false);
    setDeckVisible(true);
    const flyCard = flyCardRef.current;
    if (flyCard) { flyCard.style.transition = 'none'; flyCard.style.opacity = '0'; flyCard.style.boxShadow = 'none'; }
  };

  const handleSaveWords = async (newWords: string[]) => {
    setWords(newWords);
    setShowEditor(false);
    setIsSaving(true);
    try {
      await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWords),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const isIdle = flyState === 'hidden';
  const isRevealed = flyState === 'done';
  const isFlipped = flyState === 'flip' || flyState === 'done';

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 px-4 py-6">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 tracking-wide"
          style={{ fontFamily: "'Hiragino Mincho ProN','Yu Mincho',serif" }}>
          ランダムカードガチャ
        </h1>
        <p className="mt-1 text-blue-400 text-xs tracking-widest">RANDOM CARD GACHA</p>
      </header>

      {/* Stage */}
      <div ref={stageRef} className="relative flex flex-col items-center w-full max-w-sm" style={{ minHeight: 520 }}>

        {/* Reveal zone placeholder */}
        <div ref={revealRef} style={{ width: CARD_W, height: CARD_H, marginBottom: 16, flexShrink: 0 }} />

        {/* Fan deck */}
        <div
          ref={deckRef}
          style={{
            position: 'relative', width: 150, height: 172, flexShrink: 0,
            opacity: deckVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: busy ? 'none' : 'auto',
            transform: `scale(${deckScale})`,
            transformOrigin: 'center top',
          }}
        >
          {Array.from({ length: FAN_N }).map((_, i) => {
            const angle = getFanAngle(i);
            const yo = getFanYOffset(i);
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute', inset: 0,
                  transformOrigin: '50% 100%',
                  transform: `rotate(${angle}deg) translateY(${isHovered ? -(yo + 22) : -yo}px)`,
                  zIndex: isHovered ? 25 : i,
                  filter: isHovered ? 'drop-shadow(0 -10px 16px rgba(59,130,246,.38))' : 'none',
                  borderRadius: 10, overflow: 'hidden',
                  boxShadow: '1px 2px 8px rgba(0,0,0,.18)',
                  transition: 'transform 0.2s ease, filter 0.2s ease',
                  cursor: isIdle ? (isHovered ? 'pointer' : 'default') : 'default',
                  // Larger touch target on mobile
                  touchAction: 'none',
                }}
                onMouseEnter={() => { if (!busy) setHoveredIdx(i); }}
                onMouseLeave={() => { if (hoveredIdx === i) setHoveredIdx(null); }}
                onClick={() => { if (!busy && isIdle) doDraw(i); }}
                // Touch: tap lifts and draws immediately
                onTouchStart={(e) => {
                  e.preventDefault();
                  if (!busy && isIdle) setHoveredIdx(i);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  if (!busy && isIdle) doDraw(i);
                }}
              >
                <CardBackFace />
              </div>
            );
          })}
        </div>

        {/* Deck count + hint */}
        {isIdle && (
          <div className="text-center mt-2" style={{ minHeight: 32 }}>
            <p className="text-xs text-blue-400">{words.length} 枚の単語カード</p>
            <p className="text-xs text-indigo-300 mt-0.5" style={{ minHeight: 16 }}>
              {hoveredIdx !== null ? 'タップ / クリックしてこのカードを引く' : ''}
            </p>
          </div>
        )}

        {/* Flying card (absolute within stage) */}
        <div
          ref={flyCardRef}
          style={{
            position: 'absolute',
            width: CARD_W, height: CARD_H,
            borderRadius: 12, overflow: 'hidden',
            opacity: 0, zIndex: 40, pointerEvents: 'none',
            perspective: 1200,
          }}
        >
          <div
            style={{
              width: '100%', height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: isFlipped ? 'transform 0.72s cubic-bezier(.4,0,.2,1)' : 'none',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderRadius: 12, overflow: 'hidden' }}>
              <CardBackFace />
            </div>
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: 12, overflow: 'hidden' }}>
              <CardWordFace word={flyWord} />
            </div>
          </div>
          {showSparkles && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
              <Sparkles />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-3 mt-4">
          {isIdle && (
            <button
              onClick={() => doDraw()}
              disabled={words.length === 0}
              className="draw-btn w-44 h-14 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white text-2xl font-bold shadow-lg hover:from-blue-800 hover:to-blue-600 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Hiragino Mincho ProN','Yu Mincho',serif" }}
            >
              引く
            </button>
          )}
          {isRevealed && (
            <>
              <p className="text-blue-400 text-xs tracking-widest">カードを引きました！</p>
              <button
                onClick={handleReset}
                className="w-44 h-12 rounded-full border-2 border-blue-400 text-blue-600 font-bold hover:bg-blue-50 active:scale-95 transition-all"
              >
                もう一度
              </button>
            </>
          )}
          {!isIdle && !isRevealed && <div style={{ height: 56 }} />}

          <button
            onClick={() => setShowPasswordModal(true)}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 rounded-full border border-blue-200 text-blue-500 text-sm hover:bg-blue-50 active:scale-95 transition-all mt-1 disabled:opacity-50"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            {isSaving ? '保存中...' : '単語リストを編集'}
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <PasswordModal
          onSuccess={() => { setShowPasswordModal(false); setShowEditor(true); }}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
      {showEditor && (
        <WordEditor words={words} onSave={handleSaveWords} onClose={() => setShowEditor(false)} />
      )}
    </div>
  );
}
