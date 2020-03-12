const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const sensorNuevo = new Schema({
    data: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Sensores', sensorNuevo)