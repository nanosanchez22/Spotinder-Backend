const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.saludo = async (req, res) => {
  res.status(200);
  res.send("Bienvenidos a SpoTinder");
};

exports.mostrarCanciones = async (req, res) => {
  try {
    const resultado = await knex.select("*").from("canciones");
    res.status(200).json({ canciones: resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.mostrarPlaylists = async (req, res) => {
  try {
    const resultado = await knex.select("*").from("playlists");
    res.status(200).json({ playlists: resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.mostrarUsuarios = async (req, res) => {
  try {
    const resultado = await knex.select("*").from("usuarios");
    res.status(200).json({ usuarios: resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.agregarCanciones = async (req, res) => {
  const { nombre, artista, img, duracion, genero } = req.body;
  try {
    const resultado = await knex("canciones").insert({
      nombre,
      artista,
      img,
      duracion,
      genero,
    });
    res.status(200).json({ message: "Se creo la cancion correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.agregarPlaylists = async (req, res) => {
  const { nombre, descripcion, usuario_id } = req.body;
  try {
    const resultado = await knex("canciones").insert({
      nombre,
      descripcion,
      usuario_id, // no se como pasarle bien el usuario_id, seguramente despues del logIn se guarde el usuario, por ahora lo pongo manual
    });
    res.status(200).json({ message: "Se creo la cancion correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.registroUsuario = async (req, res) => {
  const { nombre, usuario, email, contraseña } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordEncrypt = await bcrypt.hash(contraseña, salt);
  try {
    const resultado = await knex("usuarios").insert({
      nombre,
      usuario,
      email,
      contraseña: passwordEncrypt,
    });
    res
      .status(200)
      .json({ message: "Se ha registrado el usuario correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUsuario = async (req, res) => {
  const { usuario, email, contraseña } = req.body;
  console.log(usuario, contraseña);
  knex("usuarios")
    .where({ usuario: usuario || email })
    .then(async (resultado) => {
      if (!resultado.length) {
        res
          .status(404)
          .json({ error: "El usuario no se encuentra registrado" });
        return;
      }
      const validatePassword = await bcrypt.compare(
        contraseña,
        resultado[0].contraseña
      );
      if (!validatePassword) {
        res.status(400).json({
          error: "Usuario y/o contraseña inválido",
        });
        return;
      }

      const token = jwt.sign(
        {
          usuario: resultado[0].usuario,
        },
        process.env.TOKEN_SECRET
      );
      res.status(200).json({
        message: "El usuario se ha logeado correctamente",
        token: token,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
