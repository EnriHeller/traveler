const mongoose = require("../conexion");

const PaquetesTuristicos = mongoose.model('paquetesTuristicos', {
    id: Number,
    nombreDestino: String,
    descripcion: String,
    duracionDiasPaquete: Number,
    precio: Number,
    imgUrl: String,
    stock: Number,
    activo: Boolean
})

module.exports = PaquetesTuristicos;