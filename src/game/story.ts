import { WORLDS, type WorldId } from './content';

export type RacerId =
  | 'shlomper' | 'tzviki' | 'mira' | 'shoki' | 'dobi'
  /* חלל */
  | 'space-shlomper' | 'space-zigi' | 'space-leo' | 'space-robi' | 'space-nova'
  /* אוצר */
  | 'pirates-shlomper' | 'pirates-fini' | 'pirates-rio' | 'pirates-sharki' | 'pirates-max'
  /* מדע */
  | 'science-shlomper' | 'science-yanshuf' | 'science-zik' | 'science-teksi' | 'science-pandora'
  /* פרחים */
  | 'flowers-shlomper' | 'flowers-lili' | 'flowers-nina' | 'flowers-roki' | 'flowers-tinker'
  /* כימיה */
  | 'potion-shlomper' | 'potion-darkan' | 'potion-langa' | 'potion-tzfardea' | 'potion-til'
  /* גן חיות */
  | 'zoo-shlomper' | 'zoo-ari' | 'zoo-pingo' | 'zoo-tika' | 'zoo-jiro'
  /* רובוטים */
  | 'robots-shlomper' | 'robots-boti' | 'robots-spark' | 'robots-volter' | 'robots-zi'
  /* חדי קרן */
  | 'unicorns-shlomper' | 'unicorns-darkonon' | 'unicorns-or' | 'unicorns-silvi' | 'unicorns-pinki';

export type Racer = {
  id: RacerId;
  name: string;
  title: string;
  emoji: string;
  image: string;
  color: string;
  vehicle: string;
  trait: string;
  description: string;
};

export const RACERS: Racer[] = [
  {
    id: 'shlomper', name: 'שלומפר', title: 'החד-קרן הקסום שלנו 🦄', emoji: '🦄',
    image: 'images/racers/shlomper.jpg', color: '#a855f7', vehicle: 'דוהר על קשת בענן', trait: 'חכם, אמיץ ומאמין בך!',
    description: 'חד-קרן קסום עם לב טוב. הוא מהיר מאוד, אבל כדי לדהור הוא צריך את קסם החשבון שלך — כל תשובה נכונה נותנת לו כוח!',
  },
  {
    id: 'tzviki', name: 'צביקי', title: 'האוגר הטייס 🐹', emoji: '🐹',
    image: 'images/racers/tzviki.jpg', color: '#2aa7de', vehicle: 'טס בצפלין', trait: 'אוגר קטן עם חלומות גדולים!',
    description: 'ילד אוגר קטן שטס בצפלין ומאמין שאין דבר שהוא לא יכול לעשות. לפעמים הצפלין שלו מאבד קצת אוויר...',
  },
  {
    id: 'mira', name: 'מירה', title: 'הפיה המתוקה 🧚', emoji: '🧚',
    image: 'images/racers/mira.jpg', color: '#ec4899', vehicle: 'רוכבת על שניצל הברבור', trait: 'פיה טובה עם לב גדול!',
    description: 'פיה טובה עם לב גדול! רוכבת על שניצל, הברבור הקסום. היא תמיד עוצרת לעזור לחיות שבדרך.',
  },
  {
    id: 'shoki', name: 'שוקי', title: 'טבלת השוקולד 🍫', emoji: '🍫',
    image: 'images/racers/shoki.jpg', color: '#f59e0b', vehicle: 'רץ עם חיוך ענק', trait: 'מצחיק ואופטימי תמיד!',
    description: 'טבלת שוקולד מצחיקה ואופטימית, לובשת חולצה בצבעי הקשת. לפעמים הוא עוצר לנשנש... את עצמו!',
  },
  {
    id: 'dobi', name: 'דובי', title: 'הדוב האמיץ 🐻', emoji: '🐻',
    image: 'images/racers/dobi.jpg', color: '#22c55e', vehicle: 'צועד עם חרב ומגן', trait: 'אמיץ וחזק, שומר על כולם!',
    description: 'דוב אמיץ וחזק! נלחם במפלצות כדי לשמור על כולם. לפעמים הוא מתבלבל ונלחם בענן או בשיח...',
  },
  /* ---- ממלכת החלל 🚀 ---- */
  {
    id: 'space-shlomper', name: 'שלומפר', title: 'חד הקרן הקוסמי 🚀', emoji: '🦄',
    image: 'images/cast-space-0.png', color: '#6d4bc4', vehicle: 'טס בחליפת חלל סגולה', trait: 'אמיץ וסקרן!',
    description: 'חד הקרן הקוסמי! אמיץ, סקרן ואוהב לגלות כוכבים חדשים. כל תשובה נכונה שלך מדליקה את מנועי הקסם שלו.',
  },
  {
    id: 'space-zigi', name: 'זיגי', title: 'החייזר הסקרן 👽', emoji: '👽',
    image: 'images/cast-space-1.png', color: '#5fbf4a', vehicle: 'צלחת מעופפת', trait: 'חייזר ידידותי וסקרן!',
    description: 'חייזר ידידותי וסקרן! תמיד מוכן לצאת להרפתקה בין הכוכבים.',
  },
  {
    id: 'space-leo', name: 'קפטן ליאו', title: 'האריה האסטרונאוט 🦁', emoji: '🦁',
    image: 'images/cast-space-2.png', color: '#e08b3c', vehicle: 'טייס חלליות', trait: 'אמיץ ומצחיק!',
    description: 'אריה אסטרונאוט אמיץ עם חליפת חלל. מנווט בין כוכבים וצוחק כל הדרך.',
  },
  {
    id: 'space-robi', name: 'רובי', title: 'הרובוט השובב 🤖', emoji: '🤖',
    image: 'images/cast-space-3.png', color: '#4f8fe0', vehicle: 'מנועי סילון ברגליים', trait: 'רובוט חכם ושובב!',
    description: 'רובוט חכם ושובב! עוזר לכולם לפתור בעיות בחלל.',
  },
  {
    id: 'space-nova', name: 'נובה', title: 'פיית הכוכבים ✨', emoji: '🧚',
    image: 'images/cast-space-4.png', color: '#e05fc8', vehicle: 'עפה על אבק כוכבים', trait: 'פיית כוכבים קסומה!',
    description: 'פיית כוכבים קסומה! מפיצה אור וחיוכים בכל הגלקסיה.',
  },
  /* ---- איי האוצר 🏴‍☠️ ---- */
  {
    id: 'pirates-shlomper', name: 'שלומפר', title: 'חד הקרן רב-החובל 🏴‍☠️', emoji: '🦄',
    image: 'images/cast-pirates-0.png', color: '#1f8a8a', vehicle: 'מפליג בספינת הקשת', trait: 'אמיץ עם מפת אוצר!',
    description: 'חכם, אמיץ ועם כובע פיראטים ומפת אוצר! הוא מאמין בך ובכוח החשבון שלך.',
  },
  {
    id: 'pirates-fini', name: 'פיני', title: 'הפינגווין הימי 🐧', emoji: '🐧',
    image: 'images/cast-pirates-1.png', color: '#2b7fd4', vehicle: 'גולש על גלי הים', trait: 'פינגווין אמיץ!',
    description: 'פינגווין קטן ואמיץ שמפליג בימים. אוהב לספור דגים בקפיצות של 2.',
  },
  {
    id: 'pirates-rio', name: 'קפטן ריו', title: 'הקברניט האמיץ ⚓', emoji: '⚓',
    image: 'images/cast-pirates-2.png', color: '#a0433a', vehicle: 'על סיפון ספינת מפרש', trait: 'קברניט חזק וטוב לב!',
    description: 'קפטן אמיץ שמוביל את הצוות להרפתקאות ימיות. תמיד שומר על החברים שלו.',
  },
  {
    id: 'pirates-sharki', name: 'שארקי', title: 'הכריש הידידותי 🦈', emoji: '🦈',
    image: 'images/cast-pirates-3.png', color: '#3a6fa8', vehicle: 'שט בין הגלים', trait: 'כריש ידידותי ומצחיק!',
    description: 'כריש גדול אבל הכי ידידותי בים! עוזר לחברים לעבור בין השוניות.',
  },
  {
    id: 'pirates-max', name: 'מקס', title: 'הקוף הימי 🐵', emoji: '🐵',
    image: 'images/cast-pirates-4.png', color: '#b5773a', vehicle: 'מטפס על התורן', trait: 'שובב וקופצני!',
    description: 'קוף שובב שמטפס על תורני הספינה ומחפש אוצרות. תמיד מוכן לשחק.',
  },
  /* ---- ממלכת המדע 🔬 ---- */
  {
    id: 'science-shlomper', name: 'שלומפר', title: 'חד הקרן המדען 🔬', emoji: '🦄',
    image: 'images/cast-science-0.png', color: '#2b6fb5', vehicle: 'עם חלוק מעבדה ומשקפיים', trait: 'חכם וסקרן!',
    description: 'חד הקרן המדען! אמיץ, חכם ולב טוב. הוא מאמין בך!',
  },
  {
    id: 'science-yanshuf', name: 'ד״ר ינשוף', title: 'המדען החכם 🦉', emoji: '🦉',
    image: 'images/cast-science-1.png', color: '#6b5b95', vehicle: 'עף בין מבחנות', trait: 'חכם ומצחיק!',
    description: 'ינשוף מדען עם משקפיים. חוקר ניסויים ומסביר הכל בסבלנות.',
  },
  {
    id: 'science-zik', name: 'פרופ׳ זיק', title: 'הממציא המפוזר ⚡', emoji: '⚡',
    image: 'images/cast-science-2.png', color: '#e0a33c', vehicle: 'על מכונה מוזרה', trait: 'ממציא מפוזר ומצחיק!',
    description: 'פרופסור ממציא שמערבב דברים ומגלה המצאות מדהימות — לפעמים בטעות.',
  },
  {
    id: 'science-teksi', name: 'טקסי', title: 'הרובוט החוקר 🤖', emoji: '🤖',
    image: 'images/cast-science-3.png', color: '#4a9a8a', vehicle: 'מתגלגל על גלגלים', trait: 'רובוט סקרן!',
    description: 'רובוט קטן שסורק ומגלה דברים חדשים במעבדה.',
  },
  {
    id: 'science-pandora', name: 'פנדורה', title: 'החתולה הסקרנית 🐱', emoji: '🐱',
    image: 'images/cast-science-4.png', color: '#c46ba0', vehicle: 'מתגנבת בין המדפים', trait: 'חתולה סקרנית ומתוקה!',
    description: 'חתולה סקרנית שאוהבת לחקור כל פינה במעבדה. לפעמים מפילה מבחנות.',
  },
  /* ---- עולם הפרחים 🌸 ---- */
  {
    id: 'flowers-shlomper', name: 'שלומפר', title: 'חד הקרן הפורח 🌸', emoji: '🦄',
    image: 'images/cast-flowers-0.png', color: '#e0417a', vehicle: 'דוהר בין פרחים ענקיים', trait: 'אוהב פרחים!',
    description: 'חד הקרן הפורח! שלומפר אוהב פרחים צבעוניים, והם אוהבים אותו בחזרה. כל תשובה נכונה שלך מגדילה להם עלה חדש!',
  },
  {
    id: 'flowers-lili', name: 'לילי', title: 'השושנה הצוחקת 🌹', emoji: '🌹',
    image: 'images/cast-flowers-1.png', color: '#e05a8a', vehicle: 'מתנדנדת על עלה', trait: 'יפה ומצחיקה!',
    description: 'שושנה ורודה עם המון הומור. אוהבת לשיר ליתושים — אפילו שהם לא מקשיבים.',
  },
  {
    id: 'flowers-nina', name: 'נינה', title: 'החמנייה השמחה 🌻', emoji: '🌻',
    image: 'images/cast-flowers-2.png', color: '#f5a623', vehicle: 'פונה תמיד לשמש', trait: 'חמה ומצחיקה!',
    description: 'חמנייה ענקית עם חיוך ענק. מסתובבת כל היום אחרי השמש, ולפעמים שוכחת לאן.',
  },
  {
    id: 'flowers-roki', name: 'רוקי', title: 'הפרח השובב 🪻', emoji: '🪻',
    image: 'images/cast-flowers-3.png', color: '#7a3fbf', vehicle: 'קופץ בין עלים', trait: 'שובב וקופצני!',
    description: 'פרח שובב שקופץ בין העלים ומצחיק את כולם.',
  },
  {
    id: 'flowers-tinker', name: 'טינקר', title: 'פיית הפרחים 🧚', emoji: '🧚',
    image: 'images/cast-flowers-4.png', color: '#e08bc4', vehicle: 'עפה על אבק פרחים', trait: 'פיה קסומה!',
    description: 'פיית פרחים קטנה שמפזרת אבקה מנצנצת וצבעים בכל הגינה.',
  },
  /* ---- עולם הכימיה והשיקויים 🧪 ---- */
  {
    id: 'potion-shlomper', name: 'שלומפר', title: 'חד הקרן האלכימאי 🧪', emoji: '🦄',
    image: 'images/cast-potion-0.png', color: '#0f766e', vehicle: 'נושא מבחנה קסומה', trait: 'אלכימאי מבריק!',
    description: 'חד הקרן האלכימאי! שלומפר מערבב שיקויים קסומים — וכל תשובה נכונה שלך מוסיפה להם ניצוץ.',
  },
  {
    id: 'potion-darkan', name: 'דרקן', title: 'הדרקון השיקויים 🐉', emoji: '🐉',
    image: 'images/cast-potion-1.png', color: '#7a3fbf', vehicle: 'נושף אדים קסומים', trait: 'דרקון ידידותי!',
    description: 'דרקון קטן וידידותי שמחמם את השיקויים עם האש שלו.',
  },
  {
    id: 'potion-langa', name: 'לנגה', title: 'הלטאה המרקדת 🦎', emoji: '🦎',
    image: 'images/cast-potion-2.png', color: '#2a9a6a', vehicle: 'מחליקה על שולחן', trait: 'זריזה ומצחיקה!',
    description: 'לטאה ירוקה וזריזה שמרקדת בין המבחנות.',
  },
  {
    id: 'potion-tzfardea', name: 'פרופסור צפרדע', title: 'המדען המבעבע 🐸', emoji: '🐸',
    image: 'images/cast-potion-3.png', color: '#4a9a3a', vehicle: 'קופץ בין שיקויים', trait: 'מצחיק ומבולבל!',
    description: 'צפרדע פרופסור שמערבבת שיקויים ומבעבעת מכל הכיוונים.',
  },
  {
    id: 'potion-til', name: 'מר טיל', title: 'החילזון האיטי 🐌', emoji: '🐌',
    image: 'images/cast-potion-4.png', color: '#a06a3a', vehicle: 'זוחל לאט ובטוח', trait: 'איטי ומתוק!',
    description: 'חילזון קטן ואיטי שתמיד מגיע בזמן בסוף.',
  },
  /* ---- עולם גן החיות 🦁 ---- */
  {
    id: 'zoo-shlomper', name: 'שלומפר', title: 'חד הקרן חוקר החיות 🦁', emoji: '🦄',
    image: 'images/cast-zoo-0.png', color: '#b45309', vehicle: 'דוהר לצד הג׳ירפות', trait: 'אוהב חיות!',
    description: 'חד הקרן חוקר החיות! שלומפר אוהב את כל החיות — אפילו הדינוזאורים הענקיים מנפנפים לו בידידות.',
  },
  {
    id: 'zoo-ari', name: 'ארי', title: 'מלך הספארי 🦁', emoji: '🦁',
    image: 'images/cast-zoo-1.png', color: '#e0a33c', vehicle: 'דוהר על הסוואנה', trait: 'מלך עם לב רך!',
    description: 'אריה גדול עם רעמה זהובה. שואג בקול רם — אבל מתכופף כדי לעזור לנמלה קטנה.',
  },
  {
    id: 'zoo-pingo', name: 'פינגו', title: 'הפינגווין הקופץ 🐧', emoji: '🐧',
    image: 'images/cast-zoo-2.png', color: '#2b7fd4', vehicle: 'מחליק על הקרח', trait: 'קופצני ומצחיק!',
    description: 'פינגווין קטן שמחליק על הקרח ומצחיק את כולם.',
  },
  {
    id: 'zoo-tika', name: 'טיקה', title: 'הטיגריס המנומר 🐯', emoji: '🐯',
    image: 'images/cast-zoo-3.png', color: '#e07a3c', vehicle: 'מתגנב בג׳ונגל', trait: 'מהיר וחזק!',
    description: 'טיגריס מנומר ומהיר שמתגנב בין העצים בג׳ונגל.',
  },
  {
    id: 'zoo-jiro', name: 'ג׳ירו', title: 'הג׳ירפה הגבוהה 🦒', emoji: '🦒',
    image: 'images/cast-zoo-4.png', color: '#ea580c', vehicle: 'רואה למרחקים', trait: 'גבוהה ומתוקה!',
    description: 'ג׳ירפה עם צוואר ארוך במיוחד. רואה למרחק — ומגלה אוצרות שאיש לא רואה מלמטה.',
  },
  /* ---- עולם הרובוטים 🤖 ---- */
  {
    id: 'robots-shlomper', name: 'שלומפר', title: 'חד הקרן המהנדס 🤖', emoji: '🦄',
    image: 'images/cast-robots-0.png', color: '#1e40af', vehicle: 'נוסע על רולרבליידס חכמים', trait: 'מהנדס חכם!',
    description: 'חד הקרן המהנדס! שלומפר אוהב להמציא דברים עם הרובוטים — וכל תשובה נכונה שלך מטעינה להם סוללה.',
  },
  {
    id: 'robots-boti', name: 'בוטי', title: 'הרובוט החכם 🤖', emoji: '🤖',
    image: 'images/cast-robots-1.png', color: '#4f8fe0', vehicle: 'מתגלגל על גלגלי שיניים', trait: 'חכם ומהיר!',
    description: 'רובוט כחול עם נורות מהבהבות. חושב מיליון מחשבות בשנייה.',
  },
  {
    id: 'robots-spark', name: 'ספארק', title: 'הרובוט החשמלי ⚡', emoji: '⚡',
    image: 'images/cast-robots-2.png', color: '#e0a33c', vehicle: 'נוצץ בחשמל', trait: 'אנרגטי תמיד!',
    description: 'רובוט מלא חשמל וניצוצות. אנרגטי ומצחיק.',
  },
  {
    id: 'robots-volter', name: 'וולטר', title: 'הרובוט המצייר 📺', emoji: '📺',
    image: 'images/cast-robots-3.png', color: '#7c3aed', vehicle: 'מציג תמונות באוויר', trait: 'יצירתי וצבעוני!',
    description: 'רובוט עם וולטר. מצטייר עליו כל מה שהוא חושב.',
  },
  {
    id: 'robots-zi', name: 'זי', title: 'הרובוט הנטען 🔋', emoji: '🔋',
    image: 'images/cast-robots-4.png', color: '#15803d', vehicle: 'דוהר בין שקעים', trait: 'אנרגטי וחכם!',
    description: 'רובוט ירוק שטוען את עצמו תוך כדי תנועה. מוסיף אנרגיה לכל החברים.',
  },
  /* ---- עולם חדי הקרן 🦄 ---- */
  {
    id: 'unicorns-shlomper', name: 'שלומפר', title: 'חד הקרן החוזר הביתה 🏡', emoji: '🦄',
    image: 'images/cast-unicorns-0.png', color: '#be185d', vehicle: 'דוהר הביתה אל המשפחה', trait: 'שמח לחזור הביתה!',
    description: 'חד הקרן שחוזר הביתה! אחרי מסע ארוך ומופלא, שלומפר דוהר חזרה אל המשפחה שלו — בזכותך!',
  },
  {
    id: 'unicorns-darkonon', name: 'דרקונון', title: 'חבר הדרקון הקטן 🐉', emoji: '🐉',
    image: 'images/cast-unicorns-1.png', color: '#7a3fbf', vehicle: 'עף על כנפיים קטנות', trait: 'קטן ואמיץ!',
    description: 'דרקון קטן שהוא החבר הכי טוב של שלומפר. מחכה לו בבית עם הפתעה.',
  },
  {
    id: 'unicorns-or', name: 'פיית אור', title: 'הפיה הזוהרת ✨', emoji: '✨',
    image: 'images/cast-unicorns-2.png', color: '#e0a33c', vehicle: 'עפה על אור מנצנץ', trait: 'זוהרת וקסומה!',
    description: 'פיה זוהרת שמאירה את הדרך הביתה בשלומפר ומוסיפה קסם בכל צעד.',
  },
  {
    id: 'unicorns-silvi', name: 'סילבי', title: 'החתולה הרכה 🐱', emoji: '🐱',
    image: 'images/cast-unicorns-3.png', color: '#c46ba0', vehicle: 'מתגנבת על הגג', trait: 'רכה ומתוקה!',
    description: 'חתולה רכה ומתוקה שאוהבת להתכרבל ליד שלומפר.',
  },
  {
    id: 'unicorns-pinki', name: 'פינקי', title: 'החד-קרן הוורוד 🦄', emoji: '🦄',
    image: 'images/cast-unicorns-4.png', color: '#e05a9a', vehicle: 'קופץ על עננים', trait: 'ורוד ומצחיק!',
    description: 'חד קרן ורוד וקטן שמקפץ על עננים ומפיץ שמחה בכל מקום.',
  },
];

