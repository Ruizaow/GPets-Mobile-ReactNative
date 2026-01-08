import { authService } from '../services/authService.js';
import { getErrorResponse } from '../utils/index.js';

export const loginUser = async (req, res) => {
  try {
    const loginData = await authService.login(req.body);

    res.status(200).json({
      message: loginData.message,
      data: {
        user: loginData.user,
        token: loginData.token
      }
    })
  } catch (err) {
    switch (err.message) {
      case 'A senha informada está incorreta.':
        res.status(401).json({ error: getErrorResponse(401, 'Não autorizado.', err.message) });
        break;
      default:
        res.status(404).json({ error: getErrorResponse(404, 'Não encontrado.', err.message) });
        break;
    }
  }
};