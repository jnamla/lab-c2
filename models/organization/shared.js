/**
 * Shared Schemas.
 */
 
var addressSchema = {
    country: {type: String},
    state: {type: String},
    city: {type: String},
    postCode:{type: String},
    street:{type: String}
};

var personalDataSchema = {
    firstName: {type: String},
    middleName: {type: String},
    lastName: {type: String},
    alias:{type: String},
    birthday:{type: Date},
    bio:{type: String}
};

var contactSchema = {
    code: {type:String},
    description: {type:String},
    value: {type:String}
};

/**
 * Exports.
 */
 
module.exports = {
    address: addressSchema,
    personalData: personalDataSchema,
    contact: contactSchema
};