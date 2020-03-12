const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const sensorNuevo = new Schema({

    dataa: { type: Object, required: true },
    fecha: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Sensores', sensorNuevo)