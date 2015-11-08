var profileModel = require('../../models/organization/profile');

var profile = {
  
  add: function(profile, next) {
  
    var newProfile = new profileModel(profile);
    
    newProfile.save(function(err, savedProfile) {
      if (!err) {
        return next(null, {success: true, data: savedProfile});
      }  
      next(err);
    });
  },

  update : function(query, updatableData, next) {
  
    // Find the profile by unique identifier
        profileModel.update({_id: query.id}, { $set: updatableData }, function (err, result) {
      if (err) {
          next(err, result);
      } 
      else {
        next(err, {success: true , data: result});
      }
    });
  },

  
  remove : function(query, next) {
    // Find the profile by unique identifier
    profileModel.findOne({_id: query.id}, function (err, result) {
      if (err) {
        next(err, result);
      } 
      else {
  
        if (!result) {
          return next(new Error('The profile cannot be removed'));
        }
        
        result.remove(function (err, product) {
            if (err) return next(err, {success: false , error: "Data associated with the profile could not be removed."});

            return next(null, {success: true, message: "Profile removed."});
          });
      }
    });
  },
  
  // FindProfile Filters
  findProfile : function(filters, next) {
  
    // Regular expresion to simplify the search
    for (var entry in filters) {
      if (filters[entry] != null && filters[entry] != undefined && filters[entry] != "" ) {
          filters[entry] = new RegExp(filters[entry], 'i');
      } else {
        delete filters[entry];  
      }
    }  
    
    profileModel.find(filters, function(err, result) {
      if (err || !result) {
        next(err, {success: false, error: "The profile could not be found"});
      } 
      else {
        next(null, {success: true, data: result});
      }   
    });
  },
  
  findProfileById : function(query, next) {
  
    // Find the profile by unique identifier
    profileModel.findOne({_id: query.id}, function (err, result) {
      if (err) {
          next(err);
      } 
      else {
        if (!result) {
          next(new Error("The profile could not be found"));
        }
        return next(null, {success: true, data: result});                             
      }
    });
  }
};

module.exports = profile;