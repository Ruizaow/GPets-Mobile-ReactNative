import { StyleSheet, View, ScrollView, Text, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { ArrowLeft, Image as ImageIcon, Camera, SendHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { ProfilePicture } from '@components/profilePicture';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { getUser } from '@services/getUser';

export default function PrivateChatAlt({ navigation, onBack, postOwnerId, postImage }) {
  const { theme } = useTheme();
  const { user: loadedUser } = useAuth();
  const fontsLoaded = useFontsCustom();

  const { user, loading } = getUser(postOwnerId);

  const messageData = { user, messages: [] };
  const [sendRescueMessage, setSendRescueMessage] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  if (loading || !user || !fontsLoaded) return null;

  const date = new Date();
  date.setHours(date.getHours() - 3);

  function handleSendMessage() {
    if (!inputValue.trim()) return;
    const newMessage = {
      content: inputValue,
      timestamp: date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOwner: true
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  }

  function handleSendRescueMessage() {
    const rescueMessage = {
      type: 'rescue',
      postImage,
      rescuedBy: loadedUser.name,
      timestamp: date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOwner: true
    };
    setMessages(prev => [...prev, rescueMessage]);
    setSendRescueMessage(false);
  }

  return (
    <View style={[styles.privateChat, { backgroundColor: theme.background }]}>

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBack}>
            <ArrowLeft size={24} color={theme.primaryText}/>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { user: messageData.user })}>
              <ProfilePicture loadedUser={messageData.user}/>
            </TouchableOpacity>
            <View>
              <Text style={[styles.username, { color: theme.primaryText }]}>{messageData.user.name}</Text>
              <Text style={[fontStyles.postSubtitle, { color: theme.primaryText }]}>Visto por último - 09:10</Text>
            </View>
          </View>
        </View>
        <View style={styles.lineDivision}/>
      </View>
    
      <ScrollView>
        <View style={styles.messages}>
          {messages.map((message, index) => {
            if (message.type === 'rescue') {
              return (
                <View key={index} style={[styles.userRescueMessage, styles.userMessageFromOwner]}>
                  <View style={styles.URM_background}>
                    <Image source={{ uri: message.postImage }} style={styles.URM_image}/>
                    <View style={styles.URM_textColumn}>
                      <Text style={[fontStyles.postSubtitle, { color: colors.beige }]}>
                        Pet resgatado
                      </Text>
                      <Text style={[fontStyles.smallSubtitle_2, { color: colors.beige }]}>
                        {`Esse pet foi resgatado por ${message.rescuedBy}`}
                      </Text>
                    </View>
                  </View>
                  <Text style={fontStyles.commentTimestamp}>
                    {message.timestamp}
                  </Text>
                </View>
              );
            }
            return (
              <View key={index} style={[styles.userMessage, message.isOwner && styles.userMessageFromOwner]}>
                <Text style={styles.userMessageContent}>{message.content}</Text>
                <Text style={fontStyles.commentTimestamp}>{message.timestamp}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.lineDivisionInput}/>
      <View style={[styles.inputSection,
        sendRescueMessage
          ? { paddingBottom: 24 }
          : { paddingBottom: 52 }
      ]}>
        {sendRescueMessage ? (
          <View style={styles.sendRescueSection}>
            <View style={styles.sendRescueLine}>
              <View style={styles.sendRescueContent}>
                <Image source={{ uri: postImage }} style={styles.rescueImage}/>
                <View style={styles.rescueTextsColumn}>
                  <Text style={[fontStyles.postSubtitle, { color: colors.beige }]}>
                    {`Pet resgatado`}
                  </Text>
                  <Text style={[fontStyles.rescueMessageSubtitle, { color: colors.beige }]}>
                    {`Esse pet foi resgatado por ${loadedUser.name}`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleSendRescueMessage}>
                <View style={styles.sendBackground}>
                  <SendHorizontal size={24} color={colors.white}/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder='Mensagem'
              placeholderTextColor={colors.blue}
            />
            <View style={styles.inputIcons}>
              {inputValue.length > 0 ? (
                <TouchableOpacity onPress={handleSendMessage}>
                  <View style={styles.sendBackground}>
                    <SendHorizontal size={24} color={colors.white}/>
                  </View>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity disabled>
                    <ImageIcon size={24} color={colors.disabled}/>
                  </TouchableOpacity>
                  <TouchableOpacity disabled>
                    <Camera size={24} color={colors.disabled}/>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  privateChat: {
    flex: 1
  },
  header: {
    marginTop: 60,
    gap: 16
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  username: {
    lineHeight: 20,
    ...fontStyles.subtitle_1
  },
  lineDivision: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grey
  },
  messages: {
    marginTop: 16,
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16
  },
  userRescueMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    maxWidth: '100%',
    backgroundColor: colors.white,
    borderColor: colors.green,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 12,
    gap: 12,
  },
  URM_background: {
    backgroundColor: colors.blue,
    padding: 4,
    borderRadius: 8
  },
  URM_image: {
    width: 197,
    height: 152,
    marginBottom: 6
  },
  URM_textColumn: {
    marginBottom: 8
  },
  userMessage: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    maxWidth: '100%',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.green
  },
  userMessageFromOwner: {
    alignSelf: 'flex-end',
    borderColor: colors.blue,
  },
  userMessageContent: {
    flexShrink: 1,
    ...fontStyles.postSubtitle
  },
  lineDivisionInput: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grey,
    marginBottom: 128
  },
  inputSection: {
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  sendRescueSection: {
    backgroundColor: colors.white,
    flex: 1,
    height: 95,
    borderRadius: 12
  },
  sendRescueLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 10,
    padding: 6
  },
  sendRescueContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
    width: '80%',
    height: 83,
    borderRadius: 8,
    gap: 6,
  },
  rescueImage: {
    width: 100,
    height: 75,
    borderRadius: 6
  },
  rescueTextsColumn: {
    alignSelf: 'flex-start'
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  textInput: {
    width: 283,
    ...fontStyles.subtitle_1,
    ...(Platform.OS === 'web' && {
      outlineStyle: 'none',
      boxShadow: 'none',
    }),
  },
  inputIcons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 16,
    gap: 12
  },
  sendBackground: {
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 34,
    borderRadius: 100,
  }
});