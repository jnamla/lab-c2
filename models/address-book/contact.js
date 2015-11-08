var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({

  group:{type: mongoose.Schema.Types.ObjectId, ref:'Group' , required: "This contact should be part of a group", index: true}, // Group which owns this contact
  
  name: {type: String, required: 'Please enter the name'}, 
  position: {type: String, required: 'Please enter the position'},
  
  contactNumber: {type: String, required: 'Please enter the contact number'},
  altContactNumber: {type: String},
  email: {type: String, required: 'Please enter the email', index: true},
  webPreferedMedia: {type: String, required: 'Please enter the web prefered media'},
  
  created: {type: Date}
});

var Contact = mongoose.model('Contact', contactSchema);

// Pre save validations
contactSchema.pre('save', function (next) {
    var self = this;
    Contact.find({email: self.email, group: self.group}, function (err, results) {
      if (err){
            next(err, {success: false, message: "Contact retrieve failed"});
        }else{                
          if (!results.length){
              next();
          }else{  
              next(new Error("That contact name and email are already in use for another contact in this organization!"));
          }
        }
    });
});

module.exports = {
  contact: Contact
};