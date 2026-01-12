import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { Post } from '@components/post';
import { Pagination } from '@components/pagination';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { usePagination } from '@hooks/usePagination';
import { handleChangePage } from '@handlers/handleChangePage';

export default function Feed({ navigation, posts, loading, currentPage, setCurrentPage, openKebabMenu, scrollRef }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const {
    totalPages,
    paginatedData: paginatedPosts
  } = usePagination(posts, currentPage, 10);

  if (loading) return (
    <ActivityIndicator style={styles.loading} size='large' color={theme.primaryText}/>
  );

  return (
    <View style={styles.feed}>
      {paginatedPosts.map((post, index) => (
        <Post
          key={index}
          post={post}
          navigation={navigation}
          onOpenMenu={() => openKebabMenu('post', post)}
          originRoute={'Home'}
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