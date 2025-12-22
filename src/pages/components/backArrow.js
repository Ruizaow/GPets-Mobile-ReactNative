import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { fontStyles } from '@styles/fonts';

export function BackArrow({ text, onPress, isDisabled }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.backArrow} onPress={onPress} disabled={isDisabled}>
      <ArrowLeft size={24} color={theme.primaryText}/>
      <Text style={[fontStyles.subtitle_1, { color: theme.primaryText }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backArrow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8
  },
});