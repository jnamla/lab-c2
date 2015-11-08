var organizationService = require('./organization');
var profileService = require('./profile');
var userService = require('./user');

var account = {
  
  add: function(params, next) {
    
    var created = {};
    
    // Create the user
    userService.add({}, function(err, user) {
      if (!err) {
        
        created.user = user.data._doc._id;
        
        var organization = params.organization;
        organization.user = created.user;
        
        organizationService.add(organization, function(err, org) {
          if (!err) {
    
            created.organization = org.data._doc._id;
            
            var profile = params.profile;
            profile.user = created.user;
            profile.organization = created.organization;
                
            profileService.add(profile, function(err, prof) {
              if (!err) {
                next(err, {success: true , account: {user: prof.data._doc.user, organization: prof.data._doc.organization}});  
              } else {
                next(err, created);
              }
            });
          } else {
            next(err, created);
          }
        });
      } else {
        next(err, created);
      }
    });
  },
  
  remove : function(query, next) {
    
    userService.remove(query, function (err, result) {
      if (err) {
        next(err, result);
      } 
      
      return next(null, {success: true, message: "user removed."});
    });
  }
  /*,

  update : function(query, updatableData, next) {
  
    // Find the organization by unique identifier
        organizationModel.update({_id: query.id}, { $set: updatableData }, function (err, result) {
      if (err) {
          next(err, result);
      } 
      else {
        next(err, {success: true , data: result});
      }
    });
  },
  
  remove : function(query, next) {
    // Find the organization by unique identifier
    organizationModel.findOne({_id: query.id}, function (err, result) {
      if (err) {
        next(err, result);
      } 
      else {
  
        if (!result) {
          return next(new Error('The organization cannot be removed'));
        }
        
        result.remove(function (err, product) {
            if (err) return next(err, {success: false , error: "Data associated with the organization could not be removed."});

            return next(null, {success: true, message: "Organization removed."});
          });
      }
    });
  },
  // FindOrganization Filters
  findOrganization : function(filters, next) {
  
    // Regular expresion to simplify the search
    for (var entry in filters) {
      if (filters[entry] != null && filters[entry] != undefined && filters[entry] != "" ) {
          filters[entry] = new RegExp(filters[entry], 'i');
      } else {
        delete filters[entry];  
      }
    }  
    
    organizationModel.find(filters, function(err, result) {
      if (err || !result) {
        next(err, {success: false, error: "The organization could not be found"});
      } 
      else {
        next(null, {success: true, data: result});
      }   
    });
  },
  
  findOrganizationById : function(query, next) {
  
    // Find the organization by unique identifier
    organizationModel.findOne({_id: query.id}, function (err, result) {
      if (err) {
          next(err);
      } 
      else {
        if (!result) {
          next(new Error("The organization could not be found"));
        }
        return next(null, {success: true, data: result});                             
      }
    });
  },
  
  addContactMean : function(query, data, next) {
    // Find the organization by unique identifier
    
    this.findOrganization(query, function (err, result) {
      if (err) {
        next(err, result);
      } 
      else {
        result.contactMeans.addToSet(data);
        return next(null, {success: true, data: result.contactMeans});
      }
    });
  },
  
  removeContactMean : function(query, data, next) {
    // Find the organization by unique identifier
    this.findOrganization(query, function (err, result) {
      if (err) {
        next(err, result);
      } 
      else {
        result.contactMeans.id(data).remove();
        return next(null, {success: true, data: result.contactMeans});
      }
    });
  }*/
};

module.exports = account;