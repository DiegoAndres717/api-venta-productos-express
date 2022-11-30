const Usuarios = require('../models/Usuarios')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const registrarUsuario = async ( req, res ) => {

    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({
            msg: 'Usuario creado correctamente'
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: 'Hubo un error'
        })
    }
}

const autenticarUsuario = async ( req, res, next ) => {
    //buscar usuario
    const usuario = await Usuarios.findOne({ email: req.body.email});

    if (!usuario) {
        await res.status(401).json({
            msg: 'Usario no existe'
        })
        next();
    }else {
        if (!bcrypt.compareSync(req.body.password, usuario.password)) {
            await res.status(401).json({
                msg: 'Password incorrect'
            })
            next();
        }else{
            const token = jwt.sign({
                email : usuario.email,
                nombre : usuario.nombre,
                id : usuario._id
            }, 'LLAVESECRETA',{
                expiresIn: '24h'
            })

            res.json({
                token
            })
        }
    }
}

module.exports = {
    registrarUsuario,
    autenticarUsuario
}
