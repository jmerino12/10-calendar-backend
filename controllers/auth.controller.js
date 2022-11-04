const { response } = require('express')
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario')

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body


    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe ese correo',
            })
        }
        usuario = new Usuario(req.body)
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save();
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el admin',
        })
        console.log(error)

    }

}

const loginUsario = async (req, res = response) => {
    const { email, password } = req.body
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y contraseña no son correctos.',
            })
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrect'
            })
        }

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hablar con el admin',
        })
    }
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