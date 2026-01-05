import { StyleSheet, TouchableOpacity, View, Text, Animated, Easing } from 'react-native';
import { Trash, Star, TriangleAlert, Share2 } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { useTheme } from '@context/ThemeContext';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export function KebabMenu({ type, data, onClose, onDelete }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const translateY = useRef(new Animated.Value(320)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function handleClose() {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 320,
        duration: 240,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }

  const allMenuItems = {
    delete: {
      icon: <Trash size={24} color={theme.primaryText}/>,
      title: 'Excluir'
    },
    bookmark: {
      icon: <Star size={24} color={theme.primaryText}/>,
      title: 'Salvar'
    },
    report: {
      icon: <TriangleAlert size={24} color={theme.primaryText}/>,
      title: 'Denunciar'
    },
    share: {
      icon: <Share2 size={24} color={theme.primaryText}/>,
      title: 'Compartilhar'
    }
  };
  const menuItems =
    type === 'post'
      ? ['delete', 'bookmark', 'report', 'share']
      : data?.isOwner
        ? ['delete']
        : ['report'];

  return (
    <Animated.View style={[styles.overlay,
      theme.name === 'light'
        ? { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
        : { backgroundColor: 'rgba(255, 255, 255, 0.4)' },
      { opacity: overlayOpacity }
    ]}>
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleClose}/>
      <Animated.View style={[styles.kebabMenu, {
          transform: [{ translateY }],
          backgroundColor: theme.background
        }, type === 'post' ? { height: 320 } : { height: 192 }
      ]}>

        <View style={[styles.greyBar, { backgroundColor: theme.lineDivision }]}/>

        <View style={styles.menuItems}>
          {menuItems.map((key) => {
            const item = allMenuItems[key];
            return (
              <TouchableOpacity key={key} style={styles.menuItem}
                onPress={() => {
                  data.isOwner && onDelete?.(data.id);
                  handleClose();
                }}
              >
                <View style={styles.menuItemContent}>
                  {item.icon}
                  <Text style={[fontStyles.title_4, { color: theme.primaryText }]}>{item.title}</Text>
                </View>
                <View style={[styles.lineDivision, { backgroundColor: theme.lineDivision }]}/>
              </TouchableOpacity>
            );
          })}
        </View>
        
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end'
  },
  kebabMenu: {
    position: 'absolute',
    width: '100%',
    height: 320,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  greyBar: {
    alignSelf: 'center',
    width: 122,
    height: 8,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 48
  },
  menuItems: {
    paddingHorizontal: 32,
    gap: 12
  },
  menuItem: {
    gap: 8
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lineDivision: {
    width: '100%',
    height: 1
  }
});