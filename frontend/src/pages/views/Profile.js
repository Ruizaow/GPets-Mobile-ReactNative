import { useState } from 'react';
import { useAuth } from '@context/AuthContext';
import { getUserPosts } from '@services/getUserPosts';
import { getUserBookmarks } from '@services/getUserBookmarks';
import ProfileView from './profileViews/ProfileView';
import EditProfile from './profileViews/EditProfile';

export default function Profile({ navigation, route }) {
  const { user } = route.params;
  const { user: loadedUser,
          setUser,
          loading: loadingUser } = useAuth();
  const { posts,
          loading: loadingPosts } = getUserPosts(user.id);
  const { posts: bookmarks,
          loading: loadingBookmarks } = getUserBookmarks(user.id);
  
  const [currentView, setCurrentView] = useState('ProfileView');
  const goTo = (viewName) => setCurrentView(viewName);

  const isLoading = loadingUser || loadingPosts || loadingBookmarks;
  if (isLoading) return null;

  return (
    <>
      {currentView === 'ProfileView' && (
        <ProfileView
          userProfile={user}
          loadedUser={loadedUser}
          userPosts={posts}
          userBookmarks={bookmarks}
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