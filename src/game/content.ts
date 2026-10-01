export type TopicId =
  | 'units' | 'words' | 'digits' | 'compare' | 'add-sub-20' | 'tens' | 'parity'
  | 'series' | 'numberline' | 'word-problem' | 'chain' | 'parts'
  | 'square' | 'rectangle' | 'length' | 'polygons' | 'vertices';

export type Difficulty = 'entry' | 'medium' | 'expert';

export type Visual = {
  type: 'numberline' | 'parts' | 'ruler' | 'shape';
  min?: number;
  max?: number;
  marker?: number;
  whole?: number;
  part?: number;
  shape?: 'triangle' | 'square' | 'rectangle' | 'pentagon';
  length?: number;
};

export type Question = {
  id: number;
  topicId: TopicId;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  visual?: Visual;
};

export type Topic = { id: TopicId; label: string; icon: string };

export type WorldId = 'kingdom' | 'space' | 'pirates' | 'science' | 'flowers' | 'potion' | 'zoo' | 'robots' | 'unicorns';

export type LevelDef = {
  id: number;
  world: WorldId;
  name: string;
  region: number;
  topics: TopicId[];
  questions: number;
  boss: boolean;
  x: number;
  y: number;
};

export type Region = { id: number; name: string; tagline: string; color: string };

export const WORLDS: Record<WorldId, { title: string; subtitle: string; badge: string; mapImage: string; castImage: string }> = {
  kingdom: {
    title: 'ארץ החשבון',
    subtitle: 'מרוץ החשבוניאדה של שלומפר',
    badge: '🌿',
    mapImage: 'images/magic-map.jpg',
    castImage: 'images/race-hero.jpg',
  },
  space: {
    title: 'ממלכת החלל',
    subtitle: 'המסע הגלקטי של שלומפר',
    badge: '🚀',
    mapImage: 'images/space-map.jpg',
    castImage: 'images/cast-space-full.png',
  },
  pirates: {
    title: 'איי האוצר',
    subtitle: 'המסע הימי של שלומפר',
    badge: '🏴‍☠️',
    mapImage: 'images/pirates-map.jpg',
    castImage: 'images/cast-pirates-full.png',
  },
  science: {
    title: 'ממלכת המדע',
    subtitle: 'מעבדת הגילויים של שלומפר',
    badge: '🔬',
    mapImage: 'images/science-map.jpg',
    castImage: 'images/cast-science-full.png',
  },
  flowers: {
    title: 'עולם הפרחים',
    subtitle: 'הגינה הצוחקת של שלומפר',
    badge: '🌸',
    mapImage: 'images/flowers-map.jpg',
    castImage: 'images/cast-flowers-full.png',
  },
  potion: {
    title: 'עולם הכימיה והשיקויים',
    subtitle: 'מעבדת השיקויים הקסומים',
    badge: '🧪',
    mapImage: 'images/potion-map.jpg',
    castImage: 'images/cast-potion-full.png',
  },
  zoo: {
    title: 'עולם גן החיות',
    subtitle: 'ממלכת החיות והדינוזאורים',
    badge: '🦁',
    mapImage: 'images/zoo-map.jpg',
    castImage: 'images/cast-zoo-full.png',
  },
  robots: {
    title: 'עולם הרובוטים',
    subtitle: 'מפעל הצעצועים החכם',
    badge: '🤖',
    mapImage: 'images/robots-map.jpg',
    castImage: 'images/cast-robots-full.png',
  },
  unicorns: {
    title: 'עולם חדי הקרן',
    subtitle: 'הביתה אל המשפחה של שלומפר',
    badge: '🦄',
    mapImage: 'images/unicorns-map.jpg',
    castImage: 'images/cast-unicorns-full.png',
  },
};

/** סדר העולמות במסע — כל עולם נפתח כשמסיימים את הקודם.
    שלומפר עובר הרפתקאות בעולמות שונים, ולבסוף חוזר הביתה אל משפחתו בעולם חדי הקרן. */
export const WORLD_ORDER: WorldId[] = ['kingdom', 'space', 'pirates', 'science', 'flowers', 'potion', 'zoo', 'robots', 'unicorns'];

export const DIFFICULTIES: { id: Difficulty; label: string; caption: string; time: number | null; points: number }[] = [
  { id: 'entry', label: 'כניסה', caption: 'בלי שעון 🌱', time: null, points: 100 },
  { id: 'medium', label: 'בינוני', caption: '45 שניות לשאלה ⭐', time: 45, points: 150 },
  { id: 'expert', label: 'מומחה', caption: '35 שניות לשאלה 👑', time: 35, points: 220 },
];

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  entry: 'כניסה',
  medium: 'בינוני',
  expert: 'מומחה',
};

