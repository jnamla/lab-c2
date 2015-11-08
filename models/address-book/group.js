/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contact = require('../address-book/contact').contact;



/**
 * Schemas.
 */
var groupSchema = new Schema({
  
  admin: {type: mongoose.Schema.Types.ObjectId, ref:'Admin', required: "This group should belong to an administrator"}, // User who created the group
  
  country: {type: String, required: 'Please enter your country'},
  state: {type: String, required: 'Please enter your state'},
  city: {type: String, required: 'Please enter your city'},
  streetName: {type: String, required: 'Please enter the street name'},
  postCode: {type: String, required: 'Please enter your post code'},
  name: {type: String, required: 'Please enter the group or group name'},
  bDescription: {type: String, required: 'Please enter a brief description'},
  groupType: {type: String, required: 'Please tell us what type of group is this'},
  industryType: {type: String},
  field: {type: String},
  businessNumber: {type: String},
  website: {type: String},
  created: {type: Date, default: Date.now()}
  
}); //, { autoIndex: false }

var Group = mongoose.model('Group', groupSchema);


/**
 * Indexes.  Composite key definition {admin, name}
 */
groupSchema.index({admin: 1, name: 1}, {unique: true});


/**
 * Validations
 */
groupSchema.path('industryType').validate(function (industryType) {
  if (this._doc.groupType.toLowerCase() ===  'informal') {
    return true;
  } 
  
  return industryType.length;
}, 'Industry Type should be specified');


/**
 * Middleware
 */
 
groupSchema.pre('save', function (next) {
    var self = this;
    Group.find({name : self.name, 'admin': self.admin}, function (err, results) {
      if (err){
            next(err, {success: false, message: "Company retrieve failed."});
        }else{                
          if (!results.length){
              next();
          }else{  
              next(new Error("That company is already registered for this admin!"));
          }
        }
    });
});

groupSchema.pre('remove', function (next) {
  var self = this;
  contact.remove({group: self._id}, function (err, results) {
    if (err){
          next(err, {success: false, message: "Contacts could not be removed."});
      }
    next();
  });
});
 
module.exports = {
  group: Group
};