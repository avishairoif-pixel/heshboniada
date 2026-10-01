import { useMemo } from 'react';
import { LEVELS, WORLDS, type WorldId } from '../game/content';
import { STORY_BEATS, castFor, getRacePositions, racerById } from '../game/story';
import type { Progress } from '../game/storage';

/* ---------- הכירי את החברים של העולם ---------- */
export function RacersModal({ world, onClose, onStart }: { world: WorldId; onClose: () => void; onStart?: () => void }) {
  const cast = castFor(world);
  const info = WORLDS[world];
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="הכירי את החברים">
      <div className="panel racers-panel">
        <button className="panel-close" type="button" onClick={onClose} aria-label="סגירה">×</button>
        <div className="story-kicker">{info.badge} {info.title} מציגה</div>
        <h2>{world === 'kingdom' ? 'מתחרי החשבוניאדה!' : `החברים של ${info.title}!`}</h2>
        <p className="panel-sub">
          {world === 'kingdom'
            ? 'חמישה חברים, מרוץ אחד גדול — ואת העוזרת של שלומפר!'
            : 'שלומפר תמיד איתך — ובכל עולם מחכים לו חברים ומתחרים חדשים!'}
        </p>
        <div className="racers-grid">
          {cast.map((racer, i) => (
            <div
              key={racer.id}
              className={`racer-card ${racer.id.endsWith('shlomper') ? 'hero-card' : ''}`}
              style={{ ['--racer-color' as string]: racer.color, animationDelay: `${i * 0.1}s` }}
            >
              <div className="racer-img-wrap">
                <img src={racer.image} alt={racer.name} loading="lazy" />
                {racer.id.endsWith('shlomper') && <span className="racer-star-badge">⭐ שלנו!</span>}
              </div>
              <div className="racer-card-body">
                <b>{racer.emoji} {racer.name}</b>
                <small className="racer-title">{racer.title}</small>
                <small className="racer-vehicle">🚀 {racer.vehicle}</small>
                <p>{racer.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="panel-actions">
          {onStart && (
            <button className="btn-primary big" type="button" onClick={onStart}>
              מתחילים את המרוץ! 🏁
            </button>
          )}
          <button className="btn-ghost" type="button" onClick={onClose}>סגירה</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- מיקומים על מפת העולם ---------- */
function worldPosToXY(p: number, world: WorldId): { x: number; y: number } {
  const levels = LEVELS.filter((level) => level.world === world);
  if (p <= 0) return { x: levels[0].x, y: levels[0].y };
  if (p >= levels.length) {
    const last = levels[levels.length - 1];
    return { x: last.x, y: Math.max(4, last.y - 7) };
  }
  const i = Math.min(levels.length - 2, Math.floor(p));
  const fraction = p - i;
  const from = levels[i];
  const to = levels[i + 1];
  return { x: from.x + (to.x - from.x) * fraction, y: from.y + (to.y - from.y) * fraction };
}

const HERO_OFFSET = { dx: 0, dy: -56 };
const SLOT_OFFSETS = [
  { dx: 56, dy: -22 },
  { dx: -56, dy: -22 },
  { dx: 66, dy: 25 },
  { dx: -66, dy: 25 },
];

/* ---------- יומן המסע — כל סיפורי המגילות שהתגלו ---------- */
export function StoryJournalModal({
  progress,
  onClose,
  onOpenStory,
}: {
  progress: Progress;
  onClose: () => void;
  onOpenStory: (afterStation: number) => void;
}) {
  const unlockedBeats = useMemo(
    () => STORY_BEATS.filter((beat) => {
      const level = LEVELS.find((item) => item.id === beat.afterStation);
      if (beat.afterStation === 0) return true;
      if (!level) return false;
      return Boolean(progress[String(level.id)]?.stars);
    }),
    [progress]
  );
  const lockedCount = STORY_BEATS.length - unlockedBeats.length;

  const worldOfBeat = (afterStation: number): WorldId => {
    const level = LEVELS.find((item) => item.id === afterStation);
    if (level) return level.world;
    if (afterStation === 0) return 'kingdom';
    // מעברי עולמות: אחרי 9=החלל, אחרי 18=פיראטים, אחרי 27=מדע
    if (afterStation === 9) return 'space';
    if (afterStation === 18) return 'pirates';
    if (afterStation === 27) return 'science';
    return 'kingdom';
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="יומן המסע">
      <div className="panel journal-panel">
        <button className="panel-close" type="button" onClick={onClose} aria-label="סגירה">×</button>
        <div className="story-kicker">📖 יומן המסע של שלומפר</div>
        <h2>הסיפורים שהתגלו בדרך</h2>
        <p className="panel-sub">כל תחנה שסיימת פותחת פרק חדש בסיפור. לחצי על פרק כדי לקרוא שוב!</p>
        <div className="journal-grid">
          {unlockedBeats.map((beat) => {
            const world = worldOfBeat(beat.afterStation);
            const info = WORLDS[world];
            const stationLabel = beat.afterStation === 0 ? 'פתיחה' : `אחרי תחנה ${beat.afterStation}`;
            return (
              <button
                key={beat.id}
                type="button"
                className={`journal-card journal-${world}`}
                onClick={() => onOpenStory(beat.afterStation)}
              >
                <span className="journal-card-badge" aria-hidden="true">{info.badge}</span>
                <span className="journal-card-kicker">{beat.kicker}</span>
                <b className="journal-card-title">{beat.title}</b>
                <small className="journal-card-meta">{info.title} · {stationLabel}</small>
              </button>
            );
          })}
          {lockedCount > 0 && (
            <div className="journal-locked">
              <span aria-hidden="true">🔒</span>
              <b>עוד {lockedCount} פרקים מחכים לך</b>
              <small>סיימי עוד תחנות כדי לפתוח סיפורים חדשים</small>
            </div>
          )}
        </div>
        <div className="panel-actions">
          <button className="btn-ghost" type="button" onClick={onClose}>סגירה</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- דמויות המתחרים על המפה — לפי העולם ---------- */
export function MapRacers({ completedStations, world }: { completedStations: number; world: WorldId }) {
  const positions = useMemo(() => getRacePositions(completedStations, world), [completedStations, world]);
  return (
    <div className="map-racers" aria-hidden="true">
      {positions.map(({ racerId, position, slot }) => {
        const racer = racerById(racerId);
        const { x, y } = worldPosToXY(position, world);
        const isHero = racerId.endsWith('shlomper');
        const off = isHero ? HERO_OFFSET : SLOT_OFFSETS[slot] ?? HERO_OFFSET;
        return (
          <div
            key={racerId}
            className={`map-token ${isHero ? 'hero-token' : ''}`}
            style={{ left: `${x}%`, top: `${y}%`, ['--racer-color' as string]: racer.color, ['--tdx' as string]: `${off.dx}px`, ['--tdy' as string]: `${off.dy}px` }}
            title={`${racer.name} — ${racer.vehicle}`}
          >
            <img src={racer.image} alt="" loading="lazy" />
            <span className="token-emoji">{racer.emoji}</span>
          </div>
        );
      })}
    </div>
  );
}
