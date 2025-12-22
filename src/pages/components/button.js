import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';

export function Button({ text, imageSrc = null, variant, size = 'big', onPress }) {
  const { theme } = useTheme();

  const goToMapDynamicStyle =
    theme.name === 'light' ? {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.blue,
    } : size === 'small' ? {
      backgroundColor: colors.blue,
    } : {
      backgroundColor: colors.green,
    };

  const variantStyles = {
    blue: styles.buttonBlue,
    blueBeige: styles.buttonBlue,
    green: styles.buttonGreen,
    beige: styles.buttonBeige,
    signUp: styles.buttonSignUp,
    goToMap: goToMapDynamicStyle,
    disabled: styles.buttonDisabled,
  };

  function getTextColor(variant) {
    if (variant === 'signUp' || variant === 'disabled' || variant === 'blueBeige' || variant === 'blue' && size !== 'big') {
      return colors.beige;
    }
    if (variant === 'goToMap') {
      if (size === 'small') {
        return theme.border;
      }
      return theme.reportButtonText;
    }
    return colors.dark;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, variantStyles[variant],
        size === 'small' && styles.buttonSmall,
        size === 'medium' && styles.buttonMedium,
        size === 'custom' && styles.buttonCustom,
        (size === 'small' || size === 'medium' || size === 'custom') && { height: 48 },
      ]}
    >
      <View style={styles.contentArea}>
        {imageSrc && (
          <Image source={imageSrc} />
        )}
        <Text style={[fontStyles.buttonText, { color: getTextColor(variant) }]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  button: {
    borderRadius: 100,
    width: 352,
    height: 56,
    justifyContent: 'center'
  },
  buttonSmall: {
    width: 149
  },
  buttonMedium: {
    width: 227
  },
  buttonCustom: {
    flex: 1
  },
  buttonBlue: {
    backgroundColor: colors.blue
  },
  buttonGreen: {
    backgroundColor: colors.green
  },
  buttonBeige: {
    backgroundColor: colors.beige
  },
  buttonSignUp: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.beige
  },
  buttonDisabled: {
    backgroundColor: colors.disabled
  }
});