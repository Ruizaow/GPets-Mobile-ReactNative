const DEFAULT_SIZE = 52;
const DEFAULT_ICON_SIZE = 28;

export function getIconSize(size) {
  if (!size || size === DEFAULT_SIZE)
    return DEFAULT_ICON_SIZE;

  const scale = size / DEFAULT_SIZE;
  return Math.round(DEFAULT_ICON_SIZE * scale);
}