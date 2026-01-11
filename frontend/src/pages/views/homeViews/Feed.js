import { StyleSheet, View } from 'react-native';
import { Post } from '@components/post';
import { Pagination } from '@components/pagination';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { usePagination } from '@hooks/usePagination';
import { handleChangePage } from '@handlers/handleChangePage';

export default function Feed({ navigation, posts, loading, currentPage, setCurrentPage, openKebabMenu, scrollRef }) {
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const {
    totalPages,
    paginatedData: paginatedPosts
  } = usePagination(posts, currentPage, 10);

  if (loading) return null;

  return (
    <View style={styles.feed}>
      {paginatedPosts.map((post, index) => (
        <Post
          key={index}
          post={post}
          onOpenMenu={() => openKebabMenu('post', post)} navigation={navigation}
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
  );
};

const styles = StyleSheet.create({
  feed: {
    marginTop: 16,
    marginBottom: 156,
    gap: 32,
    alignItems: 'center'
  },
});