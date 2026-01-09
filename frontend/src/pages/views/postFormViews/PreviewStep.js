import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Trash } from 'lucide-react-native';
import { useState } from 'react';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { SelectState } from '@components/selectState';
import { Post } from '@components/post';
import { Modal } from '@components/modal';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { formattedTimestampOnlyDate } from '@utils/timestampFormatting'
import { useFontsCustom } from '@hooks/useFontsCustom';
import { createPost } from '@services/createPost';

export default function PreviewStep({ postType, postData, onGoBack, onGoNext, onDiscard }) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const isEvent = postType === 'Evento/publicidade';

  const [showModal, setShowModal] = useState(false);

  const date = new Date();
  date.setHours(date.getHours() - 3);

  const post = {
    userId: user.id,
    type: !isEvent ? 'Pet' : 'Evento',
    timestamp: formattedTimestampOnlyDate,
    isOwner: postData.information.usuarioTutor,
    imageUrl: postData.imageUri,
    name: postData.information.nome,
    status: postData.situation,
    date: `${postData.information.dia} de ${postData.information.mes} de ${postData.information.ano}`,
    sex: postData.information.sexo,
    breed: postData.information.raca,
    temper: postData.information.temper,
    owner: postData.information.nomeTutor,
    phone: postData.information.telefone,
    description: postData.information.descricao,
    address: postData.location.address,
    coordinateLat: postData.location.latitude,
    coordinateLng: postData.location.longitude
  };

  return (
    <View style={[styles.stepContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={postType}
        onPress={onGoBack}
        showLineDivision={false}
        icon={Trash}
        iconColor={colors.red}
        onPressIcon={onDiscard}
      />
      <SelectState selectedState={'Prévia'} postType={postType}/>

      <ScrollView>
        <View style={styles.content}>
          <View style={styles.titles}>
            <Text style={[fontStyles.title_3, {color: theme.primaryText}]}>
              Está tudo pronto!
            </Text>
            <Text style={[fontStyles.subtitle_2, {color: theme.primaryText}]}>
              {isEvent
                ? 'Revise os detalhes. Se estiver tudo claro, a sua publicação está a um clique.'
                : 'Revise os detalhes. Se estiver tudo claro, a sua publicação está a um clique de ajudá-lo.'
              }
            </Text>
          </View>

          <Post post={post} onPressButton={() => setShowModal(true)} isOnPostForm={true}/>

          <View style={styles.publishButton}>
            <Button
              text='Publicar'
              variant='green'
              size={'custom'}
              onPress={async () => {await createPost(post, onGoNext)}}
            />
          </View>
        </View>
      </ScrollView>

      {showModal && (
        <Modal
          text={post.address}
          onClose={() => setShowModal(false)}
          hasConfirmButton={false}
          coordinateLat={post.coordinateLat}
          coordinateLng={post.coordinateLng}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1
  },
  content: {
    marginTop: 32,
    marginBottom: 80,
    paddingHorizontal: 32,
    gap: 24
  },
  titles: {
    gap: 12
  },
  publishButton: {
    flexDirection: 'row',
    marginTop: -2
  }
});