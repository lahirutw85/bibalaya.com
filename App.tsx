
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './pages/HomePage';
import { SeriesPage } from './pages/SeriesPage';
import { StudyPlansPage } from './src/pages/StudyPlansPage'; // Import StudyPlansPage
import { MenuIcon } from './components/icons/MenuIcon'; // For mobile toggle

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isSeriesPage = location.pathname === '/series';
  const isStudyPlansPage = location.pathname === '/study-plans'; // Added this check

  // Apply no padding for home, series, and study plans page, default padding for others
  const mainContentPadding = isHomePage || isSeriesPage || isStudyPlansPage ? '' : 'p-4 md:p-8';
  const mainContentClasses = `flex-1 overflow-y-auto ${mainContentPadding}`;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-light-bg text-text-primary">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-dark-bg text-text-light p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-semibold">Bible App</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </header>

      <main className={mainContentClasses}>
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
            <div 
                className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
                aria-hidden="true"
            ></div>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/study-plans" element={<StudyPlansPage />} /> {/* Added StudyPlansPage route */}
          {/* Define other routes here as needed */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
