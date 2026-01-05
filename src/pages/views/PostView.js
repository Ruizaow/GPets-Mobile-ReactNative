import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { EllipsisVertical, SendHorizontal, MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { KebabMenu } from '@components/kebabMenu';
import { Modal } from '@components/modal';
import { Post } from '@components/post';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function PostView({ route, navigation }) {
  const { post } = route.params;
  const { theme } = useTheme();

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;
  
  const [inputValue, setInputValue] = useState('');
  const [comments, setComments] = useState(post.comments);
  const [kebabMenu, setKebabMenu] = useState(null);
  const [modal, setModal] = useState(false);

  const date = new Date();
  date.setHours(date.getHours() - 3);

  const formattedTimestamp = `${date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })} - ${date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;

  function handleCreateComment() {
    if (!inputValue.trim())
      return;

    const newComment = {
      id: Date.now().toString(), // substituir futuramente por valor real de id do backend
      userUsername: 'Usuário Logado',
      timestamp: formattedTimestamp,
      comment: inputValue,
      isOwner: true
    };
    setComments(prev => [...prev, newComment]);
    setInputValue('');
  }
  function handleDeleteComment(commentId) {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  }

  function openKebabMenu(type, payload) {
    setKebabMenu({ type, payload });
  }
  function openModal(commentId) {
    setModal(commentId);
  }

  return (
    <View style={[styles.postView, { backgroundColor: theme.background }]}>
      <GoBackHeader headerTitle={'Publicação'} onPress={() => navigation.navigate('Home')}/>
      
      <ScrollView>
        <View style={styles.postWrapper}>
          <Post
            post={post}
            onOpenMenu={() => openKebabMenu('post', post)}
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
                  <TouchableOpacity style={styles.sendIcon} onPress={handleCreateComment}>
                    <View style={styles.sendBackground}>
                      <SendHorizontal size={24} color={colors.beige}/>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.commentsSection}>
                  {Object.entries(comments).map(([key, comment], index, array) => (
                    <View key={key}>
                      <View style={styles.comment}>
                        <View style={styles.messageCircleBackground}>
                          <MessageCircle size={24} color={colors.white}/>
                        </View>
                        <View style={styles.commentData}>
                          <View style={styles.commentTextArea}>
                            <Text style={[fontStyles.commentUsername, { color: theme.primaryText }]}>{comment.userUsername}</Text>
                            <Text style={[fontStyles.commentTimestamp, { color: theme.primaryText }]}>{comment.timestamp}</Text>
                            <Text style={[fontStyles.commentContent, { color: theme.primaryText }]}>{comment.comment}</Text>
                          </View>
                          <TouchableOpacity style={styles.commentMenuKebab} onPress={() => openKebabMenu('comment', comment)}>
                            <EllipsisVertical size={28} color={theme.primaryText}/>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {index !== array.length - 1 && (
                        <View style={styles.lineDivision}/>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            }
          />
        </View>
      </ScrollView>
      
      {Boolean(kebabMenu) && (
        <KebabMenu
          type={kebabMenu.type}
          data={kebabMenu.payload}
          onClose={() => setKebabMenu(null)}
          onDelete={openModal}
        />
      )}
      {Boolean(modal) && (
        <Modal
          text={`Deseja excluir este comentário?`}
          confirmButton={`Sim, excluir`}
          onClose={() => setModal(null)}
          onConfirm={() => handleDeleteComment(modal)}
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
  commentInput: {
    width: 311,
    height: 58,
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 76,
    ...fontStyles.inputText
  },
  inputBackground: {
    position: 'absolute',
    width: 311,
    height: 58,
    backgroundColor: colors.black,
    borderRadius: 16,
    marginTop: 4.6,
  },
  sendBackground: {
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 34,
    borderRadius: 100,
  },
  sendIcon: {
    position: 'absolute',
    right: 16
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
  messageCircleBackground: {
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: '50%'
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