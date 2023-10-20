const { getAllTypes } = require('../controllers/getTypes.js');

const getTypesHandler = async (req, res) => {
    try {
        const response = await getAllTypes();
        if (!response) {
            throw new Error('Types not found');
        }
        return res.status(200).json(response);   
    } catch (error) {
        if(error.message === 'Types not found'){
            return res.status(404).send({error: error.message})
        }
        return res.status(500).send('Internal server error')
    }
}

module.exports = { getTypesHandler }