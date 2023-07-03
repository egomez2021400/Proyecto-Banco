'use strict'

const { Router } = require('express');
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { validateJWT,
        validateAdmin } = require('../middlewares/validate-jwt');
const { transferencia } = require('../controllers/transferencia.controller');

const api = Router();

api.post('/transferencia', transferencia);

module.exports = api;