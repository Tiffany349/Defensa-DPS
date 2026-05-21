const express = require('express');

const router = express.Router();

const {
  crearInscripcion,
  obtenerInscripciones,
  eliminarInscripcion
} = require('../controllers/inscriptionController');

router.post(
  '/',
  crearInscripcion
);

router.get(
  '/',
  obtenerInscripciones
);

router.delete(
  '/:id',
  eliminarInscripcion
);

module.exports = router;