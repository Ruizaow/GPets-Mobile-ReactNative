import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { House, CirclePlus, MapPin, MessagesSquare, Star, Settings, Contrast, DoorOpen, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { BackArrow } from '@components/backArrow';
import { ProfilePicture } from '@components/profilePicture';
import { Switch } from '@components/switch';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';

export function Sidebar({ navigation, onGoTo, onOpenModal, onCloseSidebar, isBackArrowDisabled, loadedUser }) {
  const { theme, toggleTheme } = useTheme();

  function handleSelectItem(menuItem) {
    if (menuItem === 'Contrast') {
      toggleTheme();
      return;
    }
    const homeViews = ['Feed', 'SelectPost', 'MapView'];
    if (homeViews.includes(menuItem)) {
      onGoTo(menuItem);
    } else {
      menuItem !== 'Bookmarks'
        ? navigation.navigate(menuItem)
        : navigation.navigate(menuItem, { user: loadedUser });
    }
  };

  function handleExitAccount() {
    onOpenModal();
  }

  const menuItems = {
    Feed: {
      icon: <House size={24} color={theme.primaryText}/>,
      title: 'Meu feed'
    },
    SelectPost: {
      icon: <CirclePlus size={24} color={theme.primaryText}/>,
      title: 'Publicar'
    },
    MapView: {
      icon: <MapPin size={24} color={theme.primaryText}/>,
      title: 'Mapa'
    },
    Messages: {
      icon: <MessagesSquare size={24} color={theme.primaryText}/>,
      title: 'Mensagens'
    },
    Bookmarks: {
      icon: <Star size={24} color={theme.primaryText}/>,
      title: 'Salvos'
    },
    Settings: {
      icon: <Settings size={24} color={colors.disabled}/>,
      title: 'Configurações'
    },
    Contrast: {
      icon: <Contrast size={24} color={theme.primaryText}/>,
      title: 'Alto contraste'
    }
  };

  return (
    <View style={[styles.sidebarContainer, { backgroundColor: theme.background }]}>
      <View>
        <View style={styles.closeMenu}>
          <BackArrow text='Fechar menu' onPress={onCloseSidebar} isDisabled={isBackArrowDisabled}/>
        </View>

        <TouchableOpacity
          style={[styles.profileCard, { borderColor: theme.border }]}
          onPress={() => navigation.navigate('Profile', { user: loadedUser })}
        >
          <ProfilePicture loadedUser={loadedUser}/>
          <View>
            <Text style={[fontStyles.subtitle_1, { color: theme.primaryText }, { lineHeight: 16 }]}>Meu perfil</Text>
            <Text style={[fontStyles.postSubtitle, { color: theme.primaryText }]}>Clique para visualizar perfil</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.menuList}>
          {Object.entries(menuItems).map(([key, item]) => (
            <TouchableOpacity key={key} onPress={() => {handleSelectItem(key)}} disabled={item.title === 'Configurações'}>
              <View style={styles.menuItem}>
                <View style={styles.itemNameIcon}>
                  {item.icon}
                  <Text style={item.title === 'Configurações'
                    ? [fontStyles.subtitle_1, { color: colors.disabled }]
                    : [fontStyles.subtitle_1, { color: theme.primaryText }]}
                  >{item.title}</Text>
                </View>
                { item.title === 'Alto contraste' ? (
                  <Switch isActive={theme.name === 'dark'} onToggle={toggleTheme}/>
                ) : (
                  <ChevronRight size={24} color={item.title === 'Configurações'
                    ? colors.disabled
                    : theme.primaryText}/>
                )}
              </View>
              { item.title !== 'Alto contraste' && <View style={styles.lineDivision}/> }
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.exitButton} onPress={handleExitAccount}>
        <DoorOpen size={24} color={colors.red}/>
        <Text style={[fontStyles.subtitle_1, { color: colors.red }]}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    zIndex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 32,
    paddingVertical: 64
  },
  closeMenu: {
    marginBottom: 24
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    marginBottom: 16
  },
  menuList: {
    gap: 16,
    marginBottom: 80
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  itemNameIcon: {
    flexDirection: 'row',
    gap: 8
  },
  lineDivision: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grey
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  }
});