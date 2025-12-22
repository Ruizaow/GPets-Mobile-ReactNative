import { StyleSheet, View, ScrollView, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { EllipsisVertical, Star, SendHorizontal, MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { KebabMenu } from '@components/kebabMenu';
import { Button } from '@components/button';
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

  const date = new Date();
  date.setHours(date.getHours() - 3);

  const formattedTimestamp = `${date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
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
  function closeKebabMenu() {
    setKebabMenu(null);
  }

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
    <View style={[styles.postView, { backgroundColor: theme.background }]}>
      <GoBackHeader headerTitle={'Publicação'} onPress={() => navigation.navigate('Home')}/>
      <ScrollView>
        <View style={styles.postWrapper}>
          <View style={[styles.postContainer, { 
            backgroundColor: theme.post,
            borderWidth: theme.name === 'dark' ? 1 : 0,
            borderColor: theme.name === 'dark' ? colors.white : 'transparent'
          }]}>
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
                  <Text style={[fontStyles.postTitle, { color: theme.primaryText }]}>{post.userUsername}</Text>
                  <Text style={[fontStyles.postSubtitle, { color: theme.primaryText }]}>{post.timestamp}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => openKebabMenu('post', post)}>
                <EllipsisVertical size={28} color={theme.primaryText}/>
              </TouchableOpacity>
            </View>
            <View>
              <Image source={post.imageUrl} style={styles.petImage}/>
              <View style={styles.nameTag}>
                <Text style={[fontStyles.title_2, { color: theme.primaryText }]}>{post.name}</Text>
                <View style={styles.tag}>
                  <Text style={[fontStyles.postTag, { color: getTagColor(post.tag) }]}>
                    {post.tag}
                  </Text>
                  <Star size={24} color={colors.disabled}/>
                </View>
              </View>
              <Text style={[styles.lastSeen, { color: theme.primaryText }]}>Última vez visto(a): {post.lastSeen}</Text>
              <View style={styles.infoChips}>
                <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.sex}</Text></View>
                <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.breed}</Text></View>
                <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.temper}</Text></View>
                <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>Tutor: {post.owner}</Text></View>
                <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.phoneContact}</Text></View>
              </View>
              <Text style={[styles.description, { color: theme.primaryText }, { marginBottom: theme.name === 'dark' ? 4 : 24 }]}>
                {post.description}
              </Text>
              <View style={styles.buttonSection}>
                <Button text='Ir para mapa' variant='goToMap' size={'small'}/>
                <Button text='Resgatado' variant='blue' size={'small'}/>
              </View>
            </View>
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
          </View>
        </View>
      </ScrollView>
      {Boolean(kebabMenu) && (
        <KebabMenu
          type={kebabMenu.type}
          data={kebabMenu.payload}
          onClose={closeKebabMenu}
          onDelete={handleDeleteComment}
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
  postContainer: {
    width: 343,
    borderRadius: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.darkGreyAlt
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
  petImage: {
    width: 343,
    height: 250
  },
  nameTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 2,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 8
  },
  lastSeen: {
    paddingHorizontal: 16,
    marginBottom: 8,
    ...fontStyles.postSubtitle
  },
  infoChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
    ...fontStyles.postDescription
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
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