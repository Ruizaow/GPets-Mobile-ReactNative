import prisma from '../lib/prismaClient.js';

export const commentService = {
  getAll: async (postId) => {
    const whereClause = postId ? { postId } : {};

    const comments = await prisma.comment.findMany({
      where: whereClause,
      orderBy: { timestamp: 'asc' },
      include: { user: true }
    });

    return {
      message: 'Aqui está a lista de comentários.',
      comments
    };
  },

  get: async (commentId) => {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { user: true, post: true }
    });

    if (!comment)
      throw new Error('Comentário não encontrado.');

    return {
      message: `Aqui está o comentário com ID ${commentId}.`,
      comment
    };
  },

  create: async (commentData) => {
    const { content, timestamp, userId, postId } = commentData;

    if (!content || !timestamp || !userId || !postId)
      throw new Error('Dados obrigatórios não informados.');

    const newComment = await prisma.comment.create({
      data: {
        content,
        timestamp,
        userId,
        postId
      },
      include: {
        user: true
      }
    });

    return {
      message: 'Comentário criado com sucesso!',
      comment: newComment
    };
  },

  delete: async (commentId) => {
    const deletedComment = await prisma.comment.delete({
      where: { id: commentId }
    });

    if (!deletedComment)
      throw new Error('Comentário não encontrado.');

    return {
      message: `Comentário com ID ${commentId} deletado com sucesso.`,
      comment: deletedComment
    };
  }
};