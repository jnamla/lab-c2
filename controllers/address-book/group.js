/**
 * Dependencies.
 */
var groupService = require('../../model-services/address-book/group');

/**
 * Controller definition.
 */
var groupController = {

  search: function(req, res, next) {
    
    var basicQueryData = {}; 
    
    if (!req.temp.admin) {
      basicQueryData = req.query;
    } else {
      basicQueryData = req.temp.admin;
      delete req.temp.admin;
    }
    
    groupService.findGroup(basicQueryData, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
 
  create: function(req, res, next) {
    groupService.addGroup(req.query, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
 
  update: function(req, res, next) {
    
    var basicQueryData = !req.temp.admin ? req.query: req.temp.admin;
    
    groupService.updateGroup(basicQueryData, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      delete req.temp.admin;
      res.json(results);
    });
  },
 
 remove: function(req, res, next) {
    
    var basicQueryData = !req.temp.admin ? req.query: req.temp.admin;
    
    groupService.removeGroup(basicQueryData, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
  
  removeById: function(req, res, next) {
    
    groupService.removeGroupById(req.query, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  }
};
 
module.exports = groupController;