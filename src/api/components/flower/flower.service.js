
const GenericModelService = require('../../../services/genericModelService.util');
const FlowerModel = require('./flower.model');

const flowerService = GenericModelService(FlowerModel);

module.exports = flowerService;