import { StyleSheet, Pressable, View } from 'react-native';
import { sizes } from '@constants/postPropertiesSizes';
import { useTheme } from '@context/ThemeContext';
import { PostBase } from '@components/postBase';
import { colors } from '@styles/colors.js';
import { useRequireAuth } from '@hooks/useRequireAuth';

export function ReducedPost({
  post, navigation, scale=1, isPressable=true, canBookmark=false,
  onOpenLoginModal, currentPagePost, currentPageBookmark
}) {
  const { theme } = useTheme();
  const { requireAuth } = useRequireAuth(onOpenLoginModal);
  const s = scale;

  return (
    <Pressable
      onPress={() => navigation.navigate('PostView', {
        post,
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
            postStatus={post.status}
            navigation={navigation}
            requireAuth={requireAuth}
            scale={scale}
            canBookmark={canBookmark}
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