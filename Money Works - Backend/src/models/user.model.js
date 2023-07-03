'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        String: ['Masculino', 'Femenino'],
        required: true,
    },
    DPI: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                const dpiString = value.toString();
                return dpiString.length === 14;
            },
            message: 'El DPI debe contener exactamente 14 números.'
        }
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        String: ['ADMINBANCO', 'CLIENTE', 'ADMINB'],
        required: true
    },
    cuenta: [{
        nameWork: {
            type: String,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        typeAccount: {
            type: String,
            String: ['Ahorro, Corriente, Nómina, Monetaria'],
            required: true
        },
        typeBank: {
            type: String,
            String: ['Público, Privado, Mixto'],
            required: true,
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
            required: true,
            default: () => Math.floor(Math.random() * 90000000000000000000) + 10000000000000000000
        },
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Favorite'
      }],
});

module.exports = mongoose.model('User', userSchema);