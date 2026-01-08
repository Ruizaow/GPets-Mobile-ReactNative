import prisma from '../lib/prismaClient.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/index.js';

export const authService = {
  login: async (loginData) => {
    // Pega os dados passados por requisição
    const { email, password } = loginData;

    // Verifica se o usuário existe (por email)
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new Error('O email informado está incorreto.');

    // Verifica se a senha é válida
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new Error('A senha informada está incorreta.');

    // Gera o token do usuário
    const token = generateToken(user);

    // Envia os dados do login (mensagem de sucesso, dados do usuário, token do usuário) por resposta
    return {
      message: 'Usuário LOGADO com sucesso!',
      user: user,
      token: token
    };
  }
};