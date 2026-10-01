import { describe, it, expect } from 'vitest';
import {
  createQuestion,
  buildLevelQuestions,
  shuffle,
  numberToHebrew,
  DIFFICULTIES,
  LEVELS,
  TOPICS,
  type Difficulty,
  type TopicId,
} from '../src/game/content';
import {
  isUnlocked,
  isCompleted,
  currentLevelId,
  starsForCorrect,
  totalStars,
  totalScore,
  type Progress,
} from '../src/game/storage';

const DIFFICULTIES_LIST: Difficulty[] = ['entry', 'medium', 'expert'];
const ALL_TOPICS = Object.keys(TOPICS) as TopicId[];

describe('shuffle', () => {
  it('משמר את אותם איברים', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result.sort()).toEqual(input);
    expect(result).not.toBe(input); // מערך חדש
  });

  it('לא משנה מערך ריק או יחיד', () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle([42])).toEqual([42]);
  });
});

describe('numberToHebrew', () => {
  it('מספרים חד-ספרתיים', () => {
    expect(numberToHebrew(0)).toBe('אפס');
    expect(numberToHebrew(1)).toBe('אחת');
    expect(numberToHebrew(9)).toBe('תשע');
  });

  it('עשרות ויחידות', () => {
    expect(numberToHebrew(10)).toBe('עשר');
    expect(numberToHebrew(15)).toBe('חמש עשרה');
    expect(numberToHebrew(20)).toBe('עשרים');
    expect(numberToHebrew(21)).toBe('עשרים ואחת');
    expect(numberToHebrew(99)).toBe('תשעים ותשע');
  });
});

describe('createQuestion — תקינות כללית', () => {
  // בודקים כל נושא × רמת קושי
  for (const topicId of ALL_TOPICS) {
    for (const difficulty of DIFFICULTIES_LIST) {
      it(`${topicId} / ${difficulty}: מייצר שאלה תקינה עם 4 אפשרויות`, () => {
        const q = createQuestion(topicId, difficulty);
        expect(q).toBeTruthy();
        expect(q.topicId).toBe(topicId);
        expect(q.prompt.length).toBeGreaterThan(0);
        expect(q.options).toHaveLength(4);
        // התשובה הנכונה חייבת להיות בתוך האפשרויות
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
        expect(q.options[q.correctIndex]).toBeTruthy();
        // אין כפילויות באפשרויות
        const unique = new Set(q.options);
        expect(unique.size).toBe(4);
        // הסבר לא ריק
        expect(q.explanation.length).toBeGreaterThan(0);
      });
    }
  }
});

describe('createQuestion — מקרי קצה', () => {
  it('אין שתי אפשרויות זהות בשום נושא', () => {
    // מריצים 200 שאלות אקראיות ובודקים
    for (let i = 0; i < 200; i += 1) {
      const topicId = ALL_TOPICS[i % ALL_TOPICS.length];
      const difficulty = DIFFICULTIES_LIST[i % DIFFICULTIES_LIST.length];
      const q = createQuestion(topicId, difficulty);
      const unique = new Set(q.options);
      expect(unique.size).toBe(4);
    }
  });

  it('correctIndex תמיד תקין (0-3)', () => {
    for (let i = 0; i < 100; i += 1) {
      const topicId = ALL_TOPICS[i % ALL_TOPICS.length];
      const q = createQuestion(topicId, 'medium');
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
    }
  });
});

describe('buildLevelQuestions', () => {
  it('מייצר את מספר השאלות הנכון ללא כפילויות', () => {
    const level = LEVELS[0];
    const questions = buildLevelQuestions(level, 'medium');
    expect(questions).toHaveLength(level.questions);
    // בודקים שאין כפילויות prompt
    const prompts = questions.map((q) => q.prompt);
    const unique = new Set(prompts);
    expect(unique.size).toBe(questions.length);
  });

  it('כל השאלות משתמשות בנושאים של השלב', () => {
    const level = LEVELS[0];
    const questions = buildLevelQuestions(level, 'entry');
    for (const q of questions) {
      expect(level.topics).toContain(q.topicId);
    }
  });
});

