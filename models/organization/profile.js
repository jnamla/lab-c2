/**
 * Dependencies.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var shared = require('./shared');

/**
 * Schemas.
 */
var ProfileSchema = new Schema({
    
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}, //user who has this profile
    organization: {type: mongoose.Schema.Types.ObjectId, ref:'Organization'},
    
    email:{type: String, require: true, index:{unique: true}}, // email registered for this profile, required and is the key
    password:{type: String, require: true, select: false},
    
    position: {type: String},
    description: {type: String},
    
    contactMeans: [shared.contact]
});

var profile = mongoose.model('Profile', ProfileSchema);
/**
 * Middleware.
 */
ProfileSchema.pre('save', function(next){
    var prof = this;
    
    profile.find({email: prof.email}, function(err, results) {
        if (err) {
            return next(err);
        } else {
            if (results.length) {
              next(new Error("That email is already in use"));
            }
        }
    });
    
    if(!prof.isModified('password')) return next();
    
    bcrypt.hash(prof.password, null ,null, function(err,hash){
        if (err) { 
            console.log("Error occurs here and error is "+err); 
            return next(err);
        }
        
        prof.password = hash;
        next();
    });
});

/**
 * Methods.
 */

ProfileSchema.methods.comparePassword = function(password){
    var prof = this;
    return bcrypt.compareSync(password, prof.password)
};

module.exports = profile;