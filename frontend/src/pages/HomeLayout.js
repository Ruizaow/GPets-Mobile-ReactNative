import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Animated } from 'react-native';
import React, { useRef, useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { TopNavbar } from '@components/topNavbar';
import { Sidebar } from '@components/sidebar';
import { BottomNavbar } from '@components/bottomNavbar';
import { KebabMenu } from '@components/kebabMenu';
import { Modal } from '@components/modal';
import { deletePost } from '@services/deletePost';

export function HomeLayout({ navigation, onGoTo, currentView, onPostDeleted, postMarker, children }) {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  async function handleLogout() {
    navigation.navigate('Auth');
    await logout();
  }

  async function handleDeletePost(postId) {
    if (!postId) {
      return;
    }
    await deletePost(postId, () => {
      onPostDeleted(postId);
      setDeletePostModal(null);
    });
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuLocked, setIsMenuLocked] = useState(false);
  const [kebabMenu, setKebabMenu] = useState(null);
  const [deletePostModal, setDeletePostModal] = useState(null);
  const [rescueModal, setRescueModal] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showPostMarkerModal, setShowPostMarkerModal] = useState(false);
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);

  const scrollRef = useRef(null);

  const sidebarX = useRef(new Animated.Value(-400)).current;  
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  function openSidebar() {
    if (isMenuLocked) {
      return;
    }
    setIsMenuLocked(true);
    setIsSidebarOpen(true);

    Animated.parallel([
      Animated.timing(sidebarX, { toValue: 0, duration: 450, useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(1),
        Animated.timing(overlayOpacity, { toValue: 1, duration: 450, useNativeDriver: true })
      ])
    ]).start(() => {
      setTimeout(() => setIsMenuLocked(false), 0.45);
    });
  }

  function closeSidebar() {
    if (isMenuLocked) {
      return;
    }
    setIsMenuLocked(true);

    Animated.parallel([
      Animated.timing(sidebarX, { toValue: -400, duration: 450, useNativeDriver: true }),
      Animated.timing(overlayOpacity, { toValue: 0, duration: 450, useNativeDriver: true })
    ]).start(() => {
      setIsSidebarOpen(false)
      setTimeout(() => setIsMenuLocked(false), 0.45);
    });
  }

  function openRescueModal(modalData) {
    setRescueModal(modalData);
  }
  function openKebabMenu(type, data) {
    setKebabMenu({ type, data });
  }
  function closeKebabMenu() {
    setKebabMenu(null);
  }

  const translateXBackground = overlayOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100]
  });

  function handleGoToFromSidebar(viewName) {
    onGoTo(viewName);
    requestAnimationFrame(() => {
      closeSidebar();
    });
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* PAGINA + NAVBAR */}
      <Animated.View style={[styles.pageColumn, { transform: [{ translateX: translateXBackground }] }]}>
        <TopNavbar
          navigation={navigation}
          onOpenSidebar={openSidebar}
          isMenuDisabled={isMenuLocked}
          loadedUser={user}
          onOpenLoginModal={() => setShowLoginRequiredModal(true)}
        />
        <ScrollView ref={scrollRef} style={styles.pageContent}>
          {children &&
            React.cloneElement(children, {
              openKebabMenu,
              openRescueModal,
              setShowPostMarkerModal,
              openLoginRequiredModal: () => setShowLoginRequiredModal(true),
              scrollRef,
            })
          }
        </ScrollView>
        <BottomNavbar
          onGoTo={onGoTo}
          currentView={currentView}
        />
      </Animated.View>
      
      {/* ESCURECIMENTO DO FUNDO */}
      {isSidebarOpen && (
        <Animated.View
          style={[styles.overlay, { opacity: overlayOpacity, backgroundColor: theme.overlay }]}
          pointerEvents={isSidebarOpen ? 'auto' : 'none'}
          onStartShouldSetResponder={() => true}
          onResponderRelease={closeSidebar}
        />
      )}
      
      {/* SIDEBAR */}
      {isSidebarOpen && (
        <Animated.View
          style={[styles.openSidebar, { transform: [{ translateX: sidebarX }] }]}
          pointerEvents={isSidebarOpen ? 'auto' : 'none'}
        >
          <Sidebar
            navigation={navigation}
            onGoTo={handleGoToFromSidebar}
            onOpenExitModal={() => setShowExitModal(true)}
            onCloseSidebar={closeSidebar}
            isBackArrowDisabled={isMenuLocked}
            loadedUser={user}
            onOpenLoginModal={() => setShowLoginRequiredModal(true)}
          />
        </Animated.View>
      )}

      {/* MENU KEBAB */}
      {Boolean(kebabMenu) && (
        <KebabMenu
          type={kebabMenu.type}
          data={kebabMenu.data}
          onClose={closeKebabMenu}
          onDelete={() => setDeletePostModal(kebabMenu.data.id)}
          canDelete={kebabMenu.data.userId === user?.id}
          onOpenLoginModal={() => setShowLoginRequiredModal(true)}
        />
      )}

      {/* MODAL para EXIBIR POST DE MARCADOR NO MAPA */}
      {showPostMarkerModal && (
        <Modal
          navigation={navigation}
          text={postMarker.address}
          confirmButton={`Ver publicação`}
          onClose={() => {
            setShowPostMarkerModal(false);
          }}
          onConfirm={() => {
            navigation.navigate('PostView', { post: postMarker })
            setShowPostMarkerModal(false);
          }}
          post={postMarker}
        />
      )}

      {/* MODAL para DELETAR POST */}
      {Boolean(deletePostModal) && (
        <Modal
          text={`Deseja excluir esta publicação?`}
          confirmButton={`Sim, excluir`}
          onClose={() => setDeletePostModal(null)}
          onConfirm={() => handleDeletePost(deletePostModal)}
        />
      )}

      {/* MODAL para MARCAR UM ANIMAL DE POST COMO RESGATADO */}
      {Boolean(rescueModal) && (
        <Modal
          text={rescueModal.text}
          confirmButton={rescueModal.confirmButton}
          onClose={() => setRescueModal(null)}
          onConfirm={async () => {
            await rescueModal.onConfirm();
            setRescueModal(null);
          }}
        />
      )}

      {/* MODAL para SAIR DA CONTA */}
      {showExitModal && (
        <Modal
          text={`Deseja sair de sua conta?`}
          confirmButton={`Sim, sair`}
          onClose={() => setShowExitModal(false)}
          onConfirm={handleLogout}
        />
      )}

      {/* MODAL para USUÁRIOS VISITANTES */}
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

      <StatusBar style={theme.name === 'dark' ? 'light' : 'dark'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  pageColumn: {
    width: '100%',
    height: '100%',
  },
  pageContent: {
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  openSidebar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
});