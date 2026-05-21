const express = require("express");

const router = express.Router();

const {
  crearActividad,
  obtenerActividades,
  eliminarActividad
} = require("../controllers/ActivityController");

router.post(
  "/",
  crearActividad
);

router.get(
  "/",
  obtenerActividades
);

router.delete(
  "/:id",
  eliminarActividad
);

module.exports = router;