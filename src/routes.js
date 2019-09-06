const express = require("express"); // Função que quando chamada cria um novo servidor

// Importando os controllers utilizados pelo módulo
const DevController = require("./Controllers/DevController");
const LikeController = require("./Controllers/LikeController");
const DislikeController = require("./Controllers/DislikeController");

const routes = express.Router(); // Função que cria um objeto especifico para rotas

routes.get("/devs", DevController.index); // Rota para listar todos os usuários sem likes e deslikes
routes.post("/devs", DevController.store); // Rota para cadastrar um novo usuário
routes.post("/devs/:devId/like", LikeController.store); // Rota para dar um like no usuário
routes.post("/devs/:devId/dislike", DislikeController.store); // Rota para dar um deslike no usuário

module.exports = routes; // Exportando rotas para acesso de outras classes
