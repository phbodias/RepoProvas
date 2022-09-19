# <p align = "center"> Repo-Provas </p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/72531277/178094665-f46c6a55-c821-42a0-bb9c-d5dd5f2d69fa.png"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Pedro Dias-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/phbodias/RepoProvas?color=4dae71&style=flat-square" />
</p>

## :clipboard: Description

A system for sharing tests between students!

---

## :computer: Tecnologias e Conceitos

- REST APIs
- JWTs tokens
- Node.js
- TypeScript
- Postgres with Prisma

---

## :rocket: Rotas

```yml
POST /signup
    - Route to register a new user
    - headers: {}
    - body:{
        "email": "lorem@gmail.com",
        "password": "loremipsum"
}
```

```yml
POST /signin
    - Route to login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
        "password": "loremipsum"
    }
```

```yml
POST /test (autenticada)
    - Route to insert a new test
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        name: "test example",
        pdfUrl: https://example.com,
        category: "Projeto", "Prática" or "Recuperação",
        discipline: "HTML e CSS", "JavaScript", "React", "Humildade", "Planejamento" or "Autoconfiança",
        teacher: "Diego Pinho" or "Bruna Hamori",
    }
```

```yml
GET /testByDiscs (autenticada)
    - Route to get tests separated by disciplines
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /testByTeacher (autenticada)
    - Route to get tests separated by teachers
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
PUT /usuarios/:id (autenticada)
    - Rota para atualizar um usuário pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "nome": "Lorem ipsum2",
        "email": "lorem2@gmail.com",
        "senha": "loremipsum2"
    }
```

---

## 🏁 Running the application

Make sure you have the latest stable version of  [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) running locally.

First, clone this repository on your machine:

```
git clone https://github.com/phbodias/RepoProvas.git
```

Then, inside the folder, run the following command to install the dependencies.
```
npm install
```

Create and configure a .env file based on the .env-example file.

Finished the process, just start the server

```
npm start
```
