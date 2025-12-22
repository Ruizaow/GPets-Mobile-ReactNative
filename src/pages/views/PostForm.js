import { useState } from 'react';
import SituationStep from './postFormViews/SituationStep';
import LocationStep from './postFormViews/LocationStep';
import ImageStep from './postFormViews/ImageStep';
import InformationStep from './postFormViews/InformationStep';
import PreviewStep from './postFormViews/PreviewStep';
import SucessMessage from './postFormViews/SucessMessage';

export default function PostForm({ navigation }) {
  const [view, setView] = useState('SituationStep');

  const goTo = (viewName) => setView(viewName);

  return (
    <>
      {view === 'SituationStep' && (
        <SituationStep
          navigation={navigation}
          onGoToLocationStep={() => goTo('LocationStep')}
        />
      )}
      {view === 'LocationStep' && (
        <LocationStep
          onBack={() => goTo('SituationStep')}
          onGoToImageStep={() => goTo('ImageStep')}
        />
      )}
      {view === 'ImageStep' && (
        <ImageStep
          onBack={() => goTo('LocationStep')}
          onGoToInformationStep={() => goTo('InformationStep')}
        />
      )}
      {view === 'InformationStep' && (
        <InformationStep
          onBack={() => goTo('ImageStep')}
          onGoToPreviewStep={() => goTo('PreviewStep')}
        />
      )}
      {view === 'PreviewStep' && (
        <PreviewStep
          onBack={() => goTo('InformationStep')}
          onGoToSucessMessage={() => goTo('SucessMessage')}
        />
      )}
      {view === 'SucessMessage' && (
        <SucessMessage
          navigation={navigation}
        />
      )}
    </>
  );
}