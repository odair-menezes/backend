const Dev = require("../models/Dev"); // Importa o model do dev

module.exports = {
  async store(req, res) {
    const { user } = req.headers; // Recupera o usuário que do header
    const { devId } = req.params; // Recupera o usuário que que vem na rota

    const loggedDev = await Dev.findById(user); // Localiza os dados do usuario que esta dando o like
    const targetDev = await Dev.findById(devId); // Localiza os dados do usuário que será alvo do like

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists!" }); // Verifica se o usuário alvo existe
    }

    loggedDev.dislikes.push(targetDev._id); // Adiciona o dislike ao usuário

    await loggedDev.save(); // Salva no banco de dados o like

    return res.json(loggedDev); // Retorna os dados salvos no banco de dados
  }
};
