
import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer'; 
import { StudyPlansIcon } from '../../components/icons'; 
import { STUDY_PLANS_DATA } from '../../constants'; // Updated path

export const StudyPlansPage: React.FC = () => {
  return (
    <div className="bg-dark-bg text-text-light flex flex-col min-h-full">
      <div className="flex-grow px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 md:mb-16 text-center"> 
            <StudyPlansIcon className="w-14 h-14 md:w-16 md:h-16 mb-5 text-gray-200 mx-auto" /> 
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              STUDY PLANS
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto"> 
              A variety of courses divided into five structured study plans each leading to a Certificate of Completion.
            </p>
          </header>

          <section className="space-y-5 md:space-y-6">
            {STUDY_PLANS_DATA.map(plan => (
              <article 
                key={plan.id} 
                className={`${plan.bgColor} rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1`}
                aria-labelledby={`plan-title-${plan.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6">
                  <div className="flex-grow">
                    <p className="text-sm text-gray-200 opacity-90">{plan.level}</p>
                    <h2 id={`plan-title-${plan.id}`} className="text-2xl md:text-3xl font-bold text-white mt-1 mb-3">
                      {plan.title}
                    </h2>
                    <span className="inline-block bg-black bg-opacity-30 text-xs text-gray-50 px-3.5 py-1.5 rounded-full font-medium">
                      {plan.seriesCount}
                    </span>
                  </div>
                  <div className="flex-shrink-0 mt-4 sm:mt-0 self-start sm:self-center">
                    <Link 
                      to={plan.buttonLink} 
                      onClick={(e) => { e.preventDefault(); alert(`Navigating to ${plan.title} plan... (Route: ${plan.buttonLink})`);}} 
                      className="inline-block bg-white text-dark-bg font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-white"
                      aria-label={`View plan for ${plan.title}`}
                    >
                      VIEW PLAN
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};