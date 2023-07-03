'use strict'

const { Router } = require('express');
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { validateJWT,
        validateAdmin } = require('../middlewares/validate-jwt');
const { createUser,
        readUser, 
        updateUser, 
        deleteUser, 
        loginUser, 
        createCuenta,
        readCuentas,
        deleteCuenta} = require('../controllers/user.controller');

const api = Router();

api.post('/create-user', [
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser igual o mayor a 8 digitos').isLength({min: 8}),
        validateParams,
    ], createUser
);

api.get('/read-user', readUser);

api.put('/update-user/:id', [validateJWT,
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        validateParams, validateAdmin
    ], updateUser
);

api.delete('/delete-user/:id', validateJWT, validateAdmin, deleteUser);

api.post('/login', loginUser)

//Crear Cuentas para Usuarios

api.post('/create-cuenta/:id', validateJWT, validateParams, validateAdmin,createCuenta);

api.get('/read-cuenta', validateJWT, validateParams, validateAdmin, readCuentas);

api.delete('/delete-cuenta/:id', validateJWT, validateParams, validateAdmin, deleteCuenta) 

module.exports = api;