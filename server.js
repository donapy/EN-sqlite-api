const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const db = require("./backend/config/db");
const port = process.env.PORT || 5001;

db;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/usuarios", require("./backend/routes/usuariosRoutes"));
app.use("/api/personas", require("./backend/routes/personasRoutes"));

app.listen(port, () => {
  console.log(`API Server corriendo en el puerto ${port}`);
});
