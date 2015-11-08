var userModel = require('../../models/organization/user');

var user = {
  
  add: function(user, next) {
  
    var newUser = new userModel(user);
    
    newUser.save(function(err, savedUser) {
      if (!err) {
        return next(null, {success: true, data: savedUser});
      }  
      next(err);
    });
  },

  update : function(query, updatableData, next) {
  
    // Find the user by unique identifier
        userModel.update({_id: query.id}, { $set: updatableData }, function (err, result) {
      if (err) {
          next(err, result);
      } 
      else {
        next(err, {success: true , data: result});
      }
    });
  },

  
  remove : function(query, next) {
    // Find the user by unique identifier
    userModel.findOne({_id: query.id}, function (err, result) {
      if (err) {
        next(err, result);
      } 
      else {
  
        if (!result) {
          return next(new Error('The user cannot be removed'));
        }
        
        result.remove(function (err, product) {
            if (err) return next(err, {success: false , error: "Data associated with the user could not be removed"});

            return next(null, {success: true, message: "User removed"});
          });
      }
    });
  },
  
  // FindUser Filters
  findUser : function(filters, next) {
  
    // Regular expresion to simplify the search
    for (var entry in filters) {
      if (filters[entry] != null && filters[entry] != undefined && filters[entry] != "" ) {
          filters[entry] = new RegExp(filters[entry], 'i');
      } else {
        delete filters[entry];  
      }
    }  
    
    userModel.find(filters, function(err, result) {
      if (err || !result) {
        next(err, {success: false, error: "The user could not be found"});
      } 
      else {
        next(null, {success: true, data: result});
      }   
    });
  },
  
  findUserById : function(query, next) {
  
    // Find the user by unique identifier
    userModel.findOne({_id: query.id}, function (err, result) {
      if (err) {
          next(err);
      } 
      else {
        if (!result) {
          next(new Error("The user could not be found"));
        }
        return next(null, {success: true, data: result});                             
      }
    });
  }
};

module.exports = user;