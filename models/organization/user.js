/**
 * Dependencies.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var shared = require('./shared');
var profile = require('./profile');
var organization = require('./organization');

/**
 * Schemas.
 */

var UserSchema = new Schema({
    
    pd: shared.personalData, // personal Data
    
    address: shared.address,
    
    cancelled: {type: Boolean},
    created: {type:  Date, default: Date.now()},
    cancelTime: {type:  Date}
});

/**
 * Middleware.
 */
UserSchema.pre('save', function(next) {
    var user = this;
    next();
});

// Removes every reference to this user
UserSchema.pre('remove', function(next) {
    
    var user = this;
    
    organization.remove({user: user._id}, function (err, results) {
        if (err){
            next(err, {success: false, message: "Organizations associated to this user could not be removed."});
        }
    });
  
    profile.remove({user: user._id}, function (err, results) {
        if (err){
            next(err, {success: false, message: "Profiles associated to this user could not be removed."});
        }
    });
    
    next();
});
 
/**
 * Methods.
 */
UserSchema.methods.cancel = function(){
    var user = this;
    if (!user.cancelled)
        return UserSchema.update(user, {$set: {cancelled: true, cancelTime: new Date()}});
    else
        return false;
}

module.exports = mongoose.model('User', UserSchema);