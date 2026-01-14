import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';

const MAX_VISIBLE = 5;
const MOVABLE_VISIBLE = MAX_VISIBLE - 1;
const ITEM_WIDTH = 40;

export function Pagination({ currentPage, totalPages, onChangePage }) {
  const { theme } = useTheme();
  const [startPage, setStartPage] = useState(2);

  useEffect(() => {
    if (currentPage === 1) return;

    if (currentPage < startPage) {
      setStartPage(currentPage);
    }
    if (currentPage >= startPage + MOVABLE_VISIBLE) {
      setStartPage(currentPage - MOVABLE_VISIBLE + 1);
    }
  }, [currentPage]);

  const visiblePages = useMemo(() => {
    const end = Math.min(startPage + MOVABLE_VISIBLE - 1, totalPages);
    return Array.from(
      { length: end - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [startPage, totalPages]);

  function goLeft() {
    if (startPage > 2) {
      setStartPage(prev => prev - 1);
    }
  }

  function goRight() {
    if (startPage + MOVABLE_VISIBLE - 1 < totalPages) {
      setStartPage(prev => prev + 1);
    }
  }

  return (
    <View style={styles.paginationContainer}>
      <View style={[styles.content, {
        backgroundColor: theme.post,
        borderWidth: theme.name === 'dark' ? 1 : 0,
        borderColor: theme.name === 'dark' ? colors.white : 'transparent' },
      ]}>
        <TouchableOpacity onPress={goLeft} disabled={startPage === 1}>
          <ChevronLeft
            size={24}
            color={startPage === 1 ? colors.grey : colors.dark}
          />
        </TouchableOpacity>

        {/* Página 1 fixa */}
        <TouchableOpacity
          style={[
            styles.pagItem,
            currentPage === 1 && styles.selected
          ]}
          onPress={() => onChangePage(1)}
        >
          <Text
            style={[
              fontStyles.pagination,
              currentPage === 1 && { color: colors.white }
            ]}
          >
            1
          </Text>
        </TouchableOpacity>

        {/* Páginas móveis */}
        {visiblePages.map(page => (
          <TouchableOpacity
            key={page}
            style={[
              styles.pagItem,
              page === currentPage && styles.selected
            ]}
            onPress={() => onChangePage(page)}
          >
            <Text
              style={[
                fontStyles.pagination,
                page === currentPage && { color: colors.white }
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={goRight}
          disabled={startPage + MOVABLE_VISIBLE - 1 >= totalPages}
        >
          <ChevronRight
            size={24}
            color={
              startPage + MOVABLE_VISIBLE - 1 >= totalPages
                ? colors.grey
                : colors.dark
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    width: '100%',
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    gap: 12
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