const { response } = require('express')

const obtenerEventos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getEventos'
    })
}

const crearNuevoEvento = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'crear evento',
        evento: req.body
    })
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