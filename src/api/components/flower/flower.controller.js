
const GenericModelController = require('../../../services/genericModelController.util');
const flowerService = require('./flower.service');

const MODEL_NAME = 'Flower';
const mustProperties = ['flowerName', 'flowerColor', 'flowerDescription', 'flowerImageUrl'];
const flowerController = GenericModelController(MODEL_NAME, flowerService, mustProperties, mustProperties); 

flowerController.scrapeFlowers = (req, res) => 
    flowerService.scrapeFlowers()
        .then(() => res.json({message: 'scarping succeeded'}))
        .catch((err) => console.log(err));

module.exports = flowerController;