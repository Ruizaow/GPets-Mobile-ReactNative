import { StyleSheet, Image, View } from 'react-native';
import { UserRound } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';
import { getIconSize } from '@utils/profilePicture';

export function ProfilePicture({ loadedUser, size=52 }) {
  const { theme } = useTheme();
  const iconSize = getIconSize(size);
  
  return (
    <View>
      {loadedUser?.imageUrl ? (
        loadedUser.role === 'ORGANIZATION' ? (
          <Image
            source={{ uri: loadedUser.imageUrl }}
            style={[{
              width: size,
              height: size,
              borderRadius: 100,
              borderWidth: theme.name === 'dark' ? 1 : 0,
              borderColor: theme.name === 'dark' ? colors.white : 'transparent',
            }]}
          />
          ) : (
            <Image
              source={loadedUser.imageUrl}
              style={[{
                width: size,
                height: size,
                borderRadius: 100,
                borderWidth: theme.name === 'dark' ? 1 : 0,
                borderColor: theme.name === 'dark' ? colors.white : 'transparent',
              }]}
            />
          )
      ) : (
        <View
          style={[styles.iconFallback, {
            width: size,
            height: size,
            borderRadius: 100,
            backgroundColor: theme.name === 'dark' ? '#A6A6A6' : '#D9D9D9',
          }]}
        >
          <UserRound size={iconSize} color={theme.primaryText} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconFallback: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});