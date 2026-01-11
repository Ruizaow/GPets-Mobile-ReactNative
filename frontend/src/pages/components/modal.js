import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useTheme } from '@context/ThemeContext';
import { Map } from '@components/map';
import { Button } from '@components/button';
import { ReducedPost } from '@components/reducedPost';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export function Modal({ text, confirmButton, onClose, onConfirm, post, hasMap=false }) {
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
          
          {hasMap ? (
            <View style={[styles.mapView, { borderColor: theme.primaryText }]}>
              <Map
                isReadOnly={true}
                postStatus={post.status}
                coordinateLat={post.coordinateLat}
                coordinateLng={post.coordinateLng}
              />
            </View>
          ) : (
            post && (
              <View style={styles.reducedPost}>
                <ReducedPost post={post} scale={0.85} isPressable={false}/>
              </View>
            )
          )}
          <View style={styles.buttons}>
	          {hasMap ? (
              <Button
                text='Fechar'
                textColor={colors.white}
                bgColor={colors.red}
                height={46}
                onPress={handleClose}
              />
            ) : (
              <>
                <Button
                  text='Cancelar'
                  textColor={colors.blue}
                  bgColor={'transparent'}
                  borderColor={colors.blue}
                  width={144}
                  height={46}
                  onPress={handleClose}
                />
                {post ? (
                  <Button
                    text={confirmButton}
                    textColor={colors.white}
                    bgColor={colors.blue}
                    width={144}
                    height={46}
                    onPress={handleConfirm}
                  />
                ) : (
                  <Button
                    text={confirmButton}
                    textColor={colors.white}
                    bgColor={colors.red}
                    width={144}
                    height={46}
                    onPress={handleConfirm}
                  />
                )}
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
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 16
  },
  text: {
    ...fontStyles.title_3,
    textAlign: 'center'
  },
  reducedPost: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    marginBottom: 2
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8
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