'use strict'

const { Router } = require('express');
const { check } = require('express-validator');
const { validateParams } = require('../middlewares/validate-params');
const { addFavorite, 
        deleteFavorite, 
        readFavorite} = require('../controllers/favorite.controller');

const api = Router();

api.post('/add-favorite', [
        check('numberAccount', 'El numero de cuenta es obligatorio').not().isEmpty(),
        check('typeAccount', 'El tipo de cuenta es obligatorio').not().isEmpty(),
        validateParams,
    ], addFavorite
);

api.get('/read-favorite', readFavorite);

api.delete('/delete-favorite/:id', deleteFavorite);

module.exports = api;