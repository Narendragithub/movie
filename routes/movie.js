const path = require('path');
const express = require('express');

const movieController = require('../controllers/movie');
const router = express.Router();

router.get('/', movieController.getIdex );
module.exports = router;