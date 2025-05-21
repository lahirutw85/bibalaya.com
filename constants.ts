

// Fix: Import SeriesFilterOption from types.ts
import { NavItem, CardData, SocialLink, Language, SeriesCategoryData, SeriesFilterOption } from './types';
import { HomeIcon, BibleIcon, StudyPlansIcon, SeriesIcon, BibleStudyIcon, SermonsIcon, BooksIcon, DownloadsIcon, AskLahiruIcon, SearchIconNav, UserCircleIcon, YouTubeIcon, LinkedInIcon } from './components/icons';

export const APP_LOGO_URL = "https://ik.imagekit.io/bibalaya/SVG/Bibalaya.com%20-%20LOGO.svg?updatedAt=1747814898195"; // Updated logo URL

export const SIDEBAR_TOP_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: HomeIcon, path: '/' },
  { id: 'entire-bible', label: 'Entire Bible', icon: BibleIcon, path: '/bible', disabled: true },
  { id: 'study-plans', label: 'Study Plans', icon: StudyPlansIcon, path: '/study-plans', disabled: false }, // Changed to false
  { id: 'series', label: 'Series', icon: SeriesIcon, path: '/series', disabled: false },
  { id: 'bible-study', label: 'Bible Studies', icon: BibleStudyIcon, path: '/bible-studies', disabled: true },
  { id: 'sermons', label: 'Sermons', icon: SermonsIcon, path: '/sermons', disabled: true },
  { id: 'books', label: 'Books', icon: BooksIcon, path: '/books', disabled: true },
  { id: 'downloads', label: 'Downloads', icon: DownloadsIcon, path: '/downloads', disabled: true },
  { id: 'ask-lahiru', label: 'Ask Lahiru', icon: AskLahiruIcon, path: '/ask', disabled: true },
  { id: 'search-nav', label: 'Search', icon: SearchIconNav, path: '/search-page', disabled: true },
];

export const SIDEBAR_BOTTOM_ITEMS: NavItem[] = [
  { id: 'account', label: 'Your Account', icon: UserCircleIcon, path: '/account', disabled: true },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'youtube', icon: YouTubeIcon, url: 'https://youtube.com', label: 'YouTube' },
  { id: 'linkedin', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/lahiru-t-14919199/', label: 'LinkedIn' },
];

export const LANGUAGES = [
  { id: Language.EN, label: 'EN' },
  { id: Language.SIN, label: 'SIN' },
];

export const HERO_IMAGE_URL = "https://picsum.photos/seed/hero/1200/500";
export const HERO_TEXT = "Discover Timeless Wisdom";

export const FEATURE_CARDS_DATA: CardData[] = [
  { id: 'latest-video', title: 'Latest Video', imageUrl: 'https://picsum.photos/seed/video/600/400', description: 'Watch our most recent message and be inspired.' },
  { id: 'about-us', title: 'About Us', imageUrl: 'https://picsum.photos/seed/about/600/400', description: 'Learn more about our mission and community.' },
];

