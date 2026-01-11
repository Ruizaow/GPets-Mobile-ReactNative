import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { EllipsisVertical, Star } from 'lucide-react-native';
import { sizes } from '@constants/postPropertiesSizes';
import { useTheme } from '@context/ThemeContext';
import { ProfilePicture } from '@components/profilePicture';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { getUser } from '@services/getUser';

export function PostBase({ post, navigation, scale=1, onOpenMenu, isOnPostForm=false, isReduced=false }) {
  const { theme } = useTheme();
  const hasOwnerTag = post.isOwner !== null;
  const s = scale;

  const { user, loading } = getUser(post.userId);

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
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { user })}>
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
                  !isReduced
                    ? { fontSize: sizes.postTag * s }
                    : { fontSize: sizes.title3 * s }
                ]}>
                  {post.status}
                </Text>
                {!isReduced &&
                  <Star size={sizes.star * s} color={colors.disabled} />
                }
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