const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = 3001;

//Análise do corpo das requisições JSON
app.use(express.json());

//Array temporário pra armazenar os contatos
let contacts = [
  {
    id: 1,
    name: "João da Silva",
    email: "joao@example.com",
    phone: "11987654321",
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria@example.com",
    phone: "21912345678",
  },
];

//Rota GET para listar todos os contatos
app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

//Rota POST para adicionar um novo contato
app.post("/api/contacts", (req, res) => {
  const newContact = {
    id: contacts.length + 1, //Incrementa o ID
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  contacts.push(newContact); // Adiciona contato no array
  res.status(201).json(newContact); //Retorna o novo contato com status 201 (created)
});

//Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor Rodando em http://localhost:${port}`);
});