const createDummyCarouselData = (seedPrefix: string, count: number, category: string): CardData[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${seedPrefix}-${i + 1}`,
    title: `${category} Topic ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/${seedPrefix}${i + 1}/300/200`,
    category: category,
  }));
};

export const NEW_TESTAMENT_DATA: CardData[] = createDummyCarouselData('nt', 6, 'New Testament');
export const OLD_TESTAMENT_DATA: CardData[] = createDummyCarouselData('ot', 6, 'Old Testament');
export const LATEST_SERIES_DATA: CardData[] = createDummyCarouselData('series', 6, 'Latest Series');

// Series Page Specific Constants
export const SERIES_PAGE_HERO_BACKGROUND_IMAGE_URL = "https://ik.imagekit.io/bibalaya/SVG/SERIES%20-%20HEADER.png?updatedAt=1747827090560"; // Updated image URL
export const SERIES_PAGE_HERO_TITLE = "FREE BIBLE CLASSES AND SERIES";
export const SERIES_PAGE_HERO_DESCRIPTION = "Multi-lesson Bible courses for personal, small group or church Bible studies. Many contain a complete quarter of material with lesson notes for the students.";

// Fix: Apply SeriesFilterOption type to SERIES_FILTER_OPTIONS
export const SERIES_FILTER_OPTIONS: SeriesFilterOption[] = [
  // { id: 'list', label: 'LIST', icon: 'ListIcon' }, // Removed, but if re-added, 'icon' property is allowed
  { id: 'featured', label: 'FEATURED', active: true }, // 'icon' is implicitly undefined, which is fine
  { id: 'newest', label: 'NEWEST FIRST' },
  { id: 'alpha', label: 'ALPHABETICALLY' },
  // { id: 'lessons', label: '#LESSONS', icon: 'HashIcon' } // Removed, but if re-added, 'icon' property is allowed
];

// Dummy Series Data
const LATEST_SERIES_ITEMS: CardData[] = [
  { id: 'prov', title: 'PROVERBS', category: 'FOR BEGINNERS', description: 'PRACTICAL WISDOM FROM THE EVERY DAY LIFE', imageUrl: 'https://picsum.photos/seed/provseries/280/180', overlayColor: 'bg-blue-500/70' },
  { id: 'ichron', title: 'I & II CHRONICLES', category: 'IN DEPTH', description: 'THINGS LEFT OVER', imageUrl: 'https://picsum.photos/seed/ichronseries/280/180', overlayColor: 'bg-yellow-700/70' },
  { id: 'ikings', title: 'I & II KINGS', category: 'HISTORICAL', description: 'KINGS WHO FAILED AND KINGS WHO RULED', imageUrl: 'https://picsum.photos/seed/ikingsseries/280/180', overlayColor: 'bg-purple-500/70' },
  { id: 'isam', title: 'I & II SAMUEL', category: 'NARRATIVE', description: 'THE FIRST KINGS OF ISRAEL', imageUrl: 'https://picsum.photos/seed/isamseries/280/180', overlayColor: 'bg-sky-600/70' },
  { id: 'joshjud', title: 'JOSHUA/JUDGES', category: 'CONQUEST', description: 'FROM CONQUEST TO SETTLED LAND', imageUrl: 'https://picsum.photos/seed/joshjudseries/280/180', overlayColor: 'bg-orange-500/70' },
  { id: 'numdeut', title: 'NUMBERS / DEUTERONOMY', category: 'LAW & GUIDANCE', description: 'FAITHFULNESS IN THE FACE OF CHALLENGE', imageUrl: 'https://picsum.photos/seed/numdeutseries/280/180', overlayColor: 'bg-green-600/70' },
];

const UPCOMING_SERIES_ITEMS: CardData[] = [
  { id: 'songsol', title: 'SONG OF SOLOMON', category: 'FOR BEGINNERS', description: 'CELEBRATING TRUE LOVE AND INTIMACY', imageUrl: 'https://picsum.photos/seed/songsolseries/280/180', overlayColor: 'bg-red-500/70' },
  { id: 'jerlam', title: 'JEREMIAH / LAMENTATIONS', category: 'PROPHETIC', description: 'A PROPHET\'S BURDEN, A NATION\'S SORROW', imageUrl: 'https://picsum.photos/seed/jerlamseries/280/180', overlayColor: 'bg-lime-600/70' },
  { id: 'ezek', title: 'EZEKIEL', category: 'FOR BEGINNERS', description: 'ENCOUNTERING GOD\'S GLORY IN TIMES OF EXILE', imageUrl: 'https://picsum.photos/seed/ezekseries/280/180', overlayColor: 'bg-yellow-600/70' },
];

const NT_SERIES_ITEMS:  CardData[] = [
  { id: 'matthew', title: 'MATTHEW', category: 'FOR BEGINNERS', imageUrl: 'https://picsum.photos/seed/matthewseries/280/180', overlayColor: 'bg-green-700/70', description: 'JESUS THE PROMISED KING' },
  { id: 'mark', title: 'MARK', category: 'FOR BEGINNERS', imageUrl: 'https://picsum.photos/seed/markseries/280/180', overlayColor: 'bg-teal-600/70', description: 'JESUS IN ACTION' },
  { id: 'luke', title: 'LUKE', category: 'FOR BEGINNERS', imageUrl: 'https://picsum.photos/seed/lukeseries/280/180', overlayColor: 'bg-amber-700/70', description: 'JESUS THE SAVIOR OF ALL' },
  { id: 'john', title: 'JOHN', category: 'A STUDY IN BELIEF', imageUrl: 'https://picsum.photos/seed/johnseries/280/180', overlayColor: 'bg-blue-700/70', description: 'JESUS THE SON OF GOD' },
  { id: 'acts', title: 'ACTS', category: 'EARLY CHURCH', imageUrl: 'https://picsum.photos/seed/actsseries/280/180', overlayColor: 'bg-purple-700/70', description: 'THE CHURCH BEGINS' },
  { id: 'romans', title: 'ROMANS', category: 'GOSPEL TRUTH', imageUrl: 'https://picsum.photos/seed/romansseries/280/180', overlayColor: 'bg-red-700/70', description: 'SAVED BY FAITH ALONE' },
  { id: '1corinthians', title: '1 CORINTHIANS', category: 'CHURCH ISSUES', imageUrl: 'https://picsum.photos/seed/1corinthiansseries/280/180', overlayColor: 'bg-orange-600/70', description: 'CHURCH PROBLEMS ADDRESSED' },
  { id: '2corinthians', title: '2 CORINTHIANS', category: 'PAUL’S DEFENSE', imageUrl: 'https://picsum.photos/seed/2corinthiansseries/280/180', overlayColor: 'bg-lime-700/70', description: 'PAUL’S PERSONAL LETTER' },
  { id: 'galatians', title: 'GALATIANS', category: 'FREEDOM IN CHRIST', imageUrl: 'https://picsum.photos/seed/galatiansseries/280/180', overlayColor: 'bg-pink-700/70', description: 'GRACE OVER LAW' },
  { id: 'ephesians', title: 'EPHESIANS', category: 'UNITY & IDENTITY', imageUrl: 'https://picsum.photos/seed/ephesiansseries/280/180', overlayColor: 'bg-cyan-700/70', description: 'UNITED IN CHRIST' },
  { id: 'philippians', title: 'PHILIPPIANS', category: 'JOY IN CHRIST', imageUrl: 'https://picsum.photos/seed/philippiansseries/280/180', overlayColor: 'bg-yellow-700/70', description: 'JOY IN ALL THINGS' },
  { id: 'colossians', title: 'COLOSSIANS', category: 'CHRIST SUPREME', imageUrl: 'https://picsum.photos/seed/colossiansseries/280/180', overlayColor: 'bg-emerald-700/70', description: 'CHRIST OVER ALL' },
  { id: '1thessalonians', title: '1 THESSALONIANS', category: 'LIVING IN HOPE', imageUrl: 'https://picsum.photos/seed/1thessaloniansseries/280/180', overlayColor: 'bg-indigo-700/70', description: 'HOPE IN JESUS’ RETURN' },
  { id: '2thessalonians', title: '2 THESSALONIANS', category: 'STAND FIRM', imageUrl: 'https://picsum.photos/seed/2thessaloniansseries/280/180', overlayColor: 'bg-rose-700/70', description: 'STAY STRONG IN TRIALS' },
  { id: '1timothy', title: '1 TIMOTHY', category: 'LEADERSHIP MANUAL', imageUrl: 'https://picsum.photos/seed/1timothyseries/280/180', overlayColor: 'bg-violet-700/70', description: 'GUIDE FOR LEADERS' },
  { id: '2timothy', title: '2 TIMOTHY', category: 'FINAL CHARGE', imageUrl: 'https://picsum.photos/seed/2timothyseries/280/180', overlayColor: 'bg-fuchsia-700/70', description: 'FINISH THE RACE WELL' },
  { id: 'titus', title: 'TITUS', category: 'CHURCH ORDER', imageUrl: 'https://picsum.photos/seed/titusseries/280/180', overlayColor: 'bg-sky-700/70', description: 'TEACH SOUND DOCTRINE' },
  { id: 'philemon', title: 'PHILEMON', category: 'GRACE & RECONCILIATION', imageUrl: 'https://picsum.photos/seed/philemonseries/280/180', overlayColor: 'bg-stone-700/70', description: 'A CALL TO FORGIVE' },
  { id: 'hebrews', title: 'HEBREWS', category: 'CHRIST ABOVE ALL', imageUrl: 'https://picsum.photos/seed/hebrewsseries/280/180', overlayColor: 'bg-neutral-700/70', description: 'JESUS IS GREATER' },
  { id: 'james', title: 'JAMES', category: 'FAITH IN ACTION', imageUrl: 'https://picsum.photos/seed/jamesseries/280/180', overlayColor: 'bg-zinc-700/70', description: 'LIVE OUT YOUR FAITH' },
];



const OT_SERIES_ITEMS: CardData[] = [
  { id: 'genesis', title: 'GENESIS', category: 'FOUNDATION BOOK OF THE BIBLE', imageUrl: 'https://picsum.photos/seed/genseries/280/180', overlayColor: 'bg-sky-700/70', description: 'BEGINNING OF EVERYTHING' },
  { id: 'exodus', title: 'EXODUS', category: 'GOD CREATED A NATION', imageUrl: 'https://picsum.photos/seed/exseries/280/180', overlayColor: 'bg-red-700/70', description: 'FREEDOM FROM EGYPT' },
  { id: 'leviticus', title: 'LEVITICUS', category: 'HOLINESS LAWS', imageUrl: 'https://picsum.photos/seed/levseries/280/180', overlayColor: 'bg-amber-700/70', description: 'LAWS FOR WORSHIP' },
  { id: 'numbers', title: 'NUMBERS', category: 'JOURNEY TO THE PROMISED LAND', imageUrl: 'https://picsum.photos/seed/numseries/280/180', overlayColor: 'bg-green-700/70', description: 'WILDERNESS WANDERING' },
  { id: 'deuteronomy', title: 'DEUTERONOMY', category: 'FINAL WORDS OF MOSES', imageUrl: 'https://picsum.photos/seed/deutseries/280/180', overlayColor: 'bg-lime-700/70', description: 'REPEATED LAW' },
  { id: 'joshua', title: 'JOSHUA', category: 'CONQUEST OF CANAAN', imageUrl: 'https://picsum.photos/seed/joshseries/280/180', overlayColor: 'bg-cyan-700/70', description: 'ENTERING THE LAND' },
  { id: 'judges', title: 'JUDGES', category: 'CYCLE OF SIN AND DELIVERANCE', imageUrl: 'https://picsum.photos/seed/judgesseries/280/180', overlayColor: 'bg-indigo-700/70', description: 'ISRAEL’S DARK TIMES' },
  { id: 'ruth', title: 'RUTH', category: 'REDEMPTION STORY', imageUrl: 'https://picsum.photos/seed/ruthseries/280/180', overlayColor: 'bg-pink-700/70', description: 'LOYALTY AND LOVE' },
  { id: '1samuel', title: '1 SAMUEL', category: 'ISRAEL WANTS A KING', imageUrl: 'https://picsum.photos/seed/1samseries/280/180', overlayColor: 'bg-teal-700/70', description: 'RISE OF SAUL' },
  { id: '2samuel', title: '2 SAMUEL', category: 'DAVID’S KINGDOM', imageUrl: 'https://picsum.photos/seed/2samseries/280/180', overlayColor: 'bg-yellow-700/70', description: 'DAVID’S RULE' },
  { id: '1kings', title: '1 KINGS', category: 'TEMPLE & DIVISION', imageUrl: 'https://picsum.photos/seed/1kingsseries/280/180', overlayColor: 'bg-rose-700/70', description: 'SOLOMON TO SPLIT' },
  { id: '2kings', title: '2 KINGS', category: 'FALL OF ISRAEL & JUDAH', imageUrl: 'https://picsum.photos/seed/2kingsseries/280/180', overlayColor: 'bg-stone-700/70', description: 'EXILE BEGINS' },
  { id: '1chronicles', title: '1 CHRONICLES', category: 'DAVID’S LINEAGE', imageUrl: 'https://picsum.photos/seed/1chrseries/280/180', overlayColor: 'bg-emerald-700/70', description: 'GENEALOGY AND KINGSHIP' },
  { id: '2chronicles', title: '2 CHRONICLES', category: 'TEMPLE HISTORY', imageUrl: 'https://picsum.photos/seed/2chrseries/280/180', overlayColor: 'bg-neutral-700/70', description: 'JUDAH’S STORY' },
  { id: 'ezra', title: 'EZRA', category: 'RETURN FROM EXILE', imageUrl: 'https://picsum.photos/seed/ezraseries/280/180', overlayColor: 'bg-zinc-700/70', description: 'REBUILDING TEMPLE' },
  { id: 'nehemiah', title: 'NEHEMIAH', category: 'WALLS AND WORSHIP', imageUrl: 'https://picsum.photos/seed/nehemiahseries/280/180', overlayColor: 'bg-blue-700/70', description: 'REBUILDING WALLS' },
  { id: 'esther', title: 'ESTHER', category: 'GOD’S HIDDEN HAND', imageUrl: 'https://picsum.photos/seed/estherseries/280/180', overlayColor: 'bg-fuchsia-700/70', description: 'SALVATION IN EXILE' },
  { id: 'job', title: 'JOB', category: 'SUFFERING AND FAITH', imageUrl: 'https://picsum.photos/seed/jobseries/280/180', overlayColor: 'bg-purple-700/70', description: 'WHY DO WE SUFFER?' },
  { id: 'psalms', title: 'PSALMS', category: 'SONGS & PRAYERS', imageUrl: 'https://picsum.photos/seed/psalmseries/280/180', overlayColor: 'bg-orange-700/70', description: 'WORSHIP AND LAMENT' },
  { id: 'proverbs', title: 'PROVERBS', category: 'WISDOM FOR LIFE', imageUrl: 'https://picsum.photos/seed/proverbsseries/280/180', overlayColor: 'bg-gray-700/70', description: 'PRACTICAL WISDOM' },
];

// This constant remains but will be unused by SERIES_CATEGORIES_DATA
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BEGINNERS_SERIES_ITEMS: CardData[] = [
  { id: 'galatians', title: 'GALATIANS', category: 'FOR BEGINNERS', imageUrl: 'https://picsum.photos/seed/galbeginners/280/180', overlayColor: 'bg-orange-600/70' },
  { id: 'james', title: 'JAMES', category: 'FOR BEGINNERS', imageUrl: 'https://picsum.photos/seed/jamesbeginners/280/180', overlayColor: 'bg-blue-600/70' },
  { id: 'leviticus', title: 'LEVITICUS', category: 'FOR BEGINNERS', description: 'TRAINING FOR HOLINESS', imageUrl: 'https://picsum.photos/seed/levbeginners/280/180', overlayColor: 'bg-amber-600/70' },
];


export const SERIES_CATEGORIES_DATA: SeriesCategoryData[] = [
  { id: 'latest', title: 'LATEST SERIES', items: LATEST_SERIES_ITEMS, viewAllLink: '/series/latest', titleClassName: 'text-text-light' },
  { id: 'upcoming', title: 'UPCOMING SERIES', items: UPCOMING_SERIES_ITEMS, viewAllLink: '/series/upcoming', titleClassName: 'text-text-light' },
  { id: 'nt', title: 'THE NEW TESTAMENT', items: NT_SERIES_ITEMS, viewAllLink: '/series/nt', titleClassName: 'text-text-light' },
  { id: 'ot', title: 'THE OLD TESTAMENT', items: OT_SERIES_ITEMS, viewAllLink: '/series/ot', titleClassName: 'text-text-light' },
  // { // Removed "FOR BEGINNERS" series section
  //   id: 'beginners', 
  //   title: "THE \"FOR BEGINNERS\" SERIES", 
  //   items: BEGINNERS_SERIES_ITEMS, 
  //   viewAllLink: '/series/beginners', 
  //   titleClassName: 'text-teal-800 font-semibold', 
  //   sectionClassName: 'bg-teal-100' 
  // },
];
// Study Plans Page Specific Constants
export interface StudyPlanLevelData {
  id: string;
  level: string;
  title: string;
  seriesCount: string;
  bgColor: string;
  buttonLink: string;
}

export const STUDY_PLANS_DATA: StudyPlanLevelData[] = [
  { 
    id: 'level1', 
    level: 'Level 1', 
    title: 'BASIC', 
    seriesCount: '8 SERIES', 
    bgColor: 'bg-emerald-700 hover:bg-emerald-600', 
    buttonLink: '/study-plans/basic' 
  },
  { 
    id: 'level2', 
    level: 'Level 2', 
    title: 'INTERMEDIATE', 
    seriesCount: '11 SERIES', 
    bgColor: 'bg-lime-600 hover:bg-lime-500', 
    buttonLink: '/study-plans/intermediate' 
  },
  { 
    id: 'level3', 
    level: 'Level 3', 
    title: 'ADVANCED', 
    seriesCount: '15 SERIES', 
    bgColor: 'bg-amber-600 hover:bg-amber-500', 
    buttonLink: '/study-plans/advanced' 
  },
  { 
    id: 'level4', 
    level: 'Level 4', 
    title: 'INSTRUCTOR I', 
    seriesCount: '15 SERIES', 
    bgColor: 'bg-orange-700 hover:bg-orange-600', 
    buttonLink: '/study-plans/instructor-1' 
  },
  { 
    id: 'level5', 
    level: 'Level 5', 
    title: 'INSTRUCTOR II', 
    seriesCount: '17 SERIES', 
    bgColor: 'bg-red-700 hover:bg-red-600', 
    buttonLink: '/study-plans/instructor-2' 
  },
];