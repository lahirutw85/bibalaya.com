
import React from 'react';
import { HERO_IMAGE_URL, HERO_TEXT } from '../../constants';


interface HeroSectionProps {
  headline?: string;
  backgroundImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ headline = HERO_TEXT, backgroundImage = HERO_IMAGE_URL }) => {
  return (
    <section
      className="relative h-64 md:h-96 bg-cover bg-center rounded-xl shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <h1 id="hero-heading" className="text-3xl md:text-5xl font-bold text-white text-center leading-tight shadow-text">
          {headline}
        </h1>
      </div>
    </section>
  );
};
