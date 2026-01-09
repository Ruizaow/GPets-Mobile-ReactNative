import { commentService } from '../services/commentService.js';
import { getErrorResponse } from '../utils/index.js';

export const getComments = async (req, res) => {
  try {
    const postId = req.query.postId
      ? parseInt(req.query.postId)
      : null;

    const commentsData = await commentService.getAll(postId);

    res.status(200).json({
      message: commentsData.message,
      data: commentsData.comments
    });
  } catch (err) {
    res.status(500).json({ error: getErrorResponse(500, 'Erro interno do servidor.', 'Falha ao carregar comentários.') });
  }
};

export const getComment = async (req, res) => {
  try {
    const commentData = await commentService.get(parseInt(req.params.id));

    res.status(200).json({
      message: commentData.message,
      data: commentData.comment
    });
  } catch (err) {
    res.status(404).json({
      error: getErrorResponse(404, 'Não encontrado.', err.message)
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const createdComment = await commentService.create(req.body);

    res.status(201).json({
      message: createdComment.message,
      data: createdComment.comment
    });
  } catch (err) {
    res.status(400).json({
      error: getErrorResponse(400, 'Requisição inválida.', err.message)
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await commentService.delete(
      parseInt(req.params.id)
    );

    res.status(200).json({
      message: deletedComment.message,
      data: deletedComment.comment
    });
  } catch (err) {
    res.status(404).json({
      error: getErrorResponse(404, 'Não encontrado.', err.message)
    });
  }
};