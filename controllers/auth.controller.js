const { response } = require('express')

const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body



    res.status(201).json({
        ok: true,
        msg: 'registro',
        user: req.body
    })
}

const loginUsario = (req, res = response) => {
    const { email, password } = req.body

    res.json({
        ok: true,
        msg: 'login',
        login: {
            email,
            password
        }
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