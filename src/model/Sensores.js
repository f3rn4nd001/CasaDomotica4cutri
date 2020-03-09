const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const sensorNuevo = new Schema({
    Sensor: { type: String, required: true },
    Apartado: { type: String, required: true },
    dato: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Sensores', sensorNuevo)