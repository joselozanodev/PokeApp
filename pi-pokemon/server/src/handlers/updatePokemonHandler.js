const { updatePokemon } = require("../controllers/updatePokemon");

const updatePokemonHandler = async (req, res) => {
        const { name } = req.params;
    try {
        const response = await updatePokemon(name, req.body);
        if(!response){
            throw new Error("Pokemon not found")
        }
        return res.status(200).json(response);
    } catch (error) {
        if(error.message === "Pokemon not found"){
            return res.status(404).json({error: error.message});
        }
        return res.status(500).json({error: error.message});
    }
}

module.exports = { updatePokemonHandler };