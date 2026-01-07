import { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from '@styles/theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);

  function toggleTheme() {
    setTheme(prev => (prev.name === 'light' ? darkTheme : lightTheme));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
};