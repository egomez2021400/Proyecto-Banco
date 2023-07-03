'use strict';

const Transferencia = require('../models/transferencia.model');
const User = require('../models/user.model');

// Realizar transferencia
const transferencia = async (req, res) => {
  const { senderAccountNumber , receiverAccountNumber, amount, description } = req.body;
  try {
    //Buscar el usuario emisor en base al número de cuenta
    const senderUser = await User.findOne({ 'cuenta.numberAccount': senderAccountNumber  });
    if (!senderUser) {
      throw new Error( 'El número de cuenta del remitente no existe en la BD.' )
    }

    //Buscar el usuario receptor en base al número de cuenta
    const receiverUser = await User.findOne({ 'cuenta.numberAccount': receiverAccountNumber });
    if(!receiverUser) {
      throw new Error( 'No se encontró al usuario receptor con el número de cuenta proporcionado.' );
    }

    //Obtener la cuenta del emisor
    const senderAccount  = senderUser.cuenta.find( (cuenta) => cuenta.numberAccount === senderAccountNumber );
    if (!senderAccount ) {
      throw new Error( 'El número de cuenta del destinatario no existe en la BD.' );
    }

    //Obtener la cuenta del receptor
    const receiverAccount  = receiverUser.cuenta.find( (cuenta) => cuenta.numberAccount === receiverAccountNumber );
    if(!receiverAccount) {
      throw new Error( 'No se encontró la cuenta del usuario receptor con el númoer de cuenta proporcionado.' );
    }

    //Validar que el saldo del emisor sea suficiente
    if(senderAccount.balance < amount){
      throw new Error( 'El saldo del usuario emisor es insuficiente para realizar la transferencia' );
    }

    //Actualizar los saldos de las cuentas
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    //Guardar los cambios en la base de datos
    await senderUser.save();
    await receiverUser.save();

    //Crear el registro de la transferencia
    const transferencia = new Transferencia({
      senderAccount: senderAccountNumber,
      receiverAccount: receiverAccountNumber,
      amount,
      description,
    })

    await transferencia.save();

    //Devolver el resultado de la transferencia
    return {
      sender: senderUser.name,
      receiver: receiverUser.name,
      amount,
      description,
    };

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error al realizar transferencia.' });
  }
};

module.exports = { transferencia };