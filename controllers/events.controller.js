const { response } = require('express')
const Evento = require('../models/Evento')

const obtenerEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name');
    res.json({
        ok: true,
        eventos
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
const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id
    const uid = req.uid

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe con ese ID"
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No esta autorizado para hacer esto'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Evento actualizado',
            evento: eventoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

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