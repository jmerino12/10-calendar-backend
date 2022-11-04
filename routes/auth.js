const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsario, reevalidarToken } = require('../controllers/auth.controller');
const { validarJWT } = require('../helpers/validat-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.post('/new',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsario);

router.get('/renew', validarJWT, reevalidarToken);


module.exports = router