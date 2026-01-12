import { postService } from '../services/postService.js';
import { getErrorResponse } from '../utils/index.js';

export const getPosts = async (req, res) => {
  try {
    const userId = req.user?.id ?? null;

    const postsData = await postService.getAll(userId);

    res.status(200).json({
      message: postsData.message,
      data: postsData.posts
    });
  } catch (err) {
    res.status(500).json({ error: getErrorResponse(500, 'Erro interno do servidor.', 'Falha ao carregar postagens.') });
  }
};

export const getPost = async (req, res) => {
  try {
    const postData = await postService.get(parseInt(req.params.id));

    res.status(200).json({
      message: postData.message,
      data: postData.post,
    });
  } catch (err) {
    res.status(404).json({ error: getErrorResponse(404, 'Não encontrado.', err.message) });
  }
};

export const createPost = async (req, res) => {
  try {
    const createdPost = await postService.create(req.body);

    res.status(201).json({
      message: createdPost.message,
      data: createdPost.post,
    });
  } catch (err) {
    res.status(400).json({ error: getErrorResponse(400, 'Requisição inválida.', err.message) });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await postService.delete(parseInt(req.params.id));

    res.status(200).json({
      message: deletedPost.message,
      data: deletedPost.post,
    });
  } catch (err) {
    res.status(404).json({ error: getErrorResponse(404, 'Não encontrado.', err.message) });
  }
};

export const savePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = parseInt(req.params.id);

    const savedPost = await postService.savePost(userId, postId);

    res.status(201).json({
      message: savedPost.message,
      data: savedPost.post,
    });
  } catch (err) {
    res.status(400).json({ error: getErrorResponse(400, 'Falha ao salvar post.', err.message) });
  }
};

export const unsavePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = parseInt(req.params.id);

    const unsavedPost = await postService.unsavePost(userId, postId);

    res.status(200).json({
      message: unsavedPost.message,
      data: unsavedPost.post,
    });
  } catch (err) {
    res.status(400).json({ error: getErrorResponse(400, 'Falha ao remover post salvo.', err.message) });
  }
};