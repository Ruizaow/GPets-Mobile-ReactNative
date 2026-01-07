export function formatPhone(value) {
  const numbers = value.replace(/\D/g, '').slice(0, 11);

  if (numbers.length <= 2) {
    return numbers ? `(+${numbers}` : '';
  }
  if (numbers.length <= 7) {
    return `(+${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  return `(+${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
}

export function isPhoneValid(value) {
  if (value === 'Não possui') return true;
  if (!value) return false;

  const numbers = value.replace(/\D/g, '');
    
  return numbers.length === 11;
}