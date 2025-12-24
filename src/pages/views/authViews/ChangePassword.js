import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '@constants/signUpSchema';
import { Button } from '@components/button';
import { InputField } from '@components/inputField';
import { BackArrow } from '@components/backArrow';
import { Check } from 'lucide-react-native';
import { colors } from '@styles/colors';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function ChangePassword({ animatedOffset, onBackToLogin }) {
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [step, setStep] = useState(1);

  const { control, trigger, reset, getValues } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  useEffect(() => {
    reset(getValues(), { keepValues: true });
  }, [step]);

  function Step1() {
    return [
      <View key='back' style={styles.backSection}>
        <BackArrow text={'Voltar'} onPress={onBackToLogin} />
      </View>,

      <View key='content' style={styles.content}>
        <View style={styles.textArea}>
          <Text style={[fontStyles.title_2, { color: colors.beige }]}>
            Nova senha
          </Text>
          <Text style={styles.description}>
            Crie uma senha forte e segura para proteger {'\n'}a sua conta no
            GPets e finalizar o processo
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
            text='Finalizar'
            variant='beige'
            onPress={() => {
              trigger(['password', 'confirmPassword']).then((valid) => {
                if (valid) setStep(2);
              });
            }}
          />
        </View>
      </View>,
    ];
  }

  function Step2() {
    return [
      <View key='final' style={styles.contentFinal}>
        <View style={styles.checkSection}>
          <View style={styles.checkBackground} />
          <Check size={88} color={colors.green} />
        </View>

        <View style={styles.textArea}>
          <Text style={[fontStyles.title_2, { color: colors.beige }]}>
            Senha alterada
          </Text>
          <Text style={styles.description}>Cuide bem da sua nova senha!</Text>
        </View>

        <View style={styles.submitArea}>
          <Button text='Continuar' variant='beige' onPress={onBackToLogin} />
        </View>
      </View>
    ];
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: animatedOffset }] } ]}>
      {step === 1 && Step1()}
      {step === 2 && Step2()}
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
    marginBottom: 24,
  },
  submitArea: {
    gap: 12,
  },
});
