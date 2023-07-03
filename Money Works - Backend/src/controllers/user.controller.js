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
        user.DPI = "12340796301101";
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
            message: `No se pudo crear el Usuario, ${name}.`
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
        }else {
            res.status(200).json({"Usuarios encontrados": user})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Error al listar Usuarios.'
        })
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
        console.log(error)
        res.status(500).json({
            message: 'Error al editar Usuario.'
        })
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
        console.log(error)
        res.status(500).json({
            message: 'Error al eliminar el Usuario.'
        })
    }
};

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
        console.log(error)
        res.status(500).json({
            message: `Error al logear el Usuario ${users.name}`
        })
    }
};

//Crear Cuentas a Usuarios
const createCuenta = async (req, res) => {
    try {
        const id = req.params.id;
        const { nameWork, balance, typeAccount, typeBank, income } = req.body;

        const user = await Usuario.findById(id);

        if (!user) {
            return res.status(404).send({
                message: "Usuario no encontrado en la BD"
            });
        }

        user.cuenta.push({
            nameWork: nameWork,
            balance: balance,
            typeAccount: typeAccount,
            typeBank: typeBank,
            income: income
        });

        const updatedUser = await user.save();

        return res.status(200).send({ userCuenta: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al crear la cuenta para el usuario.'
        });
    }
};

//Listar Cuentas de Usuarios
const readCuentas = async (req, res) => {
    try {
        const cuentas = await Usuario.find({}, 'cuenta');

        if (cuentas.length === 0) {
            return res.status(404).send({
                message: "No se encontraron cuentas existentes."
            });
        }

        res.status(200).send({
            cuentas: cuentas.map(usuario => usuario.cuenta)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al listar Cuentas de Usuarios.'
        });
    }
};

//Eliminar Cuentas de Usuarios
const deleteCuenta = async (req, res) => {
    const id = req.params.id;
    const { idCuenta } = req.body;
    try {
      const eliminar = await Usuario.updateOne(
        { _id: id },
        { $pull: { cuenta: { _id: idCuenta } } },
        { new: true, multi: false }
      );
  
      if (eliminar.modifiedCount === 0) {
        return res.status(404).send({ msg: "Cuenta inexistente" });
      }
  
      return res.status(200).send({ msg: "Cuenta eliminada del usuario" });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al eliminar Cuentas de Usuarios.'
        });      
    }
};  

module.exports = {  ADMINB,
                    createUser,
                    readUser,
                    updateUser,
                    deleteUser,
                    loginUser,
                    createCuenta,
                    readCuentas,
                    deleteCuenta};