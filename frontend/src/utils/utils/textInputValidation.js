export function hasAtLeastOneLetter(value) {
  if (!value) return false;
  return /[a-zA-ZÀ-ÿ]/.test(value);
}

export function isEmailValid(value) {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}