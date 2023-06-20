
/*  importing necessary modules and variables required for user authentication
and authorization. */
const UserModel = require('../../models/UserModel');
const bcryptJs = require('bcryptjs');
const jwt =      require('jsonwebtoken');
const {secretKey, expiresIn} = require('../../configration/jwt_collection');

// creating account function
module.exports.createUserApi = async (req ,res) => {
    const {name , email ,password} = req.body;

    // Define regex to validate email format
    const emailRegex = /^([a-zA-z0-9._-]+)@(gmail|yahoo|hotmail|zohomail|hcl|live|outlook)\.(com)$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message:"Enter Valid Email Address."
        });
    };

    try{
        const validEmail = email.toLowerCase();
        // Checking if a user with the provided email already exists
        const existingUser = await UserModel.findOne({ userEmail: validEmail });
        if(existingUser){
            // Return a 409 status (Conflict) if the user already exists
            return res.status(409).json({ 
                message: 'User Already Exists With This Email.'
            });
        };

        // If user doesn't exist, hash the password and create a new user
        const hashedPassword = await bcryptJs.hash(password, 10); 
        const newUser = await new UserModel({
            userName: name,
            userEmail:validEmail,
            userPassword: hashedPassword,
        });
        // Saving the new user to the database
        const savedUser = await newUser.save(); 
        // Return a 201 status (Created) for a new user
        return res.status(201).json({ 
            message: 'New Account Created Successfully',
            savedUser,
        });
    }catch(error){
        // Return a 500 status (Internal Server Error) if an error occurs
        return res.status(500).json({
            message: `Error In Register: ${error.message}` 
        });
    };
};


// for login user using API 

module.exports.loginUserAPI = async (req ,res) => {
    // Extract email and password from request body  
    const { email, password } = req.body; 
    // Convert email to lowercase for case-insensitive comparison
    const validEmail = email.toLowerCase(); 

    try{

      // Check if the user exists
      const userExists = await UserModel.findOne({ userEmail: validEmail });
      if(!userExists){
        return res.status(404).json({
            message: 'User Email Not Found or User Does Not Exist,Please Create New Account'
        });
      };

       // Verify the password
       const passwordMatch = await bcryptJs.compare(password, userExists.userPassword);
       if(!passwordMatch){
            return res.status(401).json({
                message: 'Incorrect Password'
            });  
       };

        // Create a token for authentication with expires Time
        const token = jwt.sign({ id: userExists._id }, secretKey, { expiresIn });
        return res.status(200).json({
            message: 'Login Successful, please use this token For Using this CRUD_OPERATION',
            token: token,
            expiresIn:`${expiresIn} in sec`
        });
    }catch(error){
        // Return a 500 status (Internal Server Error) if an error occurs
        return res.status(500).json({
            message: `Error In Login User Account: ${error.message}` 
        });
    };
};


// delete users account via userId

module.exports.DeleteUserAccountAPI = async (req ,res) => {
    // Extract the userId from the request parameters
    const { userId } = req.params;
    try{
        // find correct userId Associated with user's account
        const user = await UserModel.findByIdAndDelete({ _id:userId });
        // if user not exists with useId
        if(!user){
            return res.status(404).json({
                message: "User Not Found",
            });
        }
        // deleted User from database
        return res.status(200).json({
            message: "User Deleted Successfull",
        });
    }catch(error){
        return res.status(500).json({
            message: `Error In Delete user's Account : ${error.message}`
        });
    };
};



// update user Account details via userID

module.exports.UpdateUserAPI = async (req , res) => {
    // Extract the userId from the request parameters
    const { userId } = req.params; 
    try 
    {
        // Extract the updated fields from the request body
        const updates = req.body; 
        // Find the user by ID and update the specified fields
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, { new: true });
        // if user not exists with useId
        if (!updatedUser) {
          return res.status(404).json({
            message: 'User Not Found'
          });
        }
        // Update And Send New User Details
        return res.status(200).json({
          message: 'User Details Updated Successfully , here updated details',
          user: updatedUser
        });
    }catch (err) {
        return res.status(500).json({
          message: `Error in Updating User Details : ${err.message}`
        });
    };
};
