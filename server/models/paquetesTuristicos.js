const mongoose = require("../conexion");

const PaquetesTuristicos = mongoose.model('paquetesTuristicos', {
    id: Number,
    nombreDestino: String,
    descripcion: String,
    fechaInicioPeriodo: String,
    fechaFinPeriodo: String,
    duracionDiasPaquete: Number,
    precio: Number,
    imgUrl: String,
    stock: Number
})

module.exports = PaquetesTuristicos;