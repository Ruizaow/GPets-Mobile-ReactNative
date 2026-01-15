import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Pencil, Mail, Phone, MapPin, Image, Star, CopyPlus } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { useProfileTab } from '@context/ProfileTabContext';
import { GoBackHeader } from '@components/goBackHeader';
import { Loading } from '@components/loading';
import { Modal } from '@components/modal';
import { ProfilePicture } from '@components/profilePicture';
import { ReducedPost } from '@components/reducedPost';
import { Pagination } from '@components/pagination';
import { EmptyMessage } from '@components/emptyMessage';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { useRequireAuth } from '@hooks/useRequireAuth';
import { usePagination } from '@hooks/usePagination';
import { handleChangePage } from '@handlers/handleChangePage';

export default function ProfileView({ userProfile, loadedUser, userPosts, userBookmarks, isLoading, navigation, onGoToEditProfile }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const isUserProfile = loadedUser?.id === userProfile.id
  const user = isUserProfile ? loadedUser : userProfile

  const scrollRef = useRef(null);
  const [currentPagePost, setCurrentPagePost] = useState(1);
  const [currentPageBookmark, setCurrentPageBookmark] = useState(1);
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);

  const { requireAuth } = useRequireAuth(() => setShowLoginRequiredModal(true));

  const {
    totalPages: totalPagesPosts,
    paginatedData: paginatedPosts
  } = usePagination(userPosts, currentPagePost);
  const {
    totalPages: totalPagesBookmarks,
    paginatedData: paginatedBookmarks
  } = usePagination(userBookmarks, currentPageBookmark);

  const { activeTab, setActiveTab } = useProfileTab();
  function switchTab(tab) {
    if (tab === activeTab) return;
    setActiveTab(tab);
  }
  useEffect(() => {
    if (!isUserProfile && activeTab !== 'posts') {
      setActiveTab('posts');
    }
  }, [isUserProfile]);
  
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

  const isPostsTab = activeTab === 'posts';
  const isBookmarksTab = activeTab === 'bookmarks';

  const hasPosts = paginatedPosts.length > 0;
  const hasBookmarks = paginatedBookmarks.length > 0;

  const shouldShowList = (isPostsTab && hasPosts) || (isBookmarksTab && hasBookmarks);

  if (isLoading) return (
    <View style={[styles.profileContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={'Perfil'}
        onPress={() => navigation.goBack()}
        showLineDivision={false}
      />
      <Loading marginTop={0} hasContainer={true}/>
    </View>
  )

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
              {isUserProfile ? (
                <TouchableOpacity onPress={(onGoToEditProfile)}>
                  <Pencil size={24} color={theme.secondaryText}/>
                </TouchableOpacity>
              ) : null}
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
                {user.phone !== '' &&
                  <View style={styles.userDataRow}>
                    <Phone size={24} color={theme.secondaryText}/>
                    <Text style={[fontStyles.subtitle_1, { color: theme.secondaryText }]}>
                      {user.phone}
                    </Text>
                  </View>
                }
              </View>
            </View>
            
            {user.role === 'ORGANIZATION' &&
              <>
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
              </>
            }
          </View>
        </View>

        <View style={styles.selectSection}>
          <TouchableOpacity style={styles.iconText} onPress={() => switchTab('posts')} disabled={!isUserProfile}>
            <Image
              size={24}
              color={isPostsTab ? theme.primaryText : colors.grey}
            />
            <Text style={[fontStyles.subtitle_1, { color: isPostsTab ? theme.primaryText : colors.grey } ]}>
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
        
        {shouldShowList ? (
          <>
            <View style={styles.posts}>
              {(isPostsTab ? paginatedPosts : paginatedBookmarks).map((post) => {
                return (
                  <View key={post.id} style={styles.post}>
                    <ReducedPost
                      post={post}
                      navigation={navigation}
                      scale={0.52}
                      canBookmark={true}
                      onOpenLoginModal={() => setShowLoginRequiredModal(true)}
                      currentPagePost={currentPagePost}
                      currentPageBookmark={currentPageBookmark}
                    />
                  </View>
                )
              })}
            </View>

            <View style={styles.paginationSection}>
              {isPostsTab ? (
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
          </>
        ) : isPostsTab ? (
          <EmptyMessage
            title={isUserProfile ? 'Você ainda não publicou nada' : 'Sem publicações'}
            subtitle={isUserProfile
              ? 'Publique algo para que outras pessoas possam ver seus conteúdos no feed.'
              : 'Este usuário ainda não publicou nada.'}
            icon={CopyPlus}
          />
        ) : (
          <EmptyMessage
            title={'Nenhum post salvo'}
            subtitle={'Quando você salvar um post, ele vai aparecer aqui para acessar depois.'}
            icon={Star}
          />
        )}        
      </ScrollView>

      {showLoginRequiredModal && (
        <Modal
          text={`Login necessário!`}
          subtext={`Para acessar essa e outras funções do GPets, você precisará entrar com sua conta.`}
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