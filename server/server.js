//LIBRERIAS
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const Usuarios = require("./models/usuarios");
const PaquetesTuristicos = require("./models/paquetesTuristicos");

//INSTANCIAS
const server = express();

//CONST
const PORT = 3000;
const JWT_SECRET = "AlgoOOMUyComPLicADODEDECifFrar8902349082345nasdkjnasdf";

//GLOBAL MIDDLEWARES
server.use(express.json());

// server.use(logger);

server.use(cors());

server.use(helmet());

server.use(compression());

server.use(
    expressJwt({
        secret: JWT_SECRET,
        algorithms: ["HS256"],
    }).unless({
        path: ["/logIn", "/signUp"],
    })
);

//MIDDLEWARES ESPECÍFICOS
const validarCamposRegistro = (req, res, next) => {
    const {
        userId,
        clave,
        email,
        nombre,
        apellido,
        fechaNac,
        paisResidencia
    } = req.body;

    if (
        userId == null || userId == "" ||
        clave == null || clave == "" ||
        email == null || email == "" ||
        nombre == null || nombre == "" ||
        apellido == null || apellido == "" ||
        fechaNac == null || fechaNac == "" ||
        paisResidencia == null || paisResidencia == ""
    ) {
        res.status(400).json({error: `Debe completar todos los campos. Inténtelo nuevamente.`});
    } else {
        next();
    }
}

const validarCamposPaquete = (req, res, next) => {
    const {
        nombreDestino,
        descripcion,
        duracionDiasPaquete,
        precio,
        url,
        stock,
    } = req.body;

    if (
        nombreDestino == null || nombreDestino == "" ||
        descripcion == null || descripcion == "" ||
        duracionDiasPaquete == null || duracionDiasPaquete == "" ||
        precio == null || precio == "" ||
        url == null || url == "" ||
        stock == null || stock == ""
    ) {
        res.status(400).json({error: `Debe ingresar todos los campos.`})
    } else {
        next();
    }
}

const validarUserIdUnico = async (req, res, next) => {
    const posibleUserId = req.body.userId;

    const userEnDb = await Usuarios.findOne({
        userId: posibleUserId
    });

    console.log(userEnDb);

    if (userEnDb != null) {
        res.status(400).json({error: `Nombre de usuario ${posibleUserId} ya está en uso.`});
    } else {
        next();
    }
}

const validarEmailUnico = async (req, res, next) => {
    const posibleEmail = req.body.email;

    const userEnDb = await Usuarios.findOne({
        email: posibleEmail
    });

    if (userEnDb != null) {
        res.status(400).json({error: `Email ${posibleEmail} ya está en uso.`});
    } else {
        next();
    }
}

const validarAdministrador = async (req, res, next) => {
    const usuarioActual = req.user;
    const emailActual = usuarioActual.email;

    const userInDb = await Usuarios.findOne({
        email: emailActual
    });

    if (!userInDb.administrador) {
        res.status(400).json({error: `usuario con email: ${emailActual} no es administrador.`})
    } else {
        next();
    }
}

//ENDPOINTS
//SignUp - crear un nuevo usuario
server.post("/signUp",
validarCamposRegistro,
validarUserIdUnico,
validarEmailUnico,
async (req,res)=>{
    try {
        const newUser = new Usuarios({
            userId: req.body.userId,
            clave: req.body.clave,
            email: req.body.email,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fechaNac: req.body.fechaNac,
            paisResidencia: req.body.paisResidencia,
            administrador: false
        });

        await newUser.save();

        res.status(201).json(newUser);      
    } catch (error) {
        console.error(error.message);
        res.status(400).json(error.message);
    }
});

//logIn - ingresar al sistema como usuario
server.post("/logIn", async (req, res) =>{
    try {
        const {email, clave} = req.body;
    
        const posibleUsuario = await Usuarios.findOne({
            email,
            clave,
        });
    
        if(!posibleUsuario) {
            res.status(401).json({error: "Email o clave incorrectos"});
        } else {
            const token = jwt.sign(
                {
                    userId: posibleUsuario.userId,
                    email: posibleUsuario.email,
                    nombre: posibleUsuario.nombre,
                    apellido: posibleUsuario.apellido
                },
                JWT_SECRET,
                { expiresIn: "60m"}
            );
    
            res.status(200);
            res.json({token});
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json(error.message);
    }
});

//actualizar datos de usuario
server.put("/user-data",
async (req, res) => {
    try {
        const usuarioActual = req.user;

        const {
            clave,
            nombre,
            apellido,
            fechaNac,
            paisResidencia
        } = req.body;

        const userIdUpdate = usuarioActual.userId;
        const filter = { userId: userIdUpdate };
        const update = {
            clave,
            nombre,
            apellido,
            fechaNac,
            paisResidencia
        }
        

        const userInDb = await Usuarios.findOneAndUpdate( filter, update, {
            new: true
        });

        res.status(200).json(userInDb);

    } catch (error) {
        console.error(error.message);
        res.status(400).json(error.message);
    }
});

//conseguir datos de usuario
server.get("/user-data", async (req, res) => {
    try {
        const usuarioActual = req.user;
        const userIdActual = usuarioActual.userId;
    
        const userInDb = await Usuarios.findOne({
            userId: userIdActual
        });

        res.status(200).json(userInDb);
        
    } catch (error) {
        console.error(error.message);
        res.status(400).json(error.message);
    }
});

//ENDPOINTS DE ADMIN
//CREAR PAQUETE TURÍSTICO
server.post("/paquetes-turisticos",
validarAdministrador,
validarCamposPaquete,
async (req, res) => {
    try {
        const paquetes = await PaquetesTuristicos.find({});
        const numPaquetes = await PaquetesTuristicos.count({});
        let idNuevoPaquete = null;

        if (numPaquetes === 0) {
            idNuevoPaquete = 1;
        } else if (numPaquetes > 0) {
            const maximumId = Math.max.apply(Math, paquetes.map(paquete => paquete.id)) + 1;
            idNuevoPaquete = maximumId;
        }

        const {
            nombreDestino,
            descripcion,
            duracionDiasPaquete,
            precio,
            url,
            stock,
        } = req.body;

        const nuevoPaquete = new PaquetesTuristicos ({
            id: idNuevoPaquete,
            nombreDestino,
            descripcion,
            duracionDiasPaquete,
            precio,
            url,
            stock,
            activo: true,
        });

        await nuevoPaquete.save();

        res.status(201).json(nuevoPaquete);
        console.log(`Nuevo paquete añadido de manera exitosa con id ${idNuevoPaquete}`);
    } catch (error) {
        console.error(error.message);
        res.status(400).json(error);
    }
});

//Conseguir todos los paquetes turísticos en la DB
server.get("/paquetes-turisticos", async (req, res) => {
    try {
        const paquetes = await PaquetesTuristicos.find({});

        res.status(200).json(paquetes);

    } catch (error) {
        console.error(error.message);
        res.status(400).json(error.message);
    }
});

//Conseguir paquete turístico por id
server.get("/paquetes-turisticos/:id", async (req, res) => {
    try {
        const idPaquete = req.params.id;

        const paquete = await PaquetesTuristicos.findOne({
            id: idPaquete
        });

        res.status(200).json(paquete);
        
    } catch (error) {
        console.error(error.message);
        res.status(400).json(error.message);
    }
});

server.listen(PORT, () => {
    console.log(`Servidor iniciado correctamente en puerto ${PORT}`)
});