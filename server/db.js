// server/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // ou seu usuário
  password: '123',        // sua senha do MariaDB
  database: 'projetoTF'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MariaDB:', err);
    return;
  }
  console.log('Conectado ao MariaDB!');
});

module.exports = connection;
