import { useState } from 'react';
import { FLOWS } from '@constants/postFormFlows';
import { INITIAL_POST_DATA } from '@constants/initialPostData';
import { Modal } from '@components/modal';
import SituationStep from './postFormViews/SituationStep';
import LocationStep from './postFormViews/LocationStep';
import ImageStep from './postFormViews/ImageStep';
import InformationStep from './postFormViews/InformationStep';
import PreviewStep from './postFormViews/PreviewStep';
import SucessMessage from './postFormViews/SucessMessage';

export default function PostForm({ navigation, route }) {
  const { postType } = route.params;

  const flow = FLOWS[postType];
  const [viewIndex, setViewIndex] = useState(0);
  
  const goNext = () => setViewIndex(i => i + 1);
  const goBack = () => setViewIndex(i => i - 1);
  const currentView = flow[viewIndex];

  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState({
    situation: null,
    location: { address: '', latitude: null, longitude: null },
    imageUri: null,
    information: {
      nome: '', raca: '', descricao: '', dia: '', mes: null, ano: '',
      sexo: null, temper: null, nomeTutor: '', usuarioTutor: null, telefone: ''
    }
  });

  function updatePostData(section, value) {
    setPostData(prev => ({...prev, [section]: {
      ...prev[section],
      ...value
    }}));
  }
  function hasUnsavedChanges() {
    return JSON.stringify(postData) !== JSON.stringify(INITIAL_POST_DATA);
  }

  return (
    <>
      {currentView === 'SituationStep' && (
        <SituationStep
          value={postData.situation}
          onChange={(situation) =>
            setPostData(prev => ({ ...prev, situation }))
          }
          onGoNext={goNext}
          onDiscard={() => setShowModal(true)}
          hasUnsavedChanges={hasUnsavedChanges}
          navigation={navigation}
        />
      )}
      {currentView === 'LocationStep' && (
        <LocationStep
          location={postData.location}
          onChange={(location) => updatePostData('location', location)}
          onGoBack={goBack}
          onGoNext={goNext}
          onDiscard={() => setShowModal(true)}
        />
      )}
      {currentView === 'ImageStep' && (
        <ImageStep
          postType={postType}
          imageUri={postData.imageUri}
          onChangeImage={(uri) =>
            setPostData(prev => ({ ...prev, imageUri: uri }))
          }
          onGoBack={goBack}
          onGoNext={goNext}
          onDiscard={() => setShowModal(true)}
          hasUnsavedChanges={hasUnsavedChanges}
          navigation={navigation}
        />
      )}
      {currentView === 'InformationStep' && (
        <InformationStep
          postType={postType}
          data={postData.information}
          dataAddress={postData.location.address}
          onChange={(data) => updatePostData('information', data)}
          onChangeAddress={(location) => updatePostData('location', location)}
          onGoBack={goBack}
          onGoNext={goNext}
          onDiscard={() => setShowModal(true)}
        />
      )}
      {currentView === 'PreviewStep' && (
        <PreviewStep
          postType={postType}
          postData={postData}
          onGoBack={goBack}
          onGoNext={goNext}
          onDiscard={() => setShowModal(true)}
        />
      )}
      {currentView === 'SucessMessage' && (
        <SucessMessage
          navigation={navigation}
        />
      )}
      {showModal && (
        <Modal
          text={`Deseja descartar a postagem? Suas alterações serão perdidas`}
          confirmButton={`Sim, descartar`}
          onClose={() => setShowModal(false)}
          onConfirm={() => navigation.navigate('Home')}
        />
      )}
    </>
  );
}