const { getPokemonByName } = require('../controllers/getPokemonByName.js');

const getPokemonByNameHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const response = await getPokemonByName(name);
        if (!response) {
            throw new Error('Pokemon not found');
        }
        return res.status(200).json(response);
    } catch (error) {
        if(error.message === 'Pokemon not found'){
            return res.status(404).send('Pokemon not found')
        }
        return res.status(500).send('Internal server error')
    }
}

module.exports = { getPokemonByNameHandler }