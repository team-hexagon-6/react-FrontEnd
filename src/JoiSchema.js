const Joi = require('joi');

// const reg_schema = Joi.object({
//     user_id: Joi.string()
//         .alphanum()
//         .min(3)
//         .max(30)
//         .required(),
    
//     password: Joi.string()
//         .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//     re_password: Joi.ref('password'),
//     });

const registration = (data) => {
    const reg_schema = Joi.object({
        user_id: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        
        user_type: Joi.string().required(),
        
        password: Joi.string()
            .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')),
    
        re_password: Joi.ref('password'),
        });
    
    const { error, value } = reg_schema.validate(data, {abortEarly: false});

    return {value, error};

}

module.exports = {
    registration
}
