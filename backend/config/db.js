const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(process.env.DBNAME, (err) => {
  if (err) {
    console.log(`Error al conectar a la base de datos ${err.message}`);
  }
  console.log(`Conectado a la base de datos`);
});

module.exports = db;
