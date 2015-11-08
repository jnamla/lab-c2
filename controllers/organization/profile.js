/**
 * Dependencies.
 */
var profileService = require('../../model-services/organization/profile');

/**
 * Controller definition.
 */
var profileController = {

  create: function(req, res, next) {
    profileService.add(req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
 
  search: function(req, res, next) {
    
    if (req.query.id) {
      
      profileService.findProfileById(req.query, function(err, results) {
        if (err) {
          console.log(err);
          res.status(500).json({success: false, error: err.message});
        }
        
        res.json(results);
      });
      
    } else {
      
      profileService.findProfile(req.query, function(err, results) {
        if (err) {
          console.log(err);
          res.status(500).json({success: false, error: err.message});
        }
        
        res.json(results);
      });
    }
  },
  
  update: function(req, res, next) {

    profileService.update(req.query, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
 
 remove: function(req, res, next) {
    
    profileService.remove(req.query, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  }
};
 
module.exports = profileController;