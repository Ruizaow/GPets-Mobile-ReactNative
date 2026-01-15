import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Animated, TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@constants/signUpSchema';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { Button } from '@components/button';
import { InputField } from '@components/inputField';
import { BackArrow } from '@components/backArrow';
import { colors } from '@styles/colors';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { loginUser } from '@services/loginUser';

export default function Login({ navigation, animatedOffset, keyboardHeight, onGoToSignUp, onGoToForgotPassword }) {
  const { login } = useAuth();
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;
  
  const { control, trigger, getValues } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {email: '', password: ''}
  });

  async function handleLogin() {
    const { email, password } = getValues();

    const data = await loginUser(email, password);
    if (!data) return;

    await login(data.token, data.user);
    navigation.navigate('Home', { openFeed: true })
  }

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        { backgroundColor: theme.background },
        keyboardHeight > 0 && { paddingBottom: keyboardHeight }
      ]}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
    >
      <Animated.View style={[styles.container, {
        backgroundColor: theme.background,
        transform: [{ translateY: animatedOffset }]
      }]}>
        <View style={styles.backSection}>
          <BackArrow text={'Voltar'} onPress={() => navigation.navigate('Start')} />
        </View>
        
        <View style={styles.content}>
          <View style={styles.textArea}>
            <Text style={[fontStyles.title_2, { color: theme.primaryText }]}>
              Bem-vindo ao GPets
            </Text>
            <Text style={[fontStyles.subtitle_2, { color: theme.primaryText }]}>
              Faça o seu login abaixo
            </Text>
          </View>
          <View style={styles.buttonArea}>
            <Button
              text='Continuar com Google'
              textColor={theme.disabled}
              bgColor={colors.disabled}
              widthStyle={'flex: 1'}
              image={require('@assets/images/google-2015-seeklogo.png')}
              isDisabled={true}
            />
          </View>
          <View style={styles.lineDivision}>
            <View style={[styles.line, { backgroundColor: theme.primaryText }]}/>
            <Text style={[fontStyles.subtitle_1, { color: theme.primaryText }]}>
              ou entre com
            </Text>
            <View style={[styles.line, { backgroundColor: theme.primaryText }]}/>
          </View>

          <View style={styles.inputArea}>
            <Controller
              control={control}
              name='email'
              render={({ field, fieldState }) => (
                <InputField
                  label='Login'
                  placeholder='Digite seu e-mail aqui...'
                  type='email'
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                  textColor={colors.dark}
                  bgColor={colors.grey}
                  phColor={'rgba(50, 58, 66, 0.4)'}
                  labelColor={theme.primaryText}
                />
              )}
            />
            <Controller
              control={control}
              name='password'
              render={({ field, fieldState }) => (
                <InputField
                  label='Senha'
                  placeholder='Digite sua senha aqui...'
                  type='password'
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                  textColor={colors.dark}
                  bgColor={colors.grey}
                  phColor={'rgba(50, 58, 66, 0.4)'}
                  labelColor={theme.primaryText}
                  errorMessagePositionAbsolute={true}
                />
              )}
            />
            <TouchableOpacity onPress={onGoToForgotPassword}>
              <Text style={[styles.forgotPassword, { color: theme.primaryText }]}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.submitArea}>
            <View style={styles.button}>
              <Button
                text='Entrar'
                textColor={colors.beige}
                bgColor={colors.blue}
                onPress={async () => {
                  const valid = await trigger(['email', 'password']);
                  if (valid) {
                    await handleLogin();
                  }
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                text='Cadastrar-se'
                textColor={colors.blue}
                bgColor={theme.signUpButton}
                borderColor={colors.blue}
                onPress={onGoToSignUp}
              />
            </View>
            <View style={[styles.button, { marginTop: 24 }]}>
              <Button
                text='Entrar como Visitante'
                textColor={theme.primaryText}
                bgColor={'transparent'}
                borderColor={theme.primaryText}
                onPress={() => navigation.navigate('Home', { openFeed: true })}
              />
            </View>
          </View>
        </View>

        <StatusBar style='auto' />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    gap: 32,
  },
  backSection: {
    marginTop: 80,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  buttonArea: {
    gap: 10,
    marginBottom: 24,
    flexDirection: 'row'
  },
  lineDivision: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  line: {
    width: 94,
    height: 1
  },
  inputArea: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPassword: {
    marginTop: -6,
    ...fontStyles.forgotPassword
  },
  submitArea: {
    width: '100%',
    gap: 12
  },
  button: {
    flexDirection: 'row'
  }
});
