import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRef, useState, useCallback } from 'react';
import { Pencil, Mail, Phone, MapPin, Image, Star } from 'lucide-react-native';
import { mockedBookmarks } from '@constants/mockDataBookmark';
import { useTheme } from '@context/ThemeContext';
import { useProfileTab } from '@context/ProfileTabContext';
import { GoBackHeader } from '@components/goBackHeader';
import { ProfilePicture } from '@components/profilePicture';
import { ReducedPost } from '@components/reducedPost';
import { Pagination } from '@components/pagination';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { usePagination } from '@hooks/usePagination';
import { handleChangePage } from '@handlers/handleChangePage';

export default function ProfileView({ userProfile, loadedUser, userPosts, navigation, onGoToEditProfile }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const isUserProfile = loadedUser.id === userProfile.id
  const user = isUserProfile ? loadedUser : userProfile

  const scrollRef = useRef(null);
  const [currentPagePost, setCurrentPagePost] = useState(1);
  const [currentPageBookmark, setCurrentPageBookmark] = useState(1);

  const {
    totalPages: totalPagesPosts,
    paginatedData: paginatedPosts
  } = usePagination(userPosts, currentPagePost);
  const {
    totalPages: totalPagesBookmarks,
    paginatedData: paginatedBookmarks
  } = usePagination(mockedBookmarks, currentPageBookmark);

  const { activeTab, setActiveTab } = useProfileTab();
  function switchTab(tab) {
    if (tab === activeTab) return;
    setActiveTab(tab);
  }

  useFocusEffect(
    useCallback(() => {
      const state = navigation.getState();
      const lastRoute = state.routes[state.index];

      const savedState = lastRoute?.params?.profileState;

      if (savedState) {
        setCurrentPagePost(savedState.currentPagePost);
        setCurrentPageBookmark(savedState.currentPageBookmark);
      }
    }, [])
  );

  return (
    <View style={[styles.profileContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={'Perfil'}
        onPress={() => navigation.goBack()}
        showLineDivision={false}
      />

      <ScrollView ref={scrollRef}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={[styles.headerContentSection, styles.mainHeader]}>
              <ProfilePicture loadedUser={user} size={80}/>
              <View style={styles.userDataColumn}>
                <Text style={[fontStyles.postTitle, { color: theme.secondaryText }]}>
                  {user.name}
                </Text>
                {user.bio ? (
                  <Text style={[fontStyles.subtitle_2, { color: theme.secondaryText }]}>
                    {user.bio}
                  </Text>
                ) : (
                  <Text style={[fontStyles.subtitle_2, { color: colors.darkGreyAlt }]}>
                    {isUserProfile
                      ? 'Adicione uma descrição de perfil para facilitar a ajuda de outros usuários.'
                      : 'Este usuário não possui uma descrição de perfil.'
                    }
                  </Text>
                )}
              </View>
              {isUserProfile &&
                <TouchableOpacity onPress={(onGoToEditProfile)}>
                  <Pencil size={24} color={theme.secondaryText}/>
                </TouchableOpacity>
              }
            </View>
            <View style={styles.headerLineDivision}/>
            <View style={styles.headerContentSection}>
              <View style={styles.userDataColumn}>
                <View style={styles.userDataRow}>
                  <Mail size={24} color={theme.secondaryText}/>
                  <Text style={[fontStyles.subtitle_1, { color: theme.secondaryText }]}>
                    {user.email}
                  </Text>
                </View>
                {user.phone &&
                  <View style={styles.userDataRow}>
                    <Phone size={24} color={theme.secondaryText}/>
                    <Text style={[fontStyles.subtitle_1, { color: theme.secondaryText }]}>
                      {user.phone}
                    </Text>
                  </View>
                }
              </View>
            </View>
            <View style={styles.headerLineDivision}/>
            <View style={styles.headerContentSection}>
              <View style={styles.userDataRow}>
                <View style={{ transform: [{ scale: 1.1 }, { translateX: -0.2 }] }}>
                  <MapPin size={24} color={theme.secondaryText}/>
                </View>
                <Text style={[fontStyles.subtitle_1, { color: theme.secondaryText }]}>
                  {user.address}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.selectSection}>
          <TouchableOpacity style={styles.iconText} onPress={() => switchTab('posts')}>
            <Image
              size={24}
              color={activeTab === 'posts' ? theme.primaryText : colors.grey}
            />
            <Text style={[fontStyles.subtitle_1, { color: activeTab === 'posts' ? theme.primaryText : colors.grey } ]}>
              {isUserProfile ? 'Minhas publicações' : 'Publicações'}
            </Text>
          </TouchableOpacity>

          {isUserProfile &&
            <TouchableOpacity style={styles.iconText} onPress={() => switchTab('bookmarks')}>
              <Star
                size={24}
                color={activeTab === 'bookmarks' ? theme.primaryText : colors.grey}
              />
              <Text style={[fontStyles.subtitle_1, { color: activeTab === 'bookmarks' ? theme.primaryText : colors.grey } ]}>
                Salvos
              </Text>
            </TouchableOpacity>
          }
        </View>

        <View style={styles.lineDivision}/>

        <View style={styles.posts}>
          {(activeTab === 'posts' ? paginatedPosts : paginatedBookmarks).map((post, index) => (
            <View key={index} style={styles.post}>
              <ReducedPost
                post={post}
                navigation={navigation}
                scale={0.52}
                isOnProfile={true}
                originRoute={'Profile'}
                currentPagePost={currentPagePost}
                currentPageBookmark={currentPageBookmark}
              />
            </View>
          ))}
        </View>
        
        <View style={styles.paginationSection}>
          {activeTab === 'posts' ? (
            totalPagesPosts > 1 && (
              <Pagination
                currentPage={currentPagePost}
                totalPages={totalPagesPosts}
                onChangePage={(page) => {handleChangePage(page, setCurrentPagePost, scrollRef)}}
              />
            )
          ) : (
            totalPagesBookmarks > 1 && (
              <Pagination
                currentPage={currentPageBookmark}
                totalPages={totalPagesBookmarks}
                onChangePage={(page) => {handleChangePage(page, setCurrentPageBookmark, scrollRef)}}
              />
            )
          )}
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
    borderWidth: 1.6,
    borderColor: colors.grey,
    borderRadius: 12,
    marginBottom: 24,
  },
  headerContentSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12
  },
  mainHeader: {
    flexDirection: 'row',
  },
  userDataColumn: {
    flex: 1,
    gap: 4
  },
  headerLineDivision: {
    width: '100%',
    height: 1,
    backgroundColor: colors.grey
  },
  userDataRow: {
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
    paddingBottom: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  post: {
    marginBottom: 10
  },
  paginationSection: {
    marginBottom: 32
  }
});