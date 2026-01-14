import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { fontStyles } from '@styles/fonts';

export function EmptyMessage({ title, subtitle, icon: Icon=null }) {
  const { theme } = useTheme();
  return (
    <View style={styles.emptyMessageSection}>
      {Icon &&
        <Icon size={80} color={theme.primaryText} />
      }
      <View style={styles.emptyMessage}>
        <Text style={[fontStyles.title_3, styles.emptyText, { color: theme.primaryText }]}>
          {title}
        </Text>
        <Text style={[fontStyles.subtitle_2, styles.emptyText, { color: theme.primaryText }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyMessageSection: {
    paddingTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16
  },
  emptyMessage: {
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 10
  }
});