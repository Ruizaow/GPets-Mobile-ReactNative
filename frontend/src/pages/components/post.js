import { StyleSheet, Pressable, View, Text, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { usePosts } from '@context/PostsContext';
import { useAuth } from '@context/AuthContext';
import { PostBase } from '@components/postBase';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useRequireAuth } from '@hooks/useRequireAuth';
import { updatePost } from '@services/updatePost';
import { getStatusColor } from '@utils/getStatusColor';

const POST_BASE_HEIGHT = 374;

export function Post({
  post, loadedUser, navigation, onOpenMenu, onOpenRescueModal, onOpenLoginModal,
  onOpenMapModal, onGoToMap, isOnPostForm=false, footer=null
}) {
  const { theme } = useTheme();
  const { updatePostStatus } = usePosts();
  const { isAuthenticated } = useAuth();
  const { requireAuth } = useRequireAuth(onOpenLoginModal);

  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1, duration: 100, useNativeDriver: true,
    }).start();
  }, []);

  const [postStatus, setPostStatus] = useState(post.status);
  const isOwner = Boolean(loadedUser?.id && post.userId === loadedUser.id);
  const isRescued = postStatus === 'Resgatado';

  function handleRescue() {
    if (!isOwner || isRescued) return;
    onOpenRescueModal({
      text: (
        <Text style={{ textAlign: 'center' }}>
          Deseja alterar o status{' '}
          <Text style={{ color: getStatusColor(postStatus) }}>
            {postStatus}
          </Text>{' '}
          do animal desta publicação para{' '}
          <Text style={{ color: colors.blue }}>
            Resgatado
          </Text>
          ?
        </Text>
      ),
      confirmButton: 'Sim, alterar',
      onConfirm: async () => {
        const updatedPost = await updatePost(post.id, 'Resgatado');
        setPostStatus(updatedPost.status);
        updatePostStatus(post.id, updatedPost.status);
      }
    });
  }
  
  function handleGoToPrivateChat() {
    requireAuth(() => {
      navigation.navigate('Messages', {
        openPrivateChatAlt: true,
        postOwnerId: post.userId,
        postImageUri: post.imageUrl
      });
    });
  }

  return (
    <Pressable
      onPress={() => navigation.navigate('PostView', { post })}
      disabled={isOnPostForm || Boolean(footer)}
    >
      {({ pressed }) => (
        <View style={[
          styles.postContainer, {
            backgroundColor: theme.post,
            borderWidth: theme.name === 'dark' ? 1 : 0,
            borderColor: theme.name === 'dark' ? colors.white : 'transparent',
          },
          footer && {
            borderBottomWidth: 2,
            borderBottomColor: colors.darkGreyAlt
          }
        ]}>
          <Animated.View style={{ minHeight: POST_BASE_HEIGHT, opacity }}>
            <PostBase
              post={post}
              postStatus={postStatus}
              navigation={navigation}
              requireAuth={requireAuth}
              onOpenMenu={onOpenMenu}
              isOnPostForm={isOnPostForm}
            />
          </Animated.View>
          <View style={styles.mainContent}>
            {post.type === 'Pet' ? (
              <>
                <Text style={[styles.date, { color: theme.primaryText }]}>Última vez visto(a): {post.date}</Text>
                <View style={styles.infoChips}>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.sex || 'Sexo desconhecido'}</Text></View>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.breed}</Text></View>
                  {post.temper &&
                    <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.temper}</Text></View>
                  }
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.owner !== 'Não possui' ? 'Tutor: ' + post.owner : 'Sem tutor'}</Text></View>
                  {post.phone !== 'Não possui' &&
                    <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.phone}</Text></View>
                  }
                </View>
                <Text numberOfLines={footer ? undefined : 3}
                  style={[
                    styles.description,
                    { color: theme.primaryText },
                    footer
                      ? {marginBottom: theme.name === 'dark' ? 20 : 20}
                      : {marginBottom: 20}
                  ]}
                >
                  {post.description}
                </Text>
                <View style={styles.buttonSection}>
                  {isOnPostForm ? (
                    <Button
                      text='Localização informada'
                      textColor={theme.stateButtonText}
                      bgColor={theme.stateButton}
                      borderColor={theme.postPetButtonBorder}
                      height={48}
                      onPress={onOpenMapModal}
                    />
                  ) : (
                    <>
                      <Button
                        text='Ir para mapa'
                        textColor={isAuthenticated
                          ? theme.stateButtonText
                          : theme.stateButtonText_
                        }
                        bgColor={isAuthenticated
                          ? theme.stateButton
                          : theme.stateButton_
                        }
                        borderColor={isAuthenticated
                          ? theme.postPetButtonBorder
                          : theme.postPetButtonBorder_
                        }
                        width={149}
                        height={48}
                        onPress={() => onGoToMap?.(post)}
                      />
                      <Button
                        text='Resgatado'
                        textColor={isAuthenticated
                          ? colors.white
                          : theme.post
                        }
                        bgColor={!isRescued
                          ? isAuthenticated
                            ? colors.blue
                            : colors.green
                          : colors.disabled
                        }
                        width={149}
                        height={48}
                        onPress={() =>
                          requireAuth(() => {
                            isOwner ? handleRescue() : handleGoToPrivateChat()
                          })
                        }
                        isDisabled={isRescued}
                      />
                    </>
                  )}
                </View>
              </>
            ) : (
              <>
                <View style={styles.infoChips}>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{'Data do evento: ' + post.date}</Text></View>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{'Endereço: ' + post.address}</Text></View>
                  {post.phone !== 'Não possui' &&
                    <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{'Contato: ' + post.phone}</Text></View>
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
              </>
            )}
          </View>

          {footer}

          {pressed && (<View pointerEvents='none' style={styles.overlay}/>)}
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
  mainContent: {
    paddingHorizontal: 16
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