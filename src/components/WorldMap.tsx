import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { LEVELS, MAX_STARS, TOPICS, WORLDS, WORLD_ORDER, type Difficulty, type LevelDef, type WorldId } from '../game/content';
import { currentLevelId, isCompleted, isUnlocked, totalStars, type Progress } from '../game/storage';
import { StarRow } from './Bits';
import { MapRacers } from './Story';

type Props = {
  progress: Progress;
  difficulty: Difficulty;
  world: WorldId;
  interactive: boolean;
  onPlay: (level: LevelDef) => void;
  onOpenScores: () => void;
  onOpenRacers: () => void;
  onOpenJournal: () => void;
  onSwitchWorld: (world: WorldId) => void;
  onHome: () => void;
};

/* שביל חלק ומתפתל שעובר בדיוק דרך מרכז כל התחנות (Catmull-Rom → Bezier) */
function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const FINISH_MARKERS: Record<WorldId, { icon: string; style?: CSSProperties }> = {
  kingdom: { icon: '🏁' },
  space: { icon: '🚀', style: { left: '89%', top: '9%' } },
  pirates: { icon: '🏴‍☠️', style: { left: '87%', top: '68%' } },
  science: { icon: '🏆', style: { left: '88%', top: '69%' } },
  flowers: { icon: '🌸', style: { left: '88%', top: '12%' } },
  potion: { icon: '🧪', style: { left: '88%', top: '12%' } },
  zoo: { icon: '🦁', style: { left: '88%', top: '12%' } },
  robots: { icon: '🤖', style: { left: '88%', top: '12%' } },
  unicorns: { icon: '🦄', style: { left: '88%', top: '12%' } },
};

const firstLevelIdOf = (world: WorldId) => LEVELS.find((level) => level.world === world)?.id ?? 1;
const isWorldOpen = (world: WorldId, progress: Progress) =>
  WORLD_ORDER.indexOf(world) <= 0 || isCompleted(firstLevelIdOf(world) - 1, progress);

