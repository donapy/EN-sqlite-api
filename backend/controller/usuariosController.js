const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// @desc    Get Usuario
// @route   GET /api/usuarios/getUsuario/:ci
// @access  Private
const getUsuario = asyncHandler(async (req, res) => {
  const { ci } = req.params;
  const sql =
    "SELECT ci, nombre, apellido, telefono FROM usuarios WHERE ci == ?";
  db.get(sql, ci, (err, row) => {
    if (err) {
      res.status(400).json({
        sucess: false,
        msg: `Error al realizar la consulta, intente nuevamente`,
      });
      return;
    }
    if (row == undefined) {
      res.status(404).json({
        sucess: false,
        msg: `El usuario no existe, intente nuevamente`,
      });
      return;
    }
    res.status(200).json(row);
  });
});

// @desc    Get Usuarios
// @route   POST /api/usuarios/getUsuarios
// @access  Private
const getUsuarios = asyncHandler(async (req, res) => {
  const sql = `Select ci, nombre, apellido, telefono from usuarios`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({
        sucess: false,
        msg: `Error al realizar la consulta, intente nuevamente`,
      });
      return;
    }
    res.status(200).json(rows);
  });
});

// @desc    Create Usuario
// @route   POST /api/usuarios/newUsuario
// @access  Public
const newUsuario = asyncHandler(async (req, res) => {
  const { ci, nombre, apellido, password, telefono } = req.body;
  if (!nombre || !ci || !password) {
    res.status(400).json({
      sucess: false,
      msg: `Error - Faltan campos para insertar el usuario, intente nuevamente`,
    });
    return;
  }

  const usuario = [ci, nombre, apellido, password, telefono];
  const sql =
    "INSERT INTO usuarios (ci, nombre, apellido, password, telefono) VALUES (?, ?, ?, ?, ?)";
  db.run(sql, usuario, (err) => {
    if (err) {
      res.status(400).json({
        sucess: false,
        msg: `Error - El usuario que intenta registrar ya existe`,
      });
      return;
    }
    res.status(201).json({
      sucess: true,
      msg: `El usuario ${nombre} fue registrado exitosamente`,
    });
  });
});

// @desc    Update Usuario
// @route   PUT /api/usuarios/updateUsuario/:ci
// @access  Private
const updateUsuario = asyncHandler(async (req, res) => {
  const { ci } = req.params;
  const { nombre, apellido, password, telefono } = req.body;
  if (!nombre && !apellido && !password && !telefono) {
    res.status(400).json({
      sucess: false,
      msg: `No se pudo actualizar los datos del usuario, intente nuevamente`,
    });
    return;
  }

  let sql = "UPDATE usuarios SET ";
  const usuario = [];
  if (nombre) {
    usuario.push(nombre);
    sql += "nombre = ?";
  }
  if (apellido) {
    usuario.push(apellido);
    nombre ? (sql += ", apellido = ?") : (sql += "apellido = ?");
  }
  if (password) {
    usuario.push(password);
    nombre || apellido ? (sql += ", password = ?") : (sql += "password = ?");
  }
  if (telefono) {
    usuario.push(telefono);
    nombre || apellido || password
      ? (sql += ", telefono = ?")
      : (sql += "telefono = ?");
  }

  usuario.push(ci);
  sql += " WHERE ci = ?";

  db.run(sql, usuario, (err) => {
    if (err) {
      res.status(400).json({
        sucess: false,
        msg: `No se pudo actualizar los datos del usuario, intente nuevamente`,
      });
      return;
    }
    res.status(200).json({
      sucess: true,
      msg: `El usuario con ci ${ci} fue actualizado exitosamente`,
    });
  });
});

// @desc    Delete Usuario
// @route   DELETE /api/usuarios/deleteUsuario/:ci
// @access  Private
const deleteUsuario = asyncHandler(async (req, res) => {
  const { ci } = req.params;
  const sql = "DELETE FROM usuarios WHERE ci = ?";
  db.run(sql, ci, (err) => {
    if (err) {
      res.status(400).json({
        sucess: false,
        msg: `No se pudo eliminar al usuario, intente nuevamente`,
      });
      return;
    }

    res.status(200).json({
      sucess: true,
      msg: `El usuario con ci ${ci} fue eliminado de la base datos`,
    });
  });
});

// @desc    Login Usuario
// @route   POST /api/usuarios/login
// @access  Public
const loginUsuario = asyncHandler(async (req, res) => {
  const { ci, password } = req.body;

  //se verifica que exista el usuario
  const sql = `Select * from usuarios where ci=${ci}`;
  const usuario = await new Promise((resolve, reject) => {
    db.get(sql, (err, row) => {
      if (err) {
        res.status(400).json({
          sucess: false,
          msg: `Error al realizar la consulta, intente nuevamente`,
        });
        return;
      }
      resolve(row);
    });
  });

  //se chequea los datos y se devuelve los datos de logueo
  if (usuario && password == usuario.password) {
    res.status(200).json({
      sucess: true,
      token: generateToken(usuario.ci),
      duracion: process.env.JWT_EXPIRES_IN,
    });
  } else {
    res.status(404).json({
      sucess: false,
      msg: `Datos invalidos, intente nuevamente`,
    });
  }
});

//Generar JWT
const generateToken = (ci) => {
  return jwt.sign({ ci }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  getUsuario,
  newUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarios,
  loginUsuario,
};
