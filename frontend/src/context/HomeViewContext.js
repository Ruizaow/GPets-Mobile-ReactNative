import { createContext, useContext, useState } from 'react';

const HomeViewContext = createContext({});

export function HomeViewProvider({ children }) {
  const [currentView, setCurrentView] = useState('Feed');

  return (
    <HomeViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </HomeViewContext.Provider>
  );
}

export function useHomeView() {
  return useContext(HomeViewContext);
}