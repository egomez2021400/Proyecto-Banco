'use strict'

const Favorite = require('../models/favorite.model');
const Usuario = require('../models/user.model');
const Cuenta = require('../models/cuenta.model');

const addFavorite = async(req, res) => {
    const { name, favoriteId, apodo, numberAccount, typeAccount } = req.body;
    try{
        const user = await Usuario.findById(name);
        if(!user){
            return res.status(404).json({
                message: 'Usuario no encontrado en la BD'
            })
        }

        const favoriteUser = await Usuario.findById(favoriteId);
        if(!favoriteUser) {
            return res.status(404).json({
                message: 'Usuario favorito no encontrado en la BD'
            })
        }

        const cuenta = await Cuenta.findOne({ numberAccount, typeAccount});
        if(!cuenta){
            return res.status(404).json({
                message: 'Cuenta no encontrada en la BD'
            })
        }

        const newfavorite = new Favorite({
            user: name,
            favorite: favoriteUser,
            apodo: apodo,
            account: cuenta._id
        });

        await newfavorite.save();

        res.status(200).json({
            message: 'Usuario favorito agregado correctamente', favorite
        })
    }catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al agregar un usuario a favorito'
        })
    }
}

module.exports = { addFavorite }