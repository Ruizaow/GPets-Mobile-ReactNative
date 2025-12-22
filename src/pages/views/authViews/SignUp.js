import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@constants/signUpSchema';
import { Button } from '@components/button';
import { InputField } from '@components/inputField';
import { BackArrow } from '@components/backArrow';
import { Check } from 'lucide-react-native';
import { colors } from '@styles/colors';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function SignUp({ onBackToLogin }) {
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [step, setStep] = useState(1);

  const { control, trigger, reset, getValues } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {name: '', email: '', cnpj: '', address: '', password: '', confirmPassword: ''}
  });

  useEffect(() => {
    reset(getValues(), { keepValues: true });
  }, [step]);

  function goNext() {
    if (step < 4) setStep(step + 1);
  }
  function goBack() {
    if (step > 1) setStep(step - 1);
  }
  function finishRegister() {
    setStep(4);
  }

  function Step1() {
    return (
      <>
        <View style={styles.backSection}><BackArrow text={'Voltar'} onPress={onBackToLogin}/></View>

        <View style={styles.content}>
          <View style={styles.textArea}>
            <Text style={[fontStyles.title_2, { color: colors.beige }]}>Cadastrar-se</Text>
            <Text style={styles.description}>
              Informe-nos os dados básicos para criar a {'\n'}sua conta GPets
            </Text>
          </View>

          <View style={styles.inputArea}>
            <Controller
              control={control}
              name='name'
              render={({ field, fieldState }) => (
                <InputField
                  label='Nome da Instituição'
                  placeholder='Digite aqui...'
                  type='name'
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='email'
              render={({ field, fieldState }) => (
                <InputField
                  label='E-mail'
                  placeholder='Digite aqui...'
                  type='email'
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </View>

          <View style={styles.submitArea}>
            <Button
              text='Continuar'
              variant='beige'
              onPress={() => {
                trigger(['name', 'email']).then(valid => {
                  if (valid) goNext();
                });
              }}
            />
          </View>
        </View>
      </>
    );
  }

  function Step2() {
    return (
      <>
        <View style={styles.backSection}><BackArrow text={'Voltar'} onPress={goBack}/></View>

        <View style={styles.content}>
          <View style={styles.textArea}>
            <Text style={[fontStyles.title_2, { color: colors.beige }]}>Cadastrar-se</Text>
            <Text style={styles.description}>
              Precisamos de alguns dados oficiais para {'\n'}garantir a credibilidade da sua ONG
            </Text>
          </View>

          <View style={styles.inputArea}>
            <Controller
              control={control}
              name='cnpj'
              render={({ field, fieldState }) => (
                <InputField
                  label='CNPJ'
                  placeholder='Digite aqui...'
                  type='cnpj'
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='address'
              render={({ field, fieldState }) => (
                <InputField
                  label='Endereço'
                  placeholder='Digite aqui...'
                  type='address'
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </View>

          <View style={styles.submitArea}>
            <Button
              text='Continuar'
              variant='beige'
              onPress={() => {
                trigger(['cnpj', 'address']).then(valid => {
                  if (valid) goNext();
                });
              }}
            />
          </View>
        </View>
      </>
    );
  }

  function Step3() {
    return (
      <>
        <View style={styles.backSection}><BackArrow text={'Voltar'} onPress={goBack}/></View>

        <View style={styles.content}>
          <View style={styles.textArea}>
            <Text style={[fontStyles.title_2, { color: colors.beige }]}>Cadastrar-se</Text>
            <Text style={styles.description}>
              Estamos quase lá! Crie uma senha forte para {'\n'}concluir o cadastro da sua ONG
            </Text>
          </View>

          <View style={styles.inputArea}>
            <Controller
              control={control}
              name='password'
              render={({ field, fieldState }) => (
                <InputField
                  label='Senha'
                  placeholder='Digite aqui...'
                  type='password'
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='confirmPassword'
              render={({ field, fieldState }) => (
                <InputField
                  label='Confirme sua senha'
                  placeholder='Digite aqui...'
                  type='password'
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </View>

          <View style={styles.submitArea}>
            <Button 
              text='Finalizar cadastro' 
              variant='beige'
              onPress={() => {
                trigger(['password', 'confirmPassword']).then(valid => {
                  if (valid) finishRegister();
                });
              }}
            />
          </View>
        </View>
      </>
    );
  }

  function Step4() {
    return (
      <View style={styles.contentFinal}>
        <View style={styles.checkSection}>
          <View style={styles.checkBackground} />
          <Check size={88} color={colors.green} />
        </View>

        <View style={styles.textArea}>
          <Text style={[fontStyles.title_2, { color: colors.beige }]}>Cadastro concluído</Text>
          <Text style={styles.description}>
            Sua conta Gpets foi criada com sucesso. Seja {'\n'}bem-vindo à comunidade do GPets!
          </Text>
        </View>

        <View style={styles.submitArea}>
          <Button
            text='Continuar'
            variant='beige'
            onPress={onBackToLogin}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
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
  contentFinal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 160
  },
  textArea: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 24
  },
  description: {
    textAlign: 'center',
    ...fontStyles.subtitle_2,
    color: colors.beige
  },
  checkSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkBackground: {
    backgroundColor: colors.beige,
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute'
  },
  inputArea: {
    alignItems: 'flex-end',
    marginBottom: 24
  },
  submitArea: {
    gap: 12
  }
});