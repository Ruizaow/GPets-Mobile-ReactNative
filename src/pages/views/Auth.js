import { useState } from 'react';
import SelectUser from './authViews/SelectUser';
import Login from './authViews/Login';
import SignUp from './authViews/SignUp';
import ForgotPassword from './authViews/ForgotPassword';
import ChangePassword from './authViews/ChangePassword';

export default function Auth({ navigation }) {
  const [view, setView] = useState('SelectUser');

  const goTo = (viewName) => setView(viewName);

  return (
    <>
      {view === 'SelectUser' && (
        <SelectUser
          navigation={navigation}
          onSelectOng={() => goTo('Login')}
        />
      )}
      {view === 'Login' && (
        <Login
          navigation={navigation}
          onBack={() => goTo('SelectUser')}
          onGoToSignUp={() => goTo('SignUp')}
          onGoToForgotPassword={() => goTo('ForgotPassword')}
        />
      )}
      {view === 'SignUp' && (
        <SignUp
          onBackToLogin={() => goTo('Login')}
        />
      )}
      {view === 'ForgotPassword' && (
        <ForgotPassword 
          onBackToLogin={() => goTo('Login')}
          onGoToChangePassword={() => goTo('ChangePassword')}
        />
      )}
      {view === 'ChangePassword' && (
        <ChangePassword 
          onBackToLogin={() => goTo('Login')}
        />
      )}
    </>
  );
}