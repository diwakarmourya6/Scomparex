import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeColor = 'blue' | 'emerald' | 'indigo' | 'amber' | 'rose' | 'cyan';

export interface ThemeOption {
  id: ThemeColor;
  name: string;
  hex: string;
  previewClass: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'blue', name: 'Electric Blue', hex: '#2563eb', previewClass: 'bg-blue-600' },
  { id: 'emerald', name: 'Emerald Tech', hex: '#059669', previewClass: 'bg-emerald-600' },
  { id: 'indigo', name: 'Royal Indigo', hex: '#4f46e5', previewClass: 'bg-indigo-600' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#0891b2', previewClass: 'bg-cyan-600' },
  { id: 'amber', name: 'Sunset Amber', hex: '#d97706', previewClass: 'bg-amber-600' },
  { id: 'rose', name: 'Crimson Rose', hex: '#e11d48', previewClass: 'bg-rose-600' },
];

interface ThemeContextType {
  currentTheme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  themeConfig: ThemeOption;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(() => {
    try {
      const saved = localStorage.getItem('comparex_theme_color') as ThemeColor;
      if (saved && THEME_OPTIONS.some(o => o.id === saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'blue'; // Default to modern Electric Blue
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    try {
      localStorage.setItem('comparex_theme_color', currentTheme);
    } catch {
      // ignore
    }
  }, [currentTheme]);

  const themeConfig = THEME_OPTIONS.find(o => o.id === currentTheme) || THEME_OPTIONS[0];

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