export default function WorldMap({ progress, difficulty, world, interactive, onPlay, onOpenScores, onOpenRacers, onOpenJournal, onSwitchWorld, onHome }: Props) {
  const nodeRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const worldIndex = WORLD_ORDER.indexOf(world);
  const worldLevels = useMemo(() => LEVELS.filter((level) => level.world === world), [world]);
  const firstLevelId = worldLevels[0]?.id ?? 1;
  const lastLevelId = worldLevels[worldLevels.length - 1]?.id ?? firstLevelId;
  const nextLevelId = currentLevelId(progress);
  const activeId = nextLevelId < firstLevelId ? firstLevelId : nextLevelId > lastLevelId ? lastLevelId : nextLevelId;
  const [selected, setSelected] = useState(activeId);
  const stars = totalStars(progress);

  const pathD = useMemo(() => buildSmoothPath(worldLevels.map((level) => ({ x: level.x, y: level.y }))), [worldLevels]);
  const completedCount = worldLevels.filter((level) => isCompleted(level.id, progress)).length;
  const worldUnlocked = isWorldOpen(world, progress);
  const info = WORLDS[world];
  const nextWorld = WORLD_ORDER[worldIndex + 1];
  const previousWorld = WORLD_ORDER[worldIndex - 1];
  const finish = FINISH_MARKERS[world];

  useEffect(() => {
    setSelected(activeId);
    if (window.matchMedia('(max-width: 600px)').matches) {
      nodeRefs.current[activeId]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeId]);

  useEffect(() => {
    if (!interactive) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, button')) return;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        const direction = event.key === 'ArrowUp' || event.key === 'ArrowRight' ? 1 : -1;
        setSelected((current) => {
          const next = Math.min(lastLevelId, Math.max(firstLevelId, current + direction));
          nodeRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          return next;
        });
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const level = LEVELS.find((item) => item.id === selected);
        if (level && worldUnlocked && isUnlocked(level.id, progress)) onPlay(level);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [firstLevelId, interactive, lastLevelId, onPlay, progress, selected, worldUnlocked]);

  const difficultyLabel = difficulty === 'entry' ? '🌱 כניסה' : difficulty === 'medium' ? '⭐ בינוני' : '👑 מומחית';

  const footerText = !worldUnlocked
    ? `🔭 הצצה אל ${info.title}! התחנות נעולות וייפתחו אחרי שתסיימי את ${previousWorld ? WORLDS[previousWorld].title : 'העולם הקודם'}.`
    : completedCount >= worldLevels.length
      ? nextWorld
        ? `${info.badge} ${info.title} · שלומפר ניצח! נפתח מעבר אל ${WORLDS[nextWorld].title} ${WORLDS[nextWorld].badge}`
        : `🏆 ${info.title} · ניצחת בכל העולמות — את אלופת כל העולמות!`
      : `📜 ${info.title} · שלומפר בתחנה ${completedCount + 1} מתוך ${worldLevels.length} — לחצי על המגילות כדי לקרוא מה קרה בדרך`;

  return (
    <div className="map-screen">
      <header className="map-hud">
        <button className="hud-home" type="button" onClick={onHome} aria-label="חזרה למסך הראשי">
          ‹
        </button>
        <div className="hud-stars">
          <span className="hud-star-icon">⭐</span>
          <strong>{stars}</strong>
          <small>/ {MAX_STARS}</small>
        </div>
        <div className="hud-bar">
          <i style={{ width: `${(stars / MAX_STARS) * 100}%` }} />
        </div>
        <div className="world-tabs" role="tablist" aria-label="בחירת עולם">
          {WORLD_ORDER.map((id) => {
            const open = isWorldOpen(id, progress);
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={id === world}
                className={`world-tab ${id === world ? 'active' : ''} ${open ? '' : 'peek'}`}
                onClick={() => onSwitchWorld(id)}
                title={open ? WORLDS[id].title : `${WORLDS[id].title} — אפשר להציץ; התחנות ייפתחו בהמשך המסע`}
              >
                <span aria-hidden="true">{WORLDS[id].badge}</span>
                <b>{WORLDS[id].title}</b>
                {!open && <i aria-hidden="true">🔒</i>}
              </button>
            );
          })}
        </div>
        <span className="hud-pill">{difficultyLabel}</span>
        <button className="hud-scores" type="button" onClick={onOpenJournal} aria-label="יומן המסע — כל הסיפורים">
          📖
        </button>
        <button className="hud-scores" type="button" onClick={onOpenRacers} aria-label="הכירי את החברים של העולם">
          🦄
        </button>
        <button className="hud-scores" type="button" onClick={onOpenScores} aria-label="טבלת אלופות">
          🏆
        </button>
      </header>

      <div className="map-stage">
        <div className={`map-frame world-${world} ${world === 'space' ? 'space-world' : ''}`}>
          <div className={`map-bg map-bg-${world}`} aria-hidden="true" />
          <img
            key={world}
            className="map-image"
            src={info.mapImage}
            alt={`מפת ${info.title}`}
            draggable={false}
            onError={(event) => { (event.target as HTMLImageElement).style.display = 'none'; }}
          />

          <svg className="trail-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={pathD} className="trail-shadow" vectorEffect="non-scaling-stroke" />
            <path d={pathD} className="trail-green" vectorEffect="non-scaling-stroke" />
            <path d={pathD} className="trail-dashes" vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="finish-flag" style={finish.style} aria-hidden="true">{finish.icon}</div>
          <MapRacers completedStations={completedCount} world={world} />

          {worldLevels.map((level) => {
            const entry = progress[String(level.id)];
            const earned = entry?.stars ?? 0;
            const done = earned > 0;
            const unlocked = worldUnlocked && isUnlocked(level.id, progress);
            const mapStationNumber = level.id - firstLevelId + 1;
            const isCurrent = unlocked && level.id === activeId && !done;
            const isSelected = selected === level.id;
            return (
              <button
                key={level.id}
                ref={(element) => {
                  nodeRefs.current[level.id] = element;
                }}
                className={`station ${unlocked ? 'open' : 'locked'} ${done ? 'done' : ''} ${isCurrent ? 'current' : ''} ${isSelected ? 'selected' : ''} ${level.boss ? 'boss' : ''}`}
                style={{ left: `${level.x}%`, top: `${level.y}%` } as CSSProperties}
                type="button"
                disabled={!unlocked}
                onClick={() => {
                  setSelected(level.id);
                  onPlay(level);
                }}
                aria-label={`תחנה ${mapStationNumber}: ${level.name}${entry ? `, ציון ${entry.correct} מתוך ${entry.total}` : ''}${unlocked ? '' : ' (נעולה)'}`}
              >
                {unlocked && (
                  <span className="medal-stars">
                    <StarRow count={earned} size="sm" />
                  </span>
                )}
                <span className="medal">
                  {!unlocked ? (
                    <span className="medal-lock">🔒</span>
                  ) : entry ? (
                    <span className="medal-score">
                      <b>{entry.correct}/{entry.total}</b>
                      <small>נכונות</small>
                    </span>
                  ) : (
                    <span className="medal-number">{level.boss ? '👑' : mapStationNumber}</span>
                  )}
                  {level.boss && unlocked && <span className="medal-crown">👑</span>}
                </span>
                <span className="medal-name">
                  {mapStationNumber}. {level.name}
                </span>
                <span className="medal-topics">
                  {level.topics.slice(0, 3).map((topicId) => TOPICS[topicId].icon).join(' ')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <footer className="map-foot">
        <span>{footerText}</span>
      </footer>
    </div>
  );
}
