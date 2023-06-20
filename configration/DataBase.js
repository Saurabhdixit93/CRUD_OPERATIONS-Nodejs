// Importing the mongoose module, which provides a straightforward, schema-based solution to model your application data.
const mongoose = require('mongoose');

// Exporting a function named ConnectDB as a property of the module.exports object.
module.exports.ConnectDB = async () => {
    try 
    {
        // Establishing a connection to the MongoDB database using the mongoose.connect() method.
        // The connection URL is obtained from the environment variable MONGO_URL, or it falls back to a default URL if the environment variable is not set.
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true, // Setting the useNewUrlParser option to true to use the new URL parser.
            useUnifiedTopology: true, // Setting the useUnifiedTopology option to true to use the new Server Discovery and Monitoring engine.
        });

        // Printing a success message with the host of the connected MongoDB database.
        console.log(`MongoDB Database connected in: ${conn.connection.host}, Successfully`);
    } catch (err) {
        // Handling any errors that occur during the connection process.
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exiting the process with a non-zero exit code to indicate an error.
    }
};
