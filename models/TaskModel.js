// Importing mongoose module, which provides a straightforward, schema-based solution to model your application data.
const mongoose = require('mongoose');

// Defining a new schema for our Task model. A schema represents the structure of a particular document, either completely or just a portion of it.
const taskSchema = new mongoose.Schema({
    // taskTitle field of the schema, which is of type String and is required.
    taskTitle: {
        type: String,
        require: true,
    },

    // taskDescription field of the schema, which is of type String and is required.
    taskDescription: {
        type: String,
        require: true,
    },

    // taskAssignedTo field of the schema, which is of type String and is required.
    taskAssignedTo:{
        type: String,
        require: true,
    },

    // taskPriority field of the schema, which is of type String and its having enum.
    taskPriority:{
        type: String,
        enum: ['High' ,'Medium' ,'Low'],
        default: 'Medium'
    },

     // taskStatus field of the schema, which is of type Boolean and defaults to false. This can be used to mark a task as complete or incomplete.
    taskStatus: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
    },
    // The second argument to the schema constructor is an options object. Here, we're setting 'timestamps: true' to automatically manage createdAt and updatedAt properties on our documents.
},{timestamps:true});



// Exporting our Task model. mongoose.model() is a function that takes in a model name and a schema and returns a model.
module.exports = mongoose.model('TaskModel', taskSchema);