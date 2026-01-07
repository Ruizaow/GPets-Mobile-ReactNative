import { StyleSheet, TextInput, View, Text } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors';
import { fontStyles } from '@styles/fonts';

export function FormInputField({
  label, required=false, value, onChangeText,
  editable=true, disabled=false, inputStyle, keyboardType, maxLength,
  placeholder='Digite aqui...'
}) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: theme.primaryText }]}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}

      <TextInput
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor={disabled ? colors.disabled : theme.inputText}
        style={[
          styles.input, {
            color: theme.primaryText,
            borderColor: theme.primaryText,
          },
          disabled && styles.inputDisabled,
          inputStyle
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6
  },
  labelRow: {
    flexDirection: 'row'
  },
  label: {
    ...fontStyles.subtitle_1,
  },
  required: {
    ...fontStyles.subtitle_1,
    color: colors.red
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    ...fontStyles.inputText
  },
  inputDisabled: {
    color: colors.disabled,
    borderColor: colors.disabled
  },
});