export const racerById = (id: RacerId): Racer => RACERS.find((r) => r.id === id) ?? RACERS[0];

type CastEntry = { id: RacerId; title?: string; description?: string; vehicle?: string };

/** שלומפר מופיע בכל העולם (הוא מייצג את השחקנית) — שאר החברים משתנים לפי העולם. */
export const WORLD_CASTS: Record<WorldId, CastEntry[]> = {
  kingdom: [{ id: 'shlomper' }, { id: 'tzviki' }, { id: 'mira' }, { id: 'shoki' }, { id: 'dobi' }],
  space: [
    { id: 'space-shlomper' }, { id: 'space-zigi' }, { id: 'space-leo' }, { id: 'space-robi' }, { id: 'space-nova' },
  ],
  pirates: [
    { id: 'pirates-shlomper' }, { id: 'pirates-fini' }, { id: 'pirates-rio' }, { id: 'pirates-sharki' }, { id: 'pirates-max' },
  ],
  science: [
    { id: 'science-shlomper' }, { id: 'science-yanshuf' }, { id: 'science-zik' }, { id: 'science-teksi' }, { id: 'science-pandora' },
  ],
  flowers: [
    { id: 'flowers-shlomper' }, { id: 'flowers-lili' }, { id: 'flowers-nina' }, { id: 'flowers-roki' }, { id: 'flowers-tinker' },
  ],
  potion: [
    { id: 'potion-shlomper' }, { id: 'potion-darkan' }, { id: 'potion-langa' }, { id: 'potion-tzfardea' }, { id: 'potion-til' },
  ],
  zoo: [
    { id: 'zoo-shlomper' }, { id: 'zoo-ari' }, { id: 'zoo-pingo' }, { id: 'zoo-tika' }, { id: 'zoo-jiro' },
  ],
  robots: [
    { id: 'robots-shlomper' }, { id: 'robots-boti' }, { id: 'robots-spark' }, { id: 'robots-volter' }, { id: 'robots-zi' },
  ],
  unicorns: [
    { id: 'unicorns-shlomper' }, { id: 'unicorns-darkonon' }, { id: 'unicorns-or' }, { id: 'unicorns-silvi' }, { id: 'unicorns-pinki' },
  ],
};

export function castFor(world: WorldId): Racer[] {
  return WORLD_CASTS[world].map((entry) => {
    const base = racerById(entry.id);
    return {
      ...base,
      title: entry.title ?? base.title,
      description: entry.description ?? base.description,
      vehicle: entry.vehicle ?? base.vehicle,
    };
  });
}

export type StoryLine = { speaker: RacerId | 'narrator'; text: string };

export type StoryBeat = {
  id: number;
  /** אחרי איזו תחנה מוצג (0 = פתיחה לפני תחנה 1) */
  afterStation: number;
  kicker: string;
  title: string;
  narration: string;
  lines: StoryLine[];
  raceNote: string;
};

