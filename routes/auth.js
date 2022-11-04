const { Router } = require('express');
const { crearUsuario, loginUsario, reevalidarToken } = require('../controllers/auth.controller');
const router = Router();

router.post('/new', crearUsuario);

router.post('/', loginUsario);

router.get('/renew', reevalidarToken);


module.exports = router