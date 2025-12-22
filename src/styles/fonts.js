import { StyleSheet } from 'react-native';
import { colors } from '@styles/colors';

export const fontStyles = StyleSheet.create({
  title_1: {
    fontFamily: 'Geologica-Bold',
    fontSize: 32,
    color: colors.white,
    lineHeight: 40
  },
  title_2: {
    fontFamily: 'Geologica-Bold',
    fontSize: 24,
    color: colors.dark
  },
  title_3: {
    fontFamily: 'Geologica-Medium',
    fontSize: 20,
    color: colors.dark
  },
  title_4: {
    fontFamily: 'Geologica-Regular',
    fontSize: 20,
    color: colors.dark
  },
  subtitle_1: {
    fontFamily: 'Geologica-Medium',
    fontSize: 16,
    color: colors.dark
  },
  subtitle_2: {
    fontFamily: 'Geologica-Regular',
    fontSize: 16,
    color: colors.dark
  },
  buttonText: {
    fontFamily: 'Geologica-Medium',
    fontSize: 16,
    color: colors.dark
  },
  inputText: {
    fontFamily: 'Geologica-Medium',
    fontSize: 16,
    color: colors.dark
  },
  commentUsername: {
    fontFamily: 'Geologica-Bold',
    fontSize: 16,
    color: colors.dark
  },
  commentTimestamp: {
    fontFamily: 'Geologica-Medium',
    fontSize: 12,
    color: colors.dark
  },
  commentContent: {
    fontFamily: 'Geologica-Regular',
    fontSize: 14,
    color: colors.dark
  },
  messageNumber: {
    fontFamily: 'Geologica-Bold',
    fontSize: 12,
    color: colors.white
  },
  forgotPassword: {
    fontFamily: 'Geologica-Regular',
    fontSize: 14,
    color: colors.beige,
    textDecorationLine: 'underline'
  },
  postTitle: {
    fontFamily: 'Geologica-Medium',
    fontSize: 18,
    color: colors.dark
  },
  postSubtitle: {
    fontFamily: 'Geologica-Medium',
    fontSize: 14,
    color: colors.darkGrey
  },
  postChipLabel: {
    fontFamily: 'Geologica-Medium',
    fontSize: 14,
    color: colors.white,
  },
  postTag: {
    fontFamily: 'Geologica-Medium',
    fontSize: 18
  },
  postDescription: {
    fontFamily: 'Geologica-Regular',
    fontSize: 16,
    color: colors.darkGrey
  },
});