'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transferenciasSchema = new mongoose.Schema({
    cuentaOrigen: {
        type: Schema.Types.String,
        ref: 'User',
        require: true,
        default: function(){
            return this.populated('cuentaOrigen')? this.cuentaOrigen.accountNumber : null
        }
    },
    cuentaDestino: {
        type: Schema.Types.String,
        ref: 'User',
        require: true,
    },
    monto : {
        type: Number,
        require: true
    }, 
    descripcion: {
        type: String,
        require: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transfers', transferenciasSchema);