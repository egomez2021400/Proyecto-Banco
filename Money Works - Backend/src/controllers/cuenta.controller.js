'use strict';

const Cuenta = require('../models/cuenta.model');

const createCuenta = async (req, res) => {
    try {
    const { name, nickname, balance ,income, typeAccount, typeBank } = req.body;

    // Obtén el ID del usuario registrado
    const userId = req.user._id;

    // Verifica si el usuario ya tiene una cuenta
    /*const existingCuenta = await Cuenta.findOne({ name: userId });

    if (existingCuenta) {
        return res.status(400).json({
        message: "El usuario ya tiene una cuenta registrada.",
        ok: false,
        cuenta: existingCuenta,
        }); ESTO NO ERA NECESARIO EDGAR
    }*/ 

    // Define el balance basado en el valor de income
    //const balance = income >= 100 ? income : 0; ESTO SOLO HACIA QUE BALANCE FUESE LO MISMO QUE INCOME EDGAR:/

    // Crea una nueva cuenta con los datos proporcionados
    const newCuenta = new Cuenta({
        name: userId,
        nickname,
        balance,
        typeAccount,
        typeBank,
        income,
    });

    // Guarda la nueva cuenta en la base de datos
    await newCuenta.save();

    return res.status(201).json({
        message: "Se ha creado una nueva cuenta para el usuario.",
        ok: true,
        cuenta: newCuenta,
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: "Ha ocurrido un error al crear la cuenta.",
        ok: false,
        error: error.message,
        });
    }
};

    const listCuentas = async (req, res) => {
    try {
        // Verifica si el usuario actual está autenticado y tiene la propiedad 'rol'
        if (!req.user || !req.user.rol) {
            return res.status(401).json({
                message: "Acceso no autorizado. Debe iniciar sesión como ADMINB.",
                ok: false,
            });
        }

        // Verifica si el usuario actual es el administrador "ADMINB"
        const isAdminB = req.user.rol === "ADMINB";

        // Si no es el administrador "ADMINB", retorna un mensaje de error
        if (!isAdminB) {
            return res.status(401).json({
                message: "Solo el administrador ADMINB puede listar las cuentas.",
                ok: false,
            });
        }

        // Realiza la consulta de todas las cuentas
        const cuentas = await Cuenta.find();

        return res.status(200).json({
            cuentas,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Ha ocurrido un error al obtener la lista de cuentas.",
            ok: false,
            error: error.message,
        });
    }
};

const deleteCuenta = async (req, res) => {
    try {
    const cuentaId = req.params.id; // Obtén el ID de la cuenta a eliminar

    // Verifica si la cuenta existe
    const cuenta = await Cuenta.findById(cuentaId);
    if (!cuenta) {
        return res.status(404).json({
        message: 'La cuenta no existe.',
        ok: false,
        });
    }

    // Elimina la cuenta de la base de datos
    await Cuenta.findByIdAndDelete(cuentaId);

    return res.status(200).json({
        message: 'La cuenta ha sido eliminada correctamente.',
        ok: true,
    });
        
    } catch (error) {
    console.error(error);
        return res.status(500).json({
            message: 'Ha ocurrido un error al eliminar la cuenta.',
            ok: false,
            error: error.message,
        });
    }
};

module.exports = { createCuenta, listCuentas, deleteCuenta };