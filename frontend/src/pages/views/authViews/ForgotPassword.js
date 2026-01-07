import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@constants/signUpSchema';
import { Button } from '@components/button';
import { InputField } from '@components/inputField';
import { BackArrow } from '@components/backArrow';
import { Check } from 'lucide-react-native';
import { colors } from '@styles/colors';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function ForgotPassword({
  animatedOffset,
  onBackToLogin,
  onGoToChangePassword,
}) {
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [step, setStep] = useState(1);

  const { control, trigger, reset, getValues } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    reset(getValues(), { keepValues: true });
  }, [step]);

  function goNext() {
    if (step < 3) setStep(step + 1);
  }
  function goBack() {
    if (step > 1) setStep(step - 1);
  }

  function Step1() {
    return [
      <View key='back' style={styles.backSection}>
        <BackArrow text={'Voltar'} onPress={onBackToLogin} />
      </View>,

      <View key='content' style={styles.content}>
        <View style={styles.textArea}>
          <Text style={[fontStyles.title_2, { color: colors.beige }]}>
            Recuperação de senha
          </Text>
          <Text style={styles.description}>
            Esqueceu sua senha? Não se preocupe, {'\n'}estamos aqui para ajudar
          </Text>
        </View>

        <View style={styles.inputArea}>
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
              trigger(['email']).then((valid) => {
                if (valid) goNext();
              });
            }}
          />
        </View>
      </View>,
    ];
  }

  function Step2() {
    return [
      <View key='back' style={styles.backSection}>
        <BackArrow text={'Voltar'} onPress={goBack} />
      </View>,

      <View key='content' style={styles.content}>
        <View style={styles.textArea}>
          <Text style={[fontStyles.title_2, { color: colors.beige }]}>
            Confirmação de E-mail
          </Text>
          <Text style={styles.description}>
            Enviamos uma mensagem de confirmação {'\n'}para o seu endereço.
            Verifique a sua caixa de {'\n'}entrada para continuar
          </Text>
        </View>

        <View style={styles.submitArea}>
          <Button
            text='Remover este botão depois'
            variant='signUp'
            onPress={() => {
              goNext();
            }}
          />
        </View>
      </View>,
    ];
  }

  function Step3() {
    return [
      <View key='final' style={styles.contentFinal}>
        <View style={styles.checkSection}>
          <View style={styles.checkBackground} />
          <Check size={88} color={colors.green} />
        </View>

        <View style={styles.textArea}>
          <Text style={[fontStyles.title_2, { color: colors.beige }]}>
            E-mail verificado
          </Text>
          <Text style={styles.description}>Obrigado pela confirmação</Text>
        </View>

        <View style={styles.submitArea}>
          <Button
            text='Continuar'
            variant='beige'
            onPress={onGoToChangePassword}
          />
        </View>
      </View>,
    ];
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: animatedOffset }] } ]}>
      {step === 1 && Step1()}
      {step === 2 && Step2()}
      {step === 3 && Step3()}
      <StatusBar style='auto' />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.blue,
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
  contentFinal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 160,
  },
  textArea: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  description: {
    textAlign: 'center',
    ...fontStyles.subtitle_2,
    color: colors.beige,
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
    position: 'absolute',
  },
  inputArea: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  submitArea: {
    gap: 12,
  },
});