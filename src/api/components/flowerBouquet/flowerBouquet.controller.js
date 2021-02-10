
const GenericModelController = require('../../../services/genericModelController.util');
const flowerBouquetService = require('./flowerBouquet.service');

const MODEL_NAME = 'Flower Bouquet';
const mustProperties = ['bouquetName', 'bouquetPrice', 'bouquetSize', 'bouquetDescription', 'bouquetImageUrl',
'bouquetOccasionStyle', 'bouquetFlowers'];
const flowerBouquetController = GenericModelController(MODEL_NAME, flowerBouquetService, mustProperties, mustProperties); 

module.exports = flowerBouquetController;