import { StyleSheet, View } from 'react-native';
import { Image } from 'lucide-react-native';
import { useAuth } from '@context/AuthContext';
import { Post } from '@components/post';
import { Loading } from '@components/loading';
import { Pagination } from '@components/pagination';
import { EmptyMessage } from '@components/emptyMessage';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { usePagination } from '@hooks/usePagination';
import { handleChangePage } from '@handlers/handleChangePage';

export default function Feed({
  navigation, posts, loading, currentPage, setCurrentPage, onGoToMap,
  openKebabMenu, openRescueModal, openLoginRequiredModal, scrollRef
}) {
  const { user: loadedUser } = useAuth();

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const {
    totalPages,
    paginatedData: paginatedPosts
  } = usePagination(posts, currentPage, 10);

  if (loading) return <Loading/>;

  return (
    <>
      {paginatedPosts.length > 0 ? (
        <View style={styles.feed}>
          {paginatedPosts.map((post, index) => (
            <Post
              key={index}
              post={post}
              loadedUser={loadedUser}
              navigation={navigation}
              onOpenMenu={() => openKebabMenu('post', post)}
              onOpenRescueModal={openRescueModal}
              onOpenLoginModal={openLoginRequiredModal}
              onGoToMap={onGoToMap}
            />
          ))}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChangePage={(page) => {handleChangePage(page, setCurrentPage, scrollRef)}}
            />
          )}
        </View>
    ) : (
      <EmptyMessage
        title={'Você ainda não publicou nada'}
        subtitle={'Publique algo para começar a ver conteúdos no seu feed.'}
        icon={Image}
      />
    )}
  </>
)};

const styles = StyleSheet.create({
  loading: {
    marginTop: 16
  },
  feed: {
    marginTop: 16,
    marginBottom: 136,
    gap: 32,
    alignItems: 'center'
  },
});