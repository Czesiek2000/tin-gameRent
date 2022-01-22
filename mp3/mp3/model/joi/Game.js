const Joi = require('joi');

const errMessage = (errors) => {
    errors.forEach(err => {
        switch(err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole musi mieć co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole musi mieć co najwyżej ${err.local.limit} znaki`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const gameSchema = Joi.object({
    id: Joi.number().optional().allow(""),
    release_date: Joi.string().required(),
    name: Joi.string().required().min(2).max(60).error(errMessage),
    description: Joi.string().required().min(2).max(200).error(errMessage),
    length: Joi.number().optional().allow(""),
})

module.exports = gameSchema;