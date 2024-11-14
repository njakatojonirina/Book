
const express = require('express');
const livreController = require('../controleurs/LivresControleurs');
const router = express.Router();

router.post('/api/livre', livreController.addLivre);
router.get('/api/livre', livreController.getLivres);
router.get('/api/livre/:id', livreController.getLivreById);

module.exports = router;
