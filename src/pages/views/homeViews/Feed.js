import { StyleSheet, View } from 'react-native';
import { mockedPosts } from '@constants/mockDataPost';
import { Post } from '@components/post';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function Feed({ navigation, openKebabMenu }) {
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.feed}>
      {Object.entries(mockedPosts).map(([key, post]) => (
        <Post key={key} post={post} onOpenMenu={() => openKebabMenu('post', post)} navigation={navigation}/>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  feed: {
    marginTop: 16,
    marginBottom: 156,
    gap: 32,
    alignItems: 'center'
  },
});