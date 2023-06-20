// creating router wia express and importing User Controller and JWT
const express = require('express');
const router = express.Router();
const TaskController = require('../../controllers/APIs_EndPoint/TasksControllerApi');


// creating route for new Task 
router.post('/create-task' , TaskController.CreateTaskWithApi);

// creating route for getting All tasks by userID
router.get('/get-tasks/:userId',TaskController.GetAllTaskWithAPI);

//  creating route for get specific task by taskID
router.get('/get/:taskID' ,TaskController.GetSpecificTaskWthAPI);

// creating route for updating task by taskId
router.put('/update-task/:taskID',TaskController.UpdateTaskWithAPI);

// creating route for deleting task by taskId
router.delete('/delete-task/:taskID' ,TaskController.DeleteTaskWithAPI);



// exporting for globle use
module.exports = router;
