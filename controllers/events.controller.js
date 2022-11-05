const { response } = require('express')
const Evento = require('../models/Evento')

const obtenerEventos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getEventos'
    })
}

const crearNuevoEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    evento.user = req.uid;

    try {
        const eventoDB = await evento.save();
        res.json({
            ok: true,
            evento: eventoDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}
const actualizarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizar evento'
    })
}
const eliminarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminar evento'
    })
}

module.exports = {
    obtenerEventos,
    crearNuevoEvento,
    actualizarEvento,
    eliminarEvento
}