import { colors } from '@styles/colors.js';

export function getStatusColor(status) {
  switch (status) {
    case 'Perdido':
      return colors.red;
    case 'Desabrigado':
      return colors.orange;
    case 'Resgatado':
      return colors.blue;
    case 'Encontrado':
      return colors.green;
    default:
      return colors.dark;
  }
}