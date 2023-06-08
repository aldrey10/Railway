const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (request, resp = response, next) => {


    //x-token en los headers
    const token = request.header('x-token')

    if(!token){
        return resp.status(401).json({
            ok:false,
            msg:'No token on petition'
        })
    }

    try {
        
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED)

        request.uid = payload.uid;
        request.name = payload.name;

    } catch (error) {
        return resp.status(401).json({
            ok:false,
            msg:'Token not valid'
        })
    }


    next();
}

module.exports = {
    validarJWT
}



