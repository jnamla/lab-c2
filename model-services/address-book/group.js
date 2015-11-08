var groupModel = require('../../models/address-book/group');

var group = {
  
  addGroup: function(group, next) {
  
    var newGroup = new groupModel.group(group);
    
    newGroup.save(function(err, savedGroup) {
      if (!err) {
        return next(null, {success: true, data: savedGroup});
      }  
      next(err);
    });
  },

  updateGroup : function(query, updatableData, next) {
  
    // Find the group by unique identifier
    this.findGroupBykey(query, function (err, result) {
      if (err) {
          next(err, result);
      } 
      else {
        // Removes name and admin data to prevent the update of key fields
        delete updatableData["name"];
        delete updatableData["admin"];
        
        try {
          for (var entry in updatableData) {
            if (updatableData[entry] != undefined) {
              result.data._doc[entry] = updatableData[entry];
            } 
          }  
          result.data.save();
        }
        catch(err) {
            next(err, {success: false , error: "Group not updated"});
        }
        
        return next(null, {success: true, data: result.data._doc});                             
      }
    });
  },

  removeGroup : function(query, next) {
  
    // Find the group by unique identifier
    this.findGroupBykey(query, function (err, result) {
      if (err) {
        next(err, result);
      } 
      else {
       result.data.remove().then(function(removed) {
         return next(null, {success: true, message: "Group removed."});
       }, function(err) {
         next(err, {success: false , error: "Contacts associated with the group could not be removed."});
       });
       next(null);
      }
    });
  },

  removeGroupById: function(query, next) {
  
    // Find the group by id
    groupModel.group.findByIdAndRemove({_id: query.id}, function (err, result) {
      
      if (err) {
        next(err, result);
      } 
      
      return next(null, {success: true, message: "Group removed."});
    });
    
  },
  
  // Find group by defined key
  findGroupBykey: function(query, next) {
    
    // search group by query parameters so far name and admin
    groupModel.group.findOne({$or:[{_id: query.id},
                        {admin: query.admin, name: query.name}]}, function(err, result) {
      if (err || !result) {
        next(err, {success:false,  error: "The Group could not be found."});
      }
      next(err, {success: true, data: result});
    });
  },

  // FindGroup Filters
  findGroup : function(parent, filters, next) {
  
    // Regular expresion to simplify the search
    for (var entry in filters) {
      if (filters[entry] != null && filters[entry] != undefined && filters[entry] != "" ) {
          filters[entry] = new RegExp(filters[entry], 'i');
      } else {
        delete filters[entry];  
      }
    }  
    
    for (var entry in parent) {
      filters[entry] = parent[entry];  
    }
    
    groupModel.group.find(filters, function(err, result) {
      if (err || !result) {
        next(err, {success: true, error: "Associated groups could not be found"});
      } 
      else {
        next(null, {success: true, data: result});
      }   
    });
  }
};

module.exports = group;
