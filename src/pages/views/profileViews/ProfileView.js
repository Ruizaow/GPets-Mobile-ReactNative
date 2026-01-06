import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Pencil, Mail, Phone, BookImage, Star } from 'lucide-react-native';
import { mockedPosts } from '@constants/mockDataPost';
import { mockedBookmarks } from '@constants/mockDataBookmark';
import { useTheme } from '@context/ThemeContext';
import { useProfileTab } from '@context/ProfileTabContext';
import { GoBackHeader } from '@components/goBackHeader';
import { ReducedPost } from '@components/reducedPost';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function ProfileView({ navigation, data, onGoToEditProfile }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const { activeTab, setActiveTab } = useProfileTab();

  function switchTab(tab) {
    if (tab === activeTab)
      return;
    
    setActiveTab(tab);
  }

  return (
    <View style={[styles.profileContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={'Perfil'}
        onPress={() => navigation.navigate('Home')}
        showLineDivision={false}
      />
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={
                typeof data.fotoPerfil === 'string'
                  ? { uri: data.fotoPerfil }
                  : data.fotoPerfil
              }
              style={[styles.profilePicture, {
                borderWidth: theme.name === 'dark' ? 1 : 0,
                borderColor: theme.name === 'dark' ? colors.white : 'transparent'
              }]}
            />
            <View style={styles.userInfoColumn}>
              <Text style={fontStyles.postTitle}>
                {data.nome}
              </Text>
              <Text style={fontStyles.subtitle_2}>
                {data.descricao}
              </Text>
              <View style={styles.user_email}>
                <Mail size={24} color={colors.darkGrey}/>
                <Text style={fontStyles.subtitle_1}>
                  {data.email}
                </Text>
              </View>
              <View style={styles.user_phoneContact}>
                <Phone size={24} color={colors.darkGrey}/>
                <Text style={fontStyles.subtitle_1}>
                  {data.telefone}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onGoToEditProfile}>
              <Pencil size={24} color={colors.darkGrey}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.selectSection}>
          <TouchableOpacity style={styles.iconText} onPress={() => switchTab('posts')}>
            <BookImage
              size={24}
              color={activeTab === 'posts' ? colors.dark : colors.grey}
            />
            <Text style={[fontStyles.subtitle_1, { color: activeTab === 'posts' ? colors.dark : colors.grey } ]}>
              Minhas publicações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconText} onPress={() => switchTab('bookmarks')}>
            <Star
              size={24}
              color={activeTab === 'bookmarks' ? colors.dark : colors.grey}
            />
            <Text style={[fontStyles.subtitle_1, { color: activeTab === 'bookmarks' ? colors.dark : colors.grey } ]}>
              Salvos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lineDivision}/>

        <View style={styles.posts}>
          {(activeTab === 'posts' ? mockedPosts : mockedBookmarks).map((post, index) => (
            <View key={index} style={styles.post}>
              <ReducedPost post={post} navigation={navigation} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1
  },
  header: {
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    borderWidth: 1.6,
    borderColor: colors.grey,
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 80
  },
  userInfoColumn: {
    flex: 1
  },
  user_email: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  user_phoneContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  selectSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 12
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  lineDivision: {
    width: '100%',
    height: 1.6,
    backgroundColor: colors.grey
  },
  posts: {
    paddingTop: 16,
    paddingBottom: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  post: {
    marginBottom: 10,
  }
});