export function onlyNumbers(value) {
  return value.replace(/\D/g, "");
}

export function formatCNPJ(value) {
  const numbers = onlyNumbers(value);

  return numbers
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
}

export function isValidCNPJ(cnpj) {
  const cleaned = onlyNumbers(cnpj);

  if (cleaned.length !== 14) return false;

  if (/^(\d)\1+$/.test(cleaned)) return false;

  const calcDigit = (base, weights) => {
    let sum = 0;

    for (let i = 0; i < weights.length; i++) {
      sum += Number(base[i]) * weights[i];
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const base = cleaned.slice(0, 12);

  const digit1 = calcDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const digit2 = calcDigit(
    base + digit1,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  return cleaned.endsWith(`${digit1}${digit2}`);
}