const express = require('express');
const router = express.Router();
const UsertControllerAPI = require('../../controllers/APIs_EndPoint/UserControllerApi');
const JWT_config = require('../../configration/JWT_config');


// Creating route for create a new user account.
router.post('/create-account' , UsertControllerAPI.createUserApi);
// Creating route for login an existing user.
router.post('/login-account' ,  UsertControllerAPI.loginUserAPI);
// Creating route for update an existing user's account information.
router.put('/update-account/:userId' , JWT_config , UsertControllerAPI.UpdateUserAPI);
// Creating route for delete an existing user's account.
router.delete('/delete-account/:userId' , JWT_config ,UsertControllerAPI.DeleteUserAccountAPI);

// exporting for global use
module.exports = router;