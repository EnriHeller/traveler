const mongoose = require("../conexion");

const Compras = mongoose.model('compras', {
    userEmail: String,
    idPaquete: Number,
    fechaInicioElegida: String,
    precio: Number,
    estado: String,
});

module.exports = Compras;