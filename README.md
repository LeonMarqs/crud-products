<!-- PROJECT LOGO -->
<br />

![Imagem principal](/imgs/main.png | width=450);

  <h3 align="center">CRUD Instrumentos</h3>

  <p align="center">
    Um website feito com ReactJS e NodeJS para um CRUD simples com produtos.
    <br />
    <!-- <a href="">View Demo</a> -->
  </p>

<!-- TABLE OF CONTENTS -->
* [Sobre](#Sobre-o-projeto)
   * [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Começando](#começando)
   * [Pré Requisitos](#pré-requisitos)
   * [Configs do servidor](#configurações-do-servidor)
* [Rodar a aplicação](#rodar-a-aplicação)
* [Imagens](#imagens)
* [Contato](#contato)

<!-- Sobre o projeto -->
# Sobre o projeto
## Tecnologias utilizadas

* [ReactJS](https://reactjs.org/)
* [NodeJS](https://nodejs.org/en/)
* [Firestore](https://firebase.google.com/products/firestore)

<!-- GETTING STARTED -->

# Começando

## Pré-Requisitos

* Faça o clone do projeto
  ```sh
  git clone https://github.com/LeonMarqs/crud-products.git
  ```

* Após isso, instale as dependências citadas no arquivo `backend/package.json` dentro da pasta `backend`.
  ```sh
  # Acesse a pasta /backend
  cd backend

  # Instale as dependências
  npm install 'nome-da-dependência'
  # ou
   yarn add 'nome-da-dependência'
  ```

* O mesmo para o `frontend`.
  ```sh
  # Acesse a pasta /frontend
  cd frontend

  npm install 'nome-da-dependência'
  # ou
   yarn add 'nome-da-dependência'
  ```

## Configurações do Servidor

O servidor utilizado foi o [Firestore](https://firebase.google.com/products/firestore), portanto é necessário que você crie um novo projeto. 

1. Nesse projeto, você seguirá esses passos:
    1. Configurações do projeto
    1. Contas de serviço
    1. Criar conta de serviço
    1. Gerar chave privada.

2. Após gerar a chave privada, salve o arquivo `.json` na pasta raiz do projeto.

3. Crie um arquivo chamado `.env` e dentro dele coloque as variáveis de ambiente, seguindo o arquivo `.env.example` disponibilizado na pasta `/backend`:

Obs: Se tiver alguma dúvida durante os passos 1 e 2, leia a [Documentação Oficial](https://firebase.google.com/docs/admin/setup?hl=pt-br#initialize-sdk) do Firestore 

  
  ```sh
  # Uma palavra para ser utilizada como chave e complementar a geração do token'
  SECRET=

  # Nome do arquivo .json (key) que está na raíz do projeto. Ex: key123.json
  GOOGLE_APPLICATION_CREDENTIALS=

  # Palavra de sua escolha para fazer o login e poder utilizar os recursos da API (usuário)
  USER_JWT=

  # Palavra de sua escolha para fazer o login e poder utilizar os recursos da API (senha)
  PWD_JWT=                                             
  ``` 
# Rodar a aplicação

* API com Node
  ```sh
  # Acessar a pasta /backend
  cd backend

  # Rodar a API
  npm run dev
  # ou 
  yarn dev	
  ```
  A API estará disponível em: http://localhost:8080

* Aplicação React
  ```sh
  # Acessar a pasta /frontend
  cd backend

  # Rodar a aplicação
  npm run start
  # ou 
  yarn start	
  ```
  A aplicação estará disponível em: http://localhost:3000

# Imagens
Login
![Login-Erro](/imgs/login-error.png | width=500);

Adicionar um novo instrumento
![Add-Erro](/imgs/add-error.png | width=800);

Banco de dados Firestore
![Banco-firestore](/imgs/firestore.png | width=500);
<!-- CONTACT -->
# Contato

Leonardo Marques - [Linkedin](https://www.linkedin.com/in/leonardo-marques-ti/) - leomarques301@gmail.com

