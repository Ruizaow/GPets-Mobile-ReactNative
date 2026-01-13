import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react-native';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';

export function InputField({ label, placeholder, type, value, onChangeText, errorMessage,
  textColor=colors.dark, bgColor=colors.beige, phColor=colors.grey, labelColor=colors.beige,
  errorMessagePositionAbsolute=false
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const isEmail = type === 'email';
  const isCNPJ = type === 'cnpj';

  function getKeyboardType() {
    if (isPassword) return 'password';
    if (isEmail) return 'email-address';
    if (isCNPJ) return 'numeric';
    return 'default';
  }
  
  function getPlaceholderColor() {
    if (errorMessage) {
      return phColor === colors.grey
        ? 'rgba(255, 107, 107, 0.4)'
        : 'rgba(255, 107, 107, 0.5)'
    }
    return phColor
  }

  return (
    <View style={styles.container}>
      {label && 
        <Text style={[styles.label, { color: labelColor }]}>
          {label}
        </Text>
      }

      <View style={styles.inputField}>
        <TextInput
          style={[
            styles.input,
            { color: textColor, backgroundColor: bgColor },
            errorMessage && styles.inputError,
            errorMessage && styles.inputTextError
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          placeholderTextColor={getPlaceholderColor()}
          
          // EMAIL
          autoCapitalize={isEmail ? 'none' : 'sentences'}

          // PASSWORD
          secureTextEntry={isPassword && !showPassword}
        />
        
        {isPassword && (
          <TouchableOpacity style={styles.eyeIcon} 
            onPress={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? (
              <Eye size={24} color={colors.dark} />
            ) : (
              <EyeClosed size={24} color={colors.dark} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && (
        <Text style={[styles.errorMessage,
          errorMessagePositionAbsolute && {
            position: 'absolute',
            marginTop: 74
          }
        ]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
    ...fontStyles.subtitle_1
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  input: {
    outlineStyle: 'none',
    borderRadius: 12,
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    ...fontStyles.inputText
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.red,
  },
  inputTextError: {
    color: colors.red,
  },
  errorMessage: {
    marginTop: 2,
    ...fontStyles.inputText,
    color: colors.red
  }
});