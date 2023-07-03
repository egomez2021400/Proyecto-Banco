'use strict'

const Favorite = require('../models/favorite.model');
const Usuario = require('../models/user.model');

//Agregar usuarios a Favoritor
const addFavorite = async(req, res) => {
    const { apodo, numberAccount, typeAccount, name } = req.body;
    try {
        let favorit = await Favorite.findOne({apodo});
        
        if(favorit){
            return res.status(400).send({
                message: "No se puede agregar usuario a favoritos.",
                ok: false,
                favorite: favorit
            })
        }

        const user = await Usuario.findOne({ name });
        const idUsuario = user ? user._id: null;

        const addFavorites = new Favorite({
            apodo,
            numberAccount, 
            typeAccount,
            user: idUsuario
        })

        if(idUsuario) {
            await Usuario.findByIdAndUpdate(
                idUsuario,
                {$push: {favorites: addFavorites._id}},
                {new: true, useFindAndModify: false}
            )
        };

        await addFavorites.save();

        return res.status(200).json({
            message: "Se ha creado un nuevo favorito",
            ok: true,
            addFavorite: addFavorites
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Error al agregar favoritos.'
        });
    }
};

//Listar Favoritos
const readFavorite = async(req, res) => {
    try{
        const favorit = await Favorite.find();

        if(!favorit){
            res.status(404).send({
                message: "No hay usuarios Favoritos."
            })
        }else{
            res.status(200).json({
                'Favoritos encontrados encontrados': favorit
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Error al listar favoritos.'
        });
    }
}

//Eliminar usuarios de Favoritos
const deleteFavorite = async(req, res) => {
    try{
        const id = req.params.id;
        const eliminateFav = await Favorite.findByIdAndDelete(id);
        if(!eliminateFav){
            return res.status(404).json({
                message: "No existe el user favorito"
            })

        }

        const idFav = eliminateFav.favorit;
        const fav = await Favorite.findById(idFav);

        if(!idFav){
            return res.status(404).json({
                message: "Favorito eliminado correctamente."
            })
        }

        fav.favorit.pull(id);
        await fav.save();

    }catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Error al eliminar favoritos.'
        });
    }
};

module.exports = {  addFavorite,
                    readFavorite,
                    deleteFavorite}