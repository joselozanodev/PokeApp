const { getPokemonById } = require('../controllers/getPokemonById')

const getPokemonByIdHandler = async (req, res) => {
   const { id } = req.params
   try {
      const response = await getPokemonById(id)
      if(!response){
         throw new Error('Pokemon not found')
      }
      return res.status(200).json(response)
   } catch (error) {
    if(error.message === 'Pokemon not found'){
      return res.status(404).send('Pokemon not found')
    }
    return res.status(500).send('Internal server error')
   }
}

module.exports = { getPokemonByIdHandler }