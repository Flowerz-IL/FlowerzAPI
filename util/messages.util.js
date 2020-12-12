

// success
module.exports.modelAddMessage = modelName => `${modelName} added successfully`;
module.exports.modelOverrideMessage = modelName => `${modelName} overwritten successfully`;
module.exports.modelUpdateMessage = modelName => `${modelName} updated successfully`;
module.exports.modelDeleteMessage = modelName => `${modelName} deleted successfully`;

// err
module.exports.alreadyExisting = existingItem => `${existingItem} already exists`;
module.exports.OrderCustomError = notFound => `Could not find the specified ${notFound}. Order must be connected to a ${notFound}`;