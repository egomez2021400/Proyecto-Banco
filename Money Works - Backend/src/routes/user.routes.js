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
        readUserRol,
        viewOwnUser} = require('../controllers/user.controller');
const { createTransferencias } = require('../controllers/transferencia.controller');

const api = Router();

api.post('/create-user', [
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser igual o mayor a 8 digitos').isLength({min: 8}),
        validateParams,
    ], createUser
);

api.get('/read-rol', [
    validateJWT
], readUserRol)

api.get('/read-user', readUser)

api.get('/profile', [
    validateJWT
], viewOwnUser
)
api.post('/transfers', createTransferencias)
api.put('/update-user/:id', [validateJWT,
        check('name', 'El name es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        validateParams, validateAdmin
    ], updateUser
);

api.delete('/delete-user/:id', validateJWT, validateAdmin, deleteUser);

api.post('/login', loginUser)

module.exports = api;