/**
*
* General dependencies.
*/
var express = require('express');
var router = express.Router();

/**
*
*   Controllers.
*/

var groupController = require('../controllers/address-book/group');
//var groupController = require('../controllers/organization/index')({router: router});

var accountController = require('../controllers/organization/account');

var userController = require('../controllers/organization/user');
var organizationController = require('../controllers/organization/organization');
var profileController = require('../controllers/organization/profile');

/**
 * 
 * Groups.
 */

router.get('/groups/:id', groupController.search);
router.get('/groups/', groupController.search);
router.post('/groups/', groupController.create);
router.put('/groups/:id', groupController.update);
router.delete('/groups/:id', groupController.remove);

/**
 * 
 * Users.
 */
router.get('/users/', userController.search);
router.post('/users/', userController.create);
router.delete('/users/', userController.remove);
router.put('/users/', userController.update);

/**
 * 
 * Organizations.
 */
router.get('/organizations/:id', organizationController.search);
router.get('/organizations/', organizationController.search);
router.post('/organizations/', organizationController.create);
router.delete('/organizations/', organizationController.remove);
router.put('/organizations/', organizationController.update);
router.post('/organizations/:id/contact-data', organizationController.addContactMean);
router.delete('/organizations/:id/contact-data', organizationController.removeContactMean);


router.post('/signup/', accountController.create);

module.exports = router;
