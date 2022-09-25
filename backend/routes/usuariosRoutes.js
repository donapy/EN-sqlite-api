const express = require("express");
const router = express.Router();
const {
  getUsuario,
  newUsuario,
  deleteUsuario,
  updateUsuario,
  loginUsuario,
  getUsuarios,
} = require("../controller/usuariosController");

const { protect } = require("../middleware/authMiddleware");

router.get("/getUsuarios", protect, getUsuarios);

router.get("/getUsuario/:ci", protect, getUsuario);

router.post("/newUsuario", newUsuario);

router.put("/updateUsuario/:ci", protect, updateUsuario);

router.delete("/deleteUsuario/:ci", protect, deleteUsuario);

router.post("/loginUsuario", protect, loginUsuario);

module.exports = router;
