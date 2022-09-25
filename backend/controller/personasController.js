const asyncHandler = require("express-async-handler");
const db = require("../config/db");

// @desc    Get Persona
// @route   GET /api/personas/getPersona/:ci
// @access  Private
const getPersona = asyncHandler(async (req, res) => {
  const { ci } = req.params;
  const sql = "SELECT * FROM personas WHERE ci == ?";
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
        msg: `La persona no existe, intente nuevamente`,
      });
      return;
    }
    res.status(200).json(row);
  });
});

// @desc    Get Personas
// @route   POST /api/personas/getPersonas
// @access  Private
const getPersonas = asyncHandler(async (req, res) => {
  const sql = `Select * from personas`;
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

// @desc    Create Persona
// @route   POST /api/personas/newPersona
// @access  Private
const newPersona = asyncHandler(async (req, res) => {
  const { ci, nombre, apellido, direccion, telefono } = req.body;
  if (!nombre || !ci) {
    res.status(400).json({
      sucess: false,
      msg: `Error - Faltan campos para insertar la persona, intente nuevamente`,
    });
    return;
  }

  const persona = [ci, nombre, apellido, direccion, telefono];
  const sql =
    "INSERT INTO personas (ci, nombre, apellido, direccion, telefono) VALUES (?, ?, ?, ?, ?)";
  db.run(sql, persona, (err) => {
    if (err) {
      res.status(400).json({
        sucess: false,
        msg: `Error - La persona que intenta registrar ya existe`,
      });
      return;
    }
    res.status(201).json({
      sucess: true,
      msg: `La persona ${nombre} fue registrada exitosamente`,
      ci,
      nombre,
      apellido,
      direccion,
      telefono,
    });
  });
});

// @desc    Update Persona
// @route   PUT /api/personas/updatePersona/:ci
// @access  Private
const updatePersona = asyncHandler(async (req, res) => {
  const { ci } = req.params;
  const { nombre, apellido, direccion, telefono } = req.body;
  if (!nombre && !apellido && !direccion && !telefono) {
    res.status(400).json({
      sucess: false,
      msg: `No se pudo actualizar los datos de la persona, intente nuevamente`,
    });
    return;
  }

  let sql = "UPDATE personas SET ";
  const persona = [];
  if (nombre) {
    persona.push(nombre);
    sql += "nombre = ?";
  }
  if (apellido) {
    persona.push(apellido);
    nombre ? (sql += ", apellido = ?") : (sql += "apellido = ?");
  }
  if (direccion) {
    persona.push(direccion);
    nombre || apellido ? (sql += ", direccion = ?") : (sql += "direccion = ?");
  }
  if (telefono) {
    persona.push(telefono);
    nombre || apellido || direccion
      ? (sql += ", telefono = ?")
      : (sql += "telefono = ?");
  }

  persona.push(ci);
  sql += " WHERE ci = ?";

  db.run(sql, persona, (err) => {
    if (err) {
      res.status(400).json({
        sucess: false,
        msg: `No se pudo actualizar los datos de la persona, intente nuevamente`,
      });
      return;
    }
    res.status(200).json({
      sucess: true,
      msg: `La persona con ci ${ci} fue actualizada exitosamente`,
    });
  });
});

// @desc    Delete Persona
// @route   DELETE /api/personas/deletePersona/:ci
// @access  Private
const deletePersona = asyncHandler(async (req, res) => {
  const { ci } = req.params;
  const sql = "DELETE FROM personas WHERE ci = ?";
  db.run(sql, ci, (err) => {
    if (err) {
      res.status(400).json({
        sucess: false,
        msg: `No se pudo eliminar la persona, intente nuevamente`,
      });
      return;
    }

    res.status(200).json({
      sucess: true,
      msg: `La persona con ci ${ci} fue eliminada de la base datos`,
    });
  });
});

module.exports = {
  getPersona,
  newPersona,
  updatePersona,
  deletePersona,
  getPersonas,
};
