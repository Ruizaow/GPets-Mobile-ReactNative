import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { House, CirclePlus, MapPin } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';

export function BottomNavbar({ onGoTo, currentView }) {
  const { theme } = useTheme();

  const navItems = {
    Feed: House,
    SelectPost: CirclePlus,
    MapView: MapPin,
  };

  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNavbar}>
        {Object.entries(navItems).map(([key, Item]) => {
          const isSelected = currentView === key;
          return (
            <TouchableOpacity
              key={key}
              style={styles.navItem}
              onPress={() => onGoTo(key)}
            >
              {isSelected &&
                <View style={[styles.iconBackground, { backgroundColor: theme.iconBackground }]}/>
              }
              <View style={styles.icon}>
                <Item size={24} color={isSelected ? colors.dark : theme.iconBackground}/>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 52,
    pointerEvents: 'box-none'
  },
  bottomNavbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue,
    paddingHorizontal: 24,
    borderRadius: 64,
    width: 252,
    height: 72,
    gap: 16,
    pointerEvents: 'auto'
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBackground: {
    position: 'absolute',
    borderRadius: '50%',
    width: 48,
    height: 48,
  },
  icon: {
    zIndex: 1
  }
});