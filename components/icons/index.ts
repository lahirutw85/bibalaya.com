
import React from 'react';

export * from './HomeIcon';
export * from './BibleIcon';
export * from './StudyPlansIcon';
export * from './SeriesIcon';
export * from './BibleStudyIcon';
export * from './SermonsIcon';
export * from './BooksIcon';
export * from './DownloadsIcon';
export * from './AskLahiruIcon';
export * from './SearchIconNav'; // Differentiated from general SearchIcon
export * from './SearchIcon'; // General purpose search icon
export * from './UserCircleIcon';
export * from './YouTubeIcon';
export * from './LinkedInIcon';
export * from './ChevronLeftIcon';
export * from './ChevronRightIcon';
export * from './ChevronDownIcon';
export * from './MenuIcon';
export * from './ListIcon'; // New Icon
export * from './HashIcon'; // New Icon

// Fix: Define LoginIcon component using React.createElement
export const LoginIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: 1.5,
    stroke: "currentColor",
    ...props
  },
    React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
    }),
    React.createElement('polyline', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      points: "10 17 15 12 10 7"
    }),
    React.createElement('line', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      x1: "15",
      y1: "12",
      x2: "3",
      y2: "12"
    })
  );
};

// Fix: Define UserPlusIcon component using React.createElement
export const UserPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    ...props
  },
    React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
    })
  );
};
