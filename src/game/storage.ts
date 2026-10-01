import { LEVELS } from './content';

export type LevelProgress = { stars: number; score: number; correct: number; total: number };
export type Progress = Record<string, LevelProgress>;

export type ScoreEntry = {
  name: string;
  stars: number;
  score: number;
  difficulty: string;
  date: string;
};

const PROGRESS_KEY = 'magic-kingdom-progress-v2';
const SCORE_KEY = 'magic-kingdom-scores-v2';

const DEFAULT_SCORES: ScoreEntry[] = [
  { name: 'ליאן', stars: 24, score: 5200, difficulty: 'בינוני', date: 'אתמול' },
  { name: 'נועה', stars: 18, score: 3600, difficulty: 'כניסה', date: 'אתמול' },
  { name: 'מיכל', stars: 12, score: 2100, difficulty: 'כניסה', date: 'אתמול' },
];

function toLevelProgress(value: unknown): LevelProgress | null {
  if (typeof value !== 'object' || value === null) return null;
  const entry = value as Record<string, unknown>;
  if (typeof entry.stars !== 'number' || typeof entry.score !== 'number') return null;
  return {
    stars: entry.stars,
    score: entry.score,
    correct: typeof entry.correct === 'number' ? entry.correct : 0,
    total: typeof entry.total === 'number' ? entry.total : 5,
  };
}

export function loadProgress(): Progress {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (!stored) return {};
    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== 'object' || parsed === null) return {};
    const result: Progress = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      const entry = toLevelProgress(value);
      if (entry) result[key] = entry;
    }
    return result;
  } catch {
    return {};
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Progress still works for the current session when storage is unavailable.
  }
}

export function loadScores(): ScoreEntry[] {
  try {
    const stored = localStorage.getItem(SCORE_KEY);
    if (!stored) return DEFAULT_SCORES;
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return DEFAULT_SCORES;
    const valid = parsed.filter((entry): entry is ScoreEntry =>
      typeof entry === 'object' && entry !== null &&
      'name' in entry && 'stars' in entry && 'score' in entry && 'difficulty' in entry && 'date' in entry &&
      typeof entry.name === 'string' && typeof entry.stars === 'number' &&
      typeof entry.score === 'number' && typeof entry.difficulty === 'string' && typeof entry.date === 'string');
    return valid.length > 0 ? valid : DEFAULT_SCORES;
  } catch {
    return DEFAULT_SCORES;
  }
}

export function upsertScore(entry: ScoreEntry): ScoreEntry[] {
  const current = loadScores();
  const existing = current.findIndex((item) => item.name === entry.name);
  const next = [...current];
  if (existing >= 0) next[existing] = entry;
  else next.push(entry);
  const sorted = next.sort((a, b) => (b.stars - a.stars) || (b.score - a.score)).slice(0, 6);
  try {
    localStorage.setItem(SCORE_KEY, JSON.stringify(sorted));
  } catch {
    // Ignored — the table stays in memory for this session.
  }
  return sorted;
}

export function totalStars(progress: Progress): number {
  return Object.values(progress).reduce((sum, entry) => sum + entry.stars, 0);
}

export function totalScore(progress: Progress): number {
  return Object.values(progress).reduce((sum, entry) => sum + entry.score, 0);
}

export function totalCorrect(progress: Progress): number {
  return Object.values(progress).reduce((sum, entry) => sum + (entry.correct ?? 0), 0);
}

/* תחנה נפתחת אחרי שהתחנה הקודמת הושלמה (גם בכוכב אחד — מעודד ילדות להמשיך!) */
export function isUnlocked(levelId: number, progress: Progress): boolean {
  if (levelId === 1) return true;
  return (progress[String(levelId - 1)]?.stars ?? 0) > 0;
}

export function isCompleted(levelId: number, progress: Progress): boolean {
  return (progress[String(levelId)]?.stars ?? 0) > 0;
}

export function currentLevelId(progress: Progress): number {
  const next = LEVELS.find((level) => isUnlocked(level.id, progress) && !isCompleted(level.id, progress));
  return next ? next.id : LEVELS[LEVELS.length - 1].id;
}

/* כוכבים לפי מספר תשובות נכונות מתוך 5 — כמו במשחקי טלפון */
export function starsForCorrect(correct: number, total: number): number {
  if (total <= 0) return 0;
  if (correct >= total) return 3;
  if (correct >= total - 1) return 2;
  if (correct >= 1) return 1;
  return 0;
}
