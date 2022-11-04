const { response } = require('express')

const crearUsuario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'registro'
    })
}

const loginUsario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'login'
    })
}

const reevalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'revalidar'
    })
}

module.exports = {
    crearUsuario, loginUsario, reevalidarToken
}