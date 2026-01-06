export function hasAtLeastOneLetter(value) {
  if (!value) return false;
  return /[a-zA-ZÀ-ÿ]/.test(value);
}