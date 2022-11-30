const { Router } = require('express');
const { postCliente, getClientes, getClienteId, putCliente, deleteCliente } = require('../controllers/clientes');
const { postPedido, getPedidos, getPedidoId, putPedido, deletePedido } = require('../controllers/pedidos');
const { postProducto, subirArchivo, getProductos, getProductoId, putProducto, deleteProducto, buscarProducto } = require('../controllers/productos');
const { registrarUsuario, autenticarUsuario } = require('../controllers/usuarios');
const auth = require('../middleware/auth');

const router = Router();

module.exports = function() {
    //agregar
    router.post('/clientes', auth, postCliente)

    //obtener todos los clientes
    router.get('/clientes', auth, getClientes)

    //cliente en especifico
    router.get('/clientes/:idCliente', auth, getClienteId)

    //actualizar
    router.put('/clientes/:idCliente', auth, putCliente)

    //eliminar
    router.delete('/clientes/:idCliente', deleteCliente)

                /* Productooos */
    //agregar
    router.post('/productos', auth, subirArchivo, postProducto)

    //obtener todos los productos
    router.get('/productos', auth, getProductos)

    //busqueda de productos
    router.post('/productos/busqueda/:query', buscarProducto)

    //cliente en especifico
    router.get('/productos/:idProducto', auth, getProductoId)

    //actualizar
    router.put('/productos/:idProducto', subirArchivo, putProducto)

    //eliminar
    router.delete('/productos/:idProducto', deleteProducto)

            /* PEDIDOS */
    //agregar
    router.post('/pedidos/nuevo/:idUsuario', postPedido)

    //obtener todos los clientes
    router.get('/pedidos', auth, getPedidos)

    //cliente en especifico
    router.get('/pedidos/:idPedido', auth, getPedidoId)

    //actualizar
    router.put('/pedidos/:idPedidos', auth, putPedido)

    //eliminar
    router.delete('/pedidos/:idPedido', deletePedido)

    /* USUARIOSSS */
    router.post('/crear-cuenta', auth, registrarUsuario)

    router.post('/iniciar-sesion', autenticarUsuario)

    return router;
}

