
# User Account and Task Management API

This API allows you to manage user accounts and tasks. It provides endpoints for creating, updating, and deleting user accounts, as well as creating, retrieving, updating, and deleting tasks.

## Endpoints

## User API Endpoints

### Create User

Creates a new user account.

- URL: `/api/v1/create-account`
- Method: `POST`
- Request Body:
  - `userName` (required): The name of the user.
  - `userEmail` (required): The email address of the user.
  - `userPassword` (required): The password of the user.
- Response:
  - `201 Created`: If the user account is created successfully, along with the created user details.
  - `400 Bad Request`: If the provided email address is not valid.
  - `409 Conflict`: If a user with the provided email already exists.
  - `500 Internal Server Error`: If there was an error creating the user account.

Example

Request:

POST /api/v1/create-account


Request Body:

json
{
  "userName": "John Doe",
  "userEmail": "johndoe@example.com",
  "userPassword": "password123"
}


Response:

json
{
  "message": "New account created successfully",
  "user": {
    "_id": "123",
    "userName": "John Doe",
    "userEmail": "johndoe@example.com"
  }
}


### User Login

Logs in a user and provides an authentication token.

- URL: `/api/v1/login-account/`
- Method: `POST`
- Request Body:
  - `userEmail` (required): The email address of the user.
  - `userPassword` (required): The password of the user.
- Response:
  - `200 OK`: If the login is successful, along with the authentication token and token expiration time.
  - `404 Not Found`: If the user with the provided email is not found or the user does not exist.
  - `401 Unauthorized`: If the provided password is incorrect.
  - `500 Internal Server Error`: If there was an error during the login process.

Example

Request:

POST /api/v1/login-account


Request Body:

json
{
  "userEmail": "johndoe@example.com",
  "userPassword": "password123"
}


Response:

json
{
  "message": "Login successful",
  "token": "<authentication-token>",
  "expiresIn": "3600 seconds"
}


### Delete User Account

Deletes a user account based on the provided user ID.

- URL: `/api/v1/delete-account/:userId`
- Method: `DELETE`
- Parameters:
  - `userId` (required): The ID of the user.
- Response:
  - `200 OK`: If the user account is deleted successfully.
  - `404 Not Found`: If the user with the specified ID is not found.
  - `500 Internal Server Error`: If there was an error deleting the user account.

Example

Request:

DELETE /api/v1/delete-account/123


Response:

