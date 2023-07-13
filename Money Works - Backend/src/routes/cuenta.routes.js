'use strict'

const { Router } = require("express");
const {validateParams} = require('../middlewares/validate-params')
const { validateJWT,
        validateAdmin } = require('../middlewares/validate-jwt');
const { createCuenta,
        listCuentas,
        deleteCuenta } = require("../controllers/cuenta.controller");

const api = Router();

api.post('/create-cuenta/:id', validateParams, validateJWT, validateAdmin, createCuenta)

api.get('/list-cuenta', validateParams, validateJWT, validateAdmin,listCuentas);

api.delete('/delete-cuenta/:id', validateParams, validateJWT, validateAdmin,deleteCuenta)

module.exports = api;