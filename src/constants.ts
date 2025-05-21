
import { NavItem, CardData, SocialLink, Language, SeriesCategoryData } from '../types'; // Corrected path
import { 
  HomeIcon, 
  BibleIcon, 
  StudyPlansIcon, 
  SeriesIcon, 
  BibleStudyIcon, 
  SermonsIcon, 
  BooksIcon, 
  DownloadsIcon, 
  AskLahiruIcon, 
  SearchIconNav, 
  UserCircleIcon, 
  YouTubeIcon, 
  LinkedInIcon 
} from '../components/icons'; // Corrected path

export const APP_LOGO_URL = "https://ik.imagekit.io/bibalaya/SVG/Bibalaya.com%20-%20LOGO.svg?updatedAt=1747814898195"; // Updated logo URL

export const SIDEBAR_TOP_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: HomeIcon, path: '/' },
  { id: 'entire-bible', label: 'Entire Bible', icon: BibleIcon, path: '/bible', disabled: true },
  { id: 'study-plans', label: 'Study Plans', icon: StudyPlansIcon, path: '/study-plans', disabled: false },
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

export const SERIES_FILTER_OPTIONS = [
  { id: 'list', label: 'LIST', icon: 'ListIcon' },
  { id: 'featured', label: 'FEATURED', active: true },
  { id: 'newest', label: 'NEWEST FIRST' },
  { id: 'alpha', label: 'ALPHABETICALLY' },
  { id: 'lessons', label: '#LESSONS', icon: 'HashIcon' }
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

const NT_SERIES_ITEMS: CardData[] = [
  { id: 'matthew', title: 'MATTHEW', category: 'FOR BEGINNERS', imageUrl: 'https://picsum.photos/seed/matthewseries/280/180', overlayColor: 'bg-green-700/70' },
  { id: 'mark', title: 'MARK', category: 'FOR BEGINNERS', imageUrl: 'https://picsum.photos/seed/markseries/280/180', overlayColor: 'bg-teal-600/70' },
  { id: 'lukeacts', title: 'LUKE/ACTS', category: 'FOR BEGINNERS', imageUrl: 'https://picsum.photos/seed/lukeactsseries/280/180', overlayColor: 'bg-amber-700/70' },
  { id: 'john', title: 'GOSPEL OF JOHN', category: 'A STUDY IN BELIEF', imageUrl: 'https://picsum.photos/seed/johnseries/280/180', overlayColor: 'bg-blue-700/70' },
];

const OT_SERIES_ITEMS: CardData[] = [
  { id: 'genesis', title: 'GENESIS', category: 'FOUNDATION BOOK OF THE BIBLE', imageUrl: 'https://picsum.photos/seed/genseries/280/180', overlayColor: 'bg-sky-700/70' },
  { id: 'exodus', title: 'EXODUS', category: 'GOD CREATED A NATION', imageUrl: 'https://picsum.photos/seed/exseries/280/180', overlayColor: 'bg-red-700/70' },
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
    bgColor: 'bg-emerald-700 hover:bg-emerald-600', // Dark olive green
    buttonLink: '/study-plans/basic' 
  },
  { 
    id: 'level2', 
    level: 'Level 2', 
    title: 'INTERMEDIATE', 
    seriesCount: '11 SERIES', 
    bgColor: 'bg-lime-600 hover:bg-lime-500', // Lighter, yellowish olive
    buttonLink: '/study-plans/intermediate' 
  },
  { 
    id: 'level3', 
    level: 'Level 3', 
    title: 'ADVANCED', 
    seriesCount: '15 SERIES', 
    bgColor: 'bg-amber-600 hover:bg-amber-500', // Golden mustard
    buttonLink: '/study-plans/advanced' 
  },
  { 
    id: 'level4', 
    level: 'Level 4', 
    title: 'INSTRUCTOR I', 
    seriesCount: '15 SERIES', 
    bgColor: 'bg-orange-700 hover:bg-orange-600', // Rusty brown
    buttonLink: '/study-plans/instructor-1' 
  },
  { 
    id: 'level5', 
    level: 'Level 5', 
    title: 'INSTRUCTOR II', 
    seriesCount: '17 SERIES', 
    bgColor: 'bg-red-700 hover:bg-red-600', // Deep brick red
    buttonLink: '/study-plans/instructor-2' 
  },
];