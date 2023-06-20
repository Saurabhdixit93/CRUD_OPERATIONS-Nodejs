/* This code is creating a router object using the Express framework and defining two routes: '/user'
and '/task'. The '/user' route is using the routes defined in the 'UserRoutesApi' file, while the
'/task' route is using the routes defined in the 'TasksRoutesApi' file with JWT authentication
middleware provided by the 'JWT_config' module. Finally, the router object is being exported for use
in other parts of the application. */

const express = require('express');
const router = express.Router();
const JWT_config = require('../../configration/JWT_config');

router.use('/user', require('./UserRoutesApi'));
router.use('/task', JWT_config ,require('./TasksRoutesApi'));

module.exports = router;