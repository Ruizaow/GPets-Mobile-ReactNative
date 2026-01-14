import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useTheme } from '@context/ThemeContext';

export function Loading({ marginTop, hasContainer=false }) {
  const { theme } = useTheme();
  return hasContainer ? (
    <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
      <ActivityIndicator
        style={[styles.loading, { marginTop }]}
        size='large'
        color={theme.primaryText}
      />
    </View>
  ) : (
    <ActivityIndicator
      style={[styles.loading, { marginTop }]}
      size='large'
      color={theme.primaryText}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    width: '100%',
    height: '100%'
  },
  loading: {
    marginTop: 16
  }
});