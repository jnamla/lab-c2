/**
 * Dependencies.
 */
var organizationService = require('../../model-services/organization/organization');

/**
 * Controller definition.
 */
var organizationController = {

  create: function(req, res, next) {
    organizationService.add(req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
 
  search: function(req, res, next) {
    
    if (req.query.id) {
      
      organizationService.findOrganizationById(req.query, function(err, results) {
        if (err) {
          console.log(err);
          res.status(500).json({success: false, error: err.message});
        }
        
        res.json(results);
      });
      
    } else {
      
      organizationService.findOrganization(req.query, function(err, results) {
        if (err) {
          console.log(err);
          res.status(500).json({success: false, error: err.message});
        }
        
        res.json(results);
      });
    }
  },
  
  update: function(req, res, next) {

    organizationService.update(req.query, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
 
 remove: function(req, res, next) {
    
    organizationService.remove(req.query, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
  
  addContactMean: function(req, res, next) {
    
    organizationService.addContactMean(req.query, req.contact, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
  
  removeContactMean: function(req, res, next) {
    
    organizationService.removeContactMean(req.query, req.contact, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  }
};
 
module.exports = organizationController;