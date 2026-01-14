import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';

const MAX_VISIBLE = 5;
const ITEM_WIDTH = 66;

export function Pagination({ currentPage, totalPages, onChangePage }) {
  const { theme } = useTheme();

  const scrollRef = useRef(null);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    if (currentPage < startPage) {
      setStartPage(currentPage);
    } else if (currentPage >= startPage + MAX_VISIBLE) {
      setStartPage(currentPage - MAX_VISIBLE + 1);
    }
  }, [currentPage]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: (startPage - 1) * ITEM_WIDTH,
      animated: true,
    });
  }, [startPage]);

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  function handleScrollEnd(event) {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newStart = Math.round(offsetX / ITEM_WIDTH) + 1;

    const maxStart = Math.max(1, totalPages - MAX_VISIBLE + 1);
    setStartPage(Math.min(newStart, maxStart));
  }

  if (totalPages <= 1) return null;

  return (
    <View style={styles.paginationContainer}>
      <View style={[styles.content, {
        backgroundColor: theme.post,
        borderWidth: theme.name === 'dark' ? 1 : 0,
        borderColor: theme.name === 'dark' ? colors.white : 'transparent' },
      ]}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate='fast'
          onMomentumScrollEnd={handleScrollEnd}
          contentContainerStyle={styles.scrollContent}
        >
          {pages.map((page) => (
            <TouchableOpacity
              key={page}
              style={[styles.pagItem, page === currentPage && styles.selected]}
              onPress={() => onChangePage(page)}
            >
              <Text style={[fontStyles.pagination, {
                color: theme.paginationText },
                page === currentPage && { color: colors.white },
              ]}>
                {page}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  content: {
    height: 56,
    borderRadius: 40,
    alignItems: 'center',
    overflow: 'hidden',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  pagItem: {
    width: ITEM_WIDTH,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: colors.blue,
    borderRadius: 100,
  },
});