export const STORY_BEATS: StoryBeat[] = [
  /* ---------------- ארץ החשבון ---------------- */
  {
    id: 0, afterStation: 0, kicker: '🏁 קו הזינוק · אחו החד-קרן', title: 'תחרות החשבוניאדה מתחילה!',
    narration: 'ברוכה הבאה לארץ החשבון! פעם בשנה מתקיימת כאן תחרות החשבוניאדה הגדולה — מרוץ קסום של 9 תחנות עד טירת הקשת. שלומפר החד-קרן בחר בך להיות העוזרת החכמה שלו!',
    lines: [
      { speaker: 'shlomper', text: 'שלום! אני שלומפר! עם החשבון שלך ננצח ביחד, אני מבטיח!' },
      { speaker: 'tzviki', text: 'בהצלחה לכולם! הצפלין שלי כבר מנופח ומוכן!' },
      { speaker: 'narrator', text: 'הדגל הונף! עזרי לשלומפר לנצח — עני על 5 השאלות בתחנה הראשונה!' },
    ],
    raceNote: 'כולם עומדים בקו הזינוק. שלומפר סומך עלייך!',
  },
  {
    id: 1, afterStation: 1, kicker: '🌳 בדרך לבית העץ הענק', title: 'זינוק מושלם!',
    narration: 'התשובות הנכונות שלך הפכו לקסם נוצץ שדחף את שלומפר קדימה. הוא דוהר בראש הטור, והרעמה הוורודה שלו מתנופפת ברוח.',
    lines: [
      { speaker: 'shlomper', text: 'וואו! הרגשתי את הקסם שלך! את אלופה אמיתית!' },
      { speaker: 'tzviki', text: 'היי, חכו לי! הרוח לקחה את הצפלין קצת הצידה...' },
    ],
    raceNote: 'שלומפר פרץ קדימה!',
  },
  {
    id: 2, afterStation: 2, kicker: '🐚 בדרך לחוף הצדף הנוצץ', title: 'קסם החשבון עובד!',
    narration: 'כל תשובה נכונה שלך נוצצת באוויר והופכת לניצוצות זהב סביב שלומפר. הוא כבר רואה מרחוק את חוף הצדף הנוצץ!',
    lines: [
      { speaker: 'mira', text: 'שניצל ראה ברווזונים קטנים שהלכו לאיבוד — עצרנו לעזור להם לחזור לאמא!' },
      { speaker: 'shlomper', text: 'מירה כל כך טובה! אבל אנחנו ממשיכים — יש לנו מרוץ לנצח!' },
    ],
    raceNote: 'שלומפר מגדיל את הפער!',
  },
  {
    id: 3, afterStation: 3, kicker: '💎 בדרך למערת הקריסטל', title: 'מחצית הדרך לעמק!',
    narration: 'סיימתן את כל תחנות עמק הפתיחה! הקרן של שלומפר זוהרת בכל פעם שאת עונה נכון. עכשיו נכנסים ללב היער המסתורי.',
    lines: [
      { speaker: 'shoki', text: 'הייתי רעב אז נשנשתי קצת... מהיד שלי. אל תדאגו, היא צומחת בחזרה!' },
      { speaker: 'shlomper', text: 'את רואה? כולם מתוקים, אבל אנחנו הכי מהירים בזכותך!' },
    ],
    raceNote: 'שלומפר מוביל בביטחון!',
  },
  {
    id: 4, afterStation: 4, kicker: '🌉 בדרך לכפר הגשר הקסום', title: 'המערה האירה את הדרך!',
    narration: 'הקריסטלים במערה נצצו בכל הצבעים כשענית נכון! שלומפר יצא מהמערה זוהר כמו כוכב.',
    lines: [
      { speaker: 'dobi', text: 'שמעתי רעש במערה ורצתי להילחם... זו הייתה רק טיפת מים. טיפה מאוד אמיצה!' },
      { speaker: 'shlomper', text: 'קדימה! הגשר הקסום כבר מחכה לנו!' },
    ],
    raceNote: 'שלומפר דוהר קדימה!',
  },
  {
    id: 5, afterStation: 5, kicker: '🍄 בדרך לבתי הפטריות', title: 'חוצים את הגשר!',
    narration: 'עברתן את הגשר הקסום! הכפריים יצאו לרחובות ועודדו: "שלומפר! שלומפר!"',
    lines: [
      { speaker: 'shoki', text: 'עצרתי בכפר לקנות גלידה... ואז עוד אחת... ואז שכחתי שיש מרוץ!' },
      { speaker: 'shlomper', text: 'שמעת את העידוד? כולם מאמינים בנו! בזכות החשבון שלך!' },
    ],
    raceNote: 'שלומפר שומר על ההובלה!',
  },
  {
    id: 6, afterStation: 6, kicker: '🌊 בדרך למפל הפיות', title: 'סיימתן את לב היער!',
    narration: 'הפטריות הענקיות נדנדו לשלום, ועכשיו מטפסים לפסגת הקשת — האזור האחרון והמרגש ביותר!',
    lines: [
      { speaker: 'mira', text: 'שניצל התעייף קצת, אז נתתי לו לנוח על ענן רך. הוא כל כך חמוד כשהוא ישן!' },
      { speaker: 'shlomper', text: 'שלוש תחנות אחרונות! אני מרגיש שאנחנו הולכות לנצח!' },
    ],
    raceNote: 'שלומפר מתקרב לפסגה!',
  },
  {
    id: 7, afterStation: 7, kicker: '✨ בדרך לאגם הזוהר', title: 'מעל המפל!',
    narration: 'עברתן את מפל הפיות! שלומפר קפץ מעל המפל בקפיצה ענקית שכולם יזכרו לנצח!',
    lines: [
      { speaker: 'tzviki', text: 'ניסיתי לעוף מעל המפל ועשיתי סיבוב שלם באוויר! זה היה בכוונה! (לא באמת)' },
      { speaker: 'shlomper', text: 'רק עוד שתי תחנות! הקרן שלי כבר רואה את טירת הקשת!' },
    ],
    raceNote: 'שלומפר מתקרב לניצחון!',
  },
  {
    id: 8, afterStation: 8, kicker: '🏰 בדרך לטירת הקשת — הגמר!', title: 'ישורת אחרונה!',
    narration: 'אגם הזוהר מאחוריכן! מרחוק כבר רואים את טירת הקשת עם דגלי הזהב, ואת קו הגמר הנוצץ.',
    lines: [
      { speaker: 'dobi', text: 'רוצו! אני אשמור על המסלול ממפלצות! ...ומעננים!' },
      { speaker: 'shlomper', text: 'שמעת? כולם בעדנו! עוד תחנה אחת — בואי נראה להם מה אנחנו יודעות!' },
    ],
    raceNote: 'כל המתחרים עוצרים לעודד!',
  },
  {
    id: 9, afterStation: 9, kicker: '🚀 מטירת הקשת אל הכוכבים', title: 'שער מסתורי נפתח בשמיים!',
    narration: 'הגעתן ראשונות לטירת הקשת! בדיוק כששלומפר קיבל את גביע החשבוניאדה, הכוכב שבכתר נדלק ופתח שער סודי לחלל. קול מסתורי קרא לעזרה מממלכת החלל!',
    lines: [
      { speaker: 'tzviki', text: 'אנחנו נשמור לכם על ארץ החשבון! בחלל מחכים לכם חברים חדשים — בהצלחה!' },
      { speaker: 'shlomper', text: 'ניצחנו את החשבוניאדה! ועכשיו מחכה לנו הרפתקה חדשה בין הכוכבים!' },
    ],
    raceNote: 'הכתר הפך לחללית קסומה!',
  },

  /* ---------------- ממלכת החלל ---------------- */
  {
    id: 10, afterStation: 10, kicker: '🪐 רציף השיגור', title: 'שלוש, שתיים, אחת — ממריאות!',
    narration: 'ברציף השיגור חיכו לכן חברים חדשים: זיגי החייזר, רובי הרובוט, נובה פיית הכוכבים וליאו שועל החלל. כולם רוצים להגיע ראשונים לכוכב הכתר!',
    lines: [
      { speaker: 'space-zigi', text: 'שלום! אני זיגי! בכוכב שלי סופרים עד עשר עם האנטנות. רוצות לראות?' },
      { speaker: 'shlomper', text: 'איזה כיף שיש לנו חברים חדשים! כל תשובה נכונה שלך מדליקה עוד כוכב ניווט.' },
    ],
    raceNote: 'המרוץ הגלקטי התחיל!',
  },
  {
    id: 11, afterStation: 11, kicker: '🌙 תחנת הירח', title: 'מי גנב את גבינת הירח?',
    narration: 'בתחנת הירח נשמע קול פצפוץ, ושובל של פירורים הוביל אל דלת עגולה. רובי סרק את הפירורים וגילה שהם שייכים לעכברושון ירח קטן ורעב!',
    lines: [
      { speaker: 'space-robi', text: 'ביפ-בופ! ניתוח הושלם: הפירורים עשויים גבינה במאה אחוז. ביפ!' },
      { speaker: 'shlomper', text: 'בואי נפתור את החידות ונמצא את העכברושון לפני שייגמר לו האוכל!' },
    ],
    raceNote: 'מפתח המעבדה נעול בתרגיל סודי!',
  },
  {
    id: 12, afterStation: 12, kicker: '🪐 טבעת שבתאי', title: 'קפיצות בין טבעות!',
    narration: 'מצאתן את העכברושון והחזרתן לו את הגבינה! הוא גילה לכן קיצור דרך דרך טבעות שבתאי — אבל צריך לקפוץ בעשרות שלמות.',
    lines: [
      { speaker: 'space-leo', text: 'אני אקפוץ ראשון! ...אופס, קפצתי מהר מדי ונחתתי על ירח לא נכון.' },
      { speaker: 'shlomper', text: 'ליאו מהיר, אבל אנחנו מדויקות! קדימה לחגורת האסטרואידים.' },
    ],
    raceNote: 'שבתאי מסתובב, והדרך נפתחת!',
  },
  {
    id: 13, afterStation: 13, kicker: '☄️ שביל האסטרואידים', title: 'סלעים רוקדים בחלל!',
    narration: 'עברתן את הטבעות! עכשיו חגורת אסטרואידים חוסמת את הדרך. הסלעים זזים בתבנית קבועה, כמו סדרה גדולה.',
    lines: [
      { speaker: 'space-zigi', text: 'הסלעים קופצים אחד קדימה ושניים אחורה! או שזה הפוך? בכוכב שלי הכל הפוך!' },
      { speaker: 'shlomper', text: 'אם נמצא את הדפוס שלהם, נדע בדיוק מתי לעוף.' },
    ],
    raceNote: 'תבנית האסטרואידים היא המפתח!',
  },
  {
    id: 14, afterStation: 14, kicker: '🔭 מצפה הכוכבים', title: 'הכוכב שנעלם מהמפה',
    narration: 'דרך הסלעים בטוחה! במצפה הכוכבים גילתה נובה שכוכב קטן ברח מהמקום שלו על ישר המספרים הגלקטי.',
    lines: [
      { speaker: 'space-nova', text: 'הכוכב הקטן מפחד מהחושך. אם נמצא אותו, אדליק לו אור כוכבים קסום!' },
      { speaker: 'shlomper', text: 'נאתר אותו ונחזיר אותו למפה!' },
    ],
    raceNote: 'מפת הכוכבים מתעדכנת!',
  },
  {
    id: 15, afterStation: 15, kicker: '🍰 כוכב העוגות', title: 'החגיגה הכי מתוקה בגלקסיה',
    narration: 'הכוכב חזר למקומו והאיר שביל לכוכב קטן שבו כל העוגות עשויות מאבק כוכבים!',
    lines: [
      { speaker: 'space-robi', text: 'ביפ! העוגה מחולקת לחלקים. חסר חלק אחד כדי להשלים את השלם. ביפ-בופ!' },
      { speaker: 'shlomper', text: 'בואי נמצא את החלק החסר — ואולי נקבל פרוסה!' },
    ],
    raceNote: 'פרוסת עוגה אחת היא מפתח!',
  },
  {
    id: 16, afterStation: 16, kicker: '🌑 מכתש הירח', title: 'המכתש עם דלת הצורות',
    narration: 'עוגת אבק הכוכבים התחלקה בדיוק! מתחתיה הופיע פתח למכתש, ובתוכו דלת שעליה מצוירות צורות מסתוריות.',
    lines: [
      { speaker: 'space-leo', text: 'ספרתי את הצלעות ממש מהר! ...אבל אולי ספרתי אותן פעמיים.' },
      { speaker: 'shlomper', text: 'נזהה את הצורות ונמצא את המפתח. ערפילית הקשת ממש מעבר לפינה!' },
    ],
    raceNote: 'הצורות מראות את הדרך!',
  },
  {
    id: 17, afterStation: 17, kicker: '🌈 ערפילית הקשת', title: 'גלי המספרים הצבעוניים',
    narration: 'החללית נכנסה לענן צבעוני של אבק כוכבים. המספרים צפים באוויר כמו בועות, וכל אחד מחפש את בן הזוג שלו.',
    lines: [
      { speaker: 'space-nova', text: 'הערפילית כל כך יפה! אבל כוכב הכתר כבר קורא לנו.' },
      { speaker: 'shlomper', text: 'זו התחנה האחרונה בחלל. נצטרך את כל קסם החשבון שלך!' },
    ],
    raceNote: 'ההרפתקה האחרונה בחלל!',
  },
  {
    id: 18, afterStation: 18, kicker: '🗺️ מכוכב הכתר אל איי האוצר', title: 'מפת כוכבים מובילה אל הים!',
    narration: 'שלומפר הגיע ראשון לכוכב הכתר! המלכה הגלקטית העניקה לכן כתר כוכבים — ובתוכו הסתתרה מפה עתיקה של אוצר אבוד באיי האוצר: פנינת המספרים!',
    lines: [
      { speaker: 'space-zigi', text: 'להתראות, חברות! תשלחו לנו גלויה מהים. אני אנופף לכן עם כל האנטנות!' },
      { speaker: 'shlomper', text: 'ניצחנו בחלל — ועכשיו מפליגים לחפש אוצר!' },
    ],
    raceNote: 'החללית הפכה לספינת פיראטים!',
  },

  /* ---------------- איי האוצר ---------------- */
  {
    id: 19, afterStation: 19, kicker: '⚓ חוף הספינה הטרופה', title: 'מי תגיע ראשונה לאוצר?',
    narration: 'על החוף חיכו לכן חברים חדשים: ריו בת הים, פיני התוכי, שארקי צב הים ומקס המפלצת הימית. גם הם שמעו על פנינת המספרים — והמרוץ הימי התחיל!',
    lines: [
      { speaker: 'pirates-fini', text: 'אוצר! אוצר! שלוש, שבע... רגע, כמה מטבעות אמרתי?' },
      { speaker: 'shlomper', text: 'בואי נמצא את הרמז הבא בחורשת התוכים. ביחד אנחנו הכי חזקים!' },
    ],
    raceNote: 'המרוץ הימי התחיל!',
  },
  {
    id: 20, afterStation: 20, kicker: '🦜 חורשת התוכים', title: 'התוכים מפטפטים מספרים',
    narration: 'בחורשה מאות תוכים צעקו מספרים בבת אחת. בזכות החשבון שלך מצאתן את הרמז: "חפשו את הגשר שהצבים בנו".',
    lines: [
      { speaker: 'pirates-sharki', text: 'אני מכיר את הגשר! בניתי אותו לפני מאה שנה... בקפיצות של 2 צדפים.' },
      { speaker: 'shlomper', text: 'שארקי אולי איטי, אבל הוא ממש חכם! קדימה לגשר!' },
    ],
    raceNote: 'הרמז מוביל לגשר!',
  },
  {
    id: 21, afterStation: 21, kicker: '🐢 גשר הצבים', title: 'הגשר נפתח!',
    narration: 'עברתן את גשר הצבים! מנגד מתנשא הר געש שמפריח עשן בצורת סימני שאלה, ומתוכו לוחש קול: "רק מי שתמצא את הסדרה — תעבור".',
    lines: [
      { speaker: 'pirates-max', text: 'אני לא מפחדת מכלום! ...חוץ מסדרות קשות. ומהר געש. קצת.' },
      { speaker: 'shlomper', text: 'אין מה לפחד, מקס. אנחנו נפתור את זה ביחד!' },
    ],
    raceNote: 'הר הגעש מחכה!',
  },
  {
    id: 22, afterStation: 22, kicker: '🌋 הר הגעש הלוחש', title: 'הלבה הפכה לשביל זהב',
    narration: 'פתרת את סדרת הר הגעש, והלבה התקררה לשביל זהב נוצץ. מהפסגה ראיתן לגונה כחולה מלאה דולפינים שקופצים על ישר המספרים.',
    lines: [
      { speaker: 'pirates-rio', text: 'הדולפינים חברים שלי! הם יראו לנו את הדרך למבצר — אם נדע לקרוא את ישר המספרים.' },
      { speaker: 'shlomper', text: 'ריו, את מדהימה! בואו נקפוץ איתם!' },
    ],
    raceNote: 'הדולפינים מחכים!',
  },
  {
    id: 23, afterStation: 23, kicker: '🐬 לגונת הדולפינים', title: 'הדולפינים מצביעים על המבצר',
    narration: 'הדולפינים קפצו לפי התשובות שלך ויצרו קשת של טיפות. בסופה נראה מבצר הפיראטים — והשער שלו נעול בשרשרת מספרים.',
    lines: [
      { speaker: 'pirates-fini', text: 'שרשרת! שרשרת! הוסיפו, הורידו, הוסיפו... התבלבלתי!' },
      { speaker: 'shlomper', text: 'לא נורא, פיני. כל פעם צעד אחד — כמו בתרגיל שרשרת.' },
    ],
    raceNote: 'שער המבצר נעול!',
  },
  {
    id: 24, afterStation: 24, kicker: '🏰 מבצר הפיראטים', title: 'מפת האוצר נחשפת!',
    narration: 'שער המבצר נפתח! בפנים מצאתן חלק נוסף ממפת האוצר — הוא מוביל לבית העץ שבו גרה סבתא של ריו, שומרת הסודות של הים.',
    lines: [
      { speaker: 'pirates-sharki', text: 'לאט לאט... אבל הגענו! אמרתי לכם שאני אף פעם לא מוותר.' },
      { speaker: 'shlomper', text: 'עוד שלוש תחנות לאוצר! אני מרגיש שהוא ממש קרוב!' },
    ],
    raceNote: 'המפה מתגלה!',
  },
  {
    id: 25, afterStation: 25, kicker: '🌳 בית העץ של ריו', title: 'סבתא בת-ים מגלה סוד',
    narration: 'סבתא בת-ים מדדה את חבלי הספינה ואמרה: "האוצר קבור באי שכל החופים שלו צורות". השמש כבר שוקעת — צריך למהר!',
    lines: [
      { speaker: 'pirates-max', text: 'אני אסחוב אתכן על הגב! רק תגידו לי כמה סנטימטרים עד האי.' },
      { speaker: 'shlomper', text: 'מקס, את הכי חמודה בים! קדימה לאי תיבת האוצר!' },
    ],
    raceNote: 'השמש שוקעת — ממהרות!',
  },
  {
    id: 26, afterStation: 26, kicker: '💰 אי תיבת האוצר', title: 'תיבה ריקה?!',
    narration: 'מצאתן את תיבת האוצר — אבל בפנים היה רק פתק: "פנינת המספרים מחכה במערת הקריסטל. רק אמיצה אמיתית תגיע אליה".',
    lines: [
      { speaker: 'pirates-fini', text: 'ריקה! ריקה! ...רגע, יש פתק! פתק! פתק!' },
      { speaker: 'shlomper', text: 'זו התחנה האחרונה באיי האוצר! בואי נראה מה מחכה במערה!' },
    ],
    raceNote: 'המערה הסגולה קוראת!',
  },
  {
    id: 27, afterStation: 27, kicker: '💎 מערת הפנינים · השער למדע', title: 'פנינת המספרים נמצאה!',
    narration: 'שלומפר הגיע ראשון לפנינת המספרים! כשנגעת בה, היא נפתחה ובתוכה מפתח זהב עם סמל אטום. מעל המערה נפתח שער של אור — אל ממלכת המדע, שם מחכים חברים ותיקים!',
    lines: [
      { speaker: 'pirates-rio', text: 'איזה ניצחון! הדולפינים שרים לכבודכן!' },
      { speaker: 'shlomper', text: 'מפתח מדעי? אני כבר מרגיש שאני צריך משקפיים וחלוק מעבדה!' },
    ],
    raceNote: 'השער אל ממלכת המדע נפתח!',
  },

  /* ---------------- ממלכת המדע ---------------- */
  {
    id: 28, afterStation: 28, kicker: '🧪 מעבדת השיקויים', title: 'החברים הוותיקים חזרו!',
    narration: 'איזו הפתעה! צביקי, מירה, שוקי ודובי חזרו — כולם בחלוקי מעבדה! הפרופסורית הכריזה: מי שתרכיב ראשונה את מכונת הגילויים תזכה בתואר אלופת כל העולמות.',
    lines: [
      { speaker: 'tzviki', text: 'חזרתי! ועכשיו אני חוקר מספרים רשמי — יש לי אפילו כדור עם המספר 7!' },
      { speaker: 'shlomper', text: 'איזה כיף שכולם כאן! בואי נגלה מה מסתתר ביער המספרים.' },
    ],
    raceNote: 'מרוץ המדע התחיל!',
  },
  {
    id: 29, afterStation: 29, kicker: '🌳 יער המספרים', title: 'העצים גדלים בסדרה',
    narration: 'ביער המספרים כל עץ גדל בצורת ספרה — 1, 2, 3... ובאמצע עץ אחד חסר! פתרת את הסדרה, והעלים הפכו לשביל אל גשר החשבוניה.',
    lines: [
      { speaker: 'shoki', text: 'חשבתי שהעץ החסר עשוי שוקולד... אז קצת נשנשתי. סליחה!' },
      { speaker: 'shlomper', text: 'שוקי! טוב, לפחות מצאנו את הגשר.' },
    ],
    raceNote: 'השביל אל הגשר נפתח!',
  },
  {
    id: 30, afterStation: 30, kicker: '🧮 גשר החשבוניה', title: 'הגשר שמחשב לבד',
    narration: 'גשר החשבוניה זז רק כשהחרוזים מסתדרים נכון. חיברת וחיסרת, והגשר התיישר! מעבר לו נראה מצפה טלסקופ שמכוון אל כוכב שאף אחד עוד לא גילה.',
    lines: [
      { speaker: 'mira', text: 'שניצל לא אוהב גשרים שזזים, אז עפנו מעליו. אבל החשבון שלך היה מושלם!' },
      { speaker: 'shlomper', text: 'בואי נציץ בטלסקופ — אולי נגלה כוכב חדש!' },
    ],
    raceNote: 'הטלסקופ מחכה!',
  },
  {
    id: 31, afterStation: 31, kicker: '🔭 מצפה הטלסקופ', title: 'כוכב חדש נקרא על שמך!',
    narration: 'דרך הטלסקופ גילית כוכב חדש — והפרופסורית קראה לו על שמך! המפה החדשה מובילה למערה שכל קריסטל בה הוא מצולע אחר.',
    lines: [
      { speaker: 'dobi', text: 'אם יש במערה מפלצות מתמטיקה — אני כאן עם חרב המספר 2!' },
      { speaker: 'shlomper', text: 'דובי, אולי רק נספור צלעות וקודקודים? זה יספיק!' },
    ],
    raceNote: 'מערת הקריסטלים קוראת!',
  },
  {
    id: 32, afterStation: 32, kicker: '💎 מערת הקריסטלים', title: 'החלק הראשון של המכונה',
    narration: 'זיהית את כל המצולעים, והקריסטלים הדליקו את המערה בכל צבעי הקשת. קריסטל אחד קפץ לכיס של שלומפר — זה החלק הראשון של מכונת הגילויים!',
    lines: [
      { speaker: 'tzviki', text: 'חלק ראשון במכונה! עוד כמה חלקים, ואני בטוח שהיא תדבר!' },
      { speaker: 'shlomper', text: 'הקריסטל מצביע על גן האטומים. קדימה!' },
    ],
    raceNote: 'חלק 1 מתוך 3!',
  },
  {
    id: 33, afterStation: 33, kicker: '⚛️ גן האטומים', title: 'אטומים רוקדים בזוגות',
    narration: 'בגן האטומים הזוגיים רוקדים בזוגות והאי-זוגיים מחפשים חבר. אחרי שעזרת להם, קיבלתן את החלק השני של המכונה: גלגל שיניים זהוב.',
    lines: [
      { speaker: 'mira', text: 'האטומים רקדו כל כך יפה! שניצל הצטרף לריקוד.' },
      { speaker: 'shlomper', text: 'עכשיו אי הדינוזאור — אומרים שיש שם שלד ענק שצריך למדוד!' },
    ],
    raceNote: 'חלק 2 מתוך 3!',
  },
  {
    id: 34, afterStation: 34, kicker: '🦖 אי הדינוזאור', title: 'הדינוזאור שהתעורר',
    narration: 'מדדת את שלד הדינוזאור בסנטימטרים — וברגע שהמידות היו מדויקות, השלד... קרץ! הוא היה רובוט עתיק שמחזיק את החלק השלישי של המכונה.',
    lines: [
      { speaker: 'dobi', text: 'חשבתי שזו מפלצת! הוצאתי חרב... ואז הוא קרץ לי. חמוד בסוף.' },
      { speaker: 'shlomper', text: 'כל החלקים אצלנו! עכשיו למפעל הרובוטים.' },
    ],
    raceNote: 'חלק 3 מתוך 3!',
  },
  {
    id: 35, afterStation: 35, kicker: '🤖 מפעל הרובוטים', title: 'המכונה מוכנה!',
    narration: 'במפעל הרובוטים חילקת את החלקים לשלם וחלקיו, והרובוטים הרכיבו את מכונת הגילויים! נשאר רק להפעיל אותה — המפתח מסתתר בתיבת הגילויים.',
    lines: [
      { speaker: 'shoki', text: 'רובוט אחד הכין לי עוגת שוקולד! לא אכלתי אותה... עדיין.' },
      { speaker: 'shlomper', text: 'זה הרגע הגדול! חמש שאלות אחרונות — ואנחנו אלופות כל העולמות!' },
    ],
    raceNote: 'הניצחון הגדול קרוב!',
  },
  {
    id: 36, afterStation: 36, kicker: '🏆 תיבת הגילויים · הניצחון הגדול', title: 'אלופת ארבעת העולמות!',
    narration: 'מכונת הגילויים נדלקה! על המסך הופיעו כל העולמות שעברתן: ארץ החשבון, ממלכת החלל, איי האוצר וממלכת המדע. כל החברים מכל העולמות הגיעו לחגוג — ואז, מבעד לאור, נפתחו שערים חדשים ומסע חדש!',
    lines: [
      { speaker: 'tzviki', text: 'זה היה המסע הכי מדהים בהיסטוריה של המספרים!' },
      { speaker: 'shlomper', text: 'רגע... יש עוד משהו! כשהמפתח זרח, נפתחו עוד שערים — ואני רואה פרחים ענקיים!' },
    ],
    raceNote: 'אלופת ארבעת העולמות — אבל המסע עוד לא נגמר!',
  },
  /* ---------------- עולם הפרחים 🌸 ---------------- */
  {
    id: 37, afterStation: 37, kicker: '🌸 המעבר · דרך הפרחים', title: 'השער הצבעוני!',
    narration: 'השער נפתח לתוך שדה פרחים ענקיים — גבוהים כמו עצים! בין העלים רצים פרחים קטנים ומצחיקים, שמפזרים אבקה מנצנצת ומספרים בדיחות זו לזו.',
    lines: [
      { speaker: 'shlomper', text: 'איזה ריח! ואיזה צבעים! את רואה את אלה עם הפרצופים המצחיקים?' },
      { speaker: 'flowers-lili', text: 'שלום! אני לילי! אתם חייבים לראות את נינה — הוא הסתובב כל היום אחרי השמש והתבלבל!' },
      { speaker: 'narrator', text: 'הפרחים קופצים ומצחקים. כדי להמשיך, צריך לענות על 5 שאלות בשער הגינה!' },
    ],
    raceNote: 'הפרחים מרקדים סביב שלומפר!',
  },
  {
    id: 38, afterStation: 38, kicker: '🌷 פוגשות את הפרחים', title: 'חבורה של שטויות!',
    narration: 'נינה הסתובב כל היום אחרי השמש, ורוקי התעורר מאוחר מדי — ופגש, סוף סוף, את כולם. הפרחים צוחקים, אבל בתוך הצחוק הם לימדו אותך דברים חדשים.',
    lines: [
      { speaker: 'flowers-nina', text: 'הי! אני מסתכל על השמש... אבל עכשיו היא מאחורה! אוי, לאן היא הלכה?' },
      { speaker: 'flowers-roki', text: 'זזז... עוד חמש דקות... או חמש שעות... מתוק שלי, בוא מחר?' },
      { speaker: 'shlomper', text: 'הם מצחיקים בטירוף! אבל תראי — בזכותך שלי למדנו עוד מספרים!' },
    ],
    raceNote: 'שלומפר צוחק כל הדרך!',
  },
  {
    id: 39, afterStation: 39, kicker: '🌺 מבוך החמניות', title: 'פרח הקסם מסתתר!',
    narration: 'טינקר הספרה-הסגולה גילתה: פרח הקסם — זה שנותן לפרחים את הצבעים — נעלם! בלעדיו כל הפרחים עלולים לאבד את הצבע שלהם.',
    lines: [
      { speaker: 'flowers-tinker', text: 'פרח הקסם נעלם במבוך החמניות! בלי הצבע שלו, כולם יהפכו לבנים ולעצובים.' },
      { speaker: 'shlomper', text: 'אנחנו נעזור! את שומעת? עם החשיבה שלך נמצא את פרח הקסם!' },
    ],
    raceNote: 'מחפשות את פרח הקסם!',
  },
  {
    id: 40, afterStation: 40, kicker: '🌻 מפל הכוכבים', title: 'הצבע חוזר לפרחים!',
    narration: 'פרח הקסם נמצא! הוא נפל לתוך מעיין קסום, והצבע שלו התערבב במים בכל הקשת. עכשיו צריך לערבב את המים בחזרה אל הפרחים — וכל תשובה נכונה שלך עושה בדיוק את זה.',
    lines: [
      { speaker: 'flowers-lili', text: 'תראו! העלים שלי חוזרים להיות ורודים! אני כל כך מתרגשת!' },
      { speaker: 'flowers-nina', text: 'עכשיו אני יכול לסובב... לשמש ולחזור... לשמש ולחזור... המון תודה!' },
    ],
    raceNote: 'הפרחים חוזרים לצבעם!',
  },
  {
    id: 41, afterStation: 41, kicker: '🌸 פרח הקסם · הניצחון הגדול', title: 'שלומפר - גיבור הפרחים!',
    narration: 'כל הפרחים של העולם צבעו את עצמם מחדש, והכינו לשלומפר ולך כובע מפרחים ענק! הפרחים רקדו שמחה — אבל אז, בין העלים, ניצוץ סגול הופיע והצביע על שביל חדש: מעבדה קסומה.',
    lines: [
      { speaker: 'flowers-tinker', text: 'ניצוץ סגול! זה סימן של השיקויים! הנה שער קטן למעבדת הכימיה.' },
      { speaker: 'shlomper', text: 'מעבדת שיקויים?! זה נשמע כמו הרפתקה חדשה לגמרי!' },
    ],
    raceNote: 'פרח אחד גדול לחגוג איתו!',
  },
  /* ---------------- עולם הכימיה והשיקויים 🧪 ---------------- */
  {
    id: 42, afterStation: 42, kicker: '🧪 המעבר · דרך השיקויים', title: 'מעבדת הקסמים!',
    narration: 'השער הצבעוני הוביל אתכן למעבדה ענקית ומבעבעת! קירותיה עשויים ממבחנות זוהרות, ומכל עבר עולים ריחות של נענע, שוקולד ו... גרביים? כנראה שמשהו התערבב פה.',
    lines: [
      { speaker: 'potion-darkan', text: 'אורחים! נהדר! זה עתה ערבבתי שיקוי שוקולד... או שיקוי גרב? בואו נטעם ונגלה!' },
      { speaker: 'shlomper', text: 'אממ... אולי נטעם רק אחרי התרגילים?' },
      { speaker: 'narrator', text: 'המבחנות מבעבעות. כדי להמשיך, צריך לענות על 5 שאלות במעבדה!' },
    ],
    raceNote: 'המבחנות מבעבעות סביבכן!',
  },
  {
    id: 43, afterStation: 43, kicker: '✨ טיפות של קסם', title: 'הקסם מתחיל לעבוד!',
    narration: 'מכיוון שענית נכון, השיקויים התחילו לזוז לבד! לנגה מלאה בצבעים, ופרופסור צפרדע רוקד סביבה. הפרופסור כל כך שמח שהוא שכח איפה הוא שם את המשקפיים — הם על הראש שלו.',
    lines: [
      { speaker: 'potion-langa', text: 'תראו! התשובות שלכן מוסיפות לי צבע! אני הופכת לסגולה ולזוהרת!' },
      { speaker: 'potion-tzfardea', text: 'בואו נזרוק עוד קצ׳קוץ׳ של קסם! זה עובד!' },
    ],
    raceNote: 'השיקויים מתחילים לזרוח!',
  },
  {
    id: 44, afterStation: 44, kicker: '🧙‍♀️ סיר הערבוב', title: 'השיקוי יצא מהסיר!',
    narration: 'הסיר הגדול — מר טיל — התמלא מדי, והשיקוי גלש החוצה והתיז לכל עבר! עכשיו צריך למדוד בדיוק כמה שיקוי נשאר בכל מבחנה, כדי להציל את המעבדה.',
    lines: [
      { speaker: 'potion-til', text: 'או-או! יותר מדי קצף! עזרו לי למדוד כמה נשאר!' },
      { speaker: 'shlomper', text: 'אני איתך, מר טיל! את תפתרי, נכון? ביחד נחזיר את השיקוי הביתה!' },
    ],
    raceNote: 'המעבדה מתמלאת בקצף קסום!',
  },
  {
    id: 45, afterStation: 45, kicker: '🌈 שיקוי הקשת', title: 'השיקוי המושלם!',
    narration: 'מדדתן בדיוק את הכמות — והשיקוי נהיה מושלם! עכשיו יש לכן שיקוי שיהפוך כל דבר לצבעי הקשת. הפרופסור כל כך מתרגש שהוא הוריד את המשקפיים ונתן לך אותן.',
    lines: [
      { speaker: 'potion-darkan', text: 'אלופה! אני נותן לך את המשקפיים שלי — את רואה את העולם בדיוק כמוני!' },
      { speaker: 'potion-langa', text: 'השיקוי שלך הופך את העולם ליפה! עכשיו נוכל לצאת למסע חדש!' },
    ],
    raceNote: 'שיקוי הקשת בועת מוכן!',
  },
  {
    id: 46, afterStation: 46, kicker: '🧪 מעבדת השיקויים · הסיום', title: 'שלומפר — אלוף השיקויים!',
    narration: 'כל השיקויים של העולם נצבעו בשלל צבעים, והפרופסור העניק לשלומפר בקבוקון זהב קטן. אבל כשהבקבוקון נפתח, יצא ממנו ריח של ג׳ירפה, פיל וקוף — והצביע על שער חדש ביער.',
    lines: [
      { speaker: 'potion-tzfardea', text: 'ריח של חיות! אני מזהה... משהו ענק! ומוזר! ומצחיק!' },
      { speaker: 'shlomper', text: 'גן חיות! אני חושב שהשיקוי מוביל אליו!' },
    ],
    raceNote: 'בקבוקון הזהב מוביל הלאה!',
  },
  /* ---------------- עולם גן החיות 🦁 ---------------- */
  {
    id: 47, afterStation: 47, kicker: '🦁 המעבר · שער הספארי', title: 'ברוכות הבאות לג׳ונגל!',
    narration: 'השער נפתח לתוך ג׳ונגל ענק — עצים שצומחים עד השמיים, פרפרים בגודל של ציפורים, וקולות של חיות מכל עבר! כאן גרים החיות המדהימות ביותר — וגם כמה דינוזאורים ענקיים.',
    lines: [
      { speaker: 'zoo-ari', text: 'רוּארררר! ברוכות הבאות לספארי! אני ארי — המלך של פה!' },
      { speaker: 'zoo-pingo', text: 'אני מחכה לכן! יש לי חדק גדול, ואני יכול להתיז מים על החברים שלי!' },
      { speaker: 'narrator', text: 'החיות מחכות לפגוש אתכן! כדי להמשיך, 5 שאלות בשער הספארי!' },
    ],
    raceNote: 'החיות מנופפות לשלום!',
  },
  {
    id: 48, afterStation: 48, kicker: '🐘 חברים חדשים', title: 'ג׳ירפה רואה מרחוק!',
    narration: 'ג׳ירו הג׳ירפה עמדה על אבן גבוהה וראתה משהו מפחיד: דינוזאור עצום עומד ליד הנהר, ולא מוצא את הבית שלו! הוא כל כך גדול שהוא בקושי רואה את הרגליים שלו.',
    lines: [
      { speaker: 'zoo-jiro', text: 'אני רואה אותו! טי-רקס! הוא עצוב! צריך לעזור לו למצוא את הבית!' },
      { speaker: 'zoo-tika', text: 'אני אטפס על עץ ואראה לאן הוא צריך ללכת! הידד!' },
    ],
    raceNote: 'הדינוזאור זקוק לעזרה!',
  },
  {
    id: 49, afterStation: 49, kicker: '🦕 קן הדינוזאורים', title: 'מצילות את הטי-רקס התינוק!',
    narration: 'הטי-רקס הגדול הוא בעצם... רק תינוק ענקי שהתבלבל בדרך לאמא שלו! צריך למדוד את הגובה שלו, את הצעדים שלו ואת הדרך — כדי להוביל אותו הביתה אל אמא דינוזאור.',
    lines: [
      { speaker: 'zoo-pingo', text: 'הוא כל כך גדול! אבל הלוואי, הוא כל כך מתוק! בואו נעזור לו!' },
      { speaker: 'shlomper', text: 'את פשוט מנווטת את הדרך! מדידה אחרי מדידה — עד אמא!' },
    ],
    raceNote: 'מובילות את הטי-רקס הביתה!',
  },
  {
    id: 50, afterStation: 50, kicker: '🦖 מלך הספארי', title: 'הטי-רקס פגש את אמא!',
    narration: 'עשית את זה! הטי-רקס הגדול מצא את אמא דינוזאור, והם עשו חיבוק כל כך גדול שהאדמה רעדה! כל החיות של הג׳ונגל באו לחגוג — אריה, פיל, קוף וג׳ירפה.',
    lines: [
      { speaker: 'zoo-ari', text: 'שאגת כבוד! את הילדה האמיצה ביותר שראיתי אי פעם!' },
      { speaker: 'zoo-tika', text: 'חיבוק דינוזאור! זה הדבר הכי טוב בעולם!' },
    ],
    raceNote: 'כל החיות חוגגות איתכן!',
  },
  {
    id: 51, afterStation: 51, kicker: '🦁 המלך · הניצחון הגדול', title: 'שלומפר — מלך גן החיות!',
    narration: 'האריה העניק לשלומפר כתר קטן מעלים, וכל החיות רקדו. אבל אז הג׳ירפה ג׳ירו ראתה משהו מוזר בשמיים — ענן קטן, שהיה בעצם... רובוט מעופף!',
    lines: [
      { speaker: 'zoo-jiro', text: 'תסתכלו למעלה! זה לא ציפור — זה רובוט קטן ומצחיק!' },
      { speaker: 'shlomper', text: 'רובוטים?! נו, ברור. כל עולם מפתיע אותי מחדש!' },
    ],
    raceNote: 'רובוט מעופף מוביל לעולם חדש!',
  },
  /* ---------------- עולם הרובוטים 🤖 ---------------- */
  {
    id: 52, afterStation: 52, kicker: '🤖 המעבר · מפעל הרובוטים', title: 'מפעל ענק ומבריק!',
    narration: 'השער נפתח למפעל עצום — קירות מתכת, גלגלי שיניים ענקיים, ומסועים שעליהם נוסעים חלקים זוהרים. רובוטים ידידותיים מתרוצצים לכל עבר, בונים צעצועים ושרים שירי מחשבים.',
    lines: [
      { speaker: 'robots-boti', text: 'ביפ בופ! שלום חברים! אני בוטי! בואו נבנה ביחד משהו מגניב!' },
      { speaker: 'robots-spark', text: 'ואני ספארק! מהר מהר! אין זמן לבזבז — יש כל כך הרבה צעצועים לבנות!' },
      { speaker: 'narrator', text: 'המסועים זזים! כדי להמשיך, 5 שאלות בכניסה למפעל!' },
    ],
    raceNote: 'הרובוטים מכינים משהו מיוחד!',
  },
  {
    id: 53, afterStation: 53, kicker: '⚙️ בניית חברים', title: 'הרובוטים לומדים ממך!',
    narration: 'כשענית נכון, המכונות התחילו לעבוד מהר יותר! וולטר מצייר תמונות מוזרות — ציור של עוגה שהיא גם חתול — וזי מטעינה את כולם באנרגיה.',
    lines: [
      { speaker: 'robots-volter', text: 'ביפ! אני מצייר מה שאת חושבת! עכשיו זה נראה כמו... פיל עם כובע? מדהים!' },
      { speaker: 'robots-zi', text: 'אנרגיה ירוקה! אני מטעין את כולם! בואו נמשיך לבנות!' },
    ],
    raceNote: 'המכונות עובדות במהירות כפולה!',
  },
  {
    id: 54, afterStation: 54, kicker: '🧸 מעבדת הצעצועים', title: 'הצעצועים מתעוררים!',
    narration: 'הצעצועים שבנו הרובוטים... התעוררו לחיים! בובות עץ קטנות, מכוניות זעירות ומטוסים נייר התחילו לרוץ, לטוס ולצחוק. צריך לספור אותם, לחלק אותם ולבנות להם מדפים!',
    lines: [
      { speaker: 'robots-spark', text: 'הם חיים! מהר, בואו נספור כמה יש מכל סוג — שלא יאבדו!' },
      { speaker: 'shlomper', text: 'אני דוהר ביניהם! את סופרת — אני שומר!' },
    ],
    raceNote: 'צעצועים חיים מתרוצצים במפעל!',
  },
  {
    id: 55, afterStation: 55, kicker: '🦾 רובוט העל', title: 'רובוט העל מתעורר!',
    narration: 'הרובוטים בנו צעצוע מיוחד במינו — צעצוע שמחובר לרובוט העל! כשהשלמתן את כל החישובים, רובוט העל פקח את עיניו, חייך חיוך מתכתי ענק — והצביע על דרך בשמיים.',
    lines: [
      { speaker: 'robots-boti', text: 'הצלחנו! רובוט העל מתעורר! הוא מצביע... לשמיים! לשם, לענן ורוד!' },
      { speaker: 'shlomper', text: 'ענן ורוד? אני מכיר את הצבע הזה! זה... זה הצבע של אמא!' },
    ],
    raceNote: 'רובוט העל מוביל שלומפר הביתה!',
  },
  {
    id: 56, afterStation: 56, kicker: '🤖 מפעל הרובוטים · הסיום', title: 'שלומפר — המהנדס הגדול!',
    narration: 'כל הרובוטים של המפעל עמדו במעגל ומחאו כפיים. רובוט העל נתן לשלומפר מפתח זהב קטן, שאמר שהוא פותח את השער הכי מיוחד מכולם — השער הביתה.',
    lines: [
      { speaker: 'robots-zi', text: 'המפתח הזה טעון באנרגיית אהבה! הוא ייקח אתכם הביתה!' },
      { speaker: 'shlomper', text: 'הביתה... אחרי כל כך הרבה עולמות, אני סוף סוף חוזר הביתה!' },
    ],
    raceNote: 'הדרך הביתה מתחילה!',
  },
  /* ---------------- עולם חדי הקרן 🦄 ---------------- */
  {
    id: 57, afterStation: 57, kicker: '🦄 המעבר · עמק הקשת', title: 'הדרך הביתה מתחילה!',
    narration: 'השער נפתח לעמק ירוק ורחב עם קשת ענקית בשמיים. ומיד, ארבעה חברים חדשים רצו לקראת שלומפר: דרקונון הדרקון הקטן, פיית אור הזוהרת, סילבי החתולה הרכה ופינקי החד-קרן הוורוד.',
    lines: [
      { speaker: 'unicorns-darkonon', text: 'שלומפר! סוף סוף חזרת! חיכינו לך כל כך הרבה זמן!' },
      { speaker: 'unicorns-or', text: 'המשפחה שלך מחכה לך בבית! אבל קודם — בוא איתנו בשביל הכוכבים!' },
      { speaker: 'narrator', text: 'החברים החדשים מובילים את שלומפר הביתה! 5 שאלות בשער עמק הקשת!' },
    ],
    raceNote: 'החברים החדשים רצים לקראת שלומפר!',
  },
  {
    id: 58, afterStation: 58, kicker: '🌈 החברים החדשים', title: 'החבורה מגלה את הסודות!',
    narration: 'בשביל הכוכבים, ארבעת החברים החדשים סיפרו לשלומפר על עמק הקשת: על הדרקון הקטן שלומד לעוף, על הפיה שמאירה את הדרך, על החתולה שאוהבת להתכרבל, ועל פינקי שמקפץ על העננים.',
    lines: [
      { speaker: 'unicorns-silvi', text: 'אני סילבי! אני אוהבת להתכרבל בעשב הרך. ספר לי על כל המקומות שהיית בהם!' },
      { speaker: 'unicorns-pinki', text: 'ואני פינקי! אני קופץ על עננים! בוא תראה — אני מלמד אותך!' },
      { speaker: 'shlomper', text: 'אני כל כך שמח לפגוש אתכם! בואו נמשיך יחד הביתה!' },
    ],
    raceNote: 'החבורה החדשה מלווה את שלומפר!',
  },
  {
    id: 59, afterStation: 59, kicker: '⭐ סבתא כוכבית', title: 'סבתא מחכה על הכיסא!',
    narration: 'בקצה השביל ישבה סבתא כוכבית על כיסא נוצץ. היא פקחה עיניים שמחות, חיבקה את שלומפר חזק ואמרה: "ידעתי שתלך רחוק, נכדי. ועכשיו תראה — הבאת אוצר אמיתי הביתה: חברה חכמה כמוך!"',
    lines: [
      { speaker: 'unicorns-darkonon', text: 'סבתא! סבתא! שלומפר חזר! וזה חברה שלו — היא עזרה לו בכל העולמות!' },
      { speaker: 'unicorns-or', text: 'בואי, ילדה מתוקה. סבתא תכין לך שוקו חם עם כוכבים. אבל קודם — חמש שאלות!' },
    ],
    raceNote: 'סבתא כוכבית מחבקת את כולם!',
  },
  {
    id: 60, afterStation: 60, kicker: '🏡 מגרש המשחקים', title: 'כל המשפחה ביחד!',
    narration: 'במגרש המשחקים חיכו אמא קשת, אבא ענן ואחיו הקטן של שלומפר — פצפון. החברים החדשים והמשפחה התיישבו במעגל, וכל אחד רצה לשמוע על הרפתקה אחרת מהמסע הגדול.',
    lines: [
      { speaker: 'unicorns-silvi', text: 'ספרי לנו על הדינוזאורים! ועל הכוכבים! ועל הרובוטים!' },
      { speaker: 'unicorns-pinki', text: 'ואני רוצה לשמוע על הפרחים הצוחקים! איך הצלתם אותם?' },
      { speaker: 'shlomper', text: 'הכל בזכותה! בלעדיה, הייתי עדיין תקוע אי שם ביקום!' },
    ],
    raceNote: 'כל המשפחה והחברים ביחד!',
  },
  {
    id: 61, afterStation: 61, kicker: '🦄 טירת חדי הקרן · הסיום הגדול', title: 'שלומפר בבית, איתך!',
    narration: 'ומעל הטירה — קשת צבעונית ענקית נמתחה מקצה לשמיים. כל החברים מכל תשעת העולמות התאספו לחגוג: זיגי, פיני, ד״ר ינשוף, לילי, דרקן, ארי, בוטי, דרקונון — וכולם הריעו לשלומפר ולך. שלומפר עמד על הגבעה, הביט בכל החברים ואמר: "כל עולם לימד אותי משהו — אבל את לימדת אותי הכי הרבה. תודה, חברה שלי. תמיד תהיי בבית שלי!"',
    lines: [
      { speaker: 'shlomper', text: 'את לא רק עוזרת — את החברה הכי טובה שלי! תמיד!' },
      { speaker: 'unicorns-or', text: 'ברוכה הבאה למשפחה שלנו, ילדה חכמה! את תמיד מוזמנת!' },
      { speaker: 'narrator', text: 'המסע הגדול הסתיים — אבל החברות נשארת לנצח! 🌈' },
    ],
    raceNote: 'סוף המסע — הביתה, איתך!',
  },
];