json
{
  "message": "User account deleted successfully"
}
`

### Update User Account

Updates the details of a user account based on the provided user ID.

- URL: `/api/v1/update-account/:userId`
- Method: `PUT`
- Parameters:
  - `userId` (required): The ID of the user.
- Request Body:
  - `userName` (optional): The updated name of the user.
  - `userEmail` (optional): The updated email address of the user.
  - `userPassword` (optional): The updated password of the user.
- Response:
  - 200 OK: If the user account is updated successfully, along with the updated user details.
  - 404 Not Found: If the user with the specified ID is not found.
  - 500 Internal Server Error: If there was an error updating the user account.

Example

Request:

PUT /api/v1/update-account/123


Request Body:
json
{
  "userName": "John Smith",
  "userEmail": "johnsmith@example.com"
}


Response:
json
{
  "message": "User details updated successfully",
  "user": {
    "_id": "123",
    "userName": "John Smith",
    "userEmail": "johnsmith@example.com"
  }
}


### Create Task

Creates a new task.

- URL: /api/v1/task/create-task
- Method: POST
- Request Body:
  - taskTitle (required): The title of the task.
  - taskDescription (required): The description of the task.
  - taskAssignedTo (required): The user assigned to the task.
  - taskPriority (required): The priority of the task.
  - taskStatus (required): The status of the task.
- Response:
  - 200 OK: If the task is created successfully.
  - 500 Internal Server Error: If there was an error creating the task.

Example

Request:

POST /tasks/create


Request Body:
json
{
  "taskTitle": "Complete Project",
  "taskDescription": "Finish the project tasks by the deadline",
  "taskAssignedTo": "John Doe",
  "taskPriority": "High",
  "taskStatus": "In Progress"
}


Response:
json
{
  "message": "Task created successfully, Here are the task details",
  "task": {
    "_id": "456",
    "taskTitle": "Complete Project",
    "taskDescription": "Finish the project tasks by the deadline",
    "taskAssignedTo": "John Doe",
    "taskPriority": "High",
    "taskStatus": "In Progress",
    "user":"424"
  }
}


### Get Specific Task

Retrieves a specific task based on the provided task ID.

- URL: /api/v1/task/get/:taskID
- Method: GET
- Parameters:
  - taskId (required): The ID of the task.
- Response:
  - 200 OK: If the task is found, along with the task details.
  - 404 Not Found: If the task with the specified ID is not found.
  - 500 Internal Server Error: If there was an error retrieving the task.

Example

Request:

GET /api/v1/task/get/456


Response:
json
{
  "message": "Task Found with the given task ID",
  "task": {
    "_id": "456",
    "taskTitle": "Complete Project",
    "taskDescription":"Finish the project tasks by the deadline",
    "taskAssignedTo": "John Doe",
    "taskPriority": "High",
    "taskStatus": "In Progress"
  }
}


### Get All Tasks

Retrieves all tasks associated with a specific user.

- URL: /api/v1/task/get-tasks/:userId
- Method: GET
- Parameters:
  - userId (required): The ID of the user.
- Response:
  - 200 OK: If tasks are found for the user, along with the list of tasks.
  - 404 Not Found: If no tasks are associated with the user.
  - 500 Internal Server Error: If there was an error retrieving the tasks.

Example

Request:

GET /api/v1/task/get-tasks/789


Response:
json
{
  "message": "User's associated tasks retrieved successfully",
  "getTasks": [
    {
      "_id": "456",
      "taskTitle": "Complete Project",
      "taskDescription": "Finish the project tasks by the deadline",
      "taskAssignedTo": "John Doe",
      "taskPriority": "High",
      "taskStatus": "In Progress"
    },
    {
      "_id": "789",
      "taskTitle": "Review Proposal",
      "taskDescription": "Review and provide feedback on the project proposal",
      "taskAssignedTo": "John Doe",
      "taskPriority": "Medium",
      "taskStatus": "Pending"
    }
  ]
}


### Update Task

Updates the details of a task based on the provided task ID.

- URL: /api/v1/task/update-task/:taskID
- Method: PUT
- Parameters:
  - taskId (required): The ID of the task.
- Request Body:
  - taskTitle (optional): The updated title of the task.
  - taskDescription (optional): The updated description of the task.
  - taskAssignedTo (optional): The updated user assigned to the task.
  - taskPriority (optional): The updated priority of the task.
  - taskStatus (optional): The updated status of the task.
- Response:
  - 200 OK: If the task is updated successfully, along with the updated task details.
  - 404 Not Found: If the task with the specified ID is not found.
  - 500 Internal Server Error: If there was an error updating the task.

Example

Request:

PUT /api/v1/task/update-task/456


Request Body:
json
{
  "taskTitle": "Complete Project Phase 1",
  "taskStatus": "Completed"
}


Response:
json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "456",
    "taskTitle": "Complete Project Phase 1",
    "taskDescription": "Finish the project tasks by the deadline",
    "taskAssignedTo": "John Doe",
    "taskPriority": "High",
    "taskStatus": "Completed"
  }
}


### Delete Task

Deletes a task based on the provided task ID.

- URL: /api/v1/task/delete-task/taskID:
- Method: DELETE
- Parameters:
  - taskId (required): The ID of the task.
- Response:
  - 200 OK: If the task is deleted successfully, along with the deleted task details.
  - 404 Not Found: If the task with the specified ID is not found.
  - 500 Internal Server Error: If there was an error deleting the task.

Example

Request:

DELETE /api/v1/task/delete-task/456

Response:

json
{
  "message": "Task deleted successfully",
  "task": {
    "_id": "456",
    "taskTitle": "Complete Project Phase 1",
    "taskDescription": "Finish the project tasks by the deadline",
    "taskAssignedTo": "John Doe",
    "taskPriority": "High",
    "taskStatus": "Completed"
  }
}


## Example Data

Here is an example of the data that can be used to test the API endpoints:

Tasks Data

json
[
  {
    "_id": "123",
    "taskTitle": "Complete Project Phase 1",
    "taskDescription": "Finish the project tasks by the deadline",
    "taskAssignedTo": "John Doe",
    "taskPriority": "High",
    "taskStatus": "In Progress"
  },
  {
    "_id": "456",
    "taskTitle": "Review Design Mockups",
    "taskDescription": "Provide feedback on the design mockups for the new website",
    "taskAssignedTo": "Jane Smith",
    "taskPriority": "Medium",
    "taskStatus": "Pending"
  }
]


User Data

json
[
  {
    "_id": "123",
    "userName": "John Doe",
    "userEmail": "johndoe@example.com"
  },
  {
    "_id": "456",
    "userName": "Jane Smith",
    "userEmail": "janesmith@example.com"
  }
]

_______________________________________________________________________________________________________________

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgments

We would like to express our gratitude to the open-source community for providing valuable resources and tools that have been instrumental in the development of this project.

## Contact

For any inquiries or feedback, please contact:

- Project Maintainer: [ `Saurabh Dixit` ]
- Email: [ `smartds2550@gmail.com`  ]

Feel free to reach out with any questions, suggestions, or collaboration opportunities. Thank you for using this project!