import { StyleSheet, Pressable, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { colors } from '@styles/colors.js';

export function Switch({ isActive, onToggle }) {
  const position = useRef(new Animated.Value(isActive ? 19 : 0)).current;

  useEffect(() => {
    Animated.timing(position, {
      toValue: isActive ? 19 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isActive]);
  
  return (
    <Pressable
      style={[
        styles.switch,
        { backgroundColor: isActive ? colors.blue : colors.dark,
          borderColor: isActive ? colors.beige : colors.dark,
          borderWidth: isActive ? 1 : 0 }
      ]}
      onPress={onToggle}
    >
      <Animated.View
        style={[
          styles.button,
          { backgroundColor: isActive ? colors.dark : colors.beige,
            transform: [{ translateX: position }] }
        ]}
      ></Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 46,
    height: 25,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  button: {
    width: 17,
    height: 17,
    borderRadius: 50,
  },
});