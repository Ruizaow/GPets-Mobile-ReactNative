import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { mockedMessages } from '@constants/mockDataMessage';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function MessagesList({ navigation, onGoToPrivateChat }) {
  const { theme } = useTheme();

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  return (
    <View style={[styles.messagesContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader headerTitle={'Mensagens'} onPress={() => navigation.navigate('Home')}/>
      <ScrollView>
        <View style={styles.messages}>
          {mockedMessages.map((message, index) => (
            <View style={styles.messageSection} key={index}>
              <TouchableOpacity onPress={() => onGoToPrivateChat(message)}>
                <View style={styles.userInfo}>
                  <Image
                    style={[styles.profilePicture, {
                      borderWidth: theme.name === 'dark' ? 1 : 0,
                      borderColor: theme.name === 'dark' ? colors.white : 'transparent'
                    }]}
                    source={message.userProfilePicture}
                  />
                  <View style={{flex: 1}}>
                    <View style={styles.profileTimestamp}>
                      <Text style={[fontStyles.subtitle_1, { color: theme.primaryText }]}>{message.userUsername}</Text>
                      <Text style={[fontStyles.commentTimestamp, { color: theme.primaryText }]}>{message.messages[message.messages.length - 1].timestamp}</Text>
                    </View>
                    <View style={styles.contentNumber}>
                      <Text style={[styles.messageContent, { color: theme.primaryText }]} numberOfLines={1}>{message.messages[message.messages.length - 1].content}</Text>
                      <View style={styles.numberBackground}>
                        <Text style={fontStyles.messageNumber}>{message.messages.length}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={[styles.lineDivision, { backgroundColor: theme.secondaryText }]}/>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1
  },
  messages: {
    marginTop: 28,
    gap: 12,
    marginBottom: 76
  },
  messageSection: {
    gap: 22,
    paddingHorizontal: 20
  },
  userInfo: {
    flexDirection: 'row',
    gap: 12
  },
  profilePicture: {
    width: 52,
    height: 52,
    borderRadius: 50
  },
  profileTimestamp: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  messageContent: {
    ...fontStyles.postSubtitle,
    flexShrink: 1,
    width: '87%'
  },
  numberBackground: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.orange
  },
  lineDivision: {
    width: '100%',
    height: 0.6
  }
});