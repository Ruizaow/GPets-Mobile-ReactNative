import { useEffect, useState } from 'react';
import { useHomeView } from '@context/HomeViewContext';
import { usePosts } from '@context/PostsContext';
import Feed from './homeViews/Feed';
import SelectPost from './homeViews/SelectPost';
import MapView from './homeViews/MapView';
import { HomeLayout } from '@pages/HomeLayout';
import { getPosts } from '@services/getPosts';

export default function Home({ navigation, route }) {
  const { currentView, setCurrentView } = useHomeView();
  const { posts, loading } = getPosts();
  const { removePost } = usePosts();

  const [currentPage, setCurrentPage] = useState(1);
  const [postMarker, setPostMarker] = useState(null);

  function handleRemovePost(postId) {
    removePost(postId);
    setCurrentPage(prev => {
      const remainingPosts = posts.length - 1;
      const maxPage = Math.max(1, Math.ceil(remainingPosts / 10));
      return prev > maxPage
        ? maxPage
        : prev;
    });
  }
  function handleGoToMap(post) {
    setPostMarker(post);
    setCurrentView('MapView');
  }

  useEffect(() => {
    if (route?.params?.openFeed) {
      setCurrentView('Feed');
    }
    if (route?.params?.openMapView) {
      handleGoToMap(route.params.postMarker);
    }
  }, [route?.params]);

  const views = {
    Feed: <Feed
      navigation={navigation}
      posts={posts}
      loading={loading}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onGoToMap={handleGoToMap}
    />,
    SelectPost: <SelectPost
      navigation={navigation}
    />,
    MapView: <MapView
      postMarker={postMarker}
      setPostMarker={setPostMarker}
    />,
  };

  return (
    <HomeLayout
      navigation={navigation}
      onGoTo={setCurrentView}
      currentView={currentView}
      onPostDeleted={handleRemovePost}
      postMarker={postMarker}
      setPostMarker={setPostMarker}
    >
      {views[currentView]}
    </HomeLayout>
  );
}