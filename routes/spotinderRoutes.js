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
} = require("../controllers/spotinderControllers");
const routes = express.Router();

routes.get("/", saludo);

routes.get("/canciones", mostrarCanciones);
routes.get("/playlists", mostrarPlaylists);
routes.get("/usuarios", mostrarUsuarios);

routes.post("/canciones/agregar", agregarCanciones); // falta probar
routes.post("/playlists/agregar", agregarPlaylists); // falta probar

routes.post("/registrar", registroUsuario);
routes.post("/login", loginUsuario);

module.exports = routes;
