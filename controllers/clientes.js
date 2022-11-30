const Clientes = require('../models/Clientes');

const postCliente = async ( req, res, next ) => {
    
    const cliente = new Clientes(req.body);

    try {
        //alamcenar
        await cliente.save();
        res.json({
            msg: 'Se agregó un nuevo cliente'
        }); 
        
    } catch (error) {
        console.log(error);
        res.send(error)
        next();
    }
}

const getClientes = async (req, res, next) => {

    try {
        const clientes = await Clientes.find({});
        res.json({
            ok: true,
            clientes
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

const getClienteId = async (req, res, next) => {

    const cliente = await Clientes.findById(req.params.idCliente);
    if(!cliente){
        res.json({
            ok: false,
            msg: 'Cliente no existe'
        })
        next();
    }
    res.json({
        ok: true,
        cliente
    })   
}

const putCliente = async ( req, res, next ) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente }, req.body, {
            new: true
        })
        res.json({
            ok: true,
            cliente
        })
    } catch (error) {
        res.rend(error);
        next();
    }
}

const deleteCliente = async ( req, res, next ) => {
    try {
        const cliente = await Clientes.findOneAndDelete({ _id : req.params.idCliente })
        res.json({
            ok: true,
            msg: 'Cliente eliminado con exito'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

module.exports = {
    postCliente,
    getClientes,
    getClienteId,
    putCliente,
    deleteCliente
}
