import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export function GoBackHeader({ headerTitle, onPress, showLineDivision = true, icon: Icon = null, iconColor, onPressIcon }) {
  const { theme } = useTheme();

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  return (
    <View style={[styles.goBackHeader, !showLineDivision && { marginBottom: 16 }]}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.goBackSection, Icon ? { justifyContent: 'space-between' } : { gap: 16 }]}  onPress={onPress}>
          <ArrowLeft size={24} color={theme.primaryText} />
          <Text style={[
            headerTitle !== 'Evento/publicidade'
              ? { ...fontStyles.title_1, marginTop: 0 }
              : { ...fontStyles.title_5, marginTop: -4 },
            { color: theme.primaryText }]}
          >{headerTitle}</Text>
          {Icon &&
            <TouchableOpacity onPress={onPressIcon}>
              <Icon size={28} color={iconColor ?? theme.primaryText}/>
            </TouchableOpacity>
          }
        </TouchableOpacity>
        {showLineDivision && <View style={styles.lineDivision}/>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goBackHeader: {
    width: '100%'
  },
  header: {
    marginTop: 60,
  },
  goBackSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16
  },
  lineDivision: {
    backgroundColor: colors.grey,
    width: '100%',
    height: 1
  },
});