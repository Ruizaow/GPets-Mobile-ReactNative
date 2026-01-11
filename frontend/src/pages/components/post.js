import { StyleSheet, Pressable, View, Text } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { PostBase } from '@components/postBase';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';

export function Post({ post, navigation, onOpenMenu, onPressButton, isOnPostForm=false, footer=null }) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={() => navigation.navigate('PostView', { post, originRoute: 'Home' })}
      disabled={isOnPostForm || Boolean(footer)}
    >
      {({ pressed }) => (
        <View style={[
          styles.postContainer, {
            backgroundColor: theme.post,
            borderWidth: theme.name === 'dark' ? 1 : 0,
            borderColor: theme.name === 'dark' ? colors.white : 'transparent',
          },
          footer && {
            borderBottomWidth: 2,
            borderBottomColor: colors.darkGreyAlt
          }
        ]}>
          <PostBase
            post={post}
            navigation={navigation}
            onOpenMenu={onOpenMenu}
            isOnPostForm={isOnPostForm}
          />
          <View style={styles.mainContent}>
            {post.type === 'Pet' ? (
              <>
                <Text style={[styles.date, { color: theme.primaryText }]}>Última vez visto(a): {post.date}</Text>
                <View style={styles.infoChips}>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.sex || 'Sexo desconhecido'}</Text></View>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.breed}</Text></View>
                  {post.temper &&
                    <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.temper}</Text></View>
                  }
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.owner !== 'Não possui' ? 'Tutor: ' + post.owner : 'Sem tutor'}</Text></View>
                  {post.phone !== 'Não possui' &&
                    <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.phone}</Text></View>
                  }
                </View>
                <Text numberOfLines={footer ? undefined : 3}
                  style={[
                    styles.description,
                    { color: theme.primaryText },
                    footer
                      ? {marginBottom: theme.name === 'dark' ? 0 : 20}
                      : {marginBottom: 20}
                  ]}
                >
                  {post.description}
                </Text>
                <View style={styles.buttonSection}>
                  {isOnPostForm ? (
                    <Button
                      text='Localização informada'
                      textColor={theme.stateButtonText}
                      bgColor={theme.stateButton}
                      borderColor={theme.postPetButtonBorder}
                      height={48}
                      onPress={onPressButton}
                    />
                  ) : (
                    <>
                      <Button
                        text='Ir para mapa'
                        textColor={theme.stateButtonText}
                        bgColor={theme.stateButton}
                        borderColor={theme.postPetButtonBorder}
                        width={149}
                        height={48}
                      />
                      <Button
                        text='Resgatado'
                        textColor={colors.white}
                        bgColor={colors.blue}
                        width={149}
                        height={48}
                      />
                    </>
                  )}
                </View>
              </>
            ) : (
              <>
                <View style={styles.infoChips}>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{'Data do evento: ' + post.date}</Text></View>
                  <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{'Endereço: ' + post.address}</Text></View>
                  {post.phone !== 'Não possui' &&
                    <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{'Contato: ' + post.phone}</Text></View>
                  }
                </View>
                <Text numberOfLines={footer ? undefined : 3}
                  style={[
                    styles.description,
                    { color: theme.primaryText, marginBottom: 24 }
                  ]}
                >
                  {post.description}
                </Text>
              </>
            )}
          </View>

          {footer}

          {pressed && (<View pointerEvents='none' style={styles.overlay}/>)}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: 343,
    borderRadius: 16,
    overflow: 'hidden'
  },
  mainContent: {
    paddingHorizontal: 16
  },
  date: {
    marginBottom: 8,
    ...fontStyles.postSubtitle
  },
  infoChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 6
  },
  chip: {
    backgroundColor: colors.dark,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 16
  },
  description: {
    ...fontStyles.postDescription
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 16
  }
});