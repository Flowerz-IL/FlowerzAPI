
const GenericModelController = require('../../../services/genericModelController.util');
const flowerService = require('./flower.service');

const MODEL_NAME = 'Flower';
const mustProperties = ['flowerName', 'flowerColor', 'flowerDescription', 'flowerImageUrl'];
const flowerController = GenericModelController(MODEL_NAME, flowerService, mustProperties, mustProperties); 

module.exports = flowerController;