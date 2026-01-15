import { StyleSheet, View, Text, Image } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { Button } from '@components/button';
import { colors } from '@styles/colors';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { useRequireAuth } from '@hooks/useRequireAuth';

export default function SelectPost({ navigation, openLoginRequiredModal }) {
  const { theme } = useTheme();
  const { user: loadedUser, isAuthenticated } = useAuth();
  const { requireAuth } = useRequireAuth(openLoginRequiredModal);

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.selectPost}>
      {isAuthenticated ? (
        <Image style={styles.logo} source={require('@assets/images/gpets-icon-blue.png')}/>
      ) : (
        <Image style={styles.logo} source={require('@assets/images/gpets-icon-green.png')}/>
      )}
      <Text style={[styles.text, { color: theme.primaryText }]}>
        Que tipo de publicação você deseja fazer hoje?
      </Text>
      <View style={styles.buttons}>
        {loadedUser?.role === 'ORGANIZATION' &&
          <Button
            text='Evento/publicidade'
            textColor={colors.beige}
            bgColor={colors.blue}
            width={227}
            height={48}
            onPress={() => navigation.navigate('PostForm', { postType: 'Evento/publicidade' })}
          />
        }
        <Button
          text='Reportar animal'
          textColor={isAuthenticated
            ? theme.postPetButtonText
            : theme.postPetButtonText_
          }
          bgColor={theme.postPetButton}
          borderColor={isAuthenticated
            ? theme.postPetButtonBorder
            : theme.postPetButtonBorder_
          }
          width={227}
          height={48}
          onPress={() =>
            requireAuth(() => {
              navigation.navigate('PostForm', { postType: 'Reportar animal'
            })
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectPost: {
    alignItems: 'center',
    marginTop: 48,
    paddingHorizontal: 80
  },
  logo: {
    marginBottom: 24
  },
  text: {
    ...fontStyles.title_3,
    marginBottom: 24,
    textAlign: 'center'
  },
  buttons: {
    gap: 12
  }
});