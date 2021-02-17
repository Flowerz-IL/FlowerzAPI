
const GenericModelService = require('../../../services/genericModelService.util');
const FlowerBouquetModel = require('./flowerBouquet.model');
const flowerService = require('../flower/flower.service');

const flowerBouquetService = GenericModelService(FlowerBouquetModel);

const getFlowersColorsSet = async flowersIds => {
    const colorSet = new Set();
    for(let fIdx = 0; fIdx < flowersIds.length; fIdx++) {
        const flower = await flowerService.getSpecificItem(flowersIds[fIdx].flowerId);
        colorSet.add(flower.flowerColor);
    }
    return [...colorSet];
};

/**
 * Used to insert a flower bouquet to the DB
 * 
 * @param {object} newFlowerBouquet object contains the bouquetName, bouquetPrice,
 *      bouquetSize, bouquetDescription, bouquetImageUrl, bouquetOccasionStyle, bouquetFlowers
 * @resolve the created flower bouquet
 */
flowerBouquetService.addItem = async newFlowerBouquet => {
    const bouquetColors = await getFlowersColorsSet(newFlowerBouquet.bouquetFlowers);        
    return new FlowerBouquetModel({
        ...newFlowerBouquet,
        bouquetSize: newFlowerBouquet.bouquetSize.toUpperCase(),
        bouquetOccasionStyle: newFlowerBouquet.bouquetOccasionStyle.toUpperCase(),
        bouquetColors
    }).save();
};

/**
 * Used to updated an existing flower bouquet
 * 
 * @param {string} flowerBouquetId 
 * @param {object} change 
 * @resolve updated flower bouquet
 */
flowerBouquetService.updateSpecificItem = async (flowerBouquetId, change) =>{
    if('bouquetFlowers' in change){
        const bouquetColors = await getFlowersColorsSet(change['bouquetFlowers']);
        change = {...change, bouquetColors};
    }
    return FlowerBouquetModel.findByIdAndUpdate(flowerBouquetId, {$set:change}, {new:true});
};

flowerBouquetService.groupBySize = async () => 
    FlowerBouquetModel.aggregate([
        { $group: { 
            _id: '$bouquetSize',
            bouquetsPrices: {$push:'$bouquetPrice'},
            bouquetsNames: {$push:'$bouquetName'},
            bouquetsImageUrls: {$push:'$bouquetImageUrl'},
            bouquetsDescriptions: {$push:'$bouquetDescription'}
        }},
      ]);

module.exports = flowerBouquetService;