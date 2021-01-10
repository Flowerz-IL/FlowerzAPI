
const flowerBouquetService = require('./flowerBouquet.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const {validateKeysInObject, validateObjectKeys} = require('../../../services/validations.util');
const MODEL_NAME = 'Flower Bouquet';
const ALLOWED_KEYS = ['bouquetName', 'bouquetPrice', 'bouquetSize', 'bouquetDescription', 'bouquetImageUrl',
'bouquetOccasionStyle', 'bouquetFlowers'];

/**
 * Used to receive all flower Bouquets from the DB
 * 
 * @respond flower Bouquets array
 */
module.exports.getFlowerBouquets = async (req, res) => {
    try {
        const FlowerBouquets = await flowerBouquetService.getFlowerBouquets();
        res.json(FlowerBouquets);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to add a new flower Bouquets to the DB.
 * Req body must contain flower Bouquets name, color, description and imageUrl.
 * 
 * @respond added flower Bouquet id 
 */
module.exports.addFlowerBouquet = async (req, res) => {
    try {
        validateKeysInObject(ALLOWED_KEYS, req.body);
        const newFlowerBouquet = await flowerBouquetService.addFlowerBouquet(req.body);
        res.status(200).json({ newFlowerBouquetId: newFlowerBouquet._id ,message: SUCCESS_MESSAGES.POST(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to receive a specific flower Bouquet from the DB.
 * Request has to contain an id param. 
 * 
 * @respond requested flower Bouquet
 */
module.exports.getSpecificFlowerBouquet = async (req, res) => {
    try{
        const requestedFlowerBouquet = await flowerBouquetService.getSpecificFlowerBouquet(req.params.id);
        res.json(requestedFlowerBouquet);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to update a specific flower Bouquet
 * 
 * @respond flower Bouquet before the update
 */
module.exports.updateSpecificFlowerBouquet = async (req, res) => {
    try{
        validateObjectKeys(ALLOWED_KEYS, req.body);
        const flowerBouquetBeforeUpdate = await flowerBouquetService.updateSpecificFlowerBouquet(req.params.id, req.body);
        res.status(200).json({ flowerBouquetBeforeUpdate, message: SUCCESS_MESSAGES.PATCH(MODEL_NAME)});

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.PATCH(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to delete a specific flower Bouquet from the DB.
 * Request has to contain an id param.
 * 
 * @respond deleted flower Bouquet
 */
module.exports.deleteSpecificFlowerBouquet = async (req, res) => {
    try{
        const deletedFlowerBouquet = await flowerBouquetService.deleteSpecificFlowerBouquet(req.params.id);
        res.status(200).json({ deletedFlowerBouquet, message: SUCCESS_MESSAGES.DELETE(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.DELETE(MODEL_NAME), error: error['message'] }); }
};