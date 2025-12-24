import { Keyboard, Platform, View, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import SelectUser from './authViews/SelectUser';
import Login from './authViews/Login';
import SignUp from './authViews/SignUp';
import ForgotPassword from './authViews/ForgotPassword';
import ChangePassword from './authViews/ChangePassword';
import { useKeyboardAnimation } from '@hooks/useKeyboardAnimation';

export default function Auth({ navigation }) {
  const [view, setView] = useState('SelectUser');
  const goTo = (viewName) => setView(viewName);
  
  const keyboardConfigByView = {
    Login: { enabled: true, offset: 245 },
    SignUp: { enabled: true, offset: 265 },
    ForgotPassword: { enabled: true, offset: 300 },
    ChangePassword: { enabled: true, offset: 265 },
  };
  const keyboardConfig = keyboardConfigByView[view] ?? { enabled: false };
  const { animatedOffset, keyboardHeight } = useKeyboardAnimation(keyboardConfig);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {view === 'SelectUser' && (
            <SelectUser
              navigation={navigation}
              onSelectOng={() => goTo('Login')}
            />
          )}
          {view === 'Login' && (
            <Login
              navigation={navigation}
              animatedOffset={animatedOffset}
              keyboardHeight={keyboardHeight}
              onBack={() => goTo('SelectUser')}
              onGoToSignUp={() => goTo('SignUp')}
              onGoToForgotPassword={() => goTo('ForgotPassword')}
            />
          )}
          {view === 'SignUp' && (
            <SignUp
              animatedOffset={animatedOffset}
              onBackToLogin={() => goTo('Login')}
            />
          )}
          {view === 'ForgotPassword' && (
            <ForgotPassword
              animatedOffset={animatedOffset}
              onBackToLogin={() => goTo('Login')}
              onGoToChangePassword={() => goTo('ChangePassword')}
            />
          )}
          {view === 'ChangePassword' && (
            <ChangePassword 
              animatedOffset={animatedOffset}
              onBackToLogin={() => goTo('Login')}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}