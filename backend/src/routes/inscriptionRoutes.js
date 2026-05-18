const express = require("express");
const router = express.Router();

const {
  inscribirse,
  obtenerInscritos,
  validarHoras,
  cancelarInscripcion
} = require("../controllers/InscriptionController");

router.post("/", inscribirse);
router.get("/", obtenerInscritos);
router.put("/validar/:id", validarHoras);
router.delete("/:id", cancelarInscripcion);

module.exports = router;