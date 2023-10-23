const { Router } = require('express');
const { getAllPokemonHandler } = require('../handlers/getAllPokemonsHandler.js');
const { getPokemonByIdHandler } = require('../handlers/getPokemonByIdHandler.js');
const { getPokemonByNameHandler } = require('../handlers/getPokemonByNameHandler.js');
const { getTypesHandler } = require('../handlers/getTypesHandler.js');
const { postPokemonHandler } = require('../handlers/postPokemonHandler.js');
const { deletePokemonHandler } = require('../handlers/deletePokemonHandler.js');
const { updatePokemonHandler } = require('../handlers/updatePokemonHandler.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getAllPokemonHandler);
router.get('/pokemon/:id', getPokemonByIdHandler)
router.get('/pokemon/', getPokemonByNameHandler)
router.get('/types', getTypesHandler)
router.post('/pokemon', postPokemonHandler)
router.put('/pokemon/:name', updatePokemonHandler)
router.delete('/pokemon/:name', deletePokemonHandler)

module.exports = router;
