import React, { useState } from 'react';
import { useCompare } from '../context/CompareContext';
import { useAuth } from '../context/AuthContext';
import { ThemeSelector } from './ThemeSelector';
import { 
  Search, 
  ArrowLeftRight, 
  Menu, 
  X, 
  Sparkles, 
  Layers
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  onSearchSubmit?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate, onSearchSubmit }) => {
  const { compareIds, setIsSignInModalOpen } = useCompare();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Smartphones', path: '/smartphones' },
    { label: 'Compare', path: '/compare', badge: compareIds.length },
    { label: 'Find Phone', path: '/recommend', icon: Sparkles }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(navSearchQuery.trim());
      } else {
        navigate('/smartphones');
      }
      setShowSearchInput(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl brand-bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center">
                  Compare<span className="brand-text-primary">X</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
                  Smartphones
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const isActive = currentPath === item.path || 
                  (item.path !== '/' && currentPath.startsWith(item.path));
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'brand-text-primary brand-bg-light'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 brand-text-primary" />}
                    <span>{item.label}</span>
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold rounded-full brand-bg-primary text-white min-w-[18px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search */}
            {showSearchInput ? (
              <form onSubmit={handleSearch} className="relative flex items-center">
                <input
                  type="text"
                  value={navSearchQuery}
                  onChange={(e) => setNavSearchQuery(e.target.value)}
                  placeholder="Search phone..."
                  autoFocus
                  className="w-40 sm:w-60 px-3 py-1.5 text-xs bg-slate-100 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowSearchInput(false)}
                  className="ml-1.5 text-slate-400 hover:text-slate-700 p-1 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                id="navbar-search-btn"
                onClick={() => setShowSearchInput(true)}
                className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/70 rounded-xl text-sm transition-colors"
                title="Search smartphones..."
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline text-xs font-normal text-slate-500 pr-1">
                  Search...
                </span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-300 text-slate-400 shadow-2xs">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Theme Selector Dropdown */}
            <ThemeSelector />

            {/* Compare Pill in Navbar */}
            <button
              id="navbar-compare-pill"
              onClick={() => handleNavClick('/compare')}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                compareIds.length > 0
                  ? 'brand-bg-primary text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compare</span>
              {compareIds.length > 0 && (
                <span className="px-1.5 py-0.2 text-[11px] font-extrabold rounded-full bg-white text-slate-900 shadow-2xs">
                  {compareIds.length}
                </span>
              )}
            </button>

            {/* User Profile or Sign In */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                {isAdmin && (
                  <button
                    onClick={() => handleNavClick('/admin')}
                    className="px-3.5 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
                  >
                    Admin Panel
                  </button>
                )}
                <span className="text-xs font-semibold text-slate-700">
                  Hi, {user?.name.split(' ')[0]}
                </span>
                <button
                  onClick={logout}
                  className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                id="navbar-signin-btn"
                onClick={() => setIsSignInModalOpen(true)}
                className="hidden sm:inline-flex items-center px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navItems.map(item => {
              const isActive = currentPath === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'brand-bg-light brand-text-primary'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4 brand-text-primary" />}
                    <span>{item.label}</span>
                  </div>
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full brand-bg-primary text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            {isAuthenticated ? (
              <div className="w-full flex flex-col gap-2">
                {isAdmin && (
                  <button
                    onClick={() => handleNavClick('/admin')}
                    className="w-full py-2.5 text-xs font-bold text-center bg-indigo-50 text-indigo-700 rounded-xl"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-xs font-bold text-center bg-slate-100 text-slate-700 rounded-xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsSignInModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-xs font-bold text-center bg-slate-900 text-white rounded-xl"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
