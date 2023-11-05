# INFO-6150-Assignment8

User Management API
This is a Node.js, MongoDB, and Express API for managing user accounts. It allows you to create, update, delete, and retrieve user information. It enforces strong password rules and validates email and full name inputs.

API Endpoints
Create User
Create a new user with full name, email, and password.

Endpoint: POST /user/create
Request Body:
fullName: User's full name (String)
email: User's email address (String)
password: User's password (String)
Response:
201 Created: User created successfully
400 Bad Request: Invalid email or password
422 Unprocessable Entity: Validation error
Notes:
Password must meet strong security criteria.
Email and full name must pass validation.
Update User
Update user details, including full name and password. Email cannot be updated.

Endpoint: PUT /user/edit
Request Body:
email: User's email address (String)
fullName: New full name (String)
password: New password (String)
Response:
200 OK: User updated successfully
400 Bad Request: User not found
422 Unprocessable Entity: Validation error
Delete User
Delete a user by their email.

Endpoint: DELETE /user/delete
Request Body:
email: User's email address (String)
Response:
200 OK: User deleted successfully
400 Bad Request: User not found
Get All Users
Retrieve all user full names, email addresses, and hashed passwords stored in the database.

Endpoint: GET /user/getAll
Response:
200 OK: List of users retrieved successfully
400 Bad Request: Error in retrieving users
Security
Passwords are hashed and stored securely using bcrypt.
Passwords must meet strong security criteria.
Email and full name validation is performed to prevent invalid input.
Installation and Setup
Clone this repository.
Run npm install to install dependencies.
Configure your MongoDB connection in the .env file.
Run the server using npm start.
Access the API using the specified endpoints.
