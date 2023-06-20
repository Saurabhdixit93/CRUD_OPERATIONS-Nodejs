// Importing mongoose module, which provides a straightforward, schema-based solution to model your application data.
const mongoose = require('mongoose');

// Defining a new schema for our User model. A schema represents the structure of a particular document, either completely or just a portion of it.
const userSchema = new mongoose.Schema({
  // userName field of the schema, which is of type String and is required.
  userName:{
    type: String,
    require: true,
  },
  // userEmail field of the schema, which is of type String, is required and must be unique across all User documents.
  userEmail:{
    type: String,
    require: true,
    unique: true,
  },
  // userPassword field of the schema, which is of type String and is required.
  userPassword: {
    type: String,
    require: true,
  }
  // The second argument to the schema constructor is an options object. Here, we're setting 'timestamps: true' to automatically manage createdAt and updatedAt properties on our documents.
},{timestamps: true});

// Exporting our User model. mongoose.model() is a function that takes in a model name and a schema and returns a model.
module.exports = mongoose.model('UserModel' ,userSchema);
