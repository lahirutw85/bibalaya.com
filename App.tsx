
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './src/firebase';
import { UserProvider } from './src/contexts/UserContext';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './pages/HomePage';
import { SeriesPage } from './pages/SeriesPage';
import { StudyPlansPage } from './src/pages/StudyPlansPage'; // Import StudyPlansPage
import { MenuIcon } from './components/icons/MenuIcon'; // For mobile toggle

import { EntireBiblePage } from './pages/EntireBiblePage';
import { AccountPage } from './pages/AccountPage';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isSeriesPage = location.pathname === '/series';
  const isStudyPlansPage = location.pathname === '/study-plans'; // Added this check

  // Inactivity Logout Logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (auth.currentUser) {
        timeoutId = setTimeout(() => {
          console.log("User inactive for 15 minutes, logging out...");
          signOut(auth);
        }, 15 * 60 * 1000); // 15 minutes
      }
    };

    const handleUserActivity = () => {
      resetTimer();
    };

    // Listen for auth state changes
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, start timer and listeners
        resetTimer();
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);
        window.addEventListener('click', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity);
      } else {
        // User is logged out, clear timer and listeners
        if (timeoutId) clearTimeout(timeoutId);
        window.removeEventListener('mousemove', handleUserActivity);
        window.removeEventListener('keydown', handleUserActivity);
        window.removeEventListener('click', handleUserActivity);
        window.removeEventListener('scroll', handleUserActivity);
      }
    });

    return () => {
      unsubscribeAuth();
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, []);

  // Apply no padding for home, series, and study plans page, default padding for others
  const mainContentPadding = isHomePage || isSeriesPage || isStudyPlansPage ? '' : 'p-4 md:p-8';
  const mainContentClasses = `flex-1 overflow-y-auto ${mainContentPadding}`;

  return (
    <UserProvider>
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
            <Route path="/study-plans" element={<StudyPlansPage />} />
            <Route path="/entire-bible" element={<EntireBiblePage />} />
            <Route path="/account" element={<AccountPage />} />
            {/* Define other routes here as needed */}
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
};

export default App;
