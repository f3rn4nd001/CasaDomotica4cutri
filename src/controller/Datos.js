const Sensores = require('../model/Sensores');
const monsgoose = require('mongoose');
const DatosSensores = {};


DatosSensores.getMTDatos = async(req, res) => {
    const Infrarojo = await Sensores.find().sort({ fecha: 'desc' }).where('dataa.Sensor').equals('Infra');
    const cocinaFlama = await Sensores.find().sort({ fecha: 'desc' }).where('dataa.Sensor').equals('FLAMA');
    const cocinaGas = await Sensores.find().sort({ fecha: 'desc' }).where('dataa.Sensor').equals('Gas');
    const salaHumedad = await Sensores.find().sort({ fecha: 'desc' }).where('dataa.Sensor').equals('Humedad');   
    res.render('principal/index', { Infrarojo, cocinaFlama, cocinaGas,salaHumedad });

}

module.exports = DatosSensores;