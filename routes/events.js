
/*
    Events routes
    /api/events
*/

const {Router} = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router = Router();

//como todas las rutas necesitan validar el token, se valida aqui de forma general
router.use(validarJWT);

//Todas tienen que pasar por la validación del JWT
//obtener eventos
router.get('/', getEvents);

//crear un nuevo evento
router.post('/',
    [
        check('title', 'Title is necessary').not().isEmpty(),
        check('start', 'Start date is necessary').custom(isDate),
        check('end', 'End date is necessary').custom(isDate),
        validarCampos
    ],
    createEvent);

//actualizar evento
router.put('/:id',
    [
        check('title', 'Title is necessary').not().isEmpty(),
        check('start', 'Start date is necessary').custom(isDate),
        check('end', 'End date is necessary').custom(isDate),
        validarCampos
    ],
    updateEvent);

//borrar evento
router.delete('/:id', deleteEvent);

module.exports = router

