import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { EllipsisVertical, Bell } from 'lucide-react-native';
import { useState } from 'react';
import { mockedNotifications } from '@constants/mockDataNotification';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { EmptyMessage } from '@components/emptyMessage';
import { KebabMenu } from '@components/kebabMenu';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function Notifications({ navigation }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [notifications, setNotifications] = useState(mockedNotifications);
  const [kebabMenu, setKebabMenu] = useState(null);

  function openKebabMenu(type, data) {
    setKebabMenu({ type, data });
  }
  function handleDeleteNotification(notifId) {
    setNotifications(prev => prev.filter(notif => notif.id !== notifId));
  }

  return (
    <View style={[styles.notifContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader headerTitle={'Notificações'} onPress={() => navigation.navigate('Home')}/>
      <ScrollView>
        {notifications.length > 0 ? (
          <View style={styles.notifications}>
            {notifications.map((notification) => (
              <View key={notification.id}>
                <View style={styles.notifSection}>
                  <View style={styles.notifText}>
                    {!notification.viewed ? (
                      <View style={styles.newNotifWarning}/>
                    ) : (
                      <View style={styles.invisibleDiv}/>
                    )}
                    <View style={styles.textColumn}>
                      <Text style={[styles.title, { color: theme.primaryText }]}>
                        {notification.title}
                      </Text>
                      <Text style={[styles.description, { color: theme.secondaryText }]} numberOfLines={2}>
                        {notification.description}
                      </Text>
                      <Text style={[styles.timestamp, { color: theme.secondaryText }]}>
                        {notification.timestamp}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.pressIcon} onPress={() => openKebabMenu('notification', notification)}>
                    <EllipsisVertical size={28} color={theme.primaryText}/>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <EmptyMessage
            title={'Nenhuma notificação'}
            subtitle={'Aqui você verá comentários, alertas e outras interações com seu perfil.'}
            icon={Bell}
          />
        )}
      </ScrollView>
      {Boolean(kebabMenu) && (
        <KebabMenu
          type={kebabMenu.type}
          data={kebabMenu.data}
          onClose={() => setKebabMenu(null)}
          onDelete={() => handleDeleteNotification(kebabMenu.data.id)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  notifContainer: {
    flex: 1,
  },
  notifications: {
    paddingTop: 16,
    paddingBottom: 48,
    paddingHorizontal: 20,
    gap: 16
  },
  notifSection: {
    flexDirection: 'row',
  },
  notifText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  newNotifWarning: {
    width: 12,
    height: 12,
    backgroundColor: colors.orange,
    borderRadius: 100
  },
  invisibleDiv: {
    width: 12,
    height: 12,
  },
  textColumn: {
    flex: 1,
  },
  title: {
    ...fontStyles.subtitle_1,
  },
  description: {
    ...fontStyles.postSubtitle,
  },
  timestamp: {
    ...fontStyles.commentTimestamp,
  },
  pressIcon: {
    marginLeft: 16
  }
});