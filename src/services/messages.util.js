
module.exports.SUCCESS_MESSAGES = {
    POST: modelName => `${modelName} added successfully`,
    PATCH: modelName => `${modelName} updated successfully`,
    DELETE: modelName => `${modelName} Deleted successfully`,
};

module.exports.ERROR_MESSAGES = {
    GET: modelName => `Failed to retrieve the requested ${modelName}`,
    PATCH: modelName => `Failed to updated the requested ${modelName}`,
    POST: modelName => `Failed to add the requested ${modelName}`,
    DELETE: modelName => `Failed to Delete the requested ${modelName}`,
    SIGN_UP: `There is a problem with creating your account please try again in a few minutes`,
    SIGN_IN: `Cant sign-in in this moment please try again in a few minutes`,
};