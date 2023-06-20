const TaskModel = require('../../models/TaskModel');


/* This code exports a function named `CreateTaskWithApi` that creates a new task by extracting the
required fields from the request body and saving it to the database using the `TaskModel`. It
returns a JSON response with a success message and the created task details if the task is created
successfully, otherwise it returns an error message with a status code of 500. */
module.exports.CreateTaskWithApi = async (req, res) => {
    const { 
            taskTitle,
            taskDescription,
            taskAssignedTo,
            taskPriority,
            taskStatus
        } = req.body;

    try{

        const creatTask = await new TaskModel({
            taskTitle:       taskTitle ,
            taskDescription: taskDescription, 
            taskAssignedTo:  taskAssignedTo, 
            taskPriority:    taskPriority, 
            taskStatus:      taskStatus,
        });

        await creatTask.save();

        return res.status(200).json({
          message: `Task created successfully ,Here is task details`,
          task: creatTask,
        });
    }catch(err){
        return res.status(500).json({
            message: `Error occured In Creating Task : ${err.message}`,
        });
    };
};

// get specific task using taskID
module.exports.GetSpecificTaskWthAPI = async (req, res) =>{

    const { taskID } = req.params;
    try{
        // Find the task with the specified taskID
        const task = await TaskModel.findById(taskID);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        return res.status(200).json({
            message:'Task Found with given taskID',
            task:task,
        }); // Return the task object
    }catch(err){
        return res.status(500).json({ error:`Internal server error or Error In finding Task : ${err.message}`});
    };
};



// Get All Task function
module.exports.GetAllTaskWithAPI = async (req ,res) => {
    // Extract the userId from the request parameters
    const { userId } = req.params;
    try{
        // find all task with a matching user ID
        const getTasks = await TaskModel.find({ user: userId });
        // check if matching or not
        if(!getTasks){
            return res.status(404).json({
                error: 'User Is not Associated with that Tasks'
            });
        };
        // if matching then send success message with all tasks
        return res.status(200).json({
            message: `User's associated Tasks Retrived Successfully`,
            getTasks: getTasks
        });
    }catch(error){
        return res.status(500).json({
            error: `Error in Getting ALl Tasks : ${error.message}`
        });
    };
};


// Update a task with taskID

module.exports.UpdateTaskWithAPI = async(req ,res) => {
    // Extract the taskId from the request parameters
    const { taskID } = req.params;
    // Getting new Data From req Body
    const updates = req.body;
    try{

        // find the task by ID and Update new specified fields
        const updatedTask = await TaskModel.findByIdAndUpdate(taskID, updates ,{new: true});
        // check if Task available or not
        if(!updatedTask){
            return res.status(404).json({
                error: 'Task Not found'
            });
        };
        // available then send 
        return res.status(200).json({
            message: 'Thankyou ! Task Updated Successfully',
            task: updatedTask
        });
    }catch(error){
        return res.status(500).json({
            error: `Error in Updating Task Details : ${error.message}`
        });
    };
};


// delete Task with taskID

module.exports.DeleteTaskWithAPI = async (req ,res) => {
    // Extract the taskId from the request parameters
    const { taskID } = req.params;
    try{

        const taskDelete = await TaskModel.findByIdAndDelete(taskID);
        // check If task Available or not 
        if(!taskDelete) {
            return res.status(404).json({
                error: 'Task Not Found'
            });
        };
        // if task found then send message
        return res.status(200).json({
            message: 'Task Deleted Successfully',
            task: taskDelete,
        });
    }catch(error){
        return res.status(500).json({
            error: `Error in delete Task : ${error.message}`
        });
    };
};

