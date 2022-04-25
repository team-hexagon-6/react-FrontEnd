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

const ValidateUserCompleteRegistration=(data)=>{
    const UserCompleteRegistrationValidationSchema =Joi.object({

        'First Name': Joi.string().regex(/^[A-Z][a-z0-9_-]{2,}$/).messages({"string.pattern.base": "First letter must be a Capital"}) .min(3).max(15).required(),
        'Last Name':Joi.string().regex(/^[A-Z][a-z0-9_-]{2,}$/).messages({"string.pattern.base": "First letter must be a Capital"}).min(3).max(20).required(),
        'NIC' :Joi.string().alphanum().regex(/^([0-9]{9}[X|V]|[0-9]{12})$/).messages({"string.pattern.base": "NIC number must end with V and must have at least 10 characters"}).min(10).max(20).required(),
        'Contact Number' :Joi.string().regex(/^(?:0|(?:\+94))[0-9]{9}$/).messages({"string.pattern.base": "Contact number must start with 0 or +94 and must have 10 digits"}).length(10).required(),
        'Email' :Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        'Birthday': Joi.date().max('01-01-2005').messages({'date.max':`Age must be 18+;"Birthday" must be before or equal to "01-01-2005`}).required()
    
    })
    const { error, value } = UserCompleteRegistrationValidationSchema.validate(data, {abortEarly: false});
    return {value, error};

}



module.exports = {
    registration,ValidateUserCompleteRegistration
}
