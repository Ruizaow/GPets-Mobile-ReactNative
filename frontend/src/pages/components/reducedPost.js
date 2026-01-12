import { StyleSheet, Pressable, View } from 'react-native';
import { sizes } from '@constants/postPropertiesSizes';
import { useTheme } from '@context/ThemeContext';
import { PostBase } from '@components/postBase';
import { colors } from '@styles/colors.js';

export function ReducedPost({ post, navigation, scale=1, isPressable=true, isOnProfile=false, originRoute, currentPagePost, currentPageBookmark }) {
  const { theme } = useTheme();
  const s = scale;

  return (
    <Pressable
      onPress={() => navigation.navigate('PostView', {
        post,
        originRoute: originRoute,
        profileState: { currentPagePost, currentPageBookmark }
      })}
      disabled={!isPressable}
    >
      {({ pressed }) => (
        <View style={[
          styles.postContainer, {
            backgroundColor: theme.post,
            borderWidth: theme.name === 'dark' ? 1 : 0,
            borderColor: theme.name === 'dark' ? colors.white : 'transparent',
            width: sizes.containerWidth*s,
            borderRadius: sizes.containerB_Radius*s
          }
        ]}>
          <PostBase
            post={post}
            navigation={navigation}
            scale={scale}
            isOnProfile={isOnProfile}
            isReduced={true}
          />
          {pressed && (<View pointerEvents='none' style={[
            styles.overlay, {
              borderRadius: sizes.overlayB_Radius*s
            }]}
          />)}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    overflow: 'hidden'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  }
});