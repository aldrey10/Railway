/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/

const {Router} = require('express');
const { check } = require('express-validator')
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')

router.post('/new', 
[//middlewares
    check('name', 'Name is necessary').not().isEmpty(),
    check('email', 'Email is necessary').isEmail(),
    check('password', 'Password needs to have at least 6 characters').isLength({min: 6}),
    validarCampos
], createUser)

router.post('/', 
[//middlewares
    check('email', 'Email is necessary').isEmail(),
    check('password', 'Password needs to have at least 6 characters').isLength({min: 6}),
    validarCampos
], loginUser)

router.get('/renew', validarJWT, renewToken)


module.exports = router;