import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useTheme } from '@context/ThemeContext';
import { Map } from '@components/map';
import { Button } from '@components/button';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export function Modal({ text, confirmButton, onClose, onConfirm, hasConfirmButton=true, coordinateLat, coordinateLng }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1, duration: 100, useNativeDriver: true
      }),
    ]).start();
  }, []);

  function handleClose() {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0, duration: 100, useNativeDriver: true
      }),
    ]).start(() => {
      onClose();
    });
  }

  function handleConfirm() {
    onClose();
    onConfirm();
  }

  return (
    <Animated.View style={[styles.overlay,
      theme.name === 'light'
        ? { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
        : { backgroundColor: 'rgba(255, 255, 255, 0.4)' },
      { opacity: overlayOpacity }
    ]}>
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleClose}/>

      <View style={styles.modalContainer}>
        <View style={[styles.content, { backgroundColor: theme.post }]}>
          <Text style={[styles.text, { color: theme.primaryText }]}>{text}</Text>
          {!hasConfirmButton && (
            <View style={[styles.mapView, { borderColor: theme.primaryText }]}>
              <Map
                useMarkers={false}
                isReadOnly
                coordinateLat={coordinateLat}
                coordinateLng={coordinateLng}
              />
            </View>
          )}
          <View style={styles.buttons}>
	          {hasConfirmButton ? (
		          <>
              	<Button text='Cancelar' variant='goToMap' size={'custom'} onPress={handleClose}/>
              	<Button text={confirmButton} variant='delete' size={'custom'} onPress={handleConfirm}/>
              </>
            ) : (
              <>
                <Button text='Fechar' variant='delete' size={'custom'} onPress={handleClose}/>
              </>
            )}
          </View>
        </View>
      </View>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    zIndex: 10
  },
  modalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    width: 343,
    alignItems: 'center',
    borderRadius: 24,
    padding: 15.6,
    gap: 16
  },
  text: {
    ...fontStyles.title_3,
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%'
  },
  mapView: {
    width: '96%',
    height: 304,
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: -4
  },
});