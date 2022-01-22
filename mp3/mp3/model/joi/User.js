const Joi = require('joi');

const errMessage = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole musi mieć co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole musi mieć co najwyżej ${err.local.limit} znaki`;
                break;
            case "string.email":
                err.message = "Pole powinno zawierac poprawny adres email";
                break;
            default:
                break;
        }
    });
    return errors;
}

const userSchema = Joi.object({
    id: Joi.number().optional().allow(""),
    firstname: Joi.string().min(2).max(60).required().error(errMessage),
    lastname: Joi.string().min(2).max(60).required().error(errMessage),
    email: Joi.string().email().required().error(errMessage),
    phonenumber: Joi.string().optional().allow(""),
    password: Joi.string().min(5).max(65).optional().allow(""),
    role: Joi.number().optional().allow(""),
})



module.exports = userSchema;