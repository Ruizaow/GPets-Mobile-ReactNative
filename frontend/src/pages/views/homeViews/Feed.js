import { StyleSheet, View } from 'react-native';
import { useRef, useState, useMemo } from 'react';
import { Post } from '@components/post';
import { Pagination } from '@components/pagination';
import { useFontsCustom } from '@hooks/useFontsCustom';

const POSTS_PER_PAGE = 10;

export default function Feed({ navigation, posts, loading, currentPage, setCurrentPage, openKebabMenu, scrollRef }) {
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const paginationRef = useRef(null);

  const orderedPosts = useMemo(
    () => [...posts].reverse(),
    [posts]
  );

  const totalPages = Math.ceil(orderedPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return orderedPosts.slice(start, end);
  }, [currentPage, orderedPosts]);

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