describe('starsForCorrect', () => {
  it('5/5 = 3 כוכבים', () => {
    expect(starsForCorrect(5, 5)).toBe(3);
  });

  it('4/5 = 2 כוכבים', () => {
    expect(starsForCorrect(4, 5)).toBe(2);
  });

  it('1-3 מתוך 5 = כוכב אחד', () => {
    expect(starsForCorrect(1, 5)).toBe(1);
    expect(starsForCorrect(2, 5)).toBe(1);
    expect(starsForCorrect(3, 5)).toBe(1);
  });

  it('0/5 = 0 כוכבים', () => {
    expect(starsForCorrect(0, 5)).toBe(0);
  });

  it('מקרה קצה: total=0', () => {
    expect(starsForCorrect(0, 0)).toBe(0);
  });
});

describe('storage — התקדמות ופתיחת שלבים', () => {
  it('שלב 1 תמיד פתוח', () => {
    expect(isUnlocked(1, {})).toBe(true);
  });

  it('שלב 2 נעול ללא התקדמות', () => {
    expect(isUnlocked(2, {})).toBe(false);
  });

  it('שלב 2 נפתח רק אחרי כוכב אחד בשלב 1', () => {
    const progress: Progress = { '1': { stars: 1, score: 100, correct: 3, total: 5 } };
    expect(isUnlocked(2, progress)).toBe(true);
  });

  it('שלב לא נחשב הושלם עם 0 כוכבים', () => {
    expect(isCompleted(1, {})).toBe(false);
    const progress: Progress = { '1': { stars: 0, score: 0, correct: 0, total: 5 } };
    expect(isCompleted(1, progress)).toBe(false);
  });

  it('שלב נחשב הושלם עם כוכב אחד או יותר', () => {
    const progress: Progress = { '1': { stars: 1, score: 100, correct: 3, total: 5 } };
    expect(isCompleted(1, progress)).toBe(true);
  });

  it('currentLevelId מחזיר את השלב הבא הלא-גמור', () => {
    const progress: Progress = {
      '1': { stars: 3, score: 600, correct: 5, total: 5 },
      '2': { stars: 2, score: 300, correct: 4, total: 5 },
    };
    // שלב 3 לא הושלם — אמור להחזיר 3
    expect(currentLevelId(progress)).toBe(3);
  });

  it('currentLevelId מחזיר את השלב האחרון אם הכל הושלם', () => {
    const progress: Progress = {};
    for (const level of LEVELS) {
      progress[String(level.id)] = { stars: 3, score: 600, correct: 5, total: 5 };
    }
    expect(currentLevelId(progress)).toBe(LEVELS[LEVELS.length - 1].id);
  });

  it('totalStars ו-totalScore מחשבים נכון', () => {
    const progress: Progress = {
      '1': { stars: 3, score: 600, correct: 5, total: 5 },
      '2': { stars: 2, score: 300, correct: 4, total: 5 },
    };
    expect(totalStars(progress)).toBe(5);
    expect(totalScore(progress)).toBe(900);
  });
});

describe('DIFFICULTIES — הגדרות רמת קושי', () => {
  it('יש 3 רמות', () => {
    expect(DIFFICULTIES).toHaveLength(3);
  });

  it('entry לא מוגבל בזמן, medium ו-expert כן', () => {
    const entry = DIFFICULTIES.find((d) => d.id === 'entry');
    const medium = DIFFICULTIES.find((d) => d.id === 'medium');
    const expert = DIFFICULTIES.find((d) => d.id === 'expert');
    expect(entry?.time).toBeNull();
    expect(medium?.time).toBe(45);
    expect(expert?.time).toBe(35);
  });
});
