import { useCallback, useEffect, useState } from 'react';
import { DIFFICULTIES, DIFFICULTY_LABEL, LEVELS, REGIONS, TOPICS, type Difficulty, type LevelDef, type WorldId } from './game/content';
import { getBeatAfterStation, type StoryBeat } from './game/story';
import { currentLevelId, isCompleted, loadProgress, loadScores, resetProgress, saveProgress, totalScore, totalStars, upsertScore, type Progress, type ScoreEntry } from './game/storage';
import { EmberField, StarRow } from './components/Bits';
import { RacersModal, StoryJournalModal } from './components/Story';
import StoryScene from './components/StoryScene';
import WorldMap from './components/WorldMap';
import LevelPlay, { type LevelResult } from './components/LevelPlay';
import { InstallModal, useInstallPrompt } from './components/Install';

type Screen = 'start' | 'map' | 'play' | 'story';
type Overlay = null | 'intro' | 'complete' | 'failed' | 'pause' | 'scores' | 'racers' | 'journal' | 'install' | 'reset';

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('entry');
  const [world, setWorld] = useState<WorldId>('kingdom');
  const [playerName, setPlayerName] = useState('אלופה');
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [scores, setScores] = useState<ScoreEntry[]>(loadScores);
  const [activeLevel, setActiveLevel] = useState<LevelDef | null>(null);
  const [result, setResult] = useState<LevelResult | null>(null);
  const [runId, setRunId] = useState(0);
  const [storyBeat, setStoryBeat] = useState<StoryBeat | null>(null);
  const [storyReadOnly, setStoryReadOnly] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  const completedCount = LEVELS.filter((level) => isCompleted(level.id, progress)).length;
  const { canInstall, isInstalled, promptInstall } = useInstallPrompt();

  const handleInstallClick = useCallback(async () => {
    const done = await promptInstall();
    if (done) setOverlay(null);
  }, [promptInstall]);

  const handleReset = useCallback(() => {
    const { progress: empty, scores: defaults } = resetProgress();
    setProgress(empty);
    setScores(defaults);
    setOverlay(null);
    setScreen('start');
  }, []);

  const openLevel = useCallback((level: LevelDef) => {
    setActiveLevel(level);
    setOverlay('intro');
  }, []);

  const beginLevel = useCallback(() => {
    setRunId((current) => current + 1);
    setOverlay(null);
    setScreen('play');
  }, []);

  const handleFinish = useCallback(
    (levelResult: LevelResult) => {
      setResult(levelResult);
      const key = String(levelResult.levelId);
      const previous = progress[key];
      const isBetter = levelResult.stars > (previous?.stars ?? 0) || (levelResult.stars === (previous?.stars ?? 0) && levelResult.score > (previous?.score ?? 0));
      const next: Progress = {
        ...progress,
        [key]: isBetter
          ? { stars: levelResult.stars, score: levelResult.score, correct: levelResult.correct, total: levelResult.total }
          : (previous ?? { stars: levelResult.stars, score: levelResult.score, correct: levelResult.correct, total: levelResult.total }),
      };

      setProgress(next);
      saveProgress(next);
      setScores(
        upsertScore({
          name: playerName.trim().slice(0, 12) || 'אלופה',
          stars: totalStars(next),
          score: totalScore(next),
          difficulty: DIFFICULTY_LABEL[difficulty],
          date: new Date().toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit' }),
        })
      );
      setOverlay(levelResult.stars > 0 ? 'complete' : 'failed');
    },
    [difficulty, playerName, progress]
  );

  const backToMap = useCallback(() => {
    setOverlay(null);
    setActiveLevel(null);
    setResult(null);
    setScreen('map');
  }, []);

  const retryLevel = useCallback(() => {
    setResult(null);
    beginLevel();
  }, [beginLevel]);

  /* הסיפור פותח את המרוץ לפני התחנה הראשונה. */
  const startAdventure = useCallback(() => {
    // ממשיכות תמיד בעולם שבו נמצאת התחנה הבאה במסע
    const nextLevel = LEVELS.find((level) => level.id === currentLevelId(progress));
    setWorld(nextLevel?.world ?? 'kingdom');
    if (completedCount === 0 && !onboarded) {
      const opening = getBeatAfterStation(0);
      if (opening) {
        setStoryBeat(opening);
        setStoryReadOnly(false);
        setOverlay(null);
        setScreen('story');
        return;
      }
    }
    setOverlay(null);
    setScreen('map');
  }, [completedCount, onboarded, progress]);

  /* אחרי כל תחנה עוברים לסצנה מאוירת, ורק בסופה חוזרים למפה. */
  const showStoryForLevel = useCallback((levelId: number) => {
    const beat = getBeatAfterStation(levelId);
    if (!beat) {
      backToMap();
      return;
    }
    setStoryBeat(beat);
    setStoryReadOnly(false);
    setOverlay(null);
    setScreen('story');
  }, [backToMap]);

  const continueStory = useCallback(() => {
    const beat = storyBeat;
    if (!storyReadOnly && beat) {
      // אחרי סצנת מעבר עוברים לעולם של התחנה הבאה (למשל מהחלל לאיי האוצר)
      const nextLevel = LEVELS.find((level) => level.id === beat.afterStation + 1);
      const currentLevel = LEVELS.find((level) => level.id === beat.afterStation);
      setWorld(nextLevel?.world ?? currentLevel?.world ?? 'kingdom');
    }
    setStoryBeat(null);
    setStoryReadOnly(false);
    setOverlay(null);
    setActiveLevel(null);
    setResult(null);
    setOnboarded(true);
    setScreen('map');
  }, [storyBeat, storyReadOnly]);

  const openRacers = useCallback(() => setOverlay('racers'), []);

  /* קריאת מגילת סיפור מהמפה — בכל זמן, שוב ושוב */
  const openStoryScroll = useCallback((afterStation: number) => {
    const beat = getBeatAfterStation(afterStation);
    if (!beat) return;
    setStoryBeat(beat);
    setStoryReadOnly(true);
    setOverlay(null);
    setScreen('story');
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, button')) return;
      if (event.key === 'Enter') {
        if (screen === 'start' && overlay === null) {
          event.preventDefault();
          startAdventure();
        } else if (overlay === 'intro') {
          event.preventDefault();
          beginLevel();
        } else if (overlay === 'failed') {
          event.preventDefault();
          retryLevel();
        } else if (overlay === 'complete' && activeLevel) {
          event.preventDefault();
          showStoryForLevel(activeLevel.id);
        }
      }
      if (event.key === 'Escape' && (overlay === 'scores' || overlay === 'racers' || overlay === 'journal')) setOverlay(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeLevel, beginLevel, overlay, retryLevel, screen, showStoryForLevel, startAdventure]);

  const questComplete = result && activeLevel && activeLevel.id === LEVELS.length && result.stars > 0;

  return (
    <div className="app" dir="rtl">
      {/* הילה צבעונית קסומה ברקע */}
      <div className="glow glow-a" />
      <div className="glow glow-b" />

      {/* מסך פתיחה: שלומפר ועולם המרוץ הם האיור הראשי, בלי דמות הגמד. */}
      {screen === 'start' && (
        <main className="start-screen race-home">
          <img className="race-home-art" src="images/race-hero.jpg" alt="" />
          <div className="race-home-shade" aria-hidden="true" />
          <EmberField count={12} />
          <div className="race-home-content">
            <div className="race-home-kicker">ארץ החשבון מזמינה אותך למרוץ</div>
            <h1 className="race-home-title">החשבוניאדה<span>המרוץ של שלומפר</span></h1>
            <p className="race-home-lead">עזרי לשלומפר לנצח את המרוץ עד טירת הקשת. בכל תחנה פותרות חידות חשבון ומגלות פרק חדש בסיפור.</p>

            <div className="race-home-options">
              <span className="race-home-label">בחרי רמת קושי</span>
              <div className="race-difficulty" role="group" aria-label="רמת קושי">
                {DIFFICULTIES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={difficulty === item.id ? 'active' : ''}
                    onClick={() => setDifficulty(item.id)}
                    aria-pressed={difficulty === item.id}
                    aria-label={`${item.label}: ${item.caption}`}
                  >
                    <b>{item.label}</b>
                    <small>{item.caption}</small>
                  </button>
                ))}
              </div>
              <div className="race-home-actions">
                <label className="race-name-field">
                  <span>איך קוראים לך?</span>
                  <input
                    value={playerName}
                    maxLength={12}
                    onChange={(event) => setPlayerName(event.target.value.slice(0, 12))}
                    placeholder="השם שלך"
                  />
                </label>
                <button className="race-play-button" type="button" onClick={startAdventure}>
                  {completedCount > 0 ? 'ממשיכות במרוץ' : 'יוצאות לקו הזינוק'} <span aria-hidden="true">←</span>
                </button>
              </div>
            </div>
            <div className="race-home-links">
              <button type="button" onClick={openRacers}>הכירי את המתחרים</button>
              <button type="button" onClick={() => setOverlay('scores')}>טבלת שיאים</button>
              {!isInstalled && <button type="button" onClick={() => setOverlay('install')}>התקנה לטלפון</button>}
              {completedCount > 0 && <button type="button" onClick={() => setOverlay('reset')}>איפוס התקדמות</button>}
            </div>
          </div>
        </main>
      )}

      {/* מפת המסע - צבעונית, ברורה, עם שבילים מוארים */}
      {screen === 'map' && (
        <WorldMap
          progress={progress}
          difficulty={difficulty}
          world={world}
          interactive={overlay === null}
          onPlay={openLevel}
          onOpenScores={() => setOverlay('scores')}
          onOpenRacers={openRacers}
          onOpenJournal={() => setOverlay('journal')}
          onSwitchWorld={setWorld}
          onHome={() => setScreen('start')}
        />
      )}

      {/* מסך השאלה והמשחק */}
      {screen === 'play' && activeLevel && (
        <LevelPlay
          key={`${activeLevel.id}-${runId}`}
          level={activeLevel}
          difficulty={difficulty}
          paused={overlay !== null}
          onPause={() => setOverlay(overlay === 'pause' ? null : 'pause')}
          onFinish={handleFinish}
        />
      )}

      {screen === 'story' && storyBeat && (
        <StoryScene
          key={storyBeat.id}
          beat={storyBeat}
          playerName={playerName.trim() || 'אלופה'}
          readOnly={storyReadOnly}
          onFinish={continueStory}
        />
      )}

      {/* חלון פתיחת שלב */}
      {overlay === 'intro' && activeLevel && (
        <div className="overlay">
          <div className="panel intro-panel">
            <div className="panel-badge" style={{ background: REGIONS[activeLevel.region].color }}>
              {activeLevel.boss ? '👑 שלב בונוס מיוחד' : `שלב ${activeLevel.id}`}
            </div>
            <h2>{activeLevel.name}</h2>
            <p className="panel-sub">
              {REGIONS[activeLevel.region].name} · {REGIONS[activeLevel.region].tagline}
            </p>

            <div className="topic-list">
              {activeLevel.topics.map((topicId) => (
                <span key={topicId} className="topic-tag">
                  {TOPICS[topicId].icon} {TOPICS[topicId].label}
                </span>
              ))}
            </div>

            <div className="goal-box">
              <div>
                <b>5</b>
                <small>שאלות בתחנה</small>
              </div>
              <div>
                <b>💖💖💖</b>
                <small>3 לבבות עוזרים</small>
              </div>
              <div>
                <b>5/5 = ★★★</b>
                <small>כל הנכונות = כוכבים</small>
              </div>
            </div>

            <p className="goal-note">
              {difficulty === 'entry'
                ? 'ברמת כניסה אין שעון — קחי את הזמן לחשוב. בסוף 5 השאלות הציון יופיע על התחנה! 🌟'
                : `יש לך ${DIFFICULTIES.find((item) => item.id === difficulty)?.time} שניות נינוחות לכל שאלה. בסוף 5 השאלות הציון יופיע על התחנה! 🌟`}
            </p>

            <div className="panel-actions">
              <button className="btn-primary big" type="button" onClick={beginLevel}>
                בואי נתחיל! ✨
              </button>
              <button className="btn-ghost" type="button" onClick={backToMap}>
                חזרה למפה
              </button>
            </div>
          </div>
        </div>
      )}

      {/* חלון השהייה */}
      {overlay === 'pause' && (
        <div className="overlay">
          <div className="panel">
            <div className="panel-icon">⏸️</div>
            <h2>עצרנו לרגע</h2>
            <p className="panel-sub">הפיה שומרת על המקום שלך עד שתחזרי!</p>
            <div className="panel-actions">
              <button className="btn-primary big" type="button" onClick={() => setOverlay(null)}>
                ממשיכים לשחק 💖
              </button>
              <button className="btn-ghost" type="button" onClick={backToMap}>
                יציאה למפה
              </button>
            </div>
          </div>
        </div>
      )}

      {/* חלון הצלחה וסיום שלב */}
      {overlay === 'complete' && result && (
        <div className="overlay result-overlay">
          <div className="panel stage-result-panel" role="dialog" aria-modal="true" aria-label="תוצאות התחנה">
            <div className="stage-result-portrait">
              <img src="images/racers/shlomper.jpg" alt="שלומפר החד-קרן מחייך" />
              <span>שלומפר גאה בך!</span>
            </div>
            <div className="stage-result-content">
              <span className="stage-result-kicker">תחנה {activeLevel?.id} · {activeLevel?.name}</span>
              <h2>{questComplete ? 'הגעת לקו הגמר!' : result.stars === 3 ? 'וואו, מושלם!' : 'כל הכבוד!'}</h2>
              <div className="stage-result-numbers">
                <div className="stage-result-grade">
                  <strong>{result.correct}/{result.total}</strong>
                  <span>תשובות נכונות</span>
                </div>
                <div className="stage-result-stars">
                  <StarRow count={result.stars} size="md" animate />
                  <span>הכוכבים שלך</span>
                </div>
                <span className="stage-result-points">+{result.score.toLocaleString('he-IL')} נק׳</span>
              </div>
              <p className="stage-result-hint">
                {questComplete ? 'הסיפור האחרון מחכה לך בקו הגמר!' : 'הציון כבר על המפה. מה מחכה לשלומפר בהמשך?'}
              </p>
              <div className="stage-result-actions">
                <button className="btn-primary stage-result-next" type="button" onClick={() => activeLevel && showStoryForLevel(activeLevel.id)}>
                  {questComplete ? 'גלי מי ניצח! ←' : 'ממשיכות בסיפור ←'}
                </button>
                <button className="btn-ghost" type="button" onClick={backToMap}>למפה</button>
                <button className="btn-ghost" type="button" onClick={retryLevel}>לנסות שוב</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* חלון ניסיון מחדש */}
      {overlay === 'failed' && (
        <div className="overlay result-overlay">
          <div className="panel stage-result-panel" role="dialog" aria-modal="true" aria-label="סיום התחנה">
            <div className="stage-result-portrait">
              <img src="images/racers/shlomper.jpg" alt="שלומפר ממתין לניסיון הבא" />
              <span>אני איתך!</span>
            </div>
            <div className="stage-result-content">
              <span className="stage-result-kicker">תחנה {activeLevel?.id} · {activeLevel?.name}</span>
              <h2>ננסה שוב ביחד?</h2>
              <div className="stage-result-numbers">
                <div className="stage-result-grade">
                  <strong>{result?.correct ?? 0}/{result?.total ?? 5}</strong>
                  <span>תשובות נכונות</span>
                </div>
                <div className="stage-result-stars"><StarRow count={0} size="md" /><span>אפשר עוד להשתפר</span></div>
              </div>
              <p className="stage-result-hint">שלומפר סומך עלייך. הציון נשמר על המפה ותוכלי לשפר אותו!</p>
              <div className="stage-result-actions">
                <button className="btn-primary stage-result-next" type="button" onClick={retryLevel}>מנסות שוב ←</button>
                <button className="btn-ghost" type="button" onClick={backToMap}>חזרה למפה</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* חלון טבלת שיאים */}
      {overlay === 'scores' && (
        <div className="overlay" onClick={() => setOverlay(null)}>
          <div className="panel" onClick={(event) => event.stopPropagation()}>
            <button className="panel-close" type="button" onClick={() => setOverlay(null)} aria-label="סגירה">
              ×
            </button>
            <h2>🏆 טבלת האלופות</h2>
            <p className="panel-sub">השיאים המובילים שנשמרו במכשיר</p>
            <div className="score-table">
              <div className="score-head">
                <span>#</span>
                <span>שם</span>
                <span>כוכבים</span>
                <span>ניקוד</span>
              </div>
              {scores.map((entry, entryIndex) => (
                <div className="score-row" key={`${entry.name}-${entryIndex}`}>
                  <span className={`rank r${entryIndex + 1}`}>{entryIndex + 1}</span>
                  <span className="sc-name">
                    {entry.name}
                    <small>{entry.difficulty}</small>
                  </span>
                  <span className="sc-stars">⭐ {entry.stars}</span>
                  <strong>{entry.score.toLocaleString('he-IL')}</strong>
                </div>
              ))}
            </div>
            <div className="panel-actions">
              <button className="btn-primary" type="button" onClick={() => { setOverlay(null); setScreen('map'); }}>
                למפת המסע ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* חלון התקנה לטלפון */}
      {overlay === 'install' && (
        <InstallModal
          canInstall={canInstall}
          isInstalled={isInstalled}
          onInstall={handleInstallClick}
          onClose={() => setOverlay(null)}
        />
      )}

      {/* חלון אישור איפוס התקדמות */}
      {overlay === 'reset' && (
        <div className="overlay" onClick={() => setOverlay(null)}>
          <div className="panel" role="dialog" aria-modal="true" aria-label="איפוס התקדמות" onClick={(event) => event.stopPropagation()}>
            <button className="panel-close" type="button" onClick={() => setOverlay(null)} aria-label="סגירה">×</button>
            <div className="panel-icon">🔄</div>
            <h2>לאפס את ההתקדמות?</h2>
            <p className="panel-sub">
              פעולה זו תמחק את כל הכוכבים, הציונים וטבלת השיאים. אי אפשר לבטל אותה.
              מומלץ רק כשרוצים שחקן חדש יתחיל מההתחלה.
            </p>
            <div className="panel-actions">
              <button className="btn-primary" type="button" onClick={handleReset}>
                כן, לאפס הכל
              </button>
              <button className="btn-ghost" type="button" onClick={() => setOverlay(null)}>
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* חלון הכירי את המתחרים */}
      {overlay === 'racers' && (
        <RacersModal
          world={world}
          onClose={() => setOverlay(null)}
          onStart={screen === 'start' ? startAdventure : undefined}
        />
      )}

      {/* חלון יומן המסע — כל הסיפורים שהתגלו */}
      {overlay === 'journal' && (
        <StoryJournalModal
          progress={progress}
          onClose={() => setOverlay(null)}
          onOpenStory={(afterStation) => {
            setOverlay(null);
            openStoryScroll(afterStation);
          }}
        />
      )}
    </div>
  );
}
