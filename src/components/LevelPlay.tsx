import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { DIFFICULTIES, REGIONS, TOPICS, buildLevelQuestions, shuffle, type Difficulty, type LevelDef } from '../game/content';
import { starsForCorrect } from '../game/storage';
import { HeartRow, QuestionVisual } from './Bits';

export type LevelResult = {
  levelId: number;
  stars: number;
  score: number;
  correct: number;
  total: number;
};

type Props = {
  level: LevelDef;
  difficulty: Difficulty;
  paused: boolean;
  onPause: () => void;
  onFinish: (result: LevelResult) => void;
};

type BurstDot = { id: number; tx: number; ty: number; rotate: number; delay: number; size: number; kind: number };

export default function LevelPlay({ level, difficulty, paused, onPause, onFinish }: Props) {
  const config = useMemo(() => DIFFICULTIES.find((item) => item.id === difficulty) ?? DIFFICULTIES[0], [difficulty]);
  const timerEnabled = config.time !== null;
  const questions = useMemo(() => buildLevelQuestions(level, difficulty), [level, difficulty]);
  const region = REGIONS[level.region];

  const [index, setIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<'correct' | 'wrong' | null>(null);
  const [timeLeft, setTimeLeft] = useState(config.time ?? 0);
  const [hidden, setHidden] = useState<number[]>([]);
  const [spellUsed, setSpellUsed] = useState(false);
  const [burst, setBurst] = useState<BurstDot[]>([]);
  const [floatText, setFloatText] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const indexRef = useRef(0);
  const livesRef = useRef(3);
  const scoreRef = useRef(0);
  const correctRef = useRef(0);
  const streakRef = useRef(0);
  const finishedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const answerRef = useRef<(choice: number) => void>(() => undefined);

  const question = questions[index];

  const schedule = useCallback((callback: () => void, delay: number) => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(callback, delay);
  }, []);

  useEffect(() => () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
  }, []);

  const makeBurst = useCallback((kind: 'correct' | 'wrong') => {
    const count = kind === 'correct' ? 24 : 12;
    setBurst(
      Array.from({ length: count }, (_, id) => ({
        id: Date.now() + id,
        tx: Math.random() * 320 - 160,
        ty: -(Math.random() * 200 + 40),
        rotate: Math.random() * 360,
        delay: Math.random() * 0.1,
        size: 8 + Math.random() * 8,
        kind: kind === 'correct' ? Math.floor(Math.random() * 3) : 3,
      }))
    );
    window.setTimeout(() => setBurst([]), 1000);
  }, []);

  /* תמיד משחקים את כל 5 השאלות — הכוכבים נקבעים לפי מספר התשובות הנכונות */
  const finish = useCallback(
    () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      const stars = starsForCorrect(correctRef.current, questions.length);
      const bonus = stars === 3 ? 300 : 0;
      onFinish({
        levelId: level.id,
        stars,
        score: scoreRef.current + bonus,
        correct: correctRef.current,
        total: questions.length,
      });
    },
    [level.id, onFinish, questions.length]
  );

  const advance = useCallback(() => {
    if (finishedRef.current) return;
    if (indexRef.current + 1 >= questions.length) {
      finish();
      return;
    }
    indexRef.current += 1;
    setIndex(indexRef.current);
    setTimeLeft(config.time ?? 0);
    setAnswerState(null);
    setSelected(null);
    setHidden([]);
    setFloatText(null);
  }, [config.time, finish, questions.length]);

  const handleAnswer = useCallback(
    (choice: number) => {
      if (finishedRef.current || answerState || paused) return;
      const active = questions[indexRef.current];
      if (!active) return;
      const isCorrect = choice === active.correctIndex;
      setSelected(choice >= 0 ? choice : null);

      if (isCorrect) {
        const timeBonus = timerEnabled ? timeLeft * 4 : 0;
        const gained = config.points + streakRef.current * 25 + timeBonus;
        scoreRef.current += gained;
        correctRef.current += 1;
        streakRef.current += 1;
        setScore(scoreRef.current);
        setStreak(streakRef.current);
        setAnswerState('correct');
        setFloatText(`+${gained} ⭐`);
        makeBurst('correct');
        schedule(advance, 1100);
      } else {
        /* טעות מורידה לב, אבל ממשיכים עד סוף 5 השאלות — כמו שביקשו */
        livesRef.current = Math.max(0, livesRef.current - 1);
        streakRef.current = 0;
        setLives(livesRef.current);
        setStreak(0);
        setAnswerState('wrong');
        makeBurst('wrong');
        setShake(true);
        window.setTimeout(() => setShake(false), 450);
        schedule(advance, 1800);
      }
    },
    [advance, answerState, config.points, finish, makeBurst, paused, questions, schedule, timeLeft, timerEnabled]
  );

  answerRef.current = handleAnswer;

  useEffect(() => {
    if (!timerEnabled || paused || answerState || finishedRef.current) return undefined;
    const interval = window.setInterval(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [answerState, index, paused, timerEnabled]);

  /* כשהזמן אוזל — מפעילים "פספוס" דרך effect נפרד, כדי לא לעשות תופעות לוואי בתוך setState updater (StrictMode) */
  useEffect(() => {
    if (!timerEnabled || answerState || finishedRef.current) return;
    if (timeLeft > 0) return;
    const handle = window.setTimeout(() => answerRef.current(-1), 0);
    return () => window.clearTimeout(handle);
  }, [answerState, finishedRef.current, timeLeft, timerEnabled]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === 'INPUT') return;
      if (event.key.toLowerCase() === 'p' || event.key === 'Escape') {
        event.preventDefault();
        onPause();
        return;
      }
      if (paused) return;
      if (/^[1-4]$/.test(event.key)) {
        const choice = Number(event.key) - 1;
        if (question && choice < question.options.length && !hidden.includes(choice)) {
          event.preventDefault();
          answerRef.current(choice);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hidden, onPause, paused, question]);

  const castSpell = useCallback(() => {
    if (spellUsed || answerState || !question || question.options.length < 3) return;
    const wrong = question.options.map((_, i) => i).filter((i) => i !== question.correctIndex);
    setHidden(shuffle(wrong).slice(0, Math.floor(wrong.length / 2) + (wrong.length > 2 ? 1 : 0)));
    setSpellUsed(true);
  }, [answerState, question, spellUsed]);

  if (!question) return null;

  const topic = TOPICS[question.topicId];
  const timerPercent = timerEnabled && config.time ? Math.max(0, Math.min(100, (timeLeft / config.time) * 100)) : 0;
  const lowTime = timerEnabled && timeLeft <= 8;
  const arithmeticTokens =
    question.topicId === 'add-sub-20' || question.topicId === 'tens' || question.topicId === 'chain'
      ? question.prompt.match(/\d+|[+−=?-]/g)
      : null;

  return (
    <div className={`play-screen ${shake ? 'shaking' : ''}`} style={{ '--region-color': region.color } as CSSProperties}>
      {/* סרגל עליון גדול ומאיר עיניים */}
      <header className="play-hud">
        <button className="hud-icon" type="button" onClick={onPause} aria-label="השהיה">
          ❚❚
        </button>

        <div className="play-title">
          <b>{level.boss ? '👑 ' : '✨ '}{level.name}</b>
          <small>{region.name}</small>
        </div>

        <div className="hud-lives-badge">
          <HeartRow lives={lives} />
        </div>

        <div className="play-score">
          <small>ניקוד</small>
          <strong>{score.toLocaleString('he-IL')}</strong>
          {floatText && (
            <span className="float-score" key={floatText + index}>
              {floatText}
            </span>
          )}
        </div>
      </header>

      {/* מד התקדמות ברור של השלב */}
      <div className="play-progress-wrap">
        <div className="play-progress-label">
          <span>שאלה <b>{index + 1}</b> מתוך <b>{questions.length}</b></span>
          <span className="play-streak-badge">{streak > 1 ? `רצף מנצנץ של ${streak}! ⭐` : 'בהצלחה מתוקה!'}</span>
        </div>
        <div className="play-progress-track" aria-label={`שאלה ${index + 1} מתוך ${questions.length}`}>
          {questions.map((item, dotIndex) => (
            <i
              key={item.id}
              className={dotIndex < index ? 'done' : dotIndex === index ? 'active' : ''}
              style={{ width: `${100 / questions.length}%` }}
            />
          ))}
        </div>
      </div>

      {/* כרטיס שאלה מרכזי: ענקי, מואר, סופר-קריא לילדות כיתה ב' */}
      <main className="question-card" role="region" aria-label="שאלת חשבון">
        {/* כותרת נושא + שעון זמן נעים */}
        <div className="card-top">
          <span className="topic-chip">
            <i>{topic.icon}</i>
            <span>{topic.label}</span>
          </span>

          {timerEnabled ? (
            <div className={`time-pill ${lowTime ? 'low' : ''}`} role="timer" aria-label={`${timeLeft} שניות נותרו`}>
              <span className="time-icon">⏰</span>
              <div className="time-bar-mini">
                <span style={{ width: `${timerPercent}%` }} />
              </div>
              <b>{timeLeft} שנ׳</b>
            </div>
          ) : (
            <span className="no-timer-pill">🌸 בלי לחץ</span>
          )}
        </div>

        {/* תיבת השאלה המרכזית - ענקית, מודגשת עם רקע בהיר מואר לקריאה מקסימלית */}
        <div className="q-banner">
          <span className="q-sparkle q-sparkle-l">✨</span>
          <h2 className="q-prompt">
            {arithmeticTokens ? (
              <span className="arithmetic-expression" dir="rtl" aria-label={question.prompt}>
                {arithmeticTokens.map((token, tokenIndex) =>
                  /^\d+$/.test(token) ? (
                    <bdi className="arithmetic-number" dir="ltr" key={tokenIndex}>{token}</bdi>
                  ) : (
                    <span className="arithmetic-symbol" dir="ltr" key={tokenIndex}>{token}</span>
                  ),
                )}
              </span>
            ) : question.prompt}
          </h2>
          <span className="q-sparkle q-sparkle-r">✨</span>
        </div>

        {/* איור עזר מתמטי (ישר מספרים, שלם וחלקיו, סרגל או צורה) */}
        {question.visual && (
          <div className="visual-stage">
            <QuestionVisual visual={question.visual} />
          </div>
        )}

        {/* כפתורי תשובה ענקיים, צבעוניים, סופר נוחים למגע ולחיצה */}
        <div className="answers" data-count={question.options.length}>
          {question.options.map((option, optionIndex) => {
            const isHidden = hidden.includes(optionIndex);
            const isRight = optionIndex === question.correctIndex;
            const state =
              answerState === 'correct' && isRight
                ? 'correct'
                : answerState === 'wrong' && selected === optionIndex
                ? 'wrong'
                : answerState === 'wrong' && isRight
                ? 'reveal'
                : '';
            return (
              <button
                key={`${question.id}-${optionIndex}`}
                className={`answer-btn ${state} ${isHidden ? 'vanished' : ''}`}
                type="button"
                disabled={Boolean(answerState) || isHidden || paused}
                onClick={() => handleAnswer(optionIndex)}
                aria-label={`תשובה ${optionIndex + 1}: ${option}`}
              >
                <span className="ans-key">{optionIndex + 1}</span>
                <span className="ans-text">{isHidden ? '' : option}</span>
                <span className="ans-glow" />
              </button>
            );
          })}
        </div>

        {/* משוב מיידי ברור ומעודד */}
        {answerState && (
          <div className={`feedback ${answerState}`}>
            <span className="fb-emoji">{answerState === 'correct' ? '🎉 כל הכבוד!' : '💡 שימי לב:'}</span>
            <span className="fb-text">
              {answerState === 'correct'
                ? streak > 1
                  ? `נפלא! כבר ${streak} תשובות נכונות ברצף! 🌟`
                  : 'תשובה נכונה! את אלופה!'
                : question.explanation}
            </span>
          </div>
        )}
      </main>

      {/* סרגל תחתון: לחש קסם + דמות מלווה */}
      <footer className="play-foot">
        <button
          className={`spell-btn ${spellUsed ? 'used' : ''}`}
          type="button"
          onClick={castSpell}
          disabled={spellUsed || Boolean(answerState) || question.options.length < 3}
          aria-label="לחש קסם של הפיה למחיקת תשובות לא נכונות"
        >
          <span className="spell-icon">🪄</span>
          <div className="spell-copy">
            <b>לחש כוכב הקסם</b>
            <small>{spellUsed ? 'כבר השתמשת בשלב זה' : 'מוחק 2 תשובות שגויות ✨'}</small>
          </div>
        </button>

        <div className="foot-char-wrap">
          <img className={`play-unicorn ${answerState === 'correct' ? 'cheer' : ''}`} src="images/racers/shlomper.jpg" alt="שלומפר החד-קרן מעודד אותך" />
          <span className="play-character-quote">
            {answerState === 'correct' ? 'איזה יופי!' : answerState === 'wrong' ? 'לא נורא, נמשיך!' : 'אני סומך עלייך!'}
          </span>
        </div>
      </footer>

      {/* זיקוקים וניצוצות בעת תשובה נכונה */}
      <div className="burst">
        {burst.map((dot) => (
          <i
            key={dot.id}
            className={`burst-dot kind-${dot.kind}`}
            style={{
              width: dot.size,
              height: dot.size,
              animationDelay: `${dot.delay}s`,
              '--tx': `${dot.tx}px`,
              '--ty': `${dot.ty}px`,
              '--rot': `${dot.rotate}deg`,
            } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
