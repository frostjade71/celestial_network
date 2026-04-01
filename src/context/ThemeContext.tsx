import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  isSoonModalOpen: boolean;
  toggleTheme: () => void;
  closeSoonModal: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme] = useState<'light' | 'dark'>('dark');
  const [isSoonModalOpen, setIsSoonModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, [theme]);

  const toggleTheme = () => {
    setIsSoonModalOpen(true);
  };

  const closeSoonModal = () => {
    setIsSoonModalOpen(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, isSoonModalOpen, toggleTheme, closeSoonModal }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
