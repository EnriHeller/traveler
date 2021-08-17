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
    userId: String,
    clave: String,
    email: String,
    nombre: String,
    apellido: String,
    fechaNac: String,
    paisResidencia: String,
    administrador: Boolean
});

module.exports = Usuarios;
