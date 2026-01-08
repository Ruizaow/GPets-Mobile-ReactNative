# GPets
GPets é uma rede social voltada para divulgar a localização de animais perdidos ou de rua. Possui dois perfis distintos de usuário — usuário comum e ONGs (permite divulgar publicidades e eventos voltados à causa, recuperação e adoção animal) —, feed, criação de publicações, mapa, perfil de usuário, mensagens e chat privado entre usuários.

Aplicativo em desenvolvimento para dispositivos móveis Android, utilizando JavaScript, React Native para frontend, e Node + Prisma + PostgreSQL para backend.

#### Para rodar o projeto, clone o repositório e execute os seguintes comandos:
`npm install -g expo-cli` — *(caso não tenha o Expo CLI instalado em sua máquina)*<br>

`cd GPets-Mobile-ReactNative`<br>

Frontend:<br>
`cd frontend`<br>
`npm install`<br>
`npx expo start --tunnel`<br>

Backend:<br>
`cd backend`<br>
`npm install`<br>
`npm run dev`<br>

Após isso, abra o aplicativo em um emulador do Android Studio (para computador) ou execute-o na leitura do QR Code disponível no app Expo Go (para celular Android).