export const getBeatAfterStation = (stationId: number): StoryBeat | undefined =>
  STORY_BEATS.find((b) => b.afterStation === stationId);

type SceneDetail = { art: string; position: string; summary: string; hook: string };

const SPACE = WORLDS.space.mapImage;
const PIRATES = WORLDS.pirates.mapImage;
const SCIENCE = WORLDS.science.mapImage;

/* תמונות הקבוצה שמופיעות בסצנות הפתיחה של כל עולם חדש */
const SPACE_CAST = WORLDS.space.castImage;
const PIRATES_CAST = WORLDS.pirates.castImage;
const SCIENCE_CAST = WORLDS.science.castImage;

/** כל מעבר מסתיים בחידה סיפורית שפותחת את התיאבון לתחנה הבאה. */
export const SCENE_DETAILS: Record<number, SceneDetail> = {
  0: { art: 'images/race-hero.jpg', position: '44% center', summary: 'פעם בשנה ארץ החשבון מתמלאת דגלים: החשבוניאדה מתחילה! שלומפר בחר בך להיות שותפתו למרוץ אל טירת הקשת.', hook: 'דגל הזינוק עלה! אבל שער האחו נפתח רק למי שמכירה יחידות ועשרות. תצליחי לתת לשלומפר את הדחיפה הראשונה?' },
  1: { art: 'images/story-forest.jpg', position: 'center center', summary: 'קסם התשובות שלך הדליק את השביל ושלומפר זינק קדימה. מאחוריו הצפלין של צביקי הסתבך ברוח!', hook: 'על דלת בית העץ הופיע לחש כתוב במילים ובספרות. מי תגלה את הסוד קודם?' },
  2: { art: 'images/story-forest.jpg', position: '30% center', summary: 'שניצל עצר ליד ברווזונים שאיבדו את דרכם, ושלומפר כבר רואה את חוף הצדף הנוצץ.', hook: 'בחוף הצדף זוהרים צדפים ובהם מספרים. צריך לחבר ולחסר כדי לגלות את הדרך הקצרה!' },
  3: { art: 'images/story-crystal.jpg', position: '62% center', summary: 'שוקי עצר לנשנש, צביקי מנפח שוב את הצפלין, ושלומפר מוביל לתוך מערת הקריסטל.', hook: 'הקריסטלים מהבהבים בקצב של סדרה מסתורית. אם תפענחי את הדפוס, הדרך תידלק!' },
  4: { art: 'images/story-crystal.jpg', position: 'center center', summary: 'הקריסטלים זרחו כשפתרת את החידות, ושלומפר התקדם אל גשר הכפר.', hook: 'גשר הכפר נעלם בענן של מספרים! רק מי שתמצא אותם על ישר המספרים תוביל את שלומפר הלאה.' },
  5: { art: 'images/story-forest.jpg', position: '70% center', summary: 'הכפריים הריעו לשלומפר על הגשר, והדרך לבתי הפטריות נפתחה.', hook: 'ליד בתי הפטריות נמצא שרביט שבור לשני חלקים. כמה צריך להוסיף כדי שיהיה שלם?' },
  6: { art: 'images/magic-map.jpg', position: '20% 48%', summary: 'בתי הפטריות מאחוריכן, ושלומפר מתחיל לטפס אל מפל הפיות.', hook: 'על אבני המפל מופיעים ריבוע ומלבן — תדעי לספור את הצלעות ולמצוא את השביל?' },
  7: { art: 'images/magic-map.jpg', position: '49% 45%', summary: 'שלומפר דילג מעל המפל, והדרך לאגם הזוהר התמלאה טיפות מנצנצות.', hook: 'מעבר לאגם נפתח שער של צורות ומידות. מי תזהה את המצולע ותמדוד את הדרך?' },
  8: { art: 'images/magic-map.jpg', position: '81% 28%', summary: 'הטירה וקו הגמר כבר נראים מעבר לאגם. החברים עוצרים לעודד אתכן.', hook: 'חמש החידות האחרונות שומרות על שער הטירה. תביאי את שלומפר למקום הראשון?' },
  9: { art: SPACE_CAST, position: 'center center', summary: 'שלומפר ניצח בחשבוניאדה, אבל כוכב הכתר פתח שער סודי לגלקסיה. החללית הקסומה מחכה — המסע רק מתחיל!', hook: 'שער החלל פתוח! בממלכת החלל מחכים חברים חדשים. מוכנה להמריא?' },
  10: { art: SPACE, position: '15% 80%', summary: 'החללית המריאה מרציף השיגור! זיגי מנופף מהחלון, רובי בודק את המנועים, ונובה מפזרת אבק כוכבים על השביל.', hook: 'בתחנת הירח נדלק אות מצוקה קטן. מי השאיר שם פירורי גבינת ירח?' },
  11: { art: SPACE, position: '43% 74%', summary: 'מצאתן את עכברושון הירח והחזרתן לו את הגבינה! בתמורה הוא גילה לכן קיצור דרך אל טבעות שבתאי.', hook: 'טבעות שבתאי מסתובבות מהר — תרגיל בעשרות יעזור למצוא את הקפיצה הנכונה.' },
  12: { art: SPACE, position: '72% 78%', summary: 'דילגתן בין הטבעות, וליאו נחת (בטעות) על ירח אחר. מעבר לטבעות מסתתרת חגורת אסטרואידים.', hook: 'האסטרואידים נעים בסדרה סודית. איזה סלע צריך לעבור כדי להגיע לצד השני?' },
  13: { art: SPACE, position: '84% 60%', summary: 'מצאתן את הדפוס והאסטרואידים זזו הצידה. מבעד לטלסקופ נראה כוכב קטן שאבד.', hook: 'הכוכב האבוד מסומן על ישר המספרים. תוכלי לזהות איפה הוא נמצא?' },
  14: { art: SPACE, position: '62% 50%', summary: 'הכוכב חזר למפה ונובה הדליקה לו אור קסום. האור שלו מצביע על כוכב העוגות!', hook: 'העוגה הגלקטית מחולקת לחלקים. מהו החלק שישלים אותה לשלם?' },
  15: { art: SPACE, position: '36% 57%', summary: 'חלקי העוגה התחברו בדיוק, ורובי מצא מתחתיה מפתח שמתאים לדלת במכתש הירח.', hook: 'על דלת המכתש מצוירות צורות. כמה צלעות וקודקודים תצליחי לזהות?' },
  16: { art: SPACE, position: '15% 42%', summary: 'הדלת נפתחה, והחללית טיפסה מעל המכתש. ממול נוצצת ערפילית קשת צבעונית.', hook: 'בערפילית מתחבאים מספרים זוגיים, אי-זוגיים וצורות. התכונני לקראת כוכב הכתר!' },
  17: { art: SPACE, position: '46% 29%', summary: 'המספרים הסתדרו כמו כוכבים בשמיים. מעבר לערפילית, כוכב הכתר מחכה לחידות הגמר.', hook: 'זו התחנה האחרונה בחלל! חמש שאלות מפרידות בינך לבין הכתר הגלקטי.' },
  18: { art: PIRATES_CAST, position: 'center center', summary: 'שלומפר הגיע ראשון לכוכב הכתר! בתוך הכתר הגלקטי הסתתרה מפת אוצר עתיקה שמובילה אל הים.', hook: 'המפה מצביעה על איי האוצר ועל פנינת המספרים האבודה. מוכנה להפליג?' },
  19: { art: PIRATES, position: '17% 68%', summary: 'בחוף הספינה הטרופה פגשתן את ריו בת הים, פיני התוכי, שארקי צב הים ומקס המפלצת הימית — וכולם רוצים את האוצר!', hook: 'בחורשת התוכים מסתתר הרמז הבא. תצליחי לחבר ולחסר מהר יותר מהתוכים הפטפטנים?' },
  20: { art: PIRATES, position: '22% 46%', summary: 'התוכים צעקו מספרים בבת אחת, אבל את מצאת את הרמז: "חפשו את הגשר שהצבים בנו".', hook: 'גשר הצבים נפתח רק למי שמכירה עשרות שלמות ומספרים במילים. שארקי כבר מחכה!' },
  21: { art: PIRATES, position: '38% 38%', summary: 'עברתן את גשר הצבים! מנגד מתנשא הר געש שמפריח עשן בצורת סימני שאלה.', hook: 'הר הגעש לוחש סדרה מסתורית. רק מי שתמצא את הדפוס תעבור!' },
  22: { art: PIRATES, position: '48% 20%', summary: 'הלבה התקררה לשביל זהב, ומהפסגה ראיתן לגונה מלאה דולפינים שקופצים על ישר המספרים.', hook: 'הדולפינים יראו את הדרך למבצר — אם תדעי לקרוא את ישר המספרים.' },
  23: { art: PIRATES, position: '60% 37%', summary: 'הדולפינים קפצו לפי התשובות שלך ויצרו קשת של טיפות. בסופה נראה מבצר הפיראטים.', hook: 'שער המבצר נעול בשרשרת מספרים. כל פעם צעד אחד — תצליחי?' },
  24: { art: PIRATES, position: '72% 25%', summary: 'שער המבצר נפתח, ובפנים מצאתן חלק ממפת האוצר שמוביל לבית העץ של ריו.', hook: 'סבתא בת-ים שומרת סוד. היא תגלה אותו רק למי שיודעת למדוד ולזהות רימקסם!' },
  25: { art: PIRATES, position: '74% 47%', summary: 'סבתא בת-ים גילתה: האוצר קבור באי שכל החופים שלו צורות. והשמש כבר שוקעת...', hook: 'מקס תסחוב אתכן לאי תיבת האוצר — רק צריך לזהות את המצולעים בדרך!' },
  26: { art: PIRATES, position: '61% 70%', summary: 'תיבת האוצר נמצאה — אבל בפנים היה רק פתק: "פנינת המספרים מחכה במערת הקריסטל".', hook: 'זו התחנה האחרונה באיי האוצר! מה מחכה בעומק המערה הסגולה?' },
  27: { art: SCIENCE_CAST, position: 'center center', summary: 'שלומפר הגיע ראשון לפנינת המספרים! בתוכה מצאתן מפתח זהב עם סמל אטום, ומעל המערה נפתח שער של אור.', hook: 'השער מוביל אל ממלכת המדע — ושם מחכים חברים ותיקים בחלוקי מעבדה!' },
  28: { art: SCIENCE, position: '14% 74%', summary: 'צביקי, מירה, שוקי ודובי חזרו — כולם מדענים! מי שתרכיב ראשונה את מכונת הגילויים תהיה אלופת כל העולמות.', hook: 'ביער המספרים עץ אחד חסר בסדרה. תמצאי אותו לפני ששוקי ינשנש אותו?' },
  29: { art: SCIENCE, position: '32% 62%', summary: 'פתרת את סדרת העצים, והעלים הפכו לשביל אל גשר החשבוניה.', hook: 'הגשר זז רק כשהחרוזים מסתדרים נכון. חיבור, חיסור ושרשרת — קדימה!' },
  30: { art: SCIENCE, position: '24% 36%', summary: 'הגשר התיישר! מעבר לו נראה מצפה טלסקופ שמכוון אל כוכב שאף אחד עוד לא גילה.', hook: 'הכוכב החדש מסתתר על ישר המספרים. תגלי אותו ראשונה?' },
  31: { art: SCIENCE, position: '43% 24%', summary: 'גילית כוכב חדש — והפרופסורית קראה לו על שמך! המפה מובילה למערת קריסטלים של מצולעים.', hook: 'כל קריסטל במערה הוא מצולע אחר. כמה צלעות וקודקודים יש לכל אחד?' },
  32: { art: SCIENCE, position: '62% 33%', summary: 'הקריסטלים הדליקו את המערה בכל צבעי הקשת, והחלק הראשון של המכונה קפץ לכיס של שלומפר.', hook: 'בגן האטומים האטומים רוקדים בזוגות. מי זוגי ומי אי-זוגי?' },
  33: { art: SCIENCE, position: '82% 24%', summary: 'עזרת לאטומים למצוא בני זוג, וקיבלתן את החלק השני של המכונה: גלגל שיניים זהוב.', hook: 'באי הדינוזאור מחכה שלד ענק שצריך למדוד בסנטימטרים. מה יקרה כשהמידות יהיו נכונות?' },
  34: { art: SCIENCE, position: '80% 55%', summary: 'המידות היו מדויקות — והשלד קרץ! הוא רובוט עתיק שמסר לכן את החלק השלישי.', hook: 'במפעל הרובוטים צריך לחלק את החלקים לשלם וחלקיו כדי להרכיב את המכונה!' },
  35: { art: SCIENCE, position: '58% 66%', summary: 'הרובוטים הרכיבו את מכונת הגילויים! נשאר רק להפעיל אותה — והמפתח בתיבת הגילויים.', hook: 'חמש שאלות אחרונות מפרידות בינך לבין התואר: אלופת כל העולמות!' },
  36: { art: SCIENCE_CAST, position: 'center center', summary: 'מכונת הגילויים נדלקה והראתה את כל העולמות שעברתן. שלומפר הכתיר אותך — אלופת ארבעת העולמות! ואז נפתחו עוד שערים ומסע חדש התחיל.', hook: 'ארץ החשבון, החלל, איי האוצר וממלכת המדע — כולם חוגגים! אבל המסע עוד לא נגמר!' },
  /* ---- עולם הפרחים 🌸 (37-41) ---- */
  37: { art: WORLDS.flowers.castImage, position: 'center center', summary: 'השער נפתח לשדה פרחים ענקיים — גבוהים כמו עצים! בין העלים רצים פרחים קטנים ומצחיקים, מפזרים אבקה מנצנצת ומספרים בדיחות זו לזו.', hook: 'לילי, נינה, רוקי וטינקר מחכים להכיר אתכן! 5 שאלות בשער הגינה!' },
  38: { art: WORLDS.flowers.mapImage, position: '40% 70%', summary: 'לילי הציגה את החבורה: נינה שמסתובבת אחרי השמש, רוקי השובב וטינקר שמפזרת אבקה מנצנצת — כולם צוחקים ומספרים בדיחות.', hook: 'במסלול השבלולים יש מספרים שמתחבאים בין עלים. תעזרי לפרחים למצוא אותם?' },
  39: { art: WORLDS.flowers.mapImage, position: '68% 82%', summary: 'הפרחים מלווים את שלומפר בשדה, אבל עלה קטן שלהם מתחיל לנבול — הצבע נעלם לאט לאט! טינקר גילתה: פרח הקסם נעלם!', hook: 'בבריכת החבצלות יש רמז. צריך למצוא את פרח הקסם! בואי נעקוב אחרי הרמזים!' },
  40: { art: WORLDS.flowers.mapImage, position: '84% 62%', summary: 'מצאתן את פרח הקסם במערה! אבל הצבע שלו התערבב במים. צריך לערבב את המים בכל הפרחים בחזרה — וכל תשובה עושה את זה!', hook: 'עוד 5 שאלות ותצבעו את כל העולם מחדש!' },
  41: { art: WORLDS.flowers.mapImage, position: '36% 55%', summary: 'הפרחים חוגגים — חזרו להם הצבעים! לילי, נינה, רוקי וטינקר רקדו סביב שלומפר. ואז ניצוץ סגול הופיע והצביע על שער חדש: מעבדה קסומה.', hook: 'ניצוץ של שיקוי! מוכנה להרפתקה חדשה במעבדת הכימיה?' },
  /* ---- עולם הכימיה והשיקויים 🧪 (42-46) ---- */
  42: { art: WORLDS.potion.castImage, position: 'center center', summary: 'השער הוביל למעבדה מבעבעת! קירות של מבחנות זוהרות, ריחות של נענע, שוקולד ו... גרביים? דרקן, לנגה, פרופסור צפרדע ומר טיל מחכים לכן.', hook: 'החבורה המבולבלת של השיקויים מחכה! 5 שאלות במעבדה!' },
  43: { art: WORLDS.potion.mapImage, position: '42% 72%', summary: 'כשענית נכון, השיקויים התחילו לזוז לבד! לנגה התמלאה בצבעים, ופרופסור צפרדע רוקד סביבה בהתרגשות.', hook: 'מדף התבלינים זז! צריך לחבר ולחסר כדי להביא את הנכון!' },
  44: { art: WORLDS.potion.mapImage, position: '72% 80%', summary: 'מר טיל, החילזון האיטי, התמלא מדי, והשיקוי גלש החוצה! צריך למדוד בדיוק כמה נשאר בכל מבחנה.', hook: 'המעבדה מתמלאת בקצף קסום! בואי נמדוד ונציל את היום!' },
  45: { art: WORLDS.potion.mapImage, position: '84% 60%', summary: 'מדדתן בדיוק את הכמות — השיקוי יצא מושלם! כל העולם נצבע בגווני קשת, ודרקן כל כך התרגש שהוא נשף עשן ורוד.', hook: 'עשן ורוד! 🤭 בואו נמשיך לעוד ניסויים מרתקים!' },
  46: { art: WORLDS.potion.mapImage, position: '36% 56%', summary: 'בעמוד האחרון של ספר השיקויים היה כתוב לחש סודי: "שלומפר, מחכים לך בג׳ונגל". השער נפתח, וריח של חיות עף באוויר.', hook: 'שיקוי הקשת מוכן — ומסע חדש מחכה! לג׳ונגל!' },
  /* ---- עולם גן החיות 🦁 (47-51) ---- */
  47: { art: WORLDS.zoo.castImage, position: 'center center', summary: 'השער נפתח לג׳ונגל ענקי! עצים עד השמיים, פרפרים בגודל ציפורים, וקולות של חיות מכל עבר. ארי, פינגו, טיקה וג׳ירו מחכים לכן.', hook: 'ארי, פינגו, טיקה וג׳ירו מחכים לכן בשער הספארי!' },
  48: { art: WORLDS.zoo.mapImage, position: '40% 68%', summary: 'החיות מנופפות לשלום! טיקה מתגנבת בין העצים, פינגו מחליק על הקרח, וג׳ירו רואה למרחקים. כולם מתרגשים לפגוש אתכן.', hook: 'בכלוב הקופים יש מספרים שמתחבאים בין הבננות. תמצאי אותם!' },
  49: { art: WORLDS.zoo.mapImage, position: '66% 78%', summary: 'ג׳ירו ראתה משהו ענק ליד הנהר — טי-רקס תינוק שהתבלבל בדרך הביתה לאמא שלו. הוא בקושי רואה את הרגליים שלו!', hook: 'צריך לעזור לו למצוא את אמא. בואי נמדוד אותו ונראה כמה גדול הוא!' },
  50: { art: WORLDS.zoo.mapImage, position: '84% 58%', summary: 'מצאתן את אמא דינוזאור! החיבוק שלהם היה כל כך גדול שהאדמה רעדה, וכל החיות באו לחגוג איתם.', hook: 'חיבוק דינוזאור! 🦖 ארי, פינגו, טיקה וג׳ירו חוגגים איתכן!' },
  51: { art: WORLDS.zoo.mapImage, position: '35% 54%', summary: 'ארי העניק לשלומפר כתר מעלים, וכל החיות רקדו. אבל אז ג׳ירו ראה משהו בשמיים — ענן קטן שהוא בעצם רובוט מעופף!', hook: 'רובוט בשמיים! הוא מוביל לעולם חדש ומפתיע!' },
  /* ---- עולם הרובוטים 🤖 (52-56) ---- */
  52: { art: WORLDS.robots.castImage, position: 'center center', summary: 'השער נפתח למפעל עצום! קירות מתכת מבריקים, גלגלי שיניים ענקיים, ומסועים שעליהם נוסעים חלקים זוהרים. בוטי, ספארק, וולטר וזי מתרוצצים ושרים שירי מחשבים.', hook: 'בוטי, ספארק, וולטר וזי מחכים לכן! בואו לבנות צעצועים!' },
  53: { art: WORLDS.robots.mapImage, position: '42% 72%', summary: 'כשענית נכון, המכונות עבדו מהר יותר! בוטי חושב מיליון מחשבות בשנייה, וזי מטעינה את כולם באנרגיה ירוקה.', hook: 'המסוע זז מהר! 5 שאלות חדשות מחכות!' },
  54: { art: WORLDS.robots.mapImage, position: '72% 80%', summary: 'וולטר מצייר תמונות מוזרות — עוגה שהיא גם חתול, פיל עם כובע. ספארק ממהר לבנות, וזי מטעינה את כולם.', hook: 'בואו נספור את החלקים ולבנות את הצעצוע המושלם!' },
  55: { art: WORLDS.robots.mapImage, position: '36% 56%', summary: 'הצעצועים התעוררו לחיים! בובות עץ, מכוניות זעירות ומטוסי נייר מתרוצצים ומצחקים. רובוט העל פקח עיניים ענקיות והצביע על דרך בשמיים — ענן ורוד.', hook: 'ענן ורוד? זה הזכיר לשלומפר את הביתה!' },
  56: { art: WORLDS.robots.mapImage, position: '82% 22%', summary: 'רובוט העל נתן לשלומפר מפתח זהב קטן שהכיל את הדרך הביתה. כל הרובוטים עמדו במעגל ומחאו כפיים.', hook: 'הדרך הביתה מתחילה! המפתח מוביל לעולם חדי הקרן!' },
  /* ---- עולם חדי הקרן 🦄 (57-61) ---- */
  57: { art: WORLDS.unicorns.castImage, position: 'center center', summary: 'השער נפתח לעמק ירוק ורחב עם קשת ענקית בשמיים. ארבעה חברים חדשים רצו לקראת שלומפר: דרקונון הדרקון הקטן, פיית אור הזוהרת, סילבי החתולה הרכה ופינקי החד-קרן הוורוד.', hook: 'החברים החדשים מובילים את שלומפר הביתה! 5 שאלות בשער עמק הקשת!' },
  58: { art: WORLDS.unicorns.mapImage, position: '40% 70%', summary: 'בשביל הכוכבים, ארבעת החברים החדשים סיפרו לשלומפר על עמק הקשת: על הדרקון הקטן שלומד לעוף, על הפיה שמאירה את הדרך, על החתולה שאוהבת להתכרבל, ועל פינקי שמקפץ על העננים.', hook: 'סילבי אוהבת להתכרבל, ופינקי קופץ על עננים! בואו נמשיך יחד!' },
  59: { art: WORLDS.unicorns.mapImage, position: '68% 80%', summary: 'בקצה השביל ישבה סבתא כוכבית על כיסא נוצץ. היא חיבקה את שלומפר חזק ואמרה: "ידעתי שתלך רחוק, נכדי. ועכשיו תראה — הבאת אוצר אמיתי הביתה: חברה חכמה כמוך!"', hook: 'סבתא כוכבית מחבקת את כולם! בואו נמשיך למגרש המשחקים!' },
  60: { art: WORLDS.unicorns.mapImage, position: '84% 62%', summary: 'במגרש המשחקים חיכו אמא קשת, אבא ענן ואחיו הקטן של שלומפר — פצפון. החברים החדשים והמשפחה התיישבו במעגל, וכל אחד רצה לשמוע על הרפתקה אחרת.', hook: 'כל המשפחה והחברים ביחד! בואו נשתף בסיפורים!' },
  61: { art: WORLDS.unicorns.mapImage, position: '82% 22%', summary: 'ומעל הטירה — קשת צבעונית ענקית נמתחה מקצה לשמיים. כל החברים מכל תשעת העולמות התאספו לחגוג. שלומפר הביט בכל החברים ואמר: "כל עולם לימד אותי משהו — אבל את לימדת אותי הכי הרבה!"', hook: 'המסע הגדול הסתיים — החברות נשארת לנצח! 🌈' },
};

