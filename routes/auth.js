const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { crearUsuario, loginUsario, reevalidarToken } = require('../controllers/auth.controller');

router.post('/new',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').isLength({ min: 6 }),
    ],
    crearUsuario);

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').isLength({ min: 6 }),
    ],
    loginUsario);

router.get('/renew', reevalidarToken);


module.exports = router