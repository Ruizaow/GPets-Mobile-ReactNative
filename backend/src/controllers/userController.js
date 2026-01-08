import { userService } from '../services/userService.js';
import { getErrorResponse } from '../utils/index.js';

export const getUsers = async (req, res) => {
  try {
    const usersData = await userService.getAll();

    res.status(200).json({
      message: usersData.message,
      data: usersData.users
    })
  } catch (err) {
    res.status(500).json({ error: getErrorResponse(500, 'Erro interno do servidor.', 'Falha ao carregar usuários.') });
  }
};

export const getUser = async (req, res) => {
  try {
    const userData = await userService.get(req.params.id);

    res.status(200).json({
      message: userData.message,
      data: userData.user
    })
  } catch (err) {
    res.status(404).json({ error: getErrorResponse(404, 'Não encontrado.', err.message) });
  }
};

export const createUser = async (req, res) => {
  try {
    const createdUser = await userService.create(req.body);

    res.status(200).json({
      message: createdUser.message,
      data: {
        user: createdUser.user,
        token: createdUser.token
      }
    })
  } catch (err) {
    switch (err.message) {
      case 'o e-mail cadastrado já existe.' || 'o CNPJ cadastrado já existe.':
        res.status(409).json({ error: getErrorResponse(409, 'Conflito.', err.message) });
        break;
      case 'Papel de usuário inválido.':
        res.status(401).json({ error: getErrorResponse(401, 'Não autorizado.', err.message) });
        break;
      default:
        res.status(404).json({ error: getErrorResponse(404, 'Não encontrado.', err.message) });
        break;
    }
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.update(parseInt(req.params.id), req.body);

    res.status(200).json({
      message: updatedUser.message,
      data: updatedUser.user
    })
  } catch (err) {
    switch (err.message) {
      case 'o e-mail informado já existe.':
        res.status(409).json({ error: getErrorResponse(409, 'Conflito.', err.message) });
        break;
      case 'o número de telefone informado é inválido.':
        res.status(401).json({ error: getErrorResponse(401, 'Não autorizado.', err.message) });
        break;
      default:
        res.status(404).json({ error: getErrorResponse(404, 'Não encontrado.', err.message) });
        break;
    }
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.delete(parseInt(req.params.id));

    res.status(200).json({
      message: deletedUser.message,
      data: deletedUser.user
    })
  } catch (err) {
    res.status(404).json({ error: getErrorResponse(404, 'Não encontrado.', err.message) });
  }
};

export const getUserBookmarks = async (req, res) => {
  try {
    const bookmarksData = await userService.getBookmarks(req.params.id);

    res.status(200).json({
      message: bookmarksData.message,
      data: bookmarksData.bookmarks
    })
  } catch (err) {
    res.status(404).json({ error: getErrorResponse(404, 'Não encontrado.', err.message) });
  }
};