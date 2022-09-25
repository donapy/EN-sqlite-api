const express = require("express");
const router = express.Router();
const {
  getPersona,
  newPersona,
  deletePersona,
  updatePersona,
  getPersonas,
} = require("../controller/personasController");

const { protect } = require("../middleware/authMiddleware");

router.get("/getPersonas", protect, getPersonas);

router.get("/getPersona/:ci", protect, getPersona);

router.post("/newPersona", protect, newPersona);

router.put("/updatePersona/:ci", protect, updatePersona);

router.delete("/deletePersona/:ci", protect, deletePersona);

module.exports = router;
