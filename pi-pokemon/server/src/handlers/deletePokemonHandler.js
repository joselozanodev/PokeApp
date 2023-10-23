const { deletePokemon } = require('../controllers/deletePokemon');

const deletePokemonHandler = async(req, res)=>{
    const { name } = req.params;
    try {
        const pokemonDeleted = await deletePokemon(name);
        if(!pokemonDeleted){
            throw new Error('Cannot delete pokemon');
        }
        return res.status(200).send('Pokemon Deleted Successfully');
    } catch (error) {
        if( error.message === 'Cannot delete pokemon'){
            return res.status(400).json({error: error.message});
        }
        return res.status(500).json({error: error.message});
    }

}

module.exports = {deletePokemonHandler};