'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cuentaSchema = Schema({
    name: {
        type: Object, ref: 'User',
    },
    nickname: {
        type: Object, ref: 'User',
    },
    balance: {
        type: Number,
        default: 0,
    },
    typeAccount: {
        type: String,
        String: ['Ahorro, Corriente, Nómina, Monetaria'],
        require: true
    },
    typeBank: {
        type: String,
        String: ['Público, Privado, Mixto'],
        require: true,
    },
    income: {
        type: Number,
        require: true,
        validate: {
            validator: function(value) {
                return value >=100;
            },
            message: 'Los ingresos mensuales deben de ser mayor o igual a 100.'
        }
    },
    numberAccount: {
        type: Number,
        require: true,
        default: () => Math.floor(Math.random() * 90000000000000000000) + 10000000000000000000
    },
});

module.exports = mongoose.model('Cuenta', cuentaSchema)