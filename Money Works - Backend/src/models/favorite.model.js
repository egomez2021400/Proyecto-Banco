'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = Schema({
    apodo: {
        type: String,
        require: true
    },
    numberAccount: {
        type: Number,
        require: true,
    },
    typeAccount: {
        type: String,
        String: ['Ahorro, Corriente, Nómina, Monetaria'],
        require: true
    },
});

module.exports = mongoose.model('Favorite', favoriteSchema);