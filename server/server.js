//LIBRERIAS
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const Usuarios = require("./models/Usuarios");

//INSTANCIAS
const server = express();

//CONST
const PORT = 3000;
const JWT_SECRET = "AlgoOOMUyComPLicADODEDECifFrar8902349082345nasdkjnasdf";

//GLOBAL MIDDLEWARES
server.use(express.json());

server.use(logger);

server.use(cors());

server.use(helmet());

server.use(compression());

server.use(
    expressJwt({
        secret: JWT_SECRET,
        algorithms: ["HS256"],
    }).unless({
        path: ["/logIn", "/signIn"],
    })
);

//ENDPOINTS
server.post("/signIn", async(req,res)=>{
    const newUser = new Usuarios({
        nombre: req.nombre,
        apellido: req.apellido,
        nacimiento: req.nacimiento,
        email: req.email,
        nombreUsuario: req.nombreUsuario,
        contrasena: req.contrasena,
        isAdmin: false,
        origen: undefined,
        destino: undefined,
        dias: undefined,
        personas: undefined,
        partida: undefined,
        llegada: undefined
    })
});

server.post("/logIn", async (req, res) =>{
    const {email, password} = req.body;

    const posibleUsuario = await Usuarios.findOne({
        email,
        password,
    });

    if(!posibleUsuario) {
        res.status(401).json({error: "Email o password incorrectos"});
    } else{
        const token = jwt.sign(
            {
                nombre: posibleUsuario.nombre,
                apellido: posibleUsuario.apellido
            },
            JWT_SECRET,
            { expiresIn: "60m"}
        );

        res.status(200);
        res.json({token});
    }
});