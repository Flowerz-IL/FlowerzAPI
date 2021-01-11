
const FlowerBouquetModel = require('./flowerBouquet.model');
const flowerService = require('../flower/flower.service');

const getFlowersColorsSet = async flowersIds => {
    const colorSet = new Set();
    for(let fIdx = 0; fIdx < flowersIds.length; fIdx++) {
        const flower = await flowerService.getSpecificFlower(flowersIds[fIdx].flowerId);
        colorSet.add(flower.flowerColor);
    }
    return [...colorSet];
};

/**
 * Used to fetch all flower bouquets data from the DB
 * 
 * @resolve flower bouquets data
 */
module.exports.getFlowerBouquets = () => FlowerBouquetModel.find();

/**
 * Used to insert a flower bouquet to the DB
 * 
 * @param {object} newFlowerBouquet object contains the bouquetName, bouquetPrice,
 *      bouquetSize, bouquetDescription, bouquetImageUrl, bouquetOccasionStyle, bouquetFlowers
 * @resolve the created flower bouquet
 */
module.exports.addFlowerBouquet = async newFlowerBouquet => {
    const {bouquetName, bouquetPrice, bouquetSize, bouquetDescription, bouquetImageUrl, bouquetOccasionStyle, bouquetFlowers} = newFlowerBouquet;
    const bouquetColors = await getFlowersColorsSet(bouquetFlowers);        
    return new FlowerBouquetModel({
        bouquetName,
        bouquetPrice,
        bouquetSize: bouquetSize.toUpperCase(),
        bouquetDescription,
        bouquetImageUrl,
        bouquetOccasionStyle: bouquetOccasionStyle.toUpperCase(),
        bouquetFlowers,
        bouquetColors
    }).save();
};
       

/**
 * Used to fetch a specific flower bouquet from the DB.
 * 
 * @param {string} flowerBouquetId 
 * @resolve requested flower bouquet data
 */
module.exports.getSpecificFlowerBouquet = flowerBouquetId => FlowerBouquetModel.findById(flowerBouquetId);

/**
 * Used to updated an existing flower bouquet
 * 
 * @param {string} flowerBouquetId 
 * @param {object} change 
 * @resolve updated flower bouquet
 */
module.exports.updateSpecificFlowerBouquet = async (flowerBouquetId, change) =>{
    if('bouquetFlowers' in change){
        const bouquetColors = await getFlowersColorsSet(change['bouquetFlowers']);
        change = {...change, bouquetColors};
    }
    return FlowerBouquetModel.findByIdAndUpdate(flowerBouquetId, {$set:change}, {new:true});
};
    

/**
 * Used to delete a specific flower bouquet from the DB.
 * 
 * @param {string} flowerBouquetId 
 * @resolve the deleted flower bouquet
 */
module.exports.deleteSpecificFlowerBouquet = flowerBouquetId => FlowerBouquetModel.findByIdAndDelete(flowerBouquetId);