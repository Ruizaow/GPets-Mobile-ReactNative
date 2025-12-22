import { colors } from './colors';

export const lightTheme = {
  name: 'light',
  background: colors.beige,
  card: colors.white,
  post: colors.white,
  border: colors.blue,
  mapBorder: colors.grey,
  commentInput: colors.greyAlt,
  reportButtonText: colors.blue,
  chip: colors.dark,
  completedStep: colors.green,
  primaryText: colors.dark,
  secondaryText: colors.darkGrey,
  lineDivision: colors.darkGreyAlt,
  navBackground: colors.beige,
  iconBackground: colors.beige,
  overlay: 'rgba(0, 0, 0, 0.6)',
};

export const darkTheme = {
  name: 'dark',
  background: colors.dark,
  card: colors.darkGrey,
  post: colors.dark,
  border: colors.white,
  mapBorder: colors.white,
  commentInput: colors.white,
  reportButtonText: colors.dark,
  chip: colors.darkerDark,
  completedStep: colors.blue,
  primaryText: colors.white,
  secondaryText: colors.white,
  lineDivision: colors.white,
  navBackground: colors.dark,
  iconBackground: colors.white,
  overlay: 'rgba(255, 255, 255, 0.2)',
};