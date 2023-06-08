
const { response } = require('express');
const { validationResult } = require('express-validator')


const validarCampos = (request, resp = response, next) => {

    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return resp.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();

}

module.exports = {
    validarCampos
}

