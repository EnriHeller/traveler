const mongoose = require("../conexion");

const Compras = mongoose.model('compras', {
    idCompra: Number,
    userId: String,
    userEmail: String,
    idPaquete: Number,
    fechaInicioElegida: String,
    precio: Number,
    estado: String,
});

module.exports = Compras;