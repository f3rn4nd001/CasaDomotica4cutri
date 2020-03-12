const Sensores = require('../model/Sensores');
const monsgoose = require('mongoose');
const DatosSensores = {};


DatosSensores.getMTDatos = async(req, res) => {

    const flama = await Sensores.find().sort({ fecha: 'desc' }).where('nombre').equals('Flama');

    const sensores = await Sensores.find();

    res.render('principal/index', { sensores, flama });
    console.log(flama);


}

module.exports = DatosSensores;