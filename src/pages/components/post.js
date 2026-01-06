import { StyleSheet, Pressable, View, Text, Image, TouchableOpacity } from 'react-native';
import { EllipsisVertical, Star } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';

export function Post({ post, navigation, onOpenMenu, onPressButton, isOnPostForm=false, footer=null }) {
  const { theme } = useTheme();

  const hasOwnerTag = post.isOwner !== null

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
    <Pressable
      onPress={() => navigation.navigate('PostView', { post, originRoute: 'Home' })}
      disabled={isOnPostForm || Boolean(footer)}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.postContainer, {
              backgroundColor: theme.post,
              borderWidth: theme.name === 'dark' ? 1 : 0,
              borderColor: theme.name === 'dark' ? colors.white : 'transparent',
            },
            footer && {
              borderBottomWidth: 2,
              borderBottomColor: colors.darkGreyAlt
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
              <View style={hasOwnerTag && { marginTop: -5 }}>
                <Text style={[fontStyles.postTitle, { color: theme.primaryText }]}>{post.userUsername}</Text>
                <Text style={[
                  fontStyles.postSubtitle, { color: theme.primaryText },
                  hasOwnerTag && { marginTop: -2 }
                ]}>
                  {post.timestamp}
                </Text>
                {hasOwnerTag &&
                  <View style={[
                    styles.ownerTag,
                    post.isOwner ? { width: 56 } : { width: 84 }
                  ]}>
                    <Text style={fontStyles.smallSubtitle_2}>
                      {post.isOwner ? 'Tutor' : 'Conhecido'}
                    </Text>
                  </View>
                }
              </View>
            </View>
            {isOnPostForm ? (
              <View>
                <EllipsisVertical size={28} color={colors.disabled}/>
              </View>
            ) : (
              <TouchableOpacity onPress={onOpenMenu}>
                <EllipsisVertical size={28} color={theme.primaryText}/>
              </TouchableOpacity>
            )}
          </View>
          
          <View>
            <Image source={post.imageUrl} style={styles.petImage}/>
            {post.type === 'Pet' ? (
              <View style={styles.mainContent}>
                <View style={styles.nameTag}>
                  <Text style={[styles.name, { color: theme.primaryText }]}>{post.name}</Text>
                  <View style={styles.tag}>
                    <Text style={[fontStyles.postTag, { color: getTagColor(post.tag) }]}>
                      {post.tag}
                    </Text>
                    <Star size={24} color={colors.disabled}/>
                  </View>
                </View>
                <Text style={[styles.date, { color: theme.primaryText }]}>Última vez visto(a): {post.date}</Text>
                <View style={styles.infoChips}>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.sex || 'Sexo desconhecido'}</Text></View>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.breed}</Text></View>
                  {post.temper &&
                    <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.temper}</Text></View>
                  }
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.owner !== 'Não possui' ? 'Tutor: ' + post.owner : 'Sem tutor'}</Text></View>
                  {post.phoneContact !== 'Não possui' &&
                    <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.phoneContact}</Text></View>
                  }
                </View>
                <Text numberOfLines={footer ? undefined : 3}
                  style={[
                    styles.description,
                    { color: theme.primaryText },
                    footer
                      ? {marginBottom: theme.name === 'dark' ? 0 : 20}
                      : {marginBottom: 20}
                  ]}
                >
                  {post.description}
                </Text>
                <View style={styles.buttonSection}>
                  {isOnPostForm ? (
                    <>
                      <Button text='Localização informada' variant='goToMap' size={'custom'} onPress={onPressButton}/>
                    </>
                  ) : (
                    <>
                      <Button text='Ir para mapa' variant='goToMap' size={'small'}/>
                      <Button text='Resgatado' variant='blue' size={'small'}/>
                    </>
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.mainContent}>
                <View style={styles.nameTag}>
                  <Text style={[styles.name, { color: theme.primaryText, marginBottom: 8 }]}>{post.name}</Text>
                </View>
                <View style={styles.infoChips}>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{'Data do evento: ' + post.date}</Text></View>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{'Endereço: ' + post.address}</Text></View>
                  {post.phoneContact !== 'Não possui' &&
                    <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{'Contato: ' + post.phoneContact}</Text></View>
                  }
                </View>
                <Text numberOfLines={footer ? undefined : 3}
                  style={[
                    styles.description,
                    { color: theme.primaryText, marginBottom: 24 }
                  ]}
                >
                  {post.description}
                </Text>
              </View>
            )}
          </View>

          {footer}

          {pressed && (<View pointerEvents="none" style={styles.overlay}/>)}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: 343,
    borderRadius: 16,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 84,
    paddingHorizontal: 16
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  profilePicture: {
    width: 52,
    height: 52,
    borderRadius: 50
  },
  ownerTag: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 100,
    marginTop: 4
  },
  petImage: {
    width: 343,
    height: 250
  },
  mainContent: {
    paddingHorizontal: 16
  },
  nameTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 2,
  },
  name: {
    flex: 1,
    flexWrap: 'wrap',
    ...fontStyles.title_2
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 3,
    gap: 8
  },
  date: {
    marginBottom: 8,
    ...fontStyles.postSubtitle
  },
  infoChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 6
  },
  chip: {
    backgroundColor: colors.dark,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 16
  },
  description: {
    ...fontStyles.postDescription
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 16
  }
});