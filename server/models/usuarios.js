/* const usuario = {
    nombre: "Juan",
    apellido: "Lopez",
    nacimiento: "08/24/93",
    email: "juanlopez@mail.com",
    nombreUsuario: 'juan1234',
    contrasena: 1234
} */

const mongoose = require("../conexion");

const Usuarios = mongoose.model('usuarios', {
    nombre: String,
    apellido: String,
    nacimiento: String,
    email: String,
    nombreUsuario: String,
    contrasena: String,
    isAdmin: Boolean,
});

module.exports = Usuarios;
