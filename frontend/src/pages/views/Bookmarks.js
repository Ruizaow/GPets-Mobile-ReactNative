import { StyleSheet, View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRef, useState, useMemo, useCallback } from 'react';
import { mockedBookmarks } from '@constants/mockDataBookmark';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { ReducedPost } from '@components/reducedPost';
import { Pagination } from '@components/pagination';
import { useFontsCustom } from '@hooks/useFontsCustom';

const POSTS_PER_PAGE = 20;

export default function Bookmarks({ navigation }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [currentPageBookmark, setCurrentPageBookmark] = useState(1);
    
  const orderedBookmarks = useMemo(() => [...mockedBookmarks].reverse(), []);
  const totalPagesBookmarks = Math.ceil(orderedBookmarks.length / POSTS_PER_PAGE);
  
  const paginatedBookmarks = useMemo(() => {
    const start = (currentPageBookmark - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return orderedBookmarks.slice(start, end);
  }, [currentPageBookmark, orderedBookmarks]);

  useFocusEffect(
    useCallback(() => {
      const state = navigation.getState();
      const lastRoute = state.routes[state.index];

      const savedState = lastRoute?.params?.profileState;

      if (savedState) {
        setCurrentPageBookmark(savedState.currentPageBookmark);
      }
    }, [])
  );
  
  const scrollRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <View style={[styles.profileContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={'Salvos'}
        onPress={() => navigation.navigate('Home')}
        showLineDivision={false}
      />
      <ScrollView ref={scrollRef}>
        <View style={styles.posts}>
          {(paginatedBookmarks).map((post, index) => (
            <View key={index} style={styles.post}>
              <ReducedPost
                post={post}
                navigation={navigation}
                originRoute={'Bookmarks'}
                currentPageBookmark={currentPageBookmark}
              />
            </View>
          ))}
        </View>
        <View style={styles.paginationSection}>
          {totalPagesBookmarks > 1 && (
            <Pagination
              ref={paginationRef}
              currentPage={currentPageBookmark}
              totalPages={totalPagesBookmarks}
              onChangePage={(page) => {
                setCurrentPageBookmark(page);

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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1
  },
  posts: {
    paddingBottom: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  post: {
    marginBottom: 10
  },
  paginationSection: {
    marginBottom: 32
  }
});