export const TOPICS: Record<TopicId, Topic> = {
  units: { id: 'units', label: 'יחידות ועשרות', icon: '🪙' },
  words: { id: 'words', label: 'מספרים במילים', icon: '📜' },
  digits: { id: 'digits', label: 'מספרים בספרות', icon: '🔢' },
  compare: { id: 'compare', label: 'גדול קטן שווה', icon: '⚖️' },
  'add-sub-20': { id: 'add-sub-20', label: 'חיבור וחיסור עד 20', icon: '✨' },
  tens: { id: 'tens', label: 'עשרות שלמות', icon: '🔟' },
  parity: { id: 'parity', label: 'זוגי ואי זוגי', icon: '👣' },
  series: { id: 'series', label: 'סדרות', icon: '🪜' },
  numberline: { id: 'numberline', label: 'ישר המספרים', icon: '🧭' },
  'word-problem': { id: 'word-problem', label: 'בעיות מילוליות', icon: '🧩' },
  chain: { id: 'chain', label: 'תרגילי שרשרת', icon: '⛓️' },
  parts: { id: 'parts', label: 'שלם וחלקיו', icon: '🍰' },
  square: { id: 'square', label: 'ריבוע', icon: '🟧' },
  rectangle: { id: 'rectangle', label: 'מלבן', icon: '📕' },
  length: { id: 'length', label: 'מדידות אורך', icon: '📏' },
  polygons: { id: 'polygons', label: 'מצולעים', icon: '🔶' },
  vertices: { id: 'vertices', label: 'קודקודים וצלעות', icon: '⭐' },
};

export const REGIONS: Region[] = [
  { id: 0, name: 'עמק הפתיחה', tagline: 'אחו, עץ וחוף 🌸', color: '#7ed957' },
  { id: 1, name: 'לב היער', tagline: 'מערה, כפר ופטריות 🍄', color: '#5ec8f2' },
  { id: 2, name: 'פסגת הקשת', tagline: 'מפל, אגם וטירה 🌈', color: '#c58bff' },
  { id: 3, name: 'תחנת השיגור', tagline: 'יוצאות למסע בין כוכבים 🚀', color: '#56e0d2' },
  { id: 4, name: 'גלקסיית הצורות', tagline: 'כוכבים, ירחים ואסטרואידים ✨', color: '#bd8cff' },
  { id: 5, name: 'ערפילית הקשת', tagline: 'הדרך אל כוכב הכתר 🌌', color: '#ff90bd' },
  { id: 6, name: 'חוף הספינה הטרופה', tagline: 'מתחילים לחפש את האוצר 🏴‍☠️', color: '#ffcf6b' },
  { id: 7, name: 'לב הארכיפלג', tagline: 'הר געש, דולפינים ומבצר 🌋', color: '#6fe0d4' },
  { id: 8, name: 'מפרץ הפנינים', tagline: 'הדרך אל מערת הקריסטל 💎', color: '#c9a6ff' },
  { id: 9, name: 'עמק המעבדות', tagline: 'ניסויים ראשונים 🧪', color: '#8be39b' },
  { id: 10, name: 'איי הגילויים', tagline: 'טלסקופים וקריסטלים 🔭', color: '#8cc8f5' },
  { id: 11, name: 'פסגת ההמצאות', tagline: 'רובוטים, דינוזאורים ואוצרות 🤖', color: '#f7a8cb' },
  /* ---- עולם הפרחים 🌸 ---- */
  { id: 12, name: 'שדה הפרחים', tagline: 'פוגשות פרחים מצחיקים 🌷', color: '#ff9ecd' },
  { id: 13, name: 'יער הפרחים הצוחקים', tagline: 'שטויות וצחוקים 🤭', color: '#b5e86b' },
  { id: 14, name: 'גני הקסם', tagline: 'הדרך אל פרח הקסם 🌺', color: '#ffd166' },
  /* ---- עולם הכימיה והשיקויים 🧪 ---- */
  { id: 15, name: 'מעבדת המבחנות', tagline: 'ניסויים ראשונים ✨', color: '#7de3d1' },
  { id: 16, name: 'אולם השיקויים', tagline: 'ערבוב ולחשים 🧙‍♀️', color: '#a78bfa' },
  { id: 17, name: 'צריח הקסמים', tagline: 'הדרך אל שיקוי הקשת 🌈', color: '#f9a8d4' },
  /* ---- עולם גן החיות 🦁 ---- */
  { id: 18, name: 'שער הספארי', tagline: 'ברוכות הבאות לחיות 🐘', color: '#fcd34d' },
  { id: 19, name: 'עמק הדינוזאורים', tagline: 'יצורים ענקיים ומדהימים 🦕', color: '#86efac' },
  { id: 20, name: 'ממלכת החיות הגדולות', tagline: 'הדרך אל מלך האריות 🦁', color: '#fdba74' },
  /* ---- עולם הרובוטים 🤖 ---- */
  { id: 21, name: 'מפעל הגלגלים', tagline: 'בונים ומתקנים 🔧', color: '#93c5fd' },
  { id: 22, name: 'חדר ההמצאות', tagline: 'רובוטים חכמים ומצחיקים ⚙️', color: '#c4b5fd' },
  { id: 23, name: 'צריח הבקרה', tagline: 'הדרך אל רובוט העל 🦾', color: '#a5f3fc' },
  /* ---- עולם חדי הקרן 🦄 ---- */
  { id: 24, name: 'עמק הקשת', tagline: 'רואות את הקשת מחדש 🏡', color: '#f0abfc' },
  { id: 25, name: 'שביל הכוכבים', tagline: 'כל הדרך חזרה הביתה ✨', color: '#fbcfe8' },
  { id: 26, name: 'טירת חדי הקרן', tagline: 'המשפחה מחכה לשלומפר 🦄', color: '#d8b4fe' },
];

