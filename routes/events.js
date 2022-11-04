const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerEventos, crearNuevoEvento, actualizarEvento, eliminarEvento } = require('../controllers/events.controller');
const { isDate } = require('../helpers/isDate');
const { validarJWT } = require('../helpers/validat-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.use(validarJWT)

router.get('/', [validarCampos], obtenerEventos)
router.post('/',
    [
        check('title', 'titulo es obligatior').notEmpty(),
        check('start', 'start es obligatior').custom(isDate),
        check('end', 'end es obligatior').custom(isDate),
        validarCampos
    ], crearNuevoEvento)
router.put('/:id', [validarCampos], actualizarEvento)
router.delete('/:id', [validarCampos], eliminarEvento)

module.exports = router