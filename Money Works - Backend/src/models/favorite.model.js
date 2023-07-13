'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    favorites: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    apodo: {
        type: String,
        require: true
    },
    numberAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuenta',
        require: true,
    },
    typeAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuenta',
        require: true,
    },
});

module.exports = mongoose.model('Favorite', favoriteSchema);