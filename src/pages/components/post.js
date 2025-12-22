import { StyleSheet, Pressable, View, Text, Image, TouchableOpacity } from 'react-native';
import { EllipsisVertical, Star } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';

export function Post({ post, navigation, onOpenMenu }) {
  const { theme } = useTheme();

  function getTagColor(tag) {
    switch (tag) {
      case 'Perdido':
        return colors.red;
      case 'Desabrigado':
        return colors.orange;
      case 'Resgatado':
        return colors.blue;
      case 'Encontrado':
        return colors.green;
      default:
        return colors.dark;
    }
  }

  return (
    <Pressable style={styles.pressable} onPress={() => navigation.navigate('PostView', { post })}>
      {({ pressed }) => (
        <View
          style={[
            styles.postContainer, {
              backgroundColor: theme.post,
              borderWidth: theme.name === 'dark' ? 1 : 0,
              borderColor: theme.name === 'dark' ? colors.white : 'transparent',
            }
          ]}
        >
          <View style={styles.header}>
            <View style={styles.userData}>
              <Image
                style={[styles.profilePicture, {
                  borderWidth: theme.name === 'dark' ? 1 : 0,
                  borderColor: theme.name === 'dark' ? colors.white : 'transparent'
                }]}
                source={post.userProfilePicture}
              />
              <View>
                <Text style={[fontStyles.postTitle, { color: theme.primaryText }]}>{post.userUsername}</Text>
                <Text style={[fontStyles.postSubtitle, { color: theme.primaryText }]}>{post.timestamp}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onOpenMenu}>
              <EllipsisVertical size={28} color={theme.primaryText}/>
            </TouchableOpacity>
          </View>
          <View>
            <Image source={post.imageUrl} style={styles.petImage}/>
            <View style={styles.nameTag}>
              <Text style={[fontStyles.title_2, { color: theme.primaryText }]}>{post.name}</Text>
              <View style={styles.tag}>
                <Text style={[fontStyles.postTag, { color: getTagColor(post.tag) }]}>
                  {post.tag}
                </Text>
                <Star size={24} color={colors.disabled}/>
              </View>
            </View>
            <Text style={[styles.lastSeen, { color: theme.primaryText }]}>Última vez visto(a): {post.lastSeen}</Text>
            <View style={styles.infoChips}>
              <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.sex}</Text></View>
              <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.breed}</Text></View>
              <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.temper}</Text></View>
              <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>Tutor: {post.owner}</Text></View>
              <View style={[styles.chip, { backgroundColor: theme.chip }]}><Text style={fontStyles.postChipLabel}>{post.phoneContact}</Text></View>
            </View>
            <Text style={[styles.description, { color: theme.primaryText }]} numberOfLines={3}>
              {post.description}
            </Text>
            <View style={styles.buttonSection}>
              <Button text='Ir para mapa' variant='goToMap' size={'small'}/>
              <Button text='Resgatado' variant='blue' size={'small'}/>
            </View>
          </View>
          {pressed && (<View pointerEvents="none" style={styles.overlay}/>)}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 16
  },
  postContainer: {
    width: 343,
    height: 656,
    borderRadius: 16,
    overflow: 'hidden'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 84,
    paddingHorizontal: 16
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  profilePicture: {
    width: 52,
    height: 52,
    borderRadius: 50
  },
  petImage: {
    width: 343,
    height: 250
  },
  nameTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 2,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 8
  },
  lastSeen: {
    paddingHorizontal: 16,
    marginBottom: 8,
    ...fontStyles.postSubtitle
  },
  infoChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
    marginBottom: 20,
    ...fontStyles.postDescription
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  }
});