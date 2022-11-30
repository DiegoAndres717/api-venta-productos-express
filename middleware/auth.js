const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) => {

    //autorizacion por header
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('No authorization, No hay JWT');
        error.statusCode = 401;
        throw error;
    }

    //obtener el token
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
    if(!revisarToken){
        const error = new Error('No Autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();

}
