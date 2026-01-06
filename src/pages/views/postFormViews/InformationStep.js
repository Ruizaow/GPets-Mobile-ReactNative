import { StyleSheet, ScrollView, View, Text, FlatList, TouchableOpacity, Pressable, Animated } from 'react-native';
import { Trash, Venus, Mars, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useRef, useState, useEffect } from 'react';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { SelectState } from '@components/selectState';
import { FormInputField } from '@components/formInputField';
import { Radio } from '@components/radio';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { hasAtLeastOneLetter } from '@utils/textInputValidation';
import { formatPhone, isPhoneValid } from '@utils/phoneUtils';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function InformationStep({ postType, data, dataAddress, onChange, onChangeAddress, onGoBack, onGoNext, onDiscard }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const isEvent = postType === 'Evento/publicidade';

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState(null);
  const monthRef = useRef(null);
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dropdownAnim.setValue(dropdownOpen ? 0 : 1);

    Animated.timing(dropdownAnim, {
      toValue: dropdownOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [dropdownOpen]);

  function updateData(field, value) {
    onChange({ [field]: value });
  }
  function updateDataAdress(value) {
    onChangeAddress({ address: value });
  }
  function toggleRadio(field, value) {
    onChange({ [field]: data[field] === value ? null : value });
  }

  useEffect(() => {
    if (data.nomeTutor === 'Não possui') {
      updateData('usuarioTutor', null);
    }
  }, [data.nomeTutor]);
  
  function isLeapYear(year) {
    if (!year) return false;
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  function getMaxDays(month, year) {
    if (!month) return 31;

    const months31 = ['Janeiro', 'Março', 'Maio', 'Julho', 'Agosto', 'Outubro', 'Dezembro'];
    const months30 = ['Abril', 'Junho', 'Setembro', 'Novembro'];

    if (months31.includes(month)) return 31;
    if (months30.includes(month)) return 30;

    return isLeapYear(Number(year)) ? 29 : 28;
  }

  function isValidDate(day, month, year) {
    if (!day || !month || !year) return false;

    const maxDay = getMaxDays(month, year);
    return Number(day) >= 1 && Number(day) <= maxDay;
  }

  useEffect(() => {
    if (!data.dia) return;

    const maxDay = getMaxDays(data.mes, data.ano);

    if (Number(data.dia) > maxDay) {
      updateData('dia', '');
    }
  }, [data.mes, data.ano]);

  const isPetFormValid =
    (hasAtLeastOneLetter(data.nome) || data.nome === 'Sem nome') &&
    (hasAtLeastOneLetter(data.raca) || data.raca === 'Sem raça' || data.raca === 'Raça desconhecida') &&
    hasAtLeastOneLetter(data.descricao) &&
    isValidDate(data.dia, data.mes, data.ano) &&
    (hasAtLeastOneLetter(data.nomeTutor) || data.nomeTutor === 'Não possui') &&
    (data.usuarioTutor !== null || data.nomeTutor === 'Não possui') &&
    isPhoneValid(data.telefone);
  
  const isEventFormValid =
    hasAtLeastOneLetter(data.nome) &&
    hasAtLeastOneLetter(data.descricao) &&
    hasAtLeastOneLetter(dataAddress) &&
    isValidDate(data.dia, data.mes, data.ano) &&
    isPhoneValid(data.telefone);

  return (
    <View style={[styles.stepContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={postType}
        onPress={onGoBack}
        showLineDivision={false}
        icon={Trash}
        iconColor={colors.red}
        onPressIcon={onDiscard}
      />
      <SelectState selectedState={'Sobre'} postType={postType}/>
      
      {dropdownOpen && (
        <Pressable
          style={styles.dropdownBackdrop}
          onPress={() => setDropdownOpen(false)}
        />
      )}
      <Animated.View
        pointerEvents={dropdownOpen ? 'auto' : 'none'}
        style={[styles.dropdownList, {
          width: 142,
          top: dropdownLayout?.y + dropdownLayout?.height,
          left: dropdownLayout?.x,
          opacity: dropdownAnim,
          transform: [{ translateY: dropdownAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-8, 0]
          })}]
        }]}
      >
        <FlatList
          data={months}
          keyExtractor={item => item}
          style={{ maxHeight: 150 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                updateData('mes', item);
                setDropdownOpen(false);
              }}
            >
              <Text style={styles.label}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
      
      <ScrollView scrollEnabled={!dropdownOpen}>
        {isEvent ? (
          <View style={styles.content}>
            <View style={styles.titles}>
              <Text style={[fontStyles.title_3, {color: theme.primaryText}]}>
                Informações básicas
              </Text>
              <Text style={[fontStyles.subtitle_2, {color: theme.primaryText}]}>
                Preencha os campos para que a sua divulgação seja mais eficaz.
              </Text>
            </View>

            <FormInputField
              label='Nome do evento'
              required
              value={data.nome}
              onChangeText={text => updateData('nome', text)}
            />
            <FormInputField
              label='Descrição'
              required
              value={data.descricao}
              onChangeText={text => updateData('descricao', text)}
            />
            <FormInputField
              label='Local do evento'
              required
              value={dataAddress}
              onChangeText={(text => updateDataAdress(text))}
            />

            <View style={styles.infoArea}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: theme.primaryText } ]}>Data do evento</Text>
                <Text style={styles.mandatory}>*</Text>
              </View>
              <View style={styles.dateLine}>
                <FormInputField
                  value={data.dia}
                  onChangeText={text => {
                    const cleanedText = text.replace(/[^0-9]/g, '');
                    const day = Number(cleanedText);

                    const maxDay = getMaxDays(data.mes, data.ano);

                    if (day <= maxDay) {
                      updateData('dia', cleanedText);
                    }
                  }}
                  inputStyle={{ width: 52 }}
                  keyboardType='number-pad'
                  maxLength={2}
                  placeholder='Dia'
                />
                <Text style={[styles.label, { color: theme.primaryText } ]}>de</Text>
                <View>
                  <TouchableOpacity
                    ref={monthRef}
                    style={[styles.dropdownField, { borderColor: theme.primaryText } ]}
                    onPress={() => {
                      monthRef.current?.measureInWindow((x, y, width, height) => {
                        setDropdownLayout({ x, y, width, height });
                        setDropdownOpen(prev => !prev);
                      });
                    }}
                  >
                    <Text style={[styles.label, {
                      color: data.mes ? theme.primaryText : theme.inputText
                    }]}>
                      {data.mes || 'Mês'}
                    </Text>
                    {dropdownOpen
                      ? <ChevronUp size={24} color={theme.primaryText}/>
                      : <ChevronDown size={24} color={theme.primaryText}/>
                    }
                  </TouchableOpacity>
                </View>
                <Text style={[styles.label, { color: theme.primaryText } ]}>de</Text>
                <FormInputField
                  value={data.ano}
                  onChangeText={text => {
                    const cleanedText = text.replace(/[^0-9]/g, '');
                    const year = Number(cleanedText);

                    if (year <= 2026) {
                      updateData('ano', cleanedText);
                    }
                  }}
                  inputStyle={{ width: 70 }}
                  keyboardType='number-pad'
                  maxLength={4}
                  placeholder='Ano'
                />
              </View>
            </View>

            <View style={styles.infoArea}>
              <FormInputField
                label='Telefone de contato'
                required
                value={data.telefone === 'Não possui' ? '' : data.telefone}
                onChangeText={text => {
                  const formatted = formatPhone(text);
                  updateData('telefone', formatted);
                }}
                editable={data.telefone !== 'Não possui'}
                disabled={data.telefone === 'Não possui'}
                keyboardType='number-pad'
                placeholder='(+DD) 99999-9999'
              />
              <Radio
                selected={data.telefone === 'Não possui'}
                onPress={() => toggleRadio('telefone', 'Não possui')}
                label='Não possui'
              />
            </View>

            <View style={styles.continueButton}>
              <Button
                text='Concluir'
                variant={isEventFormValid ? 'blueBeige' : 'disabled'}
                size={'custom'}
                onPress={onGoNext}
                isDisabled={!isEventFormValid}
              />
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.titles}>
              <Text style={[fontStyles.title_3, {color: theme.primaryText}]}>
                Adicione mais informações
              </Text>
              <Text style={[fontStyles.subtitle_2, {color: theme.primaryText}]}>
                Quanto mais detalhes, mais rápido será o reencontro e a ajuda. Informe tudo aqui.
              </Text>
            </View>

            <View style={styles.infoArea}>
              <FormInputField
                label='Nome do Pet'
                required
                value={data.nome === 'Sem nome' ? '' : data.nome}
                onChangeText={text => updateData('nome', text)}
                editable={data.nome !== 'Sem nome'}
                disabled={data.nome === 'Sem nome'}
              />
              <Radio
                selected={data.nome === 'Sem nome'}
                onPress={() => toggleRadio('nome', 'Sem nome')}
                label='Não possui'
              />
            </View>

            <View style={styles.infoArea}>
              <Text style={[styles.label, { color: theme.primaryText } ]}>Selecione o sexo do Pet:</Text>
              <View style={styles.radiosLine}>
                <Radio
                  selected={data.sexo === 'Fêmea'}
                  onPress={() => toggleRadio('sexo', 'Fêmea')}
                  label='Fêmea'
                  icon={Venus}
                  iconColor={colors.red}
                />
                <Radio
                  selected={data.sexo === 'Macho'}
                  onPress={() => toggleRadio('sexo', 'Macho')}
                  label='Macho'
                  icon={Mars}
                  iconColor={colors.blue}
                />
              </View>
            </View>

            <View style={styles.infoArea}>
              <FormInputField
                label='Raça'
                required
                value={data.raca === 'Sem raça' || data.raca === 'Raça desconhecida' ? '' : data.raca}
                onChangeText={text => updateData('raca', text)}
                editable={data.raca !== 'Sem raça' && data.raca !== 'Raça desconhecida'}
                disabled={data.raca === 'Sem raça' || data.raca === 'Raça desconhecida'}
              />
              <View style={styles.radiosLine}>
                <Radio
                  selected={data.raca === 'Sem raça'}
                  onPress={() => toggleRadio('raca', 'Sem raça')}
                  label='Não possui'
                />
                <Radio
                  selected={data.raca === 'Raça desconhecida'}
                  onPress={() => toggleRadio('raca', 'Raça desconhecida')}
                  label='Não sei'
                />
              </View>
            </View>

            <View style={styles.infoArea}>
              <Text style={[styles.label, { color: theme.primaryText } ]}>Selecione o temperamento do Pet:</Text>
              <View style={styles.radiosLine}>
                <Radio
                  selected={data.temper === 'Amigável'}
                  onPress={() => toggleRadio('temper', 'Amigável')}
                  label='Amigável'
                />
                <Radio
                  selected={data.temper === 'Bravo'}
                  onPress={() => toggleRadio('temper', 'Bravo')}
                  label='Bravo'
                />
                <Radio
                  selected={data.temper === 'Medroso'}
                  onPress={() => toggleRadio('temper', 'Medroso')}
                  label='Medroso'
                />
              </View>
            </View>

            <FormInputField
              label='Descrição'
              required
              value={data.descricao}
              onChangeText={text => updateData('descricao', text)}
            />

            <View style={styles.infoArea}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: theme.primaryText } ]}>Data em que foi visto(a) pela última vez</Text>
                <Text style={styles.mandatory}>*</Text>
              </View>
              <View style={styles.dateLine}>
                <FormInputField
                  value={data.dia}
                  onChangeText={text => {
                    const cleanedText = text.replace(/[^0-9]/g, '');
                    const day = Number(cleanedText);

                    const maxDay = getMaxDays(data.mes, data.ano);

                    if (day <= maxDay) {
                      updateData('dia', cleanedText);
                    }
                  }}
                  inputStyle={{ width: 52 }}
                  keyboardType='number-pad'
                  maxLength={2}
                  placeholder='Dia'
                />
                <Text style={[styles.label, { color: theme.primaryText } ]}>de</Text>
                <View>
                  <TouchableOpacity
                    ref={monthRef}
                    style={[styles.dropdownField, { borderColor: theme.primaryText } ]}
                    onPress={() => {
                      monthRef.current?.measureInWindow((x, y, width, height) => {
                        setDropdownLayout({ x, y, width, height });
                        setDropdownOpen(prev => !prev);
                      });
                    }}
                  >
                    <Text style={[styles.label, {
                      color: data.mes ? theme.primaryText : theme.inputText
                    }]}>
                      {data.mes || 'Mês'}
                    </Text>
                    {dropdownOpen
                      ? <ChevronUp size={24} color={theme.primaryText}/>
                      : <ChevronDown size={24} color={theme.primaryText}/>
                    }
                  </TouchableOpacity>
                </View>
                <Text style={[styles.label, { color: theme.primaryText } ]}>de</Text>
                <FormInputField
                  value={data.ano}
                  onChangeText={text => {
                    const cleanedText = text.replace(/[^0-9]/g, '');
                    const year = Number(cleanedText);

                    if (year <= 2026) {
                      updateData('ano', cleanedText);
                    }
                  }}
                  inputStyle={{ width: 70 }}
                  keyboardType='number-pad'
                  maxLength={4}
                  placeholder='Ano'
                />
              </View>
            </View>

            <View style={styles.infoArea}>
              <FormInputField
                label='Nome do tutor'
                required
                value={data.nomeTutor === 'Não possui' ? '' : data.nomeTutor}
                onChangeText={text => updateData('nomeTutor', text)}
                editable={data.nomeTutor !== 'Não possui'}
                disabled={data.nomeTutor === 'Não possui'}
              />
              <Radio
                selected={data.nomeTutor === 'Não possui'}
                onPress={() => toggleRadio('nomeTutor', 'Não possui')}
                label='Não possui'
              />
            </View>

            <View style={styles.infoArea}>
              <View style={styles.labelRow}>
                <Text style={[
                  styles.label, { color: theme.primaryText },
                  data.nomeTutor === 'Não possui' && { color: colors.disabled }
                ]}>Você é o tutor?</Text>
                <Text style={[
                  styles.mandatory,
                  data.nomeTutor === 'Não possui' && { color: colors.disabled }
                ]}>*</Text>
              </View>
              <View style={styles.radiosLine}>
                <Radio
                  selected={data.usuarioTutor === true && data.nomeTutor !== 'Não possui'}
                  onPress={() => toggleRadio('usuarioTutor', true)}
                  label='Sim'
                  disabled={data.nomeTutor === 'Não possui'}
                />
                <Radio
                  selected={data.usuarioTutor === false && data.nomeTutor !== 'Não possui'}
                  onPress={() => toggleRadio('usuarioTutor', false)}
                  label='Não'
                  disabled={data.nomeTutor === 'Não possui'}
                />
              </View>
            </View>

            <View style={styles.infoArea}>
              <FormInputField
                label='Telefone de contato'
                required
                value={data.telefone === 'Não possui' ? '' : data.telefone}
                onChangeText={text => {
                  const formatted = formatPhone(text);
                  updateData('telefone', formatted);
                }}
                editable={data.telefone !== 'Não possui'}
                disabled={data.telefone === 'Não possui'}
                keyboardType='number-pad'
                placeholder='(+DD) 99999-9999'
              />
              <Radio
                selected={data.telefone === 'Não possui'}
                onPress={() => toggleRadio('telefone', 'Não possui')}
                label='Não possui'
              />
            </View>

            <View style={styles.continueButton}>
              <Button
                text='Concluir'
                variant={isPetFormValid ? 'blueBeige' : 'disabled'}
                size={'custom'}
                onPress={onGoNext}
                isDisabled={!isPetFormValid}
              />
            </View>
          </View>
        )}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1
  },
  content: {
    marginTop: 32,
    marginBottom: 96,
    paddingHorizontal: 32,
    gap: 24
  },
  titles: {
    gap: 12
  },
  infoArea: {
    gap: 12
  },
  labelRow: {
    flexDirection: 'row'
  },
  label: {
    ...fontStyles.subtitle_1,
  },
  mandatory: {
    ...fontStyles.subtitle_1,
    color: colors.red
  },
  radiosLine: {
    flexDirection: 'row',
    gap: 24
  },
  dateLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11
  },
  dropdownField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    width: 142,
    padding: 12,
  },
  dropdownBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  dropdownList: {
    position: 'absolute',
    zIndex: 2,
    elevation: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: colors.white,
    marginTop: 60
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  continueButton: {
    flexDirection: 'row',
    marginTop: 12
  }
});