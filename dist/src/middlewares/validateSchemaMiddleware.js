"use strict";
exports.__esModule = true;
exports.validateSchemaMiddleware = void 0;
function validateSchemaMiddleware(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            throw { code: "IncompatibleFormat", message: validation.error.message };
        }
        next();
    };
}
exports.validateSchemaMiddleware = validateSchemaMiddleware;
