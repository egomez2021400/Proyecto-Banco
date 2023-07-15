'use strict'

const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/create-jwt');

//Administrador por defecto
const ADMINB = async(req, res) => {
    try{
        let user = new Usuario();
        user.name = "ADMINB";
        user.nickname = "AdminBanc";
        user.gender = "Indefinido"
        user.DPI = "1234079630101";
        user.address = "Guatemala, zona 6";
        user.phone = "37946559";
        user.email = "adminb@kinal.edu.gt"; 
        user.password = "ADMINB123";
        user.rol = "ADMINB";
        const userEncontrado = await Usuario.findOne({ email: user.email });
        if(userEncontrado) return console.log("The ADMINB is ready");
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        user = await user.save();
        if(!user) return console.log("The ADMINB is not ready");
        return console.log("The ADMINB is ready");
    }catch(error) {
        console.log(error)
        throw new Error(error)
    }
};

//Crear Usuarios
const createUser = async(req, res) => {
    const { name, email, password } = req.body;
    try{
        let usuario = await Usuario.findOne({email: email})

        if(usuario){
            return res.status(400).send({
                message: `Un usuario ya usa el email ${email}`,
                ok: false,
                usuario: usuario
            });
        }

        usuario = new Usuario(req.body);

        //Encriptación de contraseña
        const saltos = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, saltos);

        //Guardar usuarios
        usuario = await usuario.save();

        //Crear token
        const token = await generateJWT(usuario.id, usuario.name, usuario.email)
        res.status(200).send({
            message: `Usuario ${usuario.name} creado correctamente`,
            ok: true,
            usuario,
            token: token,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: `No se pudo crear el usuario ${name}`,
            error: error,
        })
    }
};

//Listar usuarios
const readUser = async(req, res) => {
    try{
        const user = await Usuario.find();

        if(!user){
            res.status(400).send({
                message: 'No hay usuarios disponibles'
            })
        } else {
            //eliminar Usuarios encontrados
            res.status(200).json({
                user
            })
        }
    }catch(error){
        throw new Error(error);
    }
};

//Editar Usuarios
const updateUser = async(req, res) => {
    try{
        const id = req.params.id;
        let editUser = {...req.body};

        //Encriptación de contraseña
        editUser.password = editUser.password
        ? bcrypt.hashSync(editUser.password, bcrypt.genSaltSync())
        : editUser.password

        const userComplete = await Usuario.findByIdAndUpdate(id, editUser, {
            new: true
        });

        if(userComplete) {
            const token = await generateJWT(userComplete.id, userComplete.name, userComplete.email);
            return res.status(200).send({
                message: "Usuario actualizado correctamente",
                userComplete,
                token,
            })
        }else{
            res.status(404).send({
                message: 'Este usuario no existe en la base de datos, o verifique parametros'
            })
        };

    }catch(error){
        throw new Error(error);
    }
};

//Eliminar Usuarios
const deleteUser = async(req, res) => {
    try{
        const id = req.params.id;
        const user = await Usuario.findById(id)
        
        if(!user){
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        await user.remove();

        res.json({
            message: 'Usuario eliminado correctamente'
        })

    }catch(error){
        res.status(500).json('Error en el servidor')
        console.log(error)
    }
};

const readUserRol = async(req, res) => {
    try{
        const idUser = req.user._id;
        const findUser = await Usuario.findById(idUser)
        if(!findUser) return res.status(400).send({message:'No se ha encontrado el usuario en la base de datos.' });
    
        const rol = findUser.rol;

        return res.status(200).send({message: 'Rol de usuario no encontrado.', rol})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'No se pudo completar la accion'})
    }
}

//Ver mi perfil
    const viewOwnUser = async(req, res) =>{
    try {

        const idUser = req.user._id;

        //Comprobar que el usuario exista
        const user = await Usuario.findById(idUser);
        if(!user) return res.status(404).send({message: 'No se encontro el usuario en la base de datos.'});

        //Retornar el usuario 
        return res.status(200).send({message: 'Usuario encontrado.', user})

    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'No se pudo completar la tarea. Error en el servidor'})
    }
}

//Login Usuarios
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        const users = await Usuario.findOne({email});

        if(!users){
            return res.status(404).send({
                ok: false,
                message: 'No se encontro el email'
            })
        };

        const validatePassword = bcrypt.compareSync(
            password,
            users.password
        );

        if(!validatePassword){
            return res.status(400).send({
                ok: false,
                message: 'Password incorrecto'
            });
        };

        const token = await generateJWT(users.id, users.name, users.email);
        res.json({
            message: `Usuario logeado correctamente, ${users.name}`,
            ok: true,
            uId: users.id,
            name: users.name,
            email: users.email,
            token: token,
        });

    }catch(error){
        res.status(500).json({
            ok: false,
            message: 'Usuario no registrado'
        })
    }
};

module.exports = {  ADMINB,
                    createUser,
                    readUser,
                    updateUser,
                    deleteUser,
                    readUserRol,
                    viewOwnUser,
                    loginUser};