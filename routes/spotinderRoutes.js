const express = require("express");
const { saludo } = require("../controllers/spotinderControllers");
const routes = express.Router();

routes.get("/", saludo);

module.exports = routes;
