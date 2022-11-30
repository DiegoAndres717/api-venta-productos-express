const Pedidos = require("../models/Pedidos");

const postPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);

  try {
    //alamcenar
    await pedido.save();
    res.json({
      msg: "Se agregó un nuevo pedido",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Hubo un error",
    });
    next();
  }
};

const getPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos',
    });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

const getPedidoId = async (req, res, next) => {

    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos',
    });
    if(!pedido){
        res.json({
            msg: 'Cliente no existe'
        })
        next();
    }
    res.json({
        pedido
    })   
}

const putPedido = async ( req, res, next ) => {
    try {
        const Pedido = await Pedidos.findOneAndUpdate({ _id : req.params.idPedido }, req.body, {
            new: true
        })
        res.json({
            ok: true,
            Pedido
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

const deletePedido = async ( req, res, next ) => {
    try {
        const Pedido = await Pedidos.findOneAndDelete({ _id : req.params.idPedido })
        res.json({
            ok: true,
            msg: 'Pedido eliminado con exito'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

module.exports = {
  postPedido,
  getPedidos,
  getPedidoId,
  putPedido,
  deletePedido
};
