'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        require: true
    },
    DPI: {
        type: Number,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    rol: {
        type: String,
        enum: ['ADMINBANCO', 'CLIENTE', 'ADMINB'],
        require: false
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorite',
    }],
    cuenta: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuenta',
    }]
});

module.exports = mongoose.model('User', userSchema);