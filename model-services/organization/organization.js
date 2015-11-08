var organizationModel = require('../../models/organization/organization');

var organization = {
  
  add: function(organization, next) {
  
    var newOrganization = new organizationModel(organization);
    
    newOrganization.save(function(err, savedOrganization) {
      if (!err) {
        return next(null, {success: true, data: savedOrganization});
      }  
      next(err);
    });
  },

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
  }
};

module.exports = organization;