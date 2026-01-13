import { View } from 'react-native';
import { useState } from 'react';
import SelectUser from './authViews/SelectUser';
import Login from './authViews/Login';
import SignUp from './authViews/SignUp';
import ForgotPassword from './authViews/ForgotPassword';
import ChangePassword from './authViews/ChangePassword';
import { useKeyboardAnimation } from '@hooks/useKeyboardAnimation';

export default function Auth({ navigation }) {
  const [role, setRole] = useState(null);
  const [currentView, setCurrentView] = useState('Login');
  const goTo = (viewName) => setCurrentView(viewName);
  
  const keyboardConfigByView = {
    Login: { enabled: true, offset: 245 },
    SignUp: { enabled: true, offset: 265 },
    ForgotPassword: { enabled: true, offset: 300 },
    ChangePassword: { enabled: true, offset: 265 },
  };
  const keyboardConfig = keyboardConfigByView[currentView] ?? { enabled: false };
  const { animatedOffset, keyboardHeight } = useKeyboardAnimation(keyboardConfig);

  return (
    <View style={{ flex: 1 }}>
      {currentView === 'Login' && (
        <Login
          navigation={navigation}
          animatedOffset={animatedOffset}
          keyboardHeight={keyboardHeight}
          onGoToSignUp={() => goTo('SelectUser')}
          onGoToForgotPassword={() => goTo('ForgotPassword')}
        />
      )}
      {currentView === 'SelectUser' && (
        <SelectUser
          onBackToLogin={() => goTo('Login')}
          onSelectUser={() => {
            setRole('USER');
            goTo('SignUp');
          }}
          onSelectOng={() => {
            setRole('ORGANIZATION');
            goTo('SignUp');
          }}
        />
      )}
      {currentView === 'SignUp' && (
        <SignUp
          animatedOffset={animatedOffset}
          onBackToLogin={() => goTo('Login')}
          role={role}
        />
      )}
      {currentView === 'ForgotPassword' && (
        <ForgotPassword
          animatedOffset={animatedOffset}
          onBackToLogin={() => goTo('Login')}
          onGoToChangePassword={() => goTo('ChangePassword')}
        />
      )}
      {currentView === 'ChangePassword' && (
        <ChangePassword 
          animatedOffset={animatedOffset}
          onBackToLogin={() => goTo('Login')}
        />
      )}
    </View>
  );
}

/*
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View } from 'react-native';

export default function Auth({ navigation }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          ...
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
*/