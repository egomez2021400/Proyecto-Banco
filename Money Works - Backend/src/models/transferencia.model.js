'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transferenciaSchema = Schema({
    senderAccountNumber : {
        type: Number,
        required: true,
        validate: {
          validator: function(value) {
            return !isNaN(value);
          },
          message: 'El número de cuenta del remitente debe ser un valor numérico.',
        },
      },
    receiverAccountNumber: {
        type: Number,
        required: true,
        validate: {
          validator: function(value) {
            return !isNaN(value);
          },
          message: 'El número de cuenta del destinatario debe ser un valor numérico.',
        },
      },
    amount: {
        type: Number,
        required: true,
        min: 0,
      },
    description: {
        type: String,
        required: true,
      },
    date: {
        type: Date,
        default: Date.now,
      },
});

module.exports = mongoose.model('Transferencia', transferenciaSchema)