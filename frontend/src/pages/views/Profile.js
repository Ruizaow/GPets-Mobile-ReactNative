import { useState } from 'react';
import { useAuth } from '@context/AuthContext';
import ProfileView from './profileViews/ProfileView';
import EditProfile from './profileViews/EditProfile';

export default function Profile({ navigation }) {
  const { user, setUser } = useAuth();
  
  const [currentView, setCurrentView] = useState('ProfileView');
  const goTo = (viewName) => setCurrentView(viewName);

  return (
    <>
      {currentView === 'ProfileView' && (
        <ProfileView
          loadedUser={user}
          navigation={navigation}
          onGoToEditProfile={() => goTo('EditProfile')}
        />
      )}
      {currentView === 'EditProfile' && (
        <EditProfile
          loadedUser={user}
          updateLoadedUser={setUser}
          onCancel={() => goTo('ProfileView')}
          onSave={() => goTo('ProfileView')}
        />
      )}
    </>
  );
}