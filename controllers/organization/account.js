/**
 * Dependencies.
 */
var accountService = require('../../model-services/organization/account');

/**
 * Controller definition.
 */
var accountController = {

  create: function(req, res, next) {
    accountService.add(req.body, function(err, results) {
      if (!err) {
        res.json(results);
      } else {
        accountService.remove({id: results.user}, next);
        console.log(err);
        res.status(500).json({success: false, error: 'The account could not be created'});
      }
    });
  },
  
  /*
  search: function(req, res, next) {
    
    if (req.query.id) {
      
      accountService.findAccountById(req.query, function(err, results) {
        if (err) {
          console.log(err);
          res.status(500).json({success: false, error: err.message});
        }
        
        res.json(results);
      });
      
    } else {
      
      accountService.findAccount(req.query, function(err, results) {
        if (err) {
          console.log(err);
          res.status(500).json({success: false, error: err.message});
        }
        
        res.json(results);
      });
    }
  },
  
  update: function(req, res, next) {

    accountService.update(req.query, req.body, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
 
 remove: function(req, res, next) {
    
    accountService.remove(req.query, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
  
  addContactMean: function(req, res, next) {
    
    accountService.addContactMean(req.query, req.contact, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  },
  
  removeContactMean: function(req, res, next) {
    
    accountService.removeContactMean(req.query, req.contact, function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false, error: err.message});
      }
      
      res.json(results);
    });
  }*/
};
 
module.exports = accountController;