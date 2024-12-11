const { Router } = require("express");
const {
  getAllPokemons,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
  get3RamdoMPokemons,
} = require("../controllers/pokemons");

const routes = new Router();

routes.get("/", getAllPokemons); // Obtener todos los pokemons

routes.get("/play", get3RamdoMPokemons); // Obtener un pokemon por ID
routes.get("/:id", getPokemonById); // Obtener un pokemon por ID

//siempre debemos de pasar los id a final 


routes.post("/", createPokemon); // Crear un nuevo pokemon

routes.put("/:id", updatePokemon); // Actualizar un pokemon por ID

routes.delete("/:id", deletePokemon); // Eliminar un pokemon por ID

module.exports = routes;
