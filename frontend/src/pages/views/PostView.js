import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { EllipsisVertical, SendHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { usePosts } from '@context/PostsContext';
import { GoBackHeader } from '@components/goBackHeader';
import { KebabMenu } from '@components/kebabMenu';
import { Modal } from '@components/modal';
import { Post } from '@components/post';
import { ProfilePicture } from '@components/profilePicture';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { formattedTimestamp } from '@utils/timestampFormatting'
import { useFontsCustom } from '@hooks/useFontsCustom';
import { useRequireAuth } from '@hooks/useRequireAuth';
import { getComments } from '@services/getComments';
import { createComment } from '@services/createComment';
import { deletePost } from '@services/deletePost';
import { deleteComment } from '@services/deleteComment';

export default function PostView({ navigation, route }) {
  const { post } = route.params;
  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { removePost } = usePosts();

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const { comments, setComments, loading } = getComments(post.id);
  
  const [inputValue, setInputValue] = useState('');
  const [kebabMenu, setKebabMenu] = useState(null);
  const [deletePostModal, setDeletePostModal] = useState(null);
  const [deleteCommentModal, setDeleteCommentModal] = useState(null);
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);
  
  const { requireAuth } = useRequireAuth(() => setShowLoginRequiredModal(true));

  async function handleCreateComment() {
    if (!inputValue.trim()) return;

    const newComment = await createComment({
      content: inputValue,
      timestamp: formattedTimestamp,
      postId: post.id,
      userId: user.id
    });

    if (newComment) {
      setComments(prev => [...prev, newComment]);
      setInputValue('');
    }
  }

  function handleOpenModal(type, dataId) {
    if (type === 'post')
      setDeletePostModal(dataId);
    else
      setDeleteCommentModal(dataId)
  }

  async function handleDeletePost(postId) {
    if (!postId) return;
    await deletePost(postId, () => {
      removePost(postId);
      setDeletePostModal(null);
      navigation.goBack();
    });
  }
  async function handleDeleteComment(commentId) {
    if (!commentId) return;
    await deleteComment(commentId);
    setComments(prev => prev.filter(c => c.id !== commentId));
    setDeleteCommentModal(null);
  }

  function openKebabMenu(type, data) {
    setKebabMenu({ type, data });
  }

  if (loading) return null;

  return (
    <View style={[styles.postView, { backgroundColor: theme.background }]}>
      <GoBackHeader headerTitle={'Publicação'} onPress={() => navigation.goBack()}/>
      
      <ScrollView>
        <View style={styles.postWrapper}>
          <Post
            post={post}
            loadedUser={user}
            navigation={navigation}
            onOpenMenu={() => openKebabMenu('post', post)}
            onOpenLoginModal={() => setShowLoginRequiredModal(true)}
            onGoToMap={() => navigation.navigate('Home', {
              openMapView: true,
              postMarker: post
            })}
            footer={
              <View style={styles.commentInputWrapper}>
                <View style={styles.commentInputSection}>
                  <View style={styles.inputBackground}/>
                  <TextInput
                    style={[styles.commentInput, { backgroundColor: theme.commentInput }]}
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder={'Escreva seu comentário'}
                  />
                  <TouchableOpacity style={styles.sendIcon} onPress={() =>
                    requireAuth(() => {
                      handleCreateComment()
                    })
                  }>
                    <View style={[styles.sendBackground,
                      isAuthenticated
                        ? { backgroundColor: colors.blue }
                        : { backgroundColor: colors.green }
                    ]}>
                      <SendHorizontal size={24} color={theme.iconBackground}/>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.commentsSection}>
                  {comments.map((comment, index) => {
                    return (
                      <View key={index}>
                        <View style={styles.comment}>
                          <TouchableOpacity onPress={() => navigation.navigate('Profile', { user: comment.user })}>
                            <ProfilePicture loadedUser={comment.user} size={44}/>
                          </TouchableOpacity>
                          <View style={styles.commentData}>
                            <View style={styles.commentTextArea}>
                              <Text style={[fontStyles.commentUsername, { color: theme.primaryText }]}>
                                {comment.user.name}
                              </Text>
                              <Text style={[fontStyles.commentTimestamp, { color: theme.primaryText }]}>
                                {comment.timestamp}
                              </Text>
                              <Text style={[fontStyles.commentContent, { color: theme.primaryText }]}>
                                {comment.content}
                              </Text>
                            </View>
                            <TouchableOpacity style={styles.commentMenuKebab} onPress={() => openKebabMenu('comment', comment)}>
                              <EllipsisVertical size={28} color={theme.primaryText}/>
                            </TouchableOpacity>
                          </View>
                        </View>
                        {index !== comments.length - 1 && (
                          <View style={styles.lineDivision}/>
                        )}
                      </View>
                    )
                  })}
                </View>
              </View>
            }
          />
        </View>
      </ScrollView>
      
      {Boolean(kebabMenu) && (
        <KebabMenu
          type={kebabMenu.type}
          data={kebabMenu.data}
          onClose={() => setKebabMenu(null)}
          onDelete={() => handleOpenModal(kebabMenu.type, kebabMenu.data.id)}
          canDelete={
            kebabMenu.type === 'post'
              ? kebabMenu.data.userId === user?.id
              : kebabMenu.data.user?.id === user?.id
          }
          onOpenLoginModal={() => setShowLoginRequiredModal(true)}
        />
      )}
      {Boolean(deletePostModal) && (
        <Modal
          text={`Deseja excluir esta publicação?`}
          confirmButton={`Sim, excluir`}
          onClose={() => setDeletePostModal(null)}
          onConfirm={() => handleDeletePost(deletePostModal)}
        />
      )}
      {Boolean(deleteCommentModal) && (
        <Modal
          text={`Deseja excluir este comentário?`}
          confirmButton={`Sim, excluir`}
          onClose={() => setDeleteCommentModal(null)}
          onConfirm={() => handleDeleteComment(deleteCommentModal)}
        />
      )}
      {showLoginRequiredModal && (
        <Modal
          text={`Login necessário!`}
          subtext={`Para acessar essa e outras funções do App, você precisará realizar o login.`}
          confirmButton={`Login`}
          onClose={() => setShowLoginRequiredModal(false)}
          onConfirm={() => {
            setShowLoginRequiredModal(false);
            navigation.navigate('Auth');
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postView: {
    flex: 1
  },
  postWrapper: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 64
  },
  commentInputWrapper: {
    alignItems: 'center',
  },
  commentInputSection: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputBackground: {
    position: 'absolute',
    width: 311,
    height: 58,
    backgroundColor: colors.black,
    borderRadius: 16,
    marginTop: 4.6,
  },
  commentInput: {
    width: 311,
    height: 58,
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 76,
    zIndex: 1,
    ...fontStyles.inputText
  },
  sendIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 2
  },
  sendBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 34,
    borderRadius: 100,
  },
  commentsSection: {
    width: 343,
    gap: 12,
    marginBottom: 12
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 10
  },
  commentData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  commentTextArea: {
    marginTop: -4
  },
  commentMenuKebab: {
    position: 'absolute',
    right: 0
  },
  lineDivision: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grey,
  },
});