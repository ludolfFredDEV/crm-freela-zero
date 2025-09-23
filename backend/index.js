const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

//Rota GET para listar todos os contatos
app.get("/api/contacts", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM contacts ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar contatos:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rota POST para adicionar um novo contato
app.post("/api/contacts", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
      [name, email, phone]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Erro ao adicionar contato:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rota PUT para atualizar um contato existente
app.put("/api/contacts/:id", async (req, res) => {
  const contactId = parseInt(req.params.id);
  const { name, email, phone } = req.body;
  try {
    const { rows } = await db.query(
      "UPDATE contacts SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *",
      [name, email, phone, contactId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar contato:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rota DELETE para remover um contato
app.delete("/api/contacts/:id", async (req, res) => {
  const contactId = parseInt(req.params.id);
  try {
    const { rowCount } = await db.query("DELETE FROM contacts WHERE id = $1", [
      contactId,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao deletar contato:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor Rodando em http://localhost:${port}`);
});
