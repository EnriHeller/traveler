const mongoose = require("../conexion");

const Compras = mongoose.model('compras', {
    idCompra: Number,
    userId: String,
    fechaInicioElegida: String,
    estado: String,
});

module.exports = Compras;