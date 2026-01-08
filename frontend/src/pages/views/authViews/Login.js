import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Animated, TouchableOpacity, ScrollView, View, Text } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@constants/signUpSchema';
import { Button } from '@components/button';
import { InputField } from '@components/inputField';
import { BackArrow } from '@components/backArrow';
import { colors } from '@styles/colors';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { loginUser } from '@services/loginUser';

export default function Login({ navigation, animatedOffset, keyboardHeight, onBack, onGoToSignUp, onGoToForgotPassword }) {
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;
  
  const { control, trigger, getValues } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {email: '', password: ''}
  });

  return (
    <ScrollView
      contentContainerStyle={[ styles.scrollContent, keyboardHeight > 0 && { paddingBottom: keyboardHeight } ]}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
    >
      <Animated.View style={[styles.container, { transform: [{ translateY: animatedOffset }] }]}>
        <View style={styles.backSection}>
          <BackArrow text={'Voltar'} onPress={onBack} />
        </View>
        
        <View style={styles.content}>
          <View style={styles.textArea}>
            <Text style={[fontStyles.title_2, { color: colors.beige }]}>
              Bem-vindo ao GPets
            </Text>
            <Text style={[fontStyles.subtitle_2, { color: colors.beige }]}>
              Faça o seu login abaixo
            </Text>
          </View>
          <View style={styles.buttonArea}>
            <Button
              text='Continuar com Google'
              imageSrc={require('@assets/images/google-2015-seeklogo.png')}
              variant='disabled'
            />
          </View>
          <View style={styles.lineDivision}>
            <View style={styles.line} />
            <Text style={[fontStyles.subtitle_1, { color: colors.beige }]}>
              ou entre com
            </Text>
            <View style={styles.line} />
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
                />
              )}
            />
            <TouchableOpacity onPress={onGoToForgotPassword}>
              <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.submitArea}>
            <Button
              text='Entrar'
              variant='beige'
              onPress={async () => {
                const valid = await trigger(['email', 'password']);
                if (valid) await loginUser(getValues, navigation);
              }}
            />
            <Button text='Cadastrar-se' variant='signUp' onPress={onGoToSignUp} />
          </View>
        </View>
        <StatusBar style='auto' />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.blue
  },
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    gap: 32,
  },
  backSection: {
    marginHorizontal: 32,
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
  },
  lineDivision: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  line: {
    width: 94,
    height: 1,
    backgroundColor: colors.beige,
  },
  inputArea: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPassword: {
    marginTop: -6,
    ...fontStyles.forgotPassword,
  },
  submitArea: {
    gap: 12,
  },
});
