import { useMemo, type CSSProperties } from 'react';
import type { Visual } from '../game/content';

export function StarRow({ count, size = 'sm', animate = false }: { count: number; size?: 'sm' | 'md' | 'lg'; animate?: boolean }) {
  return (
    <div className={`star-row star-${size}`} aria-label={`${count} מתוך 3 כוכבים`}>
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={`star ${index < count ? 'filled' : 'empty'} ${animate && index < count ? 'pop' : ''}`}
          style={animate ? ({ animationDelay: `${index * 0.22}s` } as CSSProperties) : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* דמות פיית-גמדים מתוקה, מוארת, מקסימה ומתאימה לילדות בכיתה ב' */
export function Gnome({ mood = 'idle', className = '' }: { mood?: 'idle' | 'happy' | 'sad' | 'cheer'; className?: string }) {
  return (
    <div className={`gnome gnome-${mood} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 130 134" fill="none">
        {/* צל רך */}
        <ellipse cx="65" cy="126" rx="32" ry="7" fill="rgba(66, 20, 80, 0.22)" />

        {/* כנפי פיית-קסם ורודות-סגלגלות מנצנצות */}
        <path
          d="M32 75 C 10 55, 6 25, 28 35 C 44 42, 48 64, 46 80 Z"
          fill="url(#wingGradL)"
          opacity="0.85"
          className="fairy-wing-left"
        />
        <path
          d="M98 75 C 120 55, 124 25, 102 35 C 86 42, 82 64, 84 80 Z"
          fill="url(#wingGradR)"
          opacity="0.85"
          className="fairy-wing-right"
        />

        {/* שמלת קסם סגולה-מג'נטה */}
        <path d="M42 120 C 40 98, 50 82, 65 82 C 80 82, 90 98, 88 120 C 76 123, 54 123, 42 120 Z" fill="#7a3ebb" />
        <path d="M46 120 C 44 104, 52 90, 65 90 C 78 90, 86 104, 84 120 C 74 122, 56 122, 46 120 Z" fill="#9d55dd" />

        {/* נעליים קטנות */}
        <ellipse cx="53" cy="122" rx="9" ry="5" fill="#ff5ba7" />
        <ellipse cx="77" cy="122" rx="9" ry="5" fill="#ff5ba7" />

        {/* ידיים */}
        <circle cx="38" cy="98" r="7.5" fill="#ffd5be" />
        <circle cx="92" cy="98" r="7.5" fill="#ffd5be" />

        {/* שרביט כוכב קסם ביד */}
        <line x1="93" y1="98" x2="112" y2="72" stroke="#ffcb47" strokeWidth="3" strokeLinecap="round" />
        <polygon points="112,64 115,71 123,71 117,76 119,83 112,79 105,83 107,76 101,71 109,71" fill="#ffe259" />

        {/* שיער מתוק עם גלים */}
        <path d="M36 68 C 30 85, 34 106, 44 110 C 40 95, 42 80, 48 70 Z" fill="#ff8754" />
        <path d="M94 68 C 100 85, 96 106, 86 110 C 90 95, 88 80, 82 70 Z" fill="#ff8754" />

        {/* פנים עגולות ומתוקות */}
        <circle cx="65" cy="68" r="23" fill="#ffe2ce" />

        {/* סומק ורוד בלחיים */}
        <circle cx="50" cy="74" r="5" fill="#ff8da9" opacity="0.65" />
        <circle cx="80" cy="74" r="5" fill="#ff8da9" opacity="0.65" />

        {/* עיניים גדולות של דמות אנימציה מתוקה */}
        {mood === 'sad' ? (
          <>
            <path d="M50 67 Q 56 62 60 67" stroke="#4a1835" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M70 67 Q 74 62 80 67" stroke="#4a1835" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M59 81 Q 65 76 71 81" stroke="#a03258" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <ellipse cx="54" cy="67" rx="4.5" ry="6" fill="#3b1735" />
            <ellipse cx="76" cy="67" rx="4.5" ry="6" fill="#3b1735" />
            {/* ניצוץ בעין */}
            <circle cx="53" cy="65" r="2" fill="#ffffff" />
            <circle cx="75" cy="65" r="2" fill="#ffffff" />
            <circle cx="56" cy="69" r="0.9" fill="#ffffff" />
            <circle cx="78" cy="69" r="0.9" fill="#ffffff" />
            {/* חיוך מתוק */}
            <path d="M58 76 Q 65 83 72 76" stroke="#c03362" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* פוני / שיער קדמי */}
        <path d="M44 54 C 52 60, 62 60, 65 55 C 68 60, 78 60, 86 54 C 82 48, 48 48, 44 54 Z" fill="#ff8754" />

        {/* כובע קסמים מחודד מתוק (ורוד-פוקסיה עם כוכבים) */}
        <path d="M65 8 C 58 24, 40 44, 38 52 C 55 58, 75 58, 92 52 C 90 44, 72 24, 65 8 Z" fill="url(#hatGrad)" />
        <ellipse cx="65" cy="52" rx="29" ry="7" fill="#ff4081" />
        <ellipse cx="65" cy="52" rx="26" ry="5.5" fill="#ff79b0" />

        {/* פונפון כוכב בראש הכובע */}
        <circle cx="65" cy="8" r="6" fill="#ffe259" className="gnome-tip" />
        <polygon points="65,4 66.5,7 70,7 67,9 68,12 65,10 62,12 63,9 60,7 63.5,7" fill="#ffffff" />

        {/* הגדרות גרדיאנטים */}
        <defs>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4081" />
            <stop offset="100%" stopColor="#8d38c9" />
          </linearGradient>
          <linearGradient id="wingGradL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#80e5ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff99dd" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="wingGradR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#80e5ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff99dd" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function EmberField({ count = 18 }: { count?: number }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 5 + Math.random() * 7,
        drift: Math.random() * 80 - 40,
        sparkle: index % 3 === 0,
      })),
    [count],
  );

  return (
    <div className="ember-field" aria-hidden="true">
      {embers.map((ember) => (
        <span
          key={ember.id}
          className={`ember ${ember.sparkle ? 'sparkle' : ''}`}
          style={{
            left: `${ember.left}%`,
            width: ember.size,
            height: ember.size,
            animationDelay: `${ember.delay}s`,
            animationDuration: `${ember.duration}s`,
            '--drift': `${ember.drift}px`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

export function QuestionVisual({ visual }: { visual?: Visual }) {
  if (!visual) return null;

  if (visual.type === 'numberline') {
    const min = visual.min ?? 0;
    const max = visual.max ?? 20;
    const marker = visual.marker ?? 5;
    const labelEvery = max > 20 ? 5 : 2;
    return (
      <div className="q-visual numberline" aria-hidden="true">
        <div className="nl-axis" />
        {Array.from({ length: max - min + 1 }, (_, index) => {
          const value = min + index;
          const showLabel = value % labelEvery === 0 || value === marker;
          return (
            <span className={`nl-tick ${value === marker ? 'marked' : ''}`} key={value} style={{ left: `${(index / (max - min)) * 100}%` }}>
              <i />
              <b>{showLabel ? value : ''}</b>
              {value === marker && <em className="marker-star">⭐</em>}
            </span>
          );
        })}
      </div>
    );
  }

  if (visual.type === 'parts') {
    return (
      <div className="q-visual parts" aria-hidden="true">
        <div className="part whole">
          <b>{visual.whole}</b>
          <small>השלם</small>
        </div>
        <span className="sign">=</span>
        <div className="part">
          <b>{visual.part}</b>
          <small>חלק 1</small>
        </div>
        <span className="sign">+</span>
        <div className="part missing">
          <b>?</b>
          <small>חלק 2</small>
        </div>
      </div>
    );
  }

  if (visual.type === 'ruler') {
    const length = Math.min(visual.length ?? 10, 20);
    return (
      <div className="q-visual ruler" aria-hidden="true">
        <div className="ruler-body">
          {Array.from({ length: length + 1 }, (_, index) => (
            <i key={index} style={{ left: `${(index / length) * 100}%` }}>
              <b>{index}</b>
            </i>
          ))}
          <div className="ruler-ribbon" style={{ width: '100%' }}>
            <span>{length} ס״מ ✨</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`q-visual shape shape-${visual.shape ?? 'square'}`} aria-hidden="true">
      <span />
    </div>
  );
}

export function HeartRow({ lives }: { lives: number }) {
  return (
    <div className="heart-row" aria-label={`${lives} מתוך 3 לבבות`}>
      {[0, 1, 2].map((index) => (
        <span key={index} className={`heart ${index < lives ? 'on' : 'off'}`}>
          {index < lives ? '💖' : '🤍'}
        </span>
      ))}
    </div>
  );
}
