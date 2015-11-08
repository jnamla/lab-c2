/**
 * Dependencies.
 */
var userService = require('../../model-services/organization/user');

/**
 * Controller definition.
 */
var userController = {

  create: function(req, res, next) {
    userService.add(req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
 
  search: function(req, res, next) {
    
    if (req.query.id) {
      
      userService.findUserById(req.query, function(err, results) {
        if (err) {
          console.log(err);
          res.status(500).json({success: false, error: err.message});
        }
        
        res.json(results);
      });
      
    } else {
      
      userService.findUser(req.query, function(err, results) {
        if (err) {
          console.log(err);
          res.status(500).json({success: false, error: err.message});
        }
        
        res.json(results);
      });
    }
  },
  
  update: function(req, res, next) {

    userService.update(req.query, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
 
 remove: function(req, res, next) {
    
    userService.remove(req.query, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  }
};
 
module.exports = userController;