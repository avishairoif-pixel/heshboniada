import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { LEVELS, WORLDS, type WorldId } from '../game/content';
import { SCENE_DETAILS, WORLD_CASTS, racerById, type RacerId, type StoryBeat, type StoryLine } from '../game/story';

type Props = {
  beat: StoryBeat;
  playerName: string;
  readOnly: boolean;
  onFinish: () => void;
};

const FRAME_COUNT = 3;

const firstIdOf = (world: WorldId) => LEVELS.find((level) => level.world === world)?.id ?? 1;

export default function StoryScene({ beat, playerName, readOnly, onFinish }: Props) {
  const [frame, setFrame] = useState(0);
  const scene = SCENE_DETAILS[beat.afterStation] ?? SCENE_DETAILS[0];
  const isHero = (speaker: StoryLine['speaker']) => typeof speaker === 'string' && speaker.endsWith('shlomper');
  const rivalLine = beat.lines.find((line) => line.speaker !== 'narrator' && !isHero(line.speaker));
  const heroLine = beat.lines.find((line) => isHero(line.speaker));
  const voices = [rivalLine, heroLine].filter((line): line is StoryLine => line !== undefined);

  const currentLevel = LEVELS.find((level) => level.id === beat.afterStation);
  const beatWorld: WorldId = currentLevel?.world ?? 'kingdom';
  const heroId = WORLD_CASTS[beatWorld][0].id;
  const actor = frame === 1 && voices.length > 0 ? racerById(voices[0].speaker as RacerId) : racerById(heroId);
  const localStation = beat.afterStation - (firstIdOf(beatWorld) - 1);
  const nextStation = LEVELS.find((level) => level.id === beat.afterStation + 1);
  const crossesWorld = Boolean(nextStation && currentLevel && nextStation.world !== beatWorld);
  const isGrandFinale = !nextStation;
  const nextWorldInfo = nextStation ? WORLDS[nextStation.world] : null;
  const nextStationNumber = nextStation ? nextStation.id - (firstIdOf(nextStation.world) - 1) : 0;

  const chapter = beat.afterStation === 0
    ? 'פרולוג'
    : isGrandFinale
      ? 'הניצחון הגדול'
      : crossesWorld && nextWorldInfo
        ? `השער אל ${nextWorldInfo.title}`
        : `אחרי תחנה ${localStation} · ${WORLDS[beatWorld].title}`;

  const advance = useCallback(() => {
    if (frame === FRAME_COUNT - 1) onFinish();
    else setFrame((current) => current + 1);
  }, [frame, onFinish]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onFinish();
        return;
      }
      if ((event.target as HTMLElement | null)?.closest('button')) return;
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowLeft') {
        event.preventDefault();
        advance();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setFrame((current) => Math.max(0, current - 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [advance, onFinish]);

  const finishLabel = readOnly
    ? 'חזרה למפה'
    : isGrandFinale
      ? 'למפת הניצחון ✨'
      : crossesWorld && nextWorldInfo
        ? `ממשיכות אל ${nextWorldInfo.title}! ${nextWorldInfo.badge}`
        : nextStation
          ? `למפה, לתחנה ${nextStationNumber}: ${nextStation.name}`
          : 'חזרה למפה';

  const caption = frame === 0
    ? 'הסיפור ממשיך'
    : frame === 1
      ? 'מה קורה בין החברים?'
      : isGrandFinale
        ? 'וכולם חוגגים יחד!'
        : crossesWorld
          ? 'אבל מה מחכה מעבר לשער?'
          : 'ההרפתקה הבאה מתקרבת';

  return (
    <main className={`story-scene story-scene-${beat.afterStation}`} style={{ '--scene-accent': actor.color } as CSSProperties} dir="rtl">
      <img className="scene-landscape" src={scene.art} style={{ objectPosition: scene.position }} alt="" />
      <div className="scene-vignette" aria-hidden="true" />

      <header className="scene-header">
        <span className="scene-brand">✦ החשבוניאדה <span className="scene-header-separator">/</span> {chapter}</span>
        <button type="button" className="scene-exit" onClick={onFinish} aria-label="חזרה למפה">חזרה למפה <span aria-hidden="true">×</span></button>
      </header>

      <div className="scene-main">
        <div className="scene-headline">
          <span className="scene-eyebrow">{beat.kicker}</span>
          <h1>{beat.title}</h1>
          <p>סיפור המסע של שלומפר · {frame + 1} מתוך {FRAME_COUNT}</p>
        </div>
        <div className="scene-character" key={`${beat.id}-${frame}`}>
          <img src={actor.image} alt={`איור של ${actor.name}`} />
          <span>{actor.name}</span>
        </div>
      </div>

      <section className="scene-dialogue" aria-live="polite" aria-label="סצנת הסיפור">
        <div className="scene-dialogue-top">
          <span className="scene-dialogue-caption">{caption}</span>
          <div className="scene-steps" aria-label={`סצנה ${frame + 1} מתוך ${FRAME_COUNT}`}>
            {Array.from({ length: FRAME_COUNT }, (_, step) => (
              <button key={step} type="button" className={step === frame ? 'active' : ''} onClick={() => setFrame(step)} aria-label={`מעבר לחלק ${step + 1}`} />
            ))}
          </div>
        </div>

        <div className="scene-dialogue-content" key={`${beat.id}-text-${frame}`}>
          {frame === 0 && (
            <p className="scene-narration">{beat.afterStation === 0 ? `היי ${playerName}! ` : ''}{scene.summary}</p>
          )}
          {frame === 1 && (
            <div className="scene-exchange">
              {voices.map((line, index) => {
                const racer = racerById(line.speaker as RacerId);
                return (
                  <p key={`${racer.id}-${index}`}>
                    <img src={racer.image} alt="" />
                    <span><strong>{racer.name}:</strong> {line.text}</span>
                  </p>
                );
              })}
            </div>
          )}
          {frame === 2 && (
            <div className="scene-cliffhanger">
              <span className="scene-hook-mark" aria-hidden="true">✦</span>
              <p>{scene.hook}</p>
              <small>
                {isGrandFinale
                  ? 'ניצחון בכל העולמות!'
                  : crossesWorld && nextWorldInfo
                    ? `ההרפתקה הבאה: ${nextWorldInfo.title} ${nextWorldInfo.badge}`
                    : `המשימה הבאה: ${nextStation?.name ?? ''}`}
              </small>
            </div>
          )}
        </div>

        <div className="scene-dialogue-actions">
          <button type="button" className="scene-back" onClick={() => setFrame((current) => Math.max(0, current - 1))} disabled={frame === 0}>
            הקודם
          </button>
          <button type="button" className="scene-advance" onClick={advance}>
            {frame === FRAME_COUNT - 1 ? finishLabel : 'ומה קרה אחר כך?'} <span aria-hidden="true">←</span>
          </button>
        </div>
      </section>
    </main>
  );
}
