import { StyleSheet, Pressable, View, Text, Image } from 'react-native';
import { Star } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';

export function ReducedPost({ post, navigation, originRoute, currentPagePost, currentPageBookmark }) {
  const { theme } = useTheme();

  function getTagColor(tag) {
    switch (tag) {
      case 'Perdido':
        return colors.red;
      case 'Desabrigado':
        return colors.orange;
      case 'Resgatado':
        return colors.blue;
      case 'Encontrado':
        return colors.green;
      default:
        return colors.dark;
    }
  }

  return (
    <Pressable onPress={() =>
      navigation.navigate('PostView', {
        post,
        originRoute: originRoute,
        profileState: {
          currentPagePost,
          currentPageBookmark,
        },
      }
    )}>
      {({ pressed }) => (
        <View
          style={[
            styles.postContainer, {
              backgroundColor: theme.post,
              borderWidth: theme.name === 'dark' ? 1 : 0,
              borderColor: theme.name === 'dark' ? colors.white : 'transparent',
            }
          ]}
        >
          <View style={styles.header}>
            <View style={styles.userData}>
              <Image
                style={[styles.profilePicture, {
                  borderWidth: theme.name === 'dark' ? 1 : 0,
                  borderColor: theme.name === 'dark' ? colors.white : 'transparent'
                }]}
                source={post.userProfilePicture}
              />
              <View>
                <Text style={[fontStyles.smallTitle_2, { color: theme.primaryText }]}>{post.userUsername}</Text>
                <Text style={[fontStyles.smallSubtitle_1, { color: theme.primaryText }]}>{post.timestamp}</Text>
              </View>
            </View>
          </View>
          
          <View>
            <Image source={post.imageUrl} style={styles.petImage}/>
            {post.type === 'Pet' ? (
              <View style={styles.mainContent}>
                <View style={styles.nameTag}>
                  <Text style={[styles.name, { color: theme.primaryText }]}>{post.name}</Text>
                  <View style={styles.tag}>
                    <Text style={[fontStyles.smallTitle_2, { color: getTagColor(post.status) }]}>
                      {post.status}
                    </Text>
                    <Star size={12} color={colors.disabled}/>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.mainContent}>
                <View style={styles.nameTag}>
                  <Text style={[styles.name, { color: theme.primaryText }]}>{post.name}</Text>
                </View>
              </View>
            )}
          </View>

          {pressed && (<View pointerEvents='none' style={styles.overlay}/>)}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 6.42
  },
  postContainer: {
    width: 180,
    borderRadius: 6.42,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    paddingHorizontal: 8.6
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6.6
  },
  profilePicture: {
    width: 27.85,
    height: 27.85,
    borderRadius: 50
  },
  petImage: {
    width: 180,
    height: 132
  },
  mainContent: {
    paddingHorizontal: 8
  },
  nameTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8.6,
    marginBottom: 6.42,
  },
  name: {
    flex: 1,
    flexWrap: 'wrap',
    ...fontStyles.smallTitle_1
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 1.6,
    gap: 4
  }
});