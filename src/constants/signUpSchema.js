import { z } from 'zod';
import { isValidCNPJ } from '@utils/cnpj';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .nonempty('Campo obrigatório'),
    email: z
      .string()
      .nonempty('Campo obrigatório')
      .email('Email inválido'),
    cnpj: z
      .string()
      .min(18, 'CNPJ incompleto')
      .refine(isValidCNPJ, 'CNPJ inválido'),
    address: z
      .string()
      .nonempty('Campo obrigatório'),
    password: z
      .string()
      .nonempty('Campo obrigatório')
      .min(6, 'Senha muito curta'),
    confirmPassword: z
      .string()
      .nonempty('Campo obrigatório')
      .min(6, 'Senha muito curta')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas devem ser iguais',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .nonempty('Campo obrigatório')
      .email('Email inválido')
  });

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty('Campo obrigatório')
      .min(6, 'Senha muito curta'),
    confirmPassword: z
      .string()
      .nonempty('Campo obrigatório')
      .min(6, 'Senha muito curta')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas devem ser iguais',
    path: ['confirmPassword'],
  });