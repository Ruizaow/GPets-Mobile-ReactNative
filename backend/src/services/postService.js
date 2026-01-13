import prisma from '../lib/prismaClient.js';

export const postService = {
  getAll: async (userId) => {
    const posts = await prisma.post.findMany({
      orderBy: { id: 'asc' },
      include: {
        savedBy: userId
          ? { where: { userId },
              select: { id: true } }
          : false
      }
    });

    const formattedPosts = posts.map(post => ({
      ...post,
      isSaved: userId ? post.savedBy.length > 0 : false,
      savedBy: undefined
    }));

    return {
      message: 'Aqui está a lista de posts.',
      posts: formattedPosts,
    };
  },

  get: async (postId) => {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) throw new Error('Post não encontrado.');

    return {
      message: `Aqui está o post com ID ${postId}.`,
      post,
    };
  },

  create: async (postData) => {
    const {
      userId, type, timestamp, isOwner, imageUrl, name, status,
      date, sex, breed, temper, owner, phone, description,
      address, coordinateLat, coordinateLng
    } = postData;

    if (!['Pet', 'Evento'].includes(type)) {
      throw new Error('Tipo de post inválido');
    }

    let data;
    if (type === 'Evento') {
      data = { userId, type, timestamp, imageUrl, name, date, phone, description, address };
    }
    else {
      data = {
        userId,
        type,
        timestamp,
        isOwner: Boolean(isOwner),
        imageUrl,
        name,
        status,
        date,
        sex,
        breed,
        temper,
        owner,
        phone,
        description,
        address,
        coordinateLat: parseFloat(coordinateLat),
        coordinateLng: parseFloat(coordinateLng)
      };
    }
    
    const newPost = await prisma.post.create({ data });

    return {
      message: 'Post criado com sucesso!',
      post: newPost,
    };
  },

  update: async (postId, userId, status) => {
    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) throw new Error('Post não encontrado.');
    if (post.userId !== userId) throw new Error('Você não é o dono do post.');

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { status }
    });

    return {
      message: 'Post atualizado com sucesso!',
      post: updatedPost
    };
  },

  delete: async (postId) => {
    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    if (!deletedPost) throw new Error('Post não encontrado.');

    return {
      message: `Post com ID ${postId} deletado com sucesso.`,
      post: deletedPost,
    };
  },

  savePost: async (userId, postId) => {
    const existing = await prisma.savedPost.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existing) throw new Error('Este post já está salvo.');

    const savedPost = await prisma.savedPost.create({
      data: { userId, postId },
    });

    return {
      message: 'Post salvo com sucesso!',
      post: savedPost,
    };
  },

  unsavePost: async (userId, postId) => {
    const existing = await prisma.savedPost.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (!existing) throw new Error('Este post não estava salvo.');

    const removedPost = await prisma.savedPost.delete({
      where: { userId_postId: { userId, postId } },
    });

    return {
      message: 'Post removido dos salvos com sucesso.',
      post: removedPost,
    };
  }
};