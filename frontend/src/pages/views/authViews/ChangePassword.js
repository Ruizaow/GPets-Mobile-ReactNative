import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Animated, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@context/ThemeContext';
import { changePasswordSchema } from '@constants/signUpSchema';
import { Button } from '@components/button';
import { InputField } from '@components/inputField';
import { BackArrow } from '@components/backArrow';
import { Check } from 'lucide-react-native';
import { colors } from '@styles/colors';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function ChangePassword({ animatedOffset, onBackToLogin }) {
  const { theme } = useTheme();
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
          <Text style={[fontStyles.title_2, { color: theme.primaryText }]}>
            Nova senha
          </Text>
          <Text style={[styles.description, { color: theme.primaryText }]}>
            Crie uma senha forte e segura para proteger a sua conta no
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
                textColor={colors.dark}
                bgColor={colors.grey}
                phColor={'rgba(50, 58, 66, 0.4)'}
                labelColor={theme.primaryText}
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
                textColor={colors.dark}
                bgColor={colors.grey}
                phColor={'rgba(50, 58, 66, 0.4)'}
                labelColor={theme.primaryText}
              />
            )}
          />
        </View>

        <View style={styles.submitArea}>
          <View style={styles.button}>
            <Button
              text='Finalizar'
              textColor={colors.beige}
              bgColor={colors.blue}
              onPress={() => {
                trigger(['password', 'confirmPassword']).then((valid) => {
                  if (valid) setStep(2);
                });
              }}
            />
          </View>
        </View>
      </View>,
    ];
  }

  function Step2() {
    return [
      <View key='final' style={styles.contentFinal}>
        <View style={styles.checkSection}>
          <View style={styles.checkBackground}/>
          <View style={styles.checkIcon}>
            <Check size={88} color={theme.iconBackground}/>
          </View>
        </View>

        <View style={styles.textArea}>
          <Text style={[fontStyles.title_2, { color: theme.primaryText }]}>
            Senha alterada
          </Text>
          <Text style={[styles.description, { color: theme.primaryText }]}>
            Cuide bem da sua nova senha!
          </Text>
        </View>

        <View style={styles.submitArea}>
          <View style={styles.button}>
            <Button
              text='Continuar'
              textColor={colors.beige}
              bgColor={colors.blue}
              onPress={onBackToLogin}
            />
          </View>
        </View>
      </View>
    ];
  }

  return (
    <Animated.View style={[styles.container, {
      transform: [{ translateY: animatedOffset }],
      backgroundColor: theme.background
    }]}>
      {step === 1 && Step1()}
      {step === 2 && Step2()}
      <StatusBar style='auto' />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32
  },
  backSection: {
    paddingHorizontal: 32,
    marginTop: 80,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32
  },
  contentFinal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 160,
    paddingHorizontal: 32
  },
  textArea: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  description: {
    textAlign: 'center',
    ...fontStyles.subtitle_2
  },
  checkSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkBackground: {
    backgroundColor: colors.green,
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
  },
  checkIcon: {
    zIndex: 1
  },
  inputArea: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24
  },
  submitArea: {
    width: '100%',
    gap: 12
  },
  button: {
    flexDirection: 'row'
  }
});
