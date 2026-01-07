import { StyleSheet, View } from 'react-native';
import { useRef, useState, useMemo } from 'react';
import { mockedPosts } from '@constants/mockDataPost';
import { Post } from '@components/post';
import { Pagination } from '@components/pagination';
import { useFontsCustom } from '@hooks/useFontsCustom';

const POSTS_PER_PAGE = 10;

export default function Feed({ navigation, openKebabMenu, scrollRef }) {
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [currentPage, setCurrentPage] = useState(1);
  const paginationRef = useRef(null);

  const orderedPosts = useMemo(() => [...mockedPosts].reverse(), []);
  const totalPages = Math.ceil(orderedPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return orderedPosts.slice(start, end);
  }, [currentPage, orderedPosts]);

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
          ref={paginationRef}
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={(page) => {
            setCurrentPage(page);

            requestAnimationFrame(() => {
              paginationRef.current?.measureLayout(
                scrollRef.current,
                (x, y) => {
                  scrollRef.current.scrollTo({
                    x,
                    y: y - 16,
                    animated: true,
                  });
                },
                () => {}
              );
            });
          }}
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