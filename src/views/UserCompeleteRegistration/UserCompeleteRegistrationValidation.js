const Joi =require('joi');

const UserCompleteRegistrationValidationSchema =Joi.object({

    firstname: Joi.string().alphanum().min(3).max(255).required(),
    lastname:Joi.string().alphanum().min(3).max(255).required(),
    nic :Joi.string().alphanum().regex(/^([0-9]{9}[X|V]|[0-9]{12})$/).messages({"string.pattern.base": "NIC number must end with V and must have at least 10 characters"}).min(10).max(20).required(),
    contact_no :Joi.string().min(10).regex(/^(?:0|(?:\+94))[0-9]{9,10}$/).messages({"string.pattern.base": "Contact number must start with 0 or +94"}).required(),
    email :Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    birthday: Joi.date().max('01-01-2005').messages({'date.max':`Age must be 18+;"Birthday" must be before or equal to "01-01-2005`}).required()

})

module.exports ={
    UserCompleteRegistrationValidationSchema
}

