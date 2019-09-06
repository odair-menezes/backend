const express = require('express'); // Função que quando chamada cria um novo servidor
const mongoose = require('mongoose'); // Driver para conexão com o banco de dados MongoDB
const cors = require('cors'); // Módulo que habilitar aplicações externas a acessar a API

const routes = require('./routes'); // Importação das Rotas

const app = express(); // Inicia o servidor
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

mongoose.connect(
  // Conexão com o banco de dados MongoDB
  'mongodb+srv://tax:tax19009100@cluster0-vwgmd.mongodb.net/tindev?retryWrites=true&w=majority',
  { useNewUrlParser: true } // EndPoint do BD Atlas MongoDB
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors()); // Libera o acesso ao apps externas ao nosso servidor
app.use(express.json()); // Fala pro nosso servidor que iremos usar JSON
app.use(routes); // Adiciona as rotas ao servidor

server.listen(3333); // Porta em que o servidor (API) esta ouvindo
