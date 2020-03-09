const express = require('express');
const router = express.Router();

const Sensores = require('../model/Sensores');
const monsgoose = require('mongoose');
const DatosSensores = require('../controller/Datos');
router.get('/', DatosSensores.getMTDatos);

module.exports = router;