const express = require('express');

const router = express.Router();

const inscriptionController =
  require('../controllers/inscriptionController');

router.get(
  '/',
  inscriptionController.getInscriptions
);

router.post(
  '/',
  inscriptionController.createInscription
);

router.delete(
  '/:id',
  inscriptionController.deleteInscription
);

router.put(
  '/validar/:id',
  inscriptionController.validarHoras
);

module.exports = router;