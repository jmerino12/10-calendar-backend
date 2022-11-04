const { response } = require('express')
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

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

        const token = await generarJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
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

        const token = await generarJWT(usuario.id, usuario.name);
        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hablar con el admin',
        })
    }
}

const reevalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name);
    res.json({
        ok: true,
        uid,
        token
    })
}

module.exports = {
    crearUsuario, loginUsario, reevalidarToken
}