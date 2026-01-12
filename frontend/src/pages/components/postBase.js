import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { EllipsisVertical, Star } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { sizes } from '@constants/postPropertiesSizes';
import { useTheme } from '@context/ThemeContext';
import { usePosts } from '@context/PostsContext';
import { ProfilePicture } from '@components/profilePicture';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { getUser } from '@services/getUser';
import { savePost, unsavePost } from '@services/bookmarkPost';
import { handleToggleBookmark } from '@handlers/handleToggleBookmark';

export function PostBase({ post, navigation, scale=1, onOpenMenu, isOnPostForm=false, canBookmark=false, isReduced=false }) {
  const { theme } = useTheme();
  const { user, loading } = getUser(post.userId);
  const { updatePostSaved } = usePosts();

  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    setIsSaved(!!post.isSaved);
  }, [post.isSaved]);

  const hasOwnerTag = post.isOwner !== null;
  const s = scale;

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

  if (loading) return null;

  return (
    <>
      <View style={[styles.header, {
        height: sizes.headerHeight * s,
        paddingHorizontal: sizes.headerP_Horizontal * s
      }]}>
        <View style={[styles.userData, {
          gap: sizes.userDataGap * s
        }]}>
          <TouchableOpacity disabled={isOnPostForm} onPress={() => navigation.navigate('Profile', { user })}>
            <ProfilePicture loadedUser={user} size={sizes.profileP_Size * s}/>
          </TouchableOpacity>
          <View style={hasOwnerTag && { marginTop: sizes.ownerTagMT_1 * s }}>
            <Text style={[fontStyles.postTitle, {
              color: theme.primaryText,
              fontSize: sizes.postTitle * s
            }]}>
              {user.name}
            </Text>
            <Text style={[fontStyles.postSubtitle, {
              color: theme.primaryText,
              fontSize: sizes.postSubtitle * s },
              hasOwnerTag && { marginTop: sizes.ownerTagMT_2 * s },
            ]}>
              {post.timestamp}
            </Text>
            {hasOwnerTag && !isReduced && (
              <View style={[styles.ownerTag,
                post.isOwner
                  ? { width: sizes.ownerTagWidth_1 * s }
                  : { width: sizes.ownerTagWidth_2 * s },
                { marginTop: sizes.ownerTagMT_3 * s }
              ]}>
                <Text style={[fontStyles.smallSubtitle_2, {
                  fontSize: sizes.smallSubtitle2 * s
                }]}>
                  {post.isOwner ? 'Tutor' : 'Conhecido'}
                </Text>
              </View>
            )}
          </View>
        </View>
        {!isReduced && (
          isOnPostForm ? (
            <EllipsisVertical size={sizes.ellipsisVertical * s} color={colors.disabled} />
          ) : (
            <TouchableOpacity onPress={onOpenMenu}>
              <EllipsisVertical size={sizes.ellipsisVertical * s} color={theme.primaryText} />
            </TouchableOpacity>
          )
        )}
      </View>

      <View>
        <Image source={{ uri: post.imageUrl }} style={{
          width: sizes.petImageWidth * s,
          height: sizes.petImageHeight * s
        }}/>

        <View style={{ paddingHorizontal: sizes.mainContentPH * s }}>
          <View style={[styles.nameTag,
            { marginTop: sizes.nameTagMT_1 * s },
            !isReduced
              ? { marginBottom: sizes.nameTagMB_1 * s }
              : { marginBottom: sizes.nameTagMB_2 * s, marginTop: sizes.nameTagMT_2 * s }
          ]}>
            <Text style={[styles.name, {
              color: theme.primaryText,
              fontSize: sizes.title2 * s
            }]}>
              {post.name}
            </Text>
            {post.type === 'Pet' &&
              <View style={[styles.tag, {
                gap: sizes.tagGap * s
              }]}>
                <Text style={[fontStyles.postTag,
                  { color: getTagColor(post.status) },
                  { fontSize: sizes.postTag * s }
                ]}>
                  {post.status}
                </Text>
                {(!isReduced || (isReduced && canBookmark)) && (
                  <TouchableOpacity onPress={() => 
                    handleToggleBookmark(post, isSaved, setIsSaved, loadingSave, setLoadingSave, savePost, unsavePost, updatePostSaved)
                  }>
                    <Star
                      size={sizes.star * s}
                      color={isSaved ? colors.yellow : colors.grey}
                      fill={isSaved ? colors.yellow : 'transparent'}
                    />
                  </TouchableOpacity>
                )}
              </View>
            }
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ownerTag: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 100
  },
  nameTag: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    flex: 1,
    flexWrap: 'wrap',
    ...fontStyles.title_2,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0
  }
});