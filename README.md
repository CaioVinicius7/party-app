<h2 align="center"> 
	Party App API
</h2>

## O que é?

Party App é um sistema de divulgação de festas privadas e eventos públicos, onde o usuário pode encontrar festas/eventos e ver informações sobre o mesmo ou pode divulgar sua própria festa/evento.

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
[Node](https://nodejs.org/en/download/), [Docker](https://www.docker.com/get-started/) e [Insominia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/).

## 🎲 Rodando a API

```bash
# crie o arquivo .env seguindo o arquivo de exemplo

# Faça o build dos containers
$ docker-compose build

# Execute os containers
$ docker-compose up -d

# Rode as migrations
$ yarn prisma migrate deploy

# Rode o servidor
$ yarn dev

# O servidor ficara ativo na porta:3333 - acesse <http://localhost:3333>
```

<div id="docs"> </div>

## 📜 Acessando a documentação

Para ter acesso a documentação localmente utilize a rota /api-docs após a inicialização da aplicação, como no exemplo abaixo ou [clique aqui](http://localhost:3333/api-docs/).

```bash
http://localhost:3333/api-docs/
```
