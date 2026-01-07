import { createContext, useContext, useState } from 'react';

const ProfileTabContext = createContext();

export function ProfileTabProvider({ children }) {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <ProfileTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ProfileTabContext.Provider>
  );
}

export function useProfileTab() {
  return useContext(ProfileTabContext);
}