const { response } = require('express')

const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body
    if (name.length < 5) {
        return res.status(400).json({
            ok: false,
            msg: 'el nombre debe tener 5 letras'
        })
    }
    return res.json({
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