// COMANDOS IMPORTANTES:
  // npm run dev
  //  Roda o servidor backend
  // npm run prisma
  //  Roda o Prisma para consulta online de tabelas
  // npm run prisma:generate
  //  Regenera o client do Prisma (caso dê erro ao rodar o servidor, é importante utilizar esse comando antes)
  // npm run prisma:migrate
  //  Atualiza as tabelas (e seus respectivos atributos) no banco de dados PostgreSQL

// COMPOSTO POR:
  // 1. userService.js    (para funções do CRUD de usuários),
  // 2. userController.js (para mostrar mensagens de sucesso e erro),
  // 3. userRoutes.js     (para gerar rotas GET, POST, PUT e DELETE)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter, userRouter, postRouter, commentRouter } from './routes/index.js';

async function startServer() {
  try {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    })
  } catch (err) {
    throw err;
  }
}

dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

startServer();