const axios = require('axios'); // Importa driver para consumo de API
const Dev = require('../models/Dev'); // Importa módulo de devs

module.exports = {
  // Como é apenas um módulo, criamos uma função e já exportamos
  async index(req, res) {
    const { user } = req.headers; // Recupera o usuário recebido no header

    const loggedDev = await Dev.findById(user); // Recupera do banco os dados do usuário logado

    const users = await Dev.find({
      $and: [
        // Adiciona o operador AND para a query
        { _id: { $ne: user } }, // Adiciona a condição não seja (Not equals)
        { _id: { $nin: loggedDev.likes } }, // Adiciona a condição não seja (Not In)
        { _id: { $nin: loggedDev.dislikes } } // Adiciona a condição não seja (Not In)
      ]
    });

    return res.json(users); // Retorna os dados recuperados do banco de dados
  },

  async store(req, res) {
    const { userName } = req.body; // Recupera o nome do usuário recebido para cadastro

    const userExistes = await Dev.findOne({ user: userName }); // Verifica se o usuário já esta cadastrado

    if (userExistes) {
      // Caso o usuário já esteja cadastrado apenas retorna os dados dele
      return res.json(userExistes);
    }

    const response = await axios.get(
      `https://api.github.com/users/${userName}` // Busca dados do usuário usando API do GIT
    );

    const { name, bio, avatar_url: avatar } = response.data; // Fatora dados recebidos

    const dev = await Dev.create({
      // Cadastra no banco os dados retornados do usuário
      name,
      user: userName,
      bio,
      avatar
    });
    return res.json(dev); // Retorna os dados recuperados do usuário
  }
};
