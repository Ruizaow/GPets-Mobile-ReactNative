import { useState } from 'react';
import ProfileView from './profileViews/ProfileView';
import EditProfile from './profileViews/EditProfile';

export default function Profile({ navigation }) {
  const [currentView, setCurrentView] = useState('ProfileView');
  const goTo = (viewName) => setCurrentView(viewName);

  const [userData, setUserData] = useState({
    fotoPerfil: require('@assets/images/gpets-profile-picture.png'),
    nome: 'GPets',
    descricao: 'Lorem ipsum dolor sit amet consectetur.',
    email: 'ongpets@gmail.com',
    telefone: '(+85) 99999-9999'
  });

  return (
    <>
      {currentView === 'ProfileView' && (
        <ProfileView
          navigation={navigation}
          data={userData}
          onGoToEditProfile={() => goTo('EditProfile')}
        />
      )}
      {currentView === 'EditProfile' && (
        <EditProfile
          initialData={userData}
          onCancel={() => goTo('ProfileView')}
          onSave={(newData) => {
            setUserData(newData);
            goTo('ProfileView');
          }}
        />
      )}
    </>
  );
}