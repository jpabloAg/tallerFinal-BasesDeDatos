const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

router.get('/client-list', clientController.list);
router.post('/client-save', clientController.save);
router.get('/client-delete/:cedula', clientController.delete);
router.post('/filter', clientController.filteredSearch);

module.exports = router;