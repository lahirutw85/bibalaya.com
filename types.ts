import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  path: string;
  disabled?: boolean;
}

export interface CardData {
  id: string;
  title: string;
  imageUrl: string;
  description?: string; // Used for smaller text on SeriesCard
  category?: string; // Used for subtitle like "FOR BEGINNERS" on SeriesCard
  overlayColor?: string; // For SeriesCard image overlay
}

export enum Language {
  EN = 'EN',
  SIN = 'SIN',
}

export interface SocialLink {
  id: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  url: string;
  label: string;
}

export interface SeriesCategoryData {
  id: string;
  title: string;
  items: CardData[];
  viewAllLink: string;
  titleClassName?: string;
  sectionClassName?: string; // For styling the entire section, e.g., background color
}

// Added SeriesFilterOption interface
export interface SeriesFilterOption {
  id: string;
  label: string;
  icon?: string; // Icon property is optional, refers to a key in iconMap
  active?: boolean;
}
