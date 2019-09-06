# API Rest NodeJS para apps Clones do Tinder

Essa API se conecta com a API do GitHub para recuperar os dados do desenvolvedor cadastrado.
Todos os dados são armazenados no banco de dados MongoDB hospedado em nuvem pela Atlas.

## Rotas


- `GET /devs`: Lista todos os devs cadastrados;

- `POST /devs/`: A rota deve receber um campo `username` e irá efetuar a busca diretamente no `GitHub` para recuperar os dados do usuário;

- `POST /devs/:id/like`: Recebe o `id` do usuário que esta dando like diretamente na rota;

- `POST /devs/:id/dislike`: Recebe o `id` do usuário que esta dando dislike diretamente na rota;
