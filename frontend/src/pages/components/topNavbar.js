import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { Menu, Search, Bell } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { ProfilePicture } from '@components/profilePicture';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useRequireAuth } from '@hooks/useRequireAuth';

export function TopNavbar({ navigation, onOpenSidebar, isMenuDisabled, loadedUser, onOpenLoginModal }) {
  const { theme } = useTheme();
  const { requireAuth } = useRequireAuth(onOpenLoginModal);

  return (
    <View style={[styles.topNavContainer, { backgroundColor: theme.navBackground }]}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={onOpenSidebar} disabled={isMenuDisabled}>
          <Menu size={24} color={theme.primaryText}/>
        </TouchableOpacity>
        <View style={styles.searchbar}>
          <Search size={24} color={theme.navBackground}/>
          <Text style={[fontStyles.subtitle_1, { color: theme.navBackground }]}>Buscar</Text>
        </View>
        <TouchableOpacity onPress={() =>
          requireAuth(() => {
            navigation.navigate('Notifications')
          })
        }>
          <Bell size={24} color={theme.primaryText}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => 
          requireAuth(() => {
            navigation.navigate('Profile', { user: loadedUser })
          })
        }>
          <ProfilePicture loadedUser={loadedUser}/>
        </TouchableOpacity>
      </View>
      <View style={styles.lineDivision}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  topNavContainer: {
    height: 128,
    alignItems: 'center',
  },
  navbar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 32
  },
  searchbar: {
    width: 192,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
    backgroundColor: colors.disabled,
    borderRadius: 32
  },
  lineDivision: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 1,
    backgroundColor: colors.grey
  }
});