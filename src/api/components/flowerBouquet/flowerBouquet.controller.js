
const GenericModelController = require('../../../services/genericModelController.util');
const flowerBouquetService = require('./flowerBouquet.service');

const MODEL_NAME = 'Flower Bouquet';
const mustProperties = ['bouquetName', 'bouquetPrice', 'bouquetSize', 'bouquetDescription', 'bouquetImageUrl',
    'bouquetOccasionStyle', 'bouquetFlowers'];
const flowerBouquetController = GenericModelController(MODEL_NAME, flowerBouquetService, mustProperties, mustProperties); 

flowerBouquetController.groupBySize = (req, res) => 
    flowerBouquetService.groupBySize()
        .then((result) => res.status(200).json({result}))
        .catch((err) => res.status(404).json({err: err.message}));

module.exports = flowerBouquetController;