const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// RENDERIZAR O HTML QUANDO ABRIR O NAVEGADOR
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/form.html'));
});

// CADASTRAR USUÁRIO
app.post('/api/usuarios', (req, res) => {
  const { id_user, nome, email, senha } = req.body;

  if (!id_user || !nome || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  const sql = 'INSERT INTO usuario (id_user, nome, email, senha_hash, criado_em) VALUES (?, ?, ?, ?, CURDATE())';

  db.query(sql, [id_user, nome, email, senha], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ sucesso: true, id: result.insertId });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
