import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { fontStyles } from '@styles/fonts';

export function Button({ text, textColor, bgColor, borderColor, width, height, minWidth, image=null, onPress, isDisabled=false }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled}
      style={[styles.button,
        width ? { width } : { flex: 1 },
        height && { height },
        minWidth && { minWidth },
        borderColor && { borderColor, borderWidth: 1 },
        { backgroundColor: bgColor }
    ]}>
      <View style={styles.contentArea}>
        {image && ( <Image source={image}/> )}
        <Text style={[fontStyles.buttonText, { color: textColor }]}>{text}</Text>
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
  }
});