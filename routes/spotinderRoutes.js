const express = require("express");
const {
  saludo,
  mostrarCanciones,
  mostrarPlaylists,
  mostrarUsuarios,
  agregarCanciones,
  agregarPlaylists,
  registroUsuario,
  loginUsuario,
  agregarCancionesAPlaylist,
} = require("../controllers/spotinderControllers");

const { verifyToken } = require("../middleware/auth/auth");

const routes = express.Router();

routes.get("/", saludo);

routes.get("/canciones", mostrarCanciones);
routes.get("/playlists", mostrarPlaylists);
routes.get("/usuarios", mostrarUsuarios);

routes.post("/canciones/agregar", agregarCanciones);
routes.post("/playlists/agregar", verifyToken, agregarPlaylists);
routes.post("/playlists/agregarCanciones", agregarCancionesAPlaylist);

routes.post("/registrar", registroUsuario);
routes.post("/login", loginUsuario);

module.exports = routes;
