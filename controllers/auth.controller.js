const { response } = require('express')
const Usuario = require('../models/Usuario')

const crearUsuario = async (req, res = response) => {

    const usuario = new Usuario(req.body)
    try {
        await usuario.save();
        res.status(201).json({
            ok: true,
            msg: 'Exitoso',
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el admin',
        })
        console.log(error)

    }

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