/* 9 תחנות לאורך השביל הירוק — בכל תחנה בדיוק 5 שאלות.
   הסדר: מאחו החד-קרן (למטה) עד טירת הקשת ותיבת האוצר (למעלה). */
export const LEVELS: LevelDef[] = [
  { id: 1, world: 'kingdom', name: 'אחו החד-קרן', region: 0, topics: ['units', 'words'], questions: 5, boss: false, x: 17, y: 80 },
  { id: 2, world: 'kingdom', name: 'בית העץ הענק', region: 0, topics: ['digits', 'compare'], questions: 5, boss: false, x: 43, y: 70 },
  { id: 3, world: 'kingdom', name: 'חוף הצדף הנוצץ', region: 0, topics: ['add-sub-20', 'tens'], questions: 5, boss: false, x: 69, y: 80 },
  { id: 4, world: 'kingdom', name: 'מערת הקריסטל', region: 1, topics: ['parity', 'series'], questions: 5, boss: false, x: 85, y: 60 },
  { id: 5, world: 'kingdom', name: 'כפר הגשר הקסום', region: 1, topics: ['numberline', 'word-problem'], questions: 5, boss: false, x: 62, y: 50 },
  { id: 6, world: 'kingdom', name: 'בתי הפטריות', region: 1, topics: ['chain', 'parts'], questions: 5, boss: false, x: 37, y: 57 },
  { id: 7, world: 'kingdom', name: 'מפל הפיות', region: 2, topics: ['square', 'rectangle'], questions: 5, boss: false, x: 14, y: 43 },
  { id: 8, world: 'kingdom', name: 'אגם הזוהר', region: 2, topics: ['length', 'polygons'], questions: 5, boss: false, x: 44, y: 29 },
  { id: 9, world: 'kingdom', name: 'טירת הקשת 👑', region: 2, topics: ['vertices', 'word-problem', 'chain', 'polygons', 'add-sub-20'], questions: 5, boss: true, x: 82, y: 23 },
  { id: 10, world: 'space', name: 'רציף השיגור', region: 3, topics: ['units', 'digits'], questions: 5, boss: false, x: 19, y: 56 },
  { id: 11, world: 'space', name: 'תחנת הירח', region: 3, topics: ['add-sub-20', 'words'], questions: 5, boss: false, x: 29, y: 31 },
  { id: 12, world: 'space', name: 'טבעת שבתאי', region: 3, topics: ['tens', 'compare'], questions: 5, boss: true, x: 39, y: 63 },
  { id: 13, world: 'space', name: 'שביל האסטרואידים', region: 4, topics: ['series', 'parity'], questions: 5, boss: false, x: 59, y: 35 },
  { id: 14, world: 'space', name: 'מצפה הכוכבים', region: 4, topics: ['numberline', 'chain'], questions: 5, boss: false, x: 63, y: 71 },
  { id: 15, world: 'space', name: 'כוכב העוגות', region: 4, topics: ['parts', 'word-problem'], questions: 5, boss: true, x: 81, y: 30 },
  { id: 16, world: 'space', name: 'מכתש הירח', region: 5, topics: ['square', 'rectangle', 'length'], questions: 5, boss: false, x: 82, y: 56 },
  { id: 17, world: 'space', name: 'ערפילית הקשת', region: 5, topics: ['polygons', 'vertices', 'series'], questions: 5, boss: false, x: 45, y: 45 },
  { id: 18, world: 'space', name: 'כוכב הכתר 👑', region: 5, topics: ['vertices', 'word-problem', 'chain', 'polygons', 'add-sub-20'], questions: 5, boss: true, x: 70, y: 60 },
  { id: 19, world: 'pirates', name: 'חוף הספינה הטרופה', region: 6, topics: ['compare', 'units'], questions: 5, boss: false, x: 17, y: 68 },
  { id: 20, world: 'pirates', name: 'חורשת התוכים', region: 6, topics: ['add-sub-20', 'digits'], questions: 5, boss: false, x: 22, y: 46 },
  { id: 21, world: 'pirates', name: 'גשר הצבים', region: 6, topics: ['tens', 'words'], questions: 5, boss: false, x: 38, y: 38 },
  { id: 22, world: 'pirates', name: 'הר הגעש הלוחש', region: 7, topics: ['series', 'parity'], questions: 5, boss: false, x: 50, y: 19 },
  { id: 23, world: 'pirates', name: 'לגונת הדולפינים', region: 7, topics: ['numberline', 'word-problem'], questions: 5, boss: false, x: 60, y: 37 },
  { id: 24, world: 'pirates', name: 'מבצר הפיראטים', region: 7, topics: ['chain', 'parts'], questions: 5, boss: true, x: 72, y: 23 },
  { id: 25, world: 'pirates', name: 'בית העץ של פנינה', region: 8, topics: ['length', 'square'], questions: 5, boss: false, x: 74, y: 47 },
  { id: 26, world: 'pirates', name: 'אי תיבת האוצר', region: 8, topics: ['polygons', 'rectangle'], questions: 5, boss: false, x: 61, y: 70 },
  { id: 27, world: 'pirates', name: 'מערת הפנינים 👑', region: 8, topics: ['vertices', 'word-problem', 'chain', 'series', 'compare'], questions: 5, boss: true, x: 78, y: 78 },
  { id: 28, world: 'science', name: 'מעבדת השיקויים', region: 9, topics: ['digits', 'compare'], questions: 5, boss: false, x: 6, y: 41 },
  { id: 29, world: 'science', name: 'יער המספרים', region: 9, topics: ['series', 'units'], questions: 5, boss: false, x: 31, y: 41 },
  { id: 30, world: 'science', name: 'גשר החשבוניה', region: 9, topics: ['add-sub-20', 'chain'], questions: 5, boss: false, x: 31, y: 66 },
  { id: 31, world: 'science', name: 'מצפה הטלסקופ', region: 10, topics: ['numberline', 'tens'], questions: 5, boss: false, x: 49, y: 34 },
  { id: 32, world: 'science', name: 'מערת הקריסטלים', region: 10, topics: ['polygons', 'vertices'], questions: 5, boss: false, x: 67, y: 38 },
  { id: 33, world: 'science', name: 'גן האטומים', region: 10, topics: ['parity', 'word-problem'], questions: 5, boss: true, x: 65, y: 77 },
  { id: 34, world: 'science', name: 'אי הדינוזאור', region: 11, topics: ['length', 'rectangle'], questions: 5, boss: false, x: 76, y: 56 },
  { id: 35, world: 'science', name: 'מפעל הרובוטים', region: 11, topics: ['parts', 'square'], questions: 5, boss: false, x: 55, y: 55 },
  { id: 36, world: 'science', name: 'תיבת הגילויים 👑', region: 11, topics: ['word-problem', 'chain', 'vertices', 'series', 'numberline'], questions: 5, boss: true, x: 80, y: 20 },
  /* ---------------- עולם הפרחים 🌸 ---------------- */
  { id: 37, world: 'flowers', name: 'שער הגינה', region: 12, topics: ['units', 'words'], questions: 5, boss: false, x: 18, y: 86 },
  { id: 38, world: 'flowers', name: 'מסלול השבלולים', region: 12, topics: ['add-sub-20', 'compare'], questions: 5, boss: false, x: 50, y: 87 },
  { id: 39, world: 'flowers', name: 'בריכת החבצלות', region: 12, topics: ['digits', 'series'], questions: 5, boss: false, x: 78, y: 83 },
  { id: 40, world: 'flowers', name: 'מבוך החמניות', region: 13, topics: ['tens', 'parity'], questions: 5, boss: false, x: 88, y: 39 },
  { id: 41, world: 'flowers', name: 'גבעת הצחוקים', region: 13, topics: ['numberline', 'chain'], questions: 5, boss: false, x: 69, y: 45 },
  { id: 42, world: 'flowers', name: 'מערת הזרעים', region: 13, topics: ['parts', 'word-problem'], questions: 5, boss: true, x: 50, y: 49 },
  { id: 43, world: 'flowers', name: 'מדשאת הפרפרים', region: 14, topics: ['length', 'square'], questions: 5, boss: false, x: 9, y: 51 },
  { id: 44, world: 'flowers', name: 'שביל הריחות', region: 14, topics: ['rectangle', 'polygons'], questions: 5, boss: false, x: 23, y: 29 },
  { id: 45, world: 'flowers', name: 'פרח הקסם 👑', region: 14, topics: ['vertices', 'word-problem', 'chain', 'series', 'compare'], questions: 5, boss: true, x: 50, y: 10 },
  /* ---------------- עולם הכימיה והשיקויים 🧪 ---------------- */
  { id: 46, world: 'potion', name: 'שולחן המבחנות', region: 15, topics: ['units', 'digits'], questions: 5, boss: false, x: 21, y: 76 },
  { id: 47, world: 'potion', name: 'מדף התבלינים', region: 15, topics: ['add-sub-20', 'words'], questions: 5, boss: false, x: 42, y: 26 },
  { id: 48, world: 'potion', name: 'סיר הערבוב', region: 15, topics: ['tens', 'compare'], questions: 5, boss: true, x: 33, y: 82 },
  { id: 49, world: 'potion', name: 'מזקקת הקסם', region: 16, topics: ['series', 'parity'], questions: 5, boss: false, x: 66, y: 80 },
  { id: 50, world: 'potion', name: 'ארון המרקחות', region: 16, topics: ['numberline', 'chain'], questions: 5, boss: false, x: 69, y: 51 },
  { id: 51, world: 'potion', name: 'מעבדת הבועות', region: 16, topics: ['parts', 'word-problem'], questions: 5, boss: true, x: 23, y: 40 },
  { id: 52, world: 'potion', name: 'מגדל הספרים', region: 17, topics: ['square', 'rectangle'], questions: 5, boss: false, x: 25, y: 13 },
  { id: 53, world: 'potion', name: 'חדר הכוכבים', region: 17, topics: ['length', 'polygons'], questions: 5, boss: false, x: 70, y: 27 },
  { id: 54, world: 'potion', name: 'שיקוי הקשת 👑', region: 17, topics: ['vertices', 'word-problem', 'series', 'chain', 'polygons'], questions: 5, boss: true, x: 46, y: 50 },
  /* ---------------- עולם גן החיות 🦁 ---------------- */
  { id: 55, world: 'zoo', name: 'שער הספארי', region: 18, topics: ['units', 'compare'], questions: 5, boss: false, x: 9, y: 75 },
  { id: 56, world: 'zoo', name: 'מכלוב הקופים', region: 18, topics: ['add-sub-20', 'digits'], questions: 5, boss: false, x: 21, y: 75 },
  { id: 57, world: 'zoo', name: 'אגם הפלמינגו', region: 18, topics: ['tens', 'words'], questions: 5, boss: false, x: 26, y: 70 },
  { id: 58, world: 'zoo', name: 'מערת העטלפים', region: 19, topics: ['series', 'parity'], questions: 5, boss: false, x: 72, y: 66 },
  { id: 59, world: 'zoo', name: 'עמק הג׳ירפות', region: 19, topics: ['numberline', 'word-problem'], questions: 5, boss: false, x: 50, y: 48 },
  { id: 60, world: 'zoo', name: 'קן הדינוזאורים', region: 19, topics: ['chain', 'parts'], questions: 5, boss: true, x: 24, y: 47 },
  { id: 61, world: 'zoo', name: 'ביצת הטי-רקס', region: 20, topics: ['length', 'square'], questions: 5, boss: false, x: 24, y: 21 },
  { id: 62, world: 'zoo', name: 'מאורת האריות', region: 20, topics: ['rectangle', 'polygons'], questions: 5, boss: false, x: 55, y: 22 },
  { id: 63, world: 'zoo', name: 'מלך הספארי 👑', region: 20, topics: ['vertices', 'word-problem', 'chain', 'series', 'length'], questions: 5, boss: true, x: 79, y: 23 },
  /* ---------------- עולם הרובוטים 🤖 ---------------- */
  { id: 64, world: 'robots', name: 'מסוע החלקים', region: 21, topics: ['units', 'digits'], questions: 5, boss: false, x: 16, y: 37 },
  { id: 65, world: 'robots', name: 'מעבדת הצבעים', region: 21, topics: ['add-sub-20', 'compare'], questions: 5, boss: false, x: 25, y: 10 },
  { id: 66, world: 'robots', name: 'אולם ההילוכים', region: 21, topics: ['tens', 'words'], questions: 5, boss: true, x: 44, y: 63 },
  { id: 67, world: 'robots', name: 'חדר הסוללות', region: 22, topics: ['series', 'parity'], questions: 5, boss: false, x: 58, y: 18 },
  { id: 68, world: 'robots', name: 'סדנת התיקונים', region: 22, topics: ['numberline', 'chain'], questions: 5, boss: false, x: 60, y: 44 },
  { id: 69, world: 'robots', name: 'מעבדת הצעצועים', region: 22, topics: ['parts', 'word-problem'], questions: 5, boss: true, x: 38, y: 28 },
  { id: 70, world: 'robots', name: 'מחסן המנועים', region: 23, topics: ['square', 'rectangle'], questions: 5, boss: false, x: 78, y: 30 },
  { id: 71, world: 'robots', name: 'חדר הבקרה', region: 23, topics: ['length', 'polygons'], questions: 5, boss: false, x: 89, y: 12 },
  { id: 72, world: 'robots', name: 'רובוט העל 👑', region: 23, topics: ['vertices', 'word-problem', 'series', 'chain', 'polygons'], questions: 5, boss: true, x: 81, y: 70 },
  /* ---------------- עולם חדי הקרן 🦄 ---------------- */
  { id: 73, world: 'unicorns', name: 'שער עמק הקשת', region: 24, topics: ['units', 'words'], questions: 5, boss: false, x: 31, y: 77 },
  { id: 74, world: 'unicorns', name: 'אגם הקסמים', region: 24, topics: ['add-sub-20', 'compare'], questions: 5, boss: false, x: 60, y: 78 },
  { id: 75, world: 'unicorns', name: 'גשר הקשת', region: 24, topics: ['digits', 'series'], questions: 5, boss: false, x: 70, y: 47 },
  { id: 76, world: 'unicorns', name: 'יער החברים', region: 25, topics: ['tens', 'parity'], questions: 5, boss: false, x: 24, y: 50 },
  { id: 77, world: 'unicorns', name: 'שביל הכוכבים', region: 25, topics: ['numberline', 'chain'], questions: 5, boss: false, x: 37, y: 38 },
  { id: 78, world: 'unicorns', name: 'מערת הזיכרונות', region: 25, topics: ['parts', 'word-problem'], questions: 5, boss: true, x: 15, y: 27 },
  { id: 79, world: 'unicorns', name: 'שוק המשפחה', region: 26, topics: ['length', 'square'], questions: 5, boss: false, x: 47, y: 21 },
  { id: 80, world: 'unicorns', name: 'מגרש המשחקים', region: 26, topics: ['rectangle', 'polygons'], questions: 5, boss: false, x: 55, y: 18 },
  { id: 81, world: 'unicorns', name: 'טירת חדי הקרן 👑', region: 26, topics: ['vertices', 'word-problem', 'chain', 'series', 'compare'], questions: 5, boss: true, x: 86, y: 18 },
];

