const express = require("express");
const router = express.Router();

const {
  obtenerHorasUsuario
} = require("../controllers/SocialHoursController");

router.get("/:usuario_id", obtenerHorasUsuario);

module.exports = router;