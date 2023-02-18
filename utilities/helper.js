

function joiModelValidation(req, res, modelName, joiModel){
    const validation = joiModel[modelName].validate(req.body);
    if (validation.error) {
        return res.status(400).send({
            message: validation.error.message,
            success: false,
            data: {}
        });
    } else {
        return true;
    }
}

module.exports = {
    joiModelValidation
}