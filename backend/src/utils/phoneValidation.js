export const isPhoneValid = (value) => {
  if (value === '') return true;
  if (!value) return false;

  const numbers = value.replace(/\D/g, '');
    
  return numbers.length === 11;
}
export default isPhoneValid;