# Daily Diet API

Sobre o Projeto

A Daily Diet API é uma API RESTful desenvolvida em Node.js com Fastify, SQLite e Knex.js, para auxiliar no controle de refeições diárias, permitindo que os usuários registrem suas refeições e acompanhem suas estatísticas.

Este projeto foi desenvolvido como parte do Desafio 02 do curso da Rocketseat, no módulo "Criando APIs RESTful com Node.js".

## Regras da aplicação

[x] Deve ser possível criar um usuário
[x] Deve ser possível identificar o usuário entre as requisições
[x] Deve ser possível registrar uma refeição feita, com as seguintes informações:

  _As refeições devem ser relacionadas a um usuário._

  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta

[x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
[x] Deve ser possível apagar uma refeição
[x] Deve ser possível listar todas as refeições de um usuário
[x] Deve ser possível visualizar uma única refeição
[x] Deve ser possível recuperar as métricas de um usuário
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta
[x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Tecnologias Utilizadas

Node.js

Fastify (framework para Node.js)

SQLite (banco de dados leve)

Knex.js (query builder para gerenciar o banco de dados)

TypeScript (tipagem e melhor manutenção do código)

## Instalação e Configuração

### Requisitos:

Node.js instalado (versão 18 ou superior)

Gerenciador de pacotes npm ou yarn

### Passos para rodar o projeto:

Clone o repositório:

git clone https://github.com/seu-usuario/daily-diet-api.git

Entre no diretório do projeto:

cd daily-diet-api

Instale as dependências:

npm install

# ou

yarn install

Configure o banco de dados SQLite:

npm run migrate

Inicie o servidor:

npm run dev

A API estará rodando em http://localhost:3333

## Rotas da API

Refeições

POST /meals - Criar uma refeição

GET /meals - Listar todas as refeições do usuário

GET /meals/:id - Obter detalhes de uma refeição

PATCH /meals/:id - Editar uma refeição

DELETE /meals/:id - Excluir uma refeição

Métricas

GET /statistics - Recuperar estatísticas do usuário
