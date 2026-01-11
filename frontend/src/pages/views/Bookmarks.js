import { StyleSheet, View, ScrollView } from 'react-native';
import { useRef, useState } from 'react';
import { mockedBookmarks } from '@constants/mockDataBookmark';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { ReducedPost } from '@components/reducedPost';
import { Pagination } from '@components/pagination';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { usePagination } from '@hooks/usePagination';
import { handleChangePage } from '@handlers/handleChangePage';

export default function Bookmarks({ navigation }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    totalPages,
    paginatedData: paginatedBookmarks
  } = usePagination(mockedBookmarks, currentPage);

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
              />
            </View>
          ))}
        </View>
        <View style={styles.paginationSection}>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChangePage={(page) => {handleChangePage(page, setCurrentPage, scrollRef)}}
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