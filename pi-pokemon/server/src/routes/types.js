const { Router } = require('express')
const { getTypesHandler } = require('../handlers/getTypesHandler.js');

const typeRouter =  Router()

typeRouter.get('/', getTypesHandler)

module.exports = typeRouter 