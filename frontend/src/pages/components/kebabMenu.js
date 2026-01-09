import { StyleSheet, TouchableOpacity, View, Text, Animated, Easing } from 'react-native';
import { Trash, Star, TriangleAlert, Share2, Image } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export function KebabMenu({ type, data, onClose, onDelete, onChangeImage, canDelete }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const translateY = useRef(new Animated.Value(320)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0, duration: 280, easing: Easing.out(Easing.cubic), useNativeDriver: true
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1, duration: 200, useNativeDriver: true
      }),
    ]).start();
  }, []);

  function handleClose() {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 320, duration: 240, easing: Easing.in(Easing.cubic), useNativeDriver: true
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0, duration: 200, useNativeDriver: true
      }),
    ]).start(() => {
      onClose();
    });
  }

  const allMenuItems = {
    delete: {
      icon: <Trash size={24} color={type !== 'profilePicture' ? theme.primaryText : colors.red}/>,
      title: type !== 'profilePicture' ? 'Excluir' : 'Remover foto atual'
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
    },
    image: {
      icon: <Image size={24} color={theme.primaryText}/>,
      title: 'Escolher imagem'
    }
  };

  const menuHeightByType = {
    post: 320,
    comment: 192,
    notification: 192,
    profilePicture: 320,
  };
  
  const menuItems = (() => {
    switch (type) {
      case 'post':
        return canDelete
          ? ['delete', 'bookmark', 'report', 'share']
          : ['bookmark', 'report', 'share']
      case 'comment':
        return canDelete ? ['delete'] : ['report'];
      case 'notification':
        return ['delete'];
      case 'profilePicture':
        return ['image', 'delete']
      default:
        return [];
    }
  })();

  return (
    <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
      <TouchableOpacity style={StyleSheet.absoluteFill} onPress={handleClose}/>
      <Animated.View style={[
        styles.kebabMenu, {
          transform: [{ translateY }],
          backgroundColor: theme.background,
          height: menuHeightByType[type]
        }
      ]}>
        <View style={[styles.greyBar, { backgroundColor: theme.lineDivision }]}/>

        <View style={styles.menuItems}>
          {menuItems.map((key) => {
            const item = allMenuItems[key];
            if (!item) return null;

            return (
              <TouchableOpacity key={key} style={styles.menuItem}
                onPress={() => {
                  if (onDelete && key === 'delete') {
                    onDelete();
                  }
                  if (onChangeImage && key === 'image') {
                    onChangeImage();
                  }
                  handleClose();
                }}
              >
                <View style={styles.menuItemContent}>
                  {item.icon}
                  <Text style={[
                    fontStyles.title_4,
                    { color: key === 'delete' && type === 'profilePicture'
                        ? colors.red
                        : theme.primaryText
                    }
                  ]}>
                    {item.title}
                  </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  kebabMenu: {
    position: 'absolute',
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32
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