/** מיקום המתחרים במסלול (0–9) — שלומפר תמיד מוביל, השחקנית תמיד מנצחת */
export type RacePosition = { racerId: RacerId; position: number; slot: number };

const RIVAL_GAPS = [0.6, 1.1, 1.6, 2.1];

const WOBBLE: number[][] = [
  [0, 0, 0, 0],
  [0.25, -0.1, 0.1, -0.15],
  [-0.1, 0.3, -0.1, 0.1],
  [0.2, -0.15, 0.25, -0.1],
  [-0.05, 0.2, -0.2, 0.25],
  [0.3, -0.1, 0.15, -0.2],
  [-0.15, 0.25, -0.05, 0.15],
  [0.15, -0.2, 0.2, -0.1],
  [-0.1, 0.1, -0.15, 0.1],
  [0.35, 0.15, 0.3, 0.1],
];

export function getRacePositions(completedStations: number, world: WorldId = 'kingdom'): RacePosition[] {
  const clamped = Math.max(0, Math.min(9, completedStations));
  const wobble = WOBBLE[clamped] ?? WOBBLE[0];
  const heroId = WORLD_CASTS[world][0].id;
  const rivals = WORLD_CASTS[world].map((entry) => entry.id).filter((id) => id !== heroId).slice(0, 4);
  const positions: RacePosition[] = [{ racerId: heroId, position: clamped, slot: -1 }];
  rivals.forEach((id, slot) => {
    const raw = clamped - RIVAL_GAPS[slot] + (wobble[slot] ?? 0);
    positions.push({ racerId: id, position: Math.max(0, Math.min(8.9, raw)), slot });
  });
  return positions.sort((a, b) => b.position - a.position);
}
