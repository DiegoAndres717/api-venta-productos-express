const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        },
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo 
const subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}
const postProducto = async ( req, res, next ) => {
    
    const producto = new Productos(req.body);

    try {
        //si hay un archivo
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }
        //alamcenar
        await producto.save();
        res.json({
            msg: 'Se agregó un nuevo producto'
        }); 
        
    } catch (error) {
        console.log(error);
        next();
    }
}

const getProductos = async (req, res, next) => {

    try {
        const productos = await Productos.find({});
        res.json({
            ok: true,
            productos
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

const getProductoId = async (req, res, next) => {

    const producto = await Productos.findById(req.params.idProducto);
    if(!producto){
        res.json({
            ok: false,
            msg: 'Cliente no existe'
        })
        next();
    }
    res.json({
        ok: true,
        producto
    })   
}

const putProducto = async ( req, res, next ) => {
    try {
        let productoAnterior = await Productos.findById(req.params.idProducto);
        //construir nuevo producto
        let nuevoProducto = req.body;

        //verificaar si hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename
        }else{
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({ _id : req.params.idProducto }, nuevoProducto, {
            new: true
        })
        res.json({
            ok: true,
            producto
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

const deleteProducto = async ( req, res, next ) => {
    try {
        const producto = await Productos.findOneAndDelete({ _id : req.params.idProducto })
        res.json({
            ok: true,
            msg: 'Producto eliminado con exito'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

const buscarProducto = async ( req, res, next ) => {
    try {
        //obtener el query
        const { query } = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

module.exports = {
    subirArchivo,
    postProducto,
    getProductos,
    getProductoId,
    putProducto,
    deleteProducto,
    buscarProducto
}

