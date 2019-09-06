const Dev = require('../models/Dev'); // Importa o Model DEV

module.exports = {
  async store(req, res) {
    const { user } = req.headers; // Recupera o usuário que do header
    const { devId } = req.params; // Recupera o usuário que que vem na rota

    const loggedDev = await Dev.findById(user); // Localiza os dados do usuario que esta dando o like
    const targetDev = await Dev.findById(devId); // Localiza os dados do usuário que será alvo do like

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists!' }); // Verifica se o usuário alvo existe
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[devId];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetDev);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(targetDev._id); // Adiciona o like ao usuário

    await loggedDev.save(); // Salva no banco de dados o like

    return res.json(loggedDev); // Retorna os dados salvos no banco de dados
  }
};
