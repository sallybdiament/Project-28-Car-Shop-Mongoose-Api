# Car Shop API - Back-End Project

Projeto de uma API em **Typescript** com banco de dados **MongoDB** para venda de veículos (carros e motos)!

Aplicação em Node.js usando o pacote mongoose para fazer um CRUD de veículos - motos e carros.
Paradigma de programação **Orientada à Objetos** (POO).

Com endpoints conectados ao banco de dados seguindo os princípios do REST.

Projeto 28 da [Trybe](https://wwww.betrybe.com), módulo de Back-End.

## O Projeto

* Criação de uma `AbstractModel` que reune todas as solicitações ao banco com comandos mongoose.
* Criação de um `Middleware` para tratar erros das requisições.
* Criação do endpoint POST `/cars` e `/motorcycles`, que retorna um novo veículo do tipo carro/moto cadastrado.
* Criação do endpoint GET `/cars` e `/motorcycles`, que retorna os veículos cadastrados.
* Criação do endpoint GET `/cars:id` e `/motorcycles:id`, que retorna um veículo através do id indicado ou retorna uma mensagem de erro (casos no middleware de erro).
* Criação do endpoint PUT `/cars:id` e `/motorcycles:id`, que permite editar um veículo cadastrado ou retorna uma mensagem de erro (casos no middleware de erro).
* Criação do endpoint DELETE `/cars:id` e `/motorcycles:id`, que permite deletar um veículo do banco de dados ou retorna uma mensagem de erro (casos no middleware de erro).
* Criação de testes de unidades da camada de serviços.

## Instalação 


#### 1- Clonar o repositório

```git clone git@github.com:sallybdiament/Project-28-Car-Shop-Mongoose-Api.git```




```npm install```

<details>
  <summary><strong>🐳 Rodando no Docker vs Localmente</strong></summary>

#### 2 - Subir os containers `car_shop` e `car_shop_db` utilizando o docker-compose

Na raíz do projeto: ```docker-compose up -d```

#### 3 - Abrir o terminal do container `car_shop`

```docker exec -it car_shop bash```
</details>

Sem Docker: Node e o MongoDB já instalados na sua máquina.
#### 4 - Instalar as dependências

No terminal do container: ```npm install```

#### 5 - Executar a aplicação Node com nodemon:

```npm run dev```

#### 6 - Executar os testes:

```npm run test:mocha```

#### 6 - Verificar cobertura dos testes:

```npm run test:coverage```
#### \*Foi utilizado o Thunder Client como cliente de requisições HTTP\*

## Tecnologias
- Node.js
- Express.js
- Docker
- MongoDB
- Mongoose
- Unit Tests (Mocha, Chai, Sinon)
- Typescript