/**
 * Dependencies.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var shared = require('./shared');
var profile = require('./profile')

/**
 * Schemas.
 */
var OrganizationSchema = new Schema({
    
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', require: true, select: false}, // user creator of this organization
    
    name: {type: String, require: true},
    domain: {type: String, require: true, index: true, unique: true, lowercase: true, trim: true}, // lower case without space, key and required
    description: {type: String},
    address: shared.address,
    
    contactMeans: [shared.contact]
});

var organization = mongoose.model('Organization', OrganizationSchema);

/**
 * Middleware.
 */
OrganizationSchema.pre('save', function(next){
    var org = this;
    organization.find({domain: org.domain}, function(err, results) {
        if (err) {
            return next(err);
        } else {
            if (!results.length){
              next();
          }else{  
              next(new Error("That domain is already in use"));
          }
        }  
    });
});

OrganizationSchema.pre('remove', function(next){
    var org = this;
    
    profile.remove({organization: org._id}, function (err, results) {
        if (err){
            next(err, {success: false, message: "Profiles associated with this organization could not be removed."});
        }
    });
    
    next();
});

module.exports = organization;