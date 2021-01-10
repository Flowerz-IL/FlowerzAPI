
const FlowerModel = require('./flower.model');

/**
 * Used to fetch all flowers data from the DB
 * 
 * @resolve flower data
 */
module.exports.getFlowers = () => FlowerModel.find();

/**
 * Used to insert a flower to the DB
 * 
 * @param {object} newFlower object contains the flowerName, flowerColor, flowerDescription, flowerImageUrl
 * @resolve the created flower
 */
module.exports.addFlower = ({flowerName, flowerColor, flowerDescription, flowerImageUrl}) => 
    new FlowerModel({flowerName, flowerColor, flowerDescription, flowerImageUrl}).save();

/**
 * Used to fetch a specific flower from the DB.
 * 
 * @param {string} flowerId 
 * @resolve requested flower data
 */
module.exports.getSpecificFlower = flowerId => FlowerModel.findById(flowerId);

/**
 * Used to updated an existing flower
 * 
 * @param {string} flowerId 
 * @param {object} change 
 * @resolve flower before the update
 */
module.exports.updateSpecificFlower = async (flowerId, change) => 
    FlowerModel.findByIdAndUpdate(flowerId, { $set:change });

/**
 * Used to delete a specific flower from the DB.
 * 
 * @param {string} flowerId 
 * @resolve the deleted flower
 */
module.exports.deleteSpecificFlower = flowerId => FlowerModel.findByIdAndDelete(flowerId);