import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRef, useState, useMemo, useCallback } from 'react';
import { Pencil, Mail, Phone, BookImage, Star } from 'lucide-react-native';
import { mockedPosts } from '@constants/mockDataPost';
import { mockedBookmarks } from '@constants/mockDataBookmark';
import { useTheme } from '@context/ThemeContext';
import { useProfileTab } from '@context/ProfileTabContext';
import { GoBackHeader } from '@components/goBackHeader';
import { ReducedPost } from '@components/reducedPost';
import { Pagination } from '@components/pagination';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

const POSTS_PER_PAGE = 20;

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

  const [currentPagePost, setCurrentPagePost] = useState(1);

  const orderedPosts = useMemo(() => [...mockedPosts].reverse(), []);
  const totalPagesPosts = Math.ceil(orderedPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (currentPagePost - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return orderedPosts.slice(start, end);
  }, [currentPagePost, orderedPosts]);

  const [currentPageBookmark, setCurrentPageBookmark] = useState(1);
  
  const orderedBookmarks = useMemo(() => [...mockedBookmarks].reverse(), []);
  const totalPagesBookmarks = Math.ceil(orderedBookmarks.length / POSTS_PER_PAGE);

  const paginatedBookmarks = useMemo(() => {
    const start = (currentPageBookmark - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return orderedBookmarks.slice(start, end);
  }, [currentPageBookmark, orderedBookmarks]);

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

  const scrollRef = useRef(null);
  const paginationRef = useRef(null);

  function handleChangePage(page, activeTab) {
    if (activeTab === 'post') {
      setCurrentPagePost(page);
    }
    else {
      setCurrentPageBookmark(page);
    }

    requestAnimationFrame(() => {
      paginationRef.current?.measureLayout(
        scrollRef.current,
        (x, y) => {
          scrollRef.current.scrollTo({
            x,
            y: y - 16,
            animated: true,
          });
        },
        () => {}
      );
    });
  }

  return (
    <View style={[styles.profileContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={'Perfil'}
        onPress={() => navigation.navigate('Home')}
        showLineDivision={false}
      />
      <ScrollView ref={scrollRef}>
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
              <Text style={[fontStyles.postTitle, { color: theme.secondaryText }]}>
                {data.nome}
              </Text>
              <Text style={[fontStyles.subtitle_2, { color: theme.secondaryText }]}>
                {data.descricao}
              </Text>
              <View style={styles.user_email}>
                <Mail size={24} color={theme.secondaryText}/>
                <Text style={[fontStyles.subtitle_1, { color: theme.secondaryText }]}>
                  {data.email}
                </Text>
              </View>
              <View style={styles.user_phone}>
                <Phone size={24} color={theme.secondaryText}/>
                <Text style={[fontStyles.subtitle_1, { color: theme.secondaryText }]}>
                  {data.telefone}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onGoToEditProfile}>
              <Pencil size={24} color={theme.secondaryText}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.selectSection}>
          <TouchableOpacity style={styles.iconText} onPress={() => switchTab('posts')}>
            <BookImage
              size={24}
              color={activeTab === 'posts' ? theme.primaryText : colors.grey}
            />
            <Text style={[fontStyles.subtitle_1, { color: activeTab === 'posts' ? theme.primaryText : colors.grey } ]}>
              Minhas publicações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconText} onPress={() => switchTab('bookmarks')}>
            <Star
              size={24}
              color={activeTab === 'bookmarks' ? theme.primaryText : colors.grey}
            />
            <Text style={[fontStyles.subtitle_1, { color: activeTab === 'bookmarks' ? theme.primaryText : colors.grey } ]}>
              Salvos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lineDivision}/>

        <View style={styles.posts}>
          {(activeTab === 'posts' ? paginatedPosts : paginatedBookmarks).map((post, index) => (
            <View key={index} style={styles.post}>
              <ReducedPost
                post={post}
                navigation={navigation}
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
                ref={paginationRef}
                currentPage={currentPagePost}
                totalPages={totalPagesPosts}
                onChangePage={(page) => {handleChangePage(page, 'post')}}
              />
            )
          ) : (
            totalPagesBookmarks > 1 && (
              <Pagination
                ref={paginationRef}
                currentPage={currentPageBookmark}
                totalPages={totalPagesBookmarks}
                onChangePage={(page) => {handleChangePage(page, 'bookmark')}}
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
  user_phone: {
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