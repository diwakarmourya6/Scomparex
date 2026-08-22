import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';
import { SignInModal } from './components/SignInModal';
import { QuickPhonePickerModal } from './components/QuickPhonePickerModal';

import { HomePage } from './pages/HomePage';
import { SmartphonesPage } from './pages/SmartphonesPage';
import { SmartphoneDetailsPage } from './pages/SmartphoneDetailsPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { RecommendationQuiz } from './components/RecommendationQuiz';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [activePhoneId, setActivePhoneId] = useState<string | null>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/smartphones/')) {
      return path.replace('/smartphones/', '');
    }
    return null;
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      if (path.startsWith('/smartphones/')) {
        setActivePhoneId(path.replace('/smartphones/', ''));
      } else {
        setActivePhoneId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    if (path.startsWith('/smartphones/')) {
      setActivePhoneId(path.replace('/smartphones/', ''));
    } else {
      setActivePhoneId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (id: string) => {
    setActivePhoneId(id);
    navigate(`/smartphones/${id}`);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    navigate('/smartphones');
  };

  const renderCurrentView = () => {
    if (currentPath.startsWith('/smartphones/') && activePhoneId) {
      return (
        <SmartphoneDetailsPage
          phoneId={activePhoneId}
          onBack={() => navigate('/smartphones')}
          onViewDetails={handleViewDetails}
          navigate={navigate}
        />
      );
    }

    if (currentPath === '/admin') {
      return <AdminDashboard />;
    }

    switch (currentPath) {
      case '/smartphones':
        return (
          <SmartphonesPage
            onViewDetails={handleViewDetails}
            initialSearchQuery={searchQuery}
          />
        );
      case '/compare':
        return (
          <ComparisonPage
            onViewDetails={handleViewDetails}
            navigate={navigate}
          />
        );
      case '/recommend':
        return (
          <div className="py-6">
            <RecommendationQuiz
              onViewDetails={handleViewDetails}
              navigate={navigate}
            />
          </div>
        );
      case '/':
      default:
        return (
          <HomePage
            navigate={navigate}
            onViewDetails={handleViewDetails}
            onSearchSubmit={handleSearchSubmit}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <CompareProvider>
          <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-900">
            {/* Navigation Bar */}
            <Navbar
              currentPath={currentPath}
              navigate={navigate}
              onSearchSubmit={handleSearchSubmit}
            />

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
              {renderCurrentView()}
            </main>

            {/* Quick Phone Selection Modal */}
            <QuickPhonePickerModal />

            {/* Sign In Mock Modal */}
            <SignInModal />

            {/* Global Toast Feedback */}
            <ToastNotification />

            {/* Tech Platform Footer */}
            <Footer navigate={navigate} />
          </div>
        </CompareProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
