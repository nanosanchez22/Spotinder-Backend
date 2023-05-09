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
  const { nombre, descripcion } = req.body;
  console.log(req.user);
  console.log(req.user.id);
  const { id: usuario_id } = req.user;
  try {
    const resultado = await knex("playlists").insert({
      nombre,
      descripcion,
      usuario_id, // no se como pasarle bien el usuario_id, seguramente despues del logIn se guarde el usuario, por ahora lo pongo manual
    });
    res.status(200).json({ message: "Se creo la playlist correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.agregarCancionesAPlaylist = async (req, res) => {
  const { playlist_id, cancion_id } = req.body; // Supongo q se le pasa playlist_id y cancion_id por el front
  try {
    const resultado = await knex("playlist_canciones").insert({
      playlist_id,
      cancion_id,
    });
    res.status(200).json({ message: "Se agrego correctamente la cancion" });
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
  const { usuario, contraseña } = req.body;
  console.log(usuario, contraseña);
  //if usuario formato mail con regex
  //nueva parte
  let query = knex("usuarios");

  // Check si el input esta en formato email
  if (/^\S+@\S+\.\S+$/.test(usuario)) {
    query = query.where({ email: usuario });
  } else {
    query = query.where({ usuario: usuario });
  }

  /* knex("usuarios")
    .where({ usuario: usuario }) */
  query
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
          id: resultado[0].id,
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
