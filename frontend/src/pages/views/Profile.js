import { useState } from 'react';
import { useAuth } from '@context/AuthContext';
import ProfileView from './profileViews/ProfileView';
import EditProfile from './profileViews/EditProfile';

export default function Profile({ navigation, route }) {
  const { user } = route.params;
  const { user: loadedUser, setUser, loading } = useAuth();
  
  const [currentView, setCurrentView] = useState('ProfileView');
  const goTo = (viewName) => setCurrentView(viewName);

  return (
    <>
      {currentView === 'ProfileView' && (
        <ProfileView
          userProfile={user}
          loadedUser={loadedUser}
          loading={loading}
          navigation={navigation}
          onGoToEditProfile={() => goTo('EditProfile')}
        />
      )}
      {currentView === 'EditProfile' && (
        <EditProfile
          loadedUser={loadedUser}
          updateLoadedUser={setUser}
          onCancel={() => goTo('ProfileView')}
          onSave={() => goTo('ProfileView')}
        />
      )}
    </>
  );
}