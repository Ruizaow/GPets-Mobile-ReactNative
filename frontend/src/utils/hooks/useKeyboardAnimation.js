import { useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, Animated } from 'react-native';

export function useKeyboardAnimation({ enabled = true, offset = 245, duration = 200 } = {}) {
  const animatedOffset = useRef(new Animated.Value(0)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (!enabled) {
      animatedOffset.setValue(0);
      setKeyboardHeight(0);
      return;
    }

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showListener = Keyboard.addListener(showEvent, (event) => {
      const height = event.endCoordinates.height;

      // valor NUMÉRICO (layout / scroll)
      setKeyboardHeight(height);

      // valor ANIMADO (visual)
      Animated.timing(animatedOffset, {
        toValue: -height + offset,
        duration,
        useNativeDriver: true,
      }).start();
    });

    const hideListener = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);

      Animated.timing(animatedOffset, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [enabled, offset, duration]);

  return { animatedOffset, keyboardHeight };
}