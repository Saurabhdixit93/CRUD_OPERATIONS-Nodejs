// importing JWT and secretKey
const { secretKey } = require('./jwt_collection');
const jwt = require('jsonwebtoken');

// verify JWT TOKEN function
module.exports = async (req ,res ,next) => {
    try
    {
        // Check if Authorization header exists
        if( !req.headers.authorization){
            return res.status(500).json({
                message: 'Please Add Authorization Token',
            });
        };
         // Extract token from Authorization header and verify it
        const token = req.headers.authorization.split(' ')[1];
        const paylod = await jwt.verify(token ,secretKey);

        // Attach token payload to request object for further use
        req.paylod = paylod;
        // Call next middleware function in chain
        next();
    }catch(err){
        // Handle different types of errors that may occur during verification
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({
                message: 'Sorrry Token Has Expired',
            });
        }
        if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({
                message: 'Authorization token is Required'
            });
        }
        return res.status(500).json({
            message: 'Errror In JWT TOKEN VERIFICATION'
        });
    };
};
