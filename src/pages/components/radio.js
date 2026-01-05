import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export function Radio({ selected, onPress, label, disabled=false, icon: Icon=null, iconColor }) {
  const { theme } = useTheme();

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  return (
    <TouchableOpacity style={styles.radioField} onPress={onPress} disabled={disabled}>
      <View style={[
        styles.radio,
        { borderColor: theme.primaryText },
        selected && styles.radioSelected,
        disabled && styles.radioDisabled
      ]}>
        {selected && (
          <View style={[
            styles.selectedState,
            disabled && styles.selectedStateDisabled
          ]}/>
        )}
      </View>
      {Icon &&
        <Icon size={24} color={iconColor ?? theme.primaryText}/>
      }
      <Text style={[
        styles.label,
        { color: theme.primaryText },
        disabled && styles.labelDisabled
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 100,
    borderRadius: 12,
    borderWidth: 2
  },
  radioSelected: {
    borderColor: colors.blue
  },
  radioDisabled: {
    borderColor: colors.disabled
  },
  selectedState: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.blue,
    alignSelf: 'center',
    marginTop: 4
  },
  selectedStateDisabled: {
    backgroundColor: colors.disabled
  },
  label: {
    ...fontStyles.subtitle_1,
  },
  labelDisabled: {
    color: colors.disabled
  }
});