export const MAX_STARS = LEVELS.length * 3;

let seed = 0;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle<T>(values: T[]): T[] {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function uniqueOptions(answer: string, alternatives: string[]): string[] {
  const all = [answer, ...alternatives].filter((value, index, list) => value.length > 0 && list.indexOf(value) === index);
  return shuffle(all.slice(0, 4));
}

function numberOptions(answer: number, spread = 2, extra: number[] = []): string[] {
  const pool = [...extra, answer - spread, answer + spread, answer - 1, answer + 1, answer + spread * 2, answer - spread * 2, answer + 10, answer + 2]
    .filter((value) => value >= 0 && value !== answer);
  const picks = shuffle(Array.from(new Set(pool))).slice(0, 3);
  return uniqueOptions(String(answer), picks.map(String));
}

export function numberToHebrew(value: number): string {
  const ones = ['אפס', 'אחת', 'שתיים', 'שלוש', 'ארבע', 'חמש', 'שש', 'שבע', 'שמונה', 'תשע'];
  const teens = ['עשר', 'אחת עשרה', 'שתים עשרה', 'שלוש עשרה', 'ארבע עשרה', 'חמש עשרה', 'שש עשרה', 'שבע עשרה', 'שמונה עשרה', 'תשע עשרה'];
  const tens: Record<number, string> = { 20: 'עשרים', 30: 'שלושים', 40: 'ארבעים', 50: 'חמישים', 60: 'שישים', 70: 'שבעים', 80: 'שמונים', 90: 'תשעים' };
  if (value < 10) return ones[value];
  if (value < 20) return teens[value - 10];
  const ten = Math.floor(value / 10) * 10;
  return value % 10 === 0 ? tens[ten] : `${tens[ten]} ו${ones[value % 10]}`;
}

function build(topicId: TopicId, prompt: string, answer: string, alternatives: string[], explanation: string, visual?: Visual): Question {
  const options = uniqueOptions(answer, alternatives);
  return { id: seed++, topicId, prompt, options, correctIndex: options.indexOf(answer), explanation, visual };
}

function buildNumeric(topicId: TopicId, prompt: string, answer: number, explanation: string, spread = 2, extra: number[] = [], visual?: Visual): Question {
  const options = numberOptions(answer, spread, extra);
  return { id: seed++, topicId, prompt, options, correctIndex: options.indexOf(String(answer)), explanation, visual };
}

export function createQuestion(topicId: TopicId, difficulty: Difficulty): Question {
  const expert = difficulty === 'expert';
  const medium = difficulty === 'medium';

  switch (topicId) {
    case 'units': {
      const value = randomInt(expert ? 100 : 21, expert ? 999 : medium ? 99 : 79);
      const askUnits = Math.random() > 0.5;
      const answer = askUnits ? value % 10 : Math.floor(value / 10) % 10;
      return buildNumeric('units', `במספר ${value} — כמה ${askUnits ? 'יחידות' : 'עשרות'} יש?`, answer,
        `${askUnits ? 'ספרת היחידות' : 'ספרת העשרות'} של ${value} היא ${answer}.`, 2);
    }
    case 'words': {
      const value = randomInt(1, expert ? 99 : medium ? 60 : 30);
      return buildNumeric('words', `איזה מספר מתאים למילים "${numberToHebrew(value)}"?`, value,
        `"${numberToHebrew(value)}" נכתב בספרות ${value}.`, randomInt(1, 4));
    }
    case 'digits': {
      const value = randomInt(1, expert ? 99 : medium ? 60 : 30);
      return buildNumeric('digits', `כתבו בספרות: ${numberToHebrew(value)}`, value,
        `${numberToHebrew(value)} = ${value}.`, randomInt(1, 4));
    }
    case 'compare': {
      const first = randomInt(medium ? 20 : 1, expert ? 99 : 49);
      const second = Math.random() > 0.8 ? first : randomInt(medium ? 20 : 1, expert ? 99 : 49);
      const answer = first > second ? '>' : first < second ? '<' : '=';
      return build('compare', `מה מתאים לסימן החסר?   ${first}  ⬜  ${second}`, answer, ['<', '>', '='],
        `${first} ${answer} ${second}`);
    }
    case 'add-sub-20': {
      const subtraction = Math.random() > 0.48;
      const first = subtraction ? randomInt(medium ? 12 : 6, 20) : randomInt(1, medium ? 15 : 10);
      const second = subtraction ? randomInt(1, first) : randomInt(1, Math.max(1, Math.min(20 - first, medium ? 12 : 10)));
      const answer = subtraction ? first - second : first + second;
      return buildNumeric('add-sub-20', `${first} ${subtraction ? '−' : '+'} ${second} = ?`, answer,
        `${first} ${subtraction ? '−' : '+'} ${second} = ${answer}`, 2);
    }
    case 'tens': {
      const first = randomInt(1, expert ? 9 : 5) * 10;
      const second = randomInt(1, expert ? 9 : 5) * 10;
      const subtraction = Math.random() > 0.5;
      const high = Math.max(first, second);
      const low = Math.min(first, second);
      const answer = subtraction ? high - low : first + second;
      return buildNumeric('tens', subtraction ? `${high} − ${low} = ?` : `${first} + ${second} = ?`, answer,
        `זה ${answer / 10} עשרות שלמות, כלומר ${answer}.`, 10);
    }
    case 'parity': {
      const value = randomInt(1, expert ? 99 : 40);
      const answer = value % 2 === 0 ? 'זוגי' : 'אי זוגי';
      return build('parity', `המספר ${value} — זוגי או אי זוגי?`, answer, ['זוגי', 'אי זוגי'],
        `ספרת היחידות היא ${value % 10}, ולכן ${value} הוא ${answer}.`);
    }
    case 'series': {
      const descending = Math.random() > 0.5;
      const step = randomInt(1, expert ? 9 : medium ? 5 : 3);
      const start = descending ? randomInt(40, 80) : randomInt(1, 20);
      const values = Array.from({ length: 5 }, (_, index) => start + (descending ? -1 : 1) * step * index);
      const answer = values[2];
      const shown = values.map((value, index) => (index === 2 ? '⬜' : value)).join('  ,  ');
      return buildNumeric('series', `השלימו את הסדרה:\n${shown}`, answer,
        `הסדרה ${descending ? 'יורדת' : 'עולה'} בקפיצות של ${step}.`, step);
    }
    case 'numberline': {
      const step = expert ? 5 : 1;
      const max = expert ? 50 : 20;
      const marker = randomInt(1, Math.floor((max - 1) / step)) * step;
      return buildNumeric('numberline', 'איזה מספר מסומן בלהבה על ישר המספרים?', marker,
        `הלהבה עומדת בדיוק על ${marker}.`, step, [], { type: 'numberline', min: 0, max, marker });
    }
    case 'word-problem': {
      const first = randomInt(3, expert ? 38 : medium ? 25 : 12);
      const second = randomInt(2, expert ? 27 : medium ? 15 : 9);
      const subtraction = Math.random() > 0.52;
      const high = Math.max(first, second);
      const low = Math.min(first, second);
      const answer = subtraction ? high - low : first + second;
      const prompt = subtraction
        ? `לגמד גיל היו ${high} אבני גחלת. הוא נתן ${low} לחברו. כמה נשארו לו?`
        : `לגמדה נועה היו ${first} אבני גחלת והיא מצאה עוד ${second}. כמה יש לה עכשיו?`;
      return buildNumeric('word-problem', prompt, answer,
        `${subtraction ? `${high} − ${low}` : `${first} + ${second}`} = ${answer}`, 2);
    }
    case 'chain': {
      const start = randomInt(2, medium ? 20 : 12);
      const add = randomInt(2, expert ? 15 : 8);
      const subtract = randomInt(1, Math.max(1, start + add - 1));
      const answer = start + add - subtract;
      return buildNumeric('chain', `${start} + ${add} − ${subtract} = ?`, answer,
        `לפי הסדר: ${start} + ${add} = ${start + add}, ואז ${start + add} − ${subtract} = ${answer}.`, 2);
    }
    case 'parts': {
      const whole = randomInt(8, expert ? 30 : medium ? 20 : 12);
      const part = randomInt(2, whole - 2);
      const answer = whole - part;
      return buildNumeric('parts', `השלם הוא ${whole}. חלק אחד הוא ${part}. מה החלק החסר?`, answer,
        `${part} + ${answer} = ${whole}`, 2, [], { type: 'parts', whole, part });
    }
    case 'square': {
      if (expert || medium) {
        const side = randomInt(2, 9);
        const answer = side * 4;
        return build('square', `לריבוע צלע באורך ${side} ס״מ. מה ההיקף שלו?`, `${answer} ס״מ`,
          [`${side * 2} ס״מ`, `${answer + side} ס״מ`, `${side * 3} ס״מ`],
          `בריבוע 4 צלעות שוות: ${side} × 4 = ${answer} ס״מ.`, { type: 'shape', shape: 'square' });
      }
      return build('square', 'כמה צלעות שוות יש לריבוע?', '4', ['3', '5', '6'],
        'לריבוע יש 4 צלעות באותו אורך.', { type: 'shape', shape: 'square' });
    }
    case 'rectangle': {
      if (expert) {
        const long = randomInt(4, 12);
        const short = randomInt(2, long - 1);
        const answer = (long + short) * 2;
        return build('rectangle', `למלבן צלעות של ${long} ס״מ ו-${short} ס״מ. מה ההיקף?`, `${answer} ס״מ`,
          [`${long + short} ס״מ`, `${answer + 2} ס״מ`, `${long * 2} ס״מ`],
          `ההיקף הוא (${long} + ${short}) × 2 = ${answer} ס״מ.`, { type: 'shape', shape: 'rectangle' });
      }
      return build('rectangle', 'כמה קודקודים יש למלבן?', '4', ['3', '5', '6'],
        'למלבן יש 4 קודקודים ו-4 צלעות.', { type: 'shape', shape: 'rectangle' });
    }
    case 'length': {
      const first = randomInt(3, expert ? 18 : 12);
      const second = randomInt(2, expert ? 9 : 6);
      const answer = first + second;
      return build('length', `חבל אחד ${first} ס״מ וחבל שני ${second} ס״מ. מה האורך יחד?`, `${answer} ס״מ`,
        [`${answer - 1} ס״מ`, `${answer + 2} ס״מ`, `${Math.abs(first - second)} ס״מ`],
        `${first} + ${second} = ${answer} ס״מ`, { type: 'ruler', length: answer });
    }
    case 'polygons': {
      const shapes = [
        { name: 'משולש', sides: 3, shape: 'triangle' as const },
        { name: 'מרובע', sides: 4, shape: 'rectangle' as const },
        { name: 'מחומש', sides: 5, shape: 'pentagon' as const },
      ];
      const picked = shapes[randomInt(0, shapes.length - 1)];
      return build('polygons', `למצולע יש ${picked.sides} צלעות. איך קוראים לו?`, picked.name,
        shapes.filter((item) => item.name !== picked.name).map((item) => item.name),
        `מצולע בעל ${picked.sides} צלעות נקרא ${picked.name}.`, { type: 'shape', shape: picked.shape });
    }
    case 'vertices': {
      const picked = [
        { name: 'משולש', count: 3, shape: 'triangle' as const },
        { name: 'מרובע', count: 4, shape: 'rectangle' as const },
        { name: 'מחומש', count: 5, shape: 'pentagon' as const },
      ][randomInt(0, 2)];
      const answer = `${picked.count} קודקודים`;
      return build('vertices', `כמה קודקודים יש ל${picked.name}?`, answer,
        [`${picked.count + 1} קודקודים`, `${picked.count - 1} קודקודים`, `${picked.count + 2} קודקודים`],
        `ב${picked.name} מספר הקודקודים שווה למספר הצלעות: ${picked.count}.`, { type: 'shape', shape: picked.shape });
    }
  }
}

export function buildLevelQuestions(level: LevelDef, difficulty: Difficulty): Question[] {
  const questions: Question[] = [];
  const seen = new Set<string>();
  for (let index = 0; index < level.questions; index += 1) {
    const topicId = level.topics[index % level.topics.length];
    let question = createQuestion(topicId, difficulty);
    let attempts = 0;
    while (seen.has(question.prompt) && attempts < 6) {
      question = createQuestion(topicId, difficulty);
      attempts += 1;
    }
    seen.add(question.prompt);
    questions.push(question);
  }
  return questions;
}
