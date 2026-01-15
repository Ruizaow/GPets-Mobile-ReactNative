import prisma from '../lib/prismaClient.js';
import bcrypt from 'bcryptjs';
import { generateToken, isPhoneValid } from '../utils/index.js';

export const userService = {
  getAll: async () => {
    const users = await prisma.user.findMany();

    return {
      message: 'Aqui está a lista de usuários.',
      users
    };
  },

  get: async (id) => {
    const user = await prisma.user.findUnique({ 
      where: { id: id } 
    })

    // Verifica se o usuário buscado existe
    if (!user) throw new Error('Usuário não identificado.');

    return {
      message: `Aqui está o usuário ${id}.`,
      user
    };
  },

  create: async (userData) => {
    // Pega os dados passados por requisição
    const { name, email, cnpj, address, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verifica se o usuário está tentando cadastrar um email que já existe
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail)
      throw new Error('o e-mail cadastrado já existe.');

    // Verifica se o usuário está tentando cadastrar um CNPJ que já existe
    const existingCNPJ = await prisma.user.findUnique({ where: { cnpj } });
    if (existingCNPJ)
      throw new Error('o CNPJ cadastrado já existe.');

    // Verifica se o papel de usuário é válido
    if (!['USER', 'ORGANIZATION'].includes(role))
      throw new Error('Papel de usuário inválido.');

    // Cria o usuário na tabela
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        cnpj,
        address,
        password: hashedPassword,
        role,
        bio: '',
        phone: ''
      },
    });

    // Gera o token do usuário
    const token = generateToken(newUser);

    // Envia os dados do cadastro (mensagem de sucesso, dados do usuário) por resposta
    return {
      message: 'Usuário CADASTRADO com sucesso!',
      user: newUser,
      token
    };
  },

  update: async (userId, userData) => {
    const user = await prisma.user.findUnique({ 
      where: { id: userId } 
    })
    // Verifica se o usuário a ser editado existe
    if (!user)
      throw new Error('Usuário não identificado.');
    
    const { name, bio, email, phone, address, imageUrl } = userData;

    // Verifica se o usuário está alterando o email para um que já existe (exceto o seu próprio atual)
    const existingEmail = await prisma.user.findUnique({ where: { email, NOT: { id: userId } } });
    if (existingEmail)
      throw new Error('o e-mail informado já existe.');

    // Verifica se o número de telefone informado é válido
    if (!isPhoneValid(phone))
      throw new Error('o número de telefone informado é inválido.');

    const updatedData = {};
    if (name) updatedData.name = name;
    if (bio || bio === '') updatedData.bio = bio;
    if (email) updatedData.email = email;
    if (phone || phone === '') updatedData.phone = phone;
    if (address) updatedData.address = address;
    updatedData.imageUrl = imageUrl;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    return {
      message: `Usuário ${userId} ATUALIZADO com sucesso!.`,
      user: updatedUser
    };
  },

  delete: async (userId) => {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    // Verifica se o usuário a ser deletado existe
    if (!deletedUser) throw new Error('Usuário não identificado.');

    return {
      message: `Usuário ${userId} DELETADO com sucesso!.`,
      user: deletedUser
    };
  },

  getPosts: async (userId) => {
    const posts = await prisma.post.findMany({
      orderBy: { id: 'desc' },
      where: { userId }
    });

    return {
      message: `Aqui está a lista de posts criados pelo usuário ${userId}.`,
      posts
    };
  },

  getBookmarks: async (userId) => {
    const bookmarks = await prisma.savedPost.findMany({
      orderBy: { id: 'desc' },
      where: { userId },
      include: {
        post: {
          include: {
            savedBy: {
              where: { userId },
              select: { id: true }
            },
          },
        },
      },
    });

    const formattedPosts = bookmarks.map(item => ({
      ...item.post,
      isSaved: true,
      savedBy: undefined
    }));

    return {
      message: `Aqui está a lista de posts salvos pelo usuário ${userId}.`,
      bookmarks: formattedPosts
    };
  }
};