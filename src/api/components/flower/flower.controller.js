
const flowerService = require('./flower.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const {validateKeysInObject, validateObjectKeys} = require('../../../services/validations.util');
const MODEL_NAME = 'Flower';
const ALLOWED_KEYS = ['flowerName', 'flowerColor', 'flowerDescription', 'flowerImageUrl'];

/**
 * Used to receive all flowers from the DB
 * 
 * @respond flowers array
 */
module.exports.getFlowers = async (req, res) => {
    try {
        const flowers = await flowerService.getFlowers();
        res.json(flowers);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to add a new flowers to the DB.
 * Req body must contain flowers name, color, description and imageUrl.
 * 
 * @respond added flower id 
 */
module.exports.addFlower = async (req, res) => {
    try {
        validateKeysInObject(ALLOWED_KEYS, req.body);        
        const newFlower = await flowerService.addFlower(req.body);
        res.status(200).json({ newFlowerId: newFlower._id ,message: SUCCESS_MESSAGES.POST(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to receive a specific flower from the DB.
 * Request has to contain an id param. 
 * 
 * @respond requested flower 
 */
module.exports.getSpecificFlower = async (req, res) => {
    try{
        const requestedFlower = await flowerService.getSpecificFlower(req.params.id);
        res.json(requestedFlower);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to update a specific flower
 * 
 * @respond flower before the update
 */
module.exports.updateSpecificFlower = async (req, res) => {
    try{
        validateObjectKeys(ALLOWED_KEYS, req.body);
        const flowerBeforeUpdate = await flowerService.updateSpecificFlower(req.params.id, req.body);
        res.status(200).json({ flowerBeforeUpdate, message: SUCCESS_MESSAGES.PATCH(MODEL_NAME)});

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.PATCH(MODEL_NAME), error: error['message'] }); }
};

/**
 * Used to delete a specific flower from the DB.
 * Request has to contain an id param.
 * 
 * @respond deleted flower
 */
module.exports.deleteSpecificFlower = async (req, res) => {
    try{
        const deletedFlower = await flowerService.deleteSpecificFlower(req.params.id);
        res.status(200).json({ deletedFlower, message: SUCCESS_MESSAGES.DELETE(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.DELETE(MODEL_NAME), error: error['message'] }); }
};