import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';

export function SelectState({ selectedState }) {
  const { theme } = useTheme();
  const states = ['Situação', 'Local', 'Foto', 'Sobre', 'Prévia']
  
  const selectedIndex = states.indexOf(selectedState);

  return (
    <View style={styles.selectContainer}>
      {states.map((state, index) => {
        const isPrevious = index < selectedIndex;
        const isSelected = index === selectedIndex;
        
        return (
          <View key={index} style={[styles.stateChip, 
            isPrevious && { backgroundColor: theme.completedStep },
            isSelected && { backgroundColor: colors.yellow },
            !isPrevious && !isSelected && {
              borderWidth: 1,
              borderColor: colors.disabled
            }
          ]}>
            <Text style={[fontStyles.commentTimestamp,
              isPrevious && { color: theme.iconBackground },
              isSelected && { color: theme.chip },
              !isPrevious && !isSelected && { color: colors.disabled },
            ]}>{state}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4
  },
  stateChip: {
    width: 72,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  }
});