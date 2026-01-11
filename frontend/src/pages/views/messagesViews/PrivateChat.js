import { StyleSheet, View, ScrollView, Text, TextInput, Image, TouchableOpacity, Platform } from 'react-native';
import { ArrowLeft, Image as ImageIcon, Camera, SendHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function PrivateChat({ onBack, messageData }) {
  const { theme } = useTheme();

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(messageData.messages);

  const date = new Date();
  date.setHours(date.getHours() - 3);

  function handleSendMessage() {
    if (!inputValue.trim())
      return;

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

  return (
    <View style={[styles.privateChat, { backgroundColor: theme.background }]}>

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBack}>
            <ArrowLeft size={24} color={theme.primaryText}/>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <TouchableOpacity>
              {/* Substituir pelo componente ProfilePicture e navegar para Perfil no onPress */}
              <Image
                style={[styles.profilePicture, {
                  borderWidth: theme.name === 'dark' ? 1 : 0,
                  borderColor: theme.name === 'dark' ? colors.white : 'transparent'
                }]}
                source={messageData.userProfilePicture}
              />
            </TouchableOpacity>
            <View>
              <Text style={[styles.username, { color: theme.primaryText }]}>{messageData.userUsername}</Text>
              <Text style={[fontStyles.postSubtitle, { color: theme.primaryText }]}>Visto por último - {messageData.messages[messageData.messages.length - 1].timestamp}</Text>
            </View>
          </View>
        </View>
        <View style={styles.lineDivision}/>
      </View>
    
      <ScrollView>
        <View style={styles.messages}>
          {messages.map((message, index) => (
            <View style={[styles.userMessage, message.isOwner && styles.userMessageFromOwner]} key={index}>
              <Text style={styles.userMessageContent}>{message.content}</Text>
              <Text style={fontStyles.commentTimestamp}>{message.timestamp}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.lineDivisionInput}/>
      <View style={styles.inputSection}>
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
                <TouchableOpacity>
                  <ImageIcon size={24} color={colors.blue}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Camera size={24} color={colors.blue}/>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
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
  profilePicture: {
    width: 52,
    height: 52,
    borderRadius: 50
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
    bottom: 0,
    paddingBottom: 52
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
  },
});