Project Overview
This backend is designed to support a task management application that allows users to create, manage, and organize tasks with features like drag-and-drop between different task states. The backend is built using Node.js with Express for the server, MongoDB with Mongoose for the database, and JSON Web Tokens (JWT) for user authentication. The backend provides the necessary endpoints for user authentication and task management.


Backend README
Project Overview
This backend is designed to support a task management application that allows users to create, manage, and organize tasks with features like drag-and-drop between different task states. The backend is built using Node.js with Express for the server, MongoDB with Mongoose for the database, and JSON Web Tokens (JWT) for user authentication. The backend provides the necessary endpoints for user authentication, task management, and notifications.

Features
User Authentication:

Users can register and log in using email and password.
JWT is used for managing authentication and maintaining user sessions securely.
Task Management:

Create, read, update, and delete (CRUD) tasks.
Tasks can be moved between different states: To Do, In Progress, and Done.
Real-time updates are supported, allowing users to see changes instantly.


Backend README
Project Overview
This backend is designed to support a task management application that allows users to create, manage, and organize tasks with features like drag-and-drop between different task states. The backend is built using Node.js with Express for the server, MongoDB with Mongoose for the database, and JSON Web Tokens (JWT) for user authentication. The backend provides the necessary endpoints for user authentication, task management, and notifications.

Features
User Authentication:

Users can register and log in using email and password.
JWT is used for managing authentication and maintaining user sessions securely.
Task Management:

Create, read, update, and delete (CRUD) tasks.
Tasks can be moved between different states: To Do, In Progress, and Done.
Real-time updates are supported, allowing users to see changes instantly.
Notifications:

Users receive real-time notifications for actions such as task creation, updates, and deletions.
Notifications are handled on the frontend using libraries like React-Toastify.


Technologies Used
Backend Packages
Express: Web framework for building the server.
Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
JSON Web Tokens (JWT): Used for secure user authentication.
bcryptjs: Library to hash passwords before storing them in the database.
dotenv: Loads environment variables from a .env file into process.env.
Cors: Middleware for handling Cross-Origin Resource Sharing (CORS) issues.
Nodemon: Utility that monitors for any changes in your source code and automatically restarts your server.



Backend README
Project Overview
This backend is designed to support a task management application that allows users to create, manage, and organize tasks with features like drag-and-drop between different task states. The backend is built using Node.js with Express for the server, MongoDB with Mongoose for the database, and JSON Web Tokens (JWT) for user authentication. The backend provides the necessary endpoints for user authentication, task management, and notifications.

Features
User Authentication:

Users can register and log in using email and password.
JWT is used for managing authentication and maintaining user sessions securely.
Task Management:

Create, read, update, and delete (CRUD) tasks.
Tasks can be moved between different states: To Do, In Progress, and Done.
Real-time updates are supported, allowing users to see changes instantly.
Notifications:

Users receive real-time notifications for actions such as task creation, updates, and deletions.
Notifications are handled on the frontend using libraries like React-Toastify.
Technologies Used
Backend Packages
Express: Web framework for building the server.
Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
JSON Web Tokens (JWT): Used for secure user authentication.
bcryptjs: Library to hash passwords before storing them in the database.
dotenv: Loads environment variables from a .env file into process.env.
Cors: Middleware for handling Cross-Origin Resource Sharing (CORS) issues.
Nodemon: Utility that monitors for any changes in your source code and automatically restarts your server.
Frontend Libraries (Integrated with Backend)
Tailwind CSS: Used for styling the frontend components.
React-Toastify: Provides notification support to alert users of real-time changes.
Formik: Manages form validation and submission for user input fields.
React Icons: Supplies iconography for the frontend.
React DnD HTML5 Backend: Enables drag-and-drop functionality for tasks between columns.
Axios: Handles HTTP requests from the frontend to the backend.
API Endpoints
Authentication
POST /api/register

Registers a new user with an email and password.
Request Body: { email: string, password: string }
Passwords are securely hashed using bcryptjs before being stored in the MongoDB database.
POST /api/login

Logs in an existing user with email and password.
Request Body: { email: string, password: string }
Returns a JWT token for authenticated sessions.
Task Management
GET /api/tasks

Retrieves all tasks for the authenticated user.
Response: [{ id: string, title: string, description: string, status: string }]
POST /api/tasks

Creates a new task.
Request Body: { title: string, description: string, status: string }
PUT /api/tasks/

Updates an existing task.
Request Body: { title: string, description: string, status: string }
DELETE /api/tasks/

Deletes a task by ID.
Notifications
Real-Time Notifications:
Notifications can be implemented on the frontend using React-Toastify or similar libraries.
Triggers for notifications are based on backend events like task creation or updates.


Setup Instructions:-
Clone the Repository:
git clone <repository-url>
cd <repository-folder>
Install Dependencies:
npm install
Environment Variables:
SECRET_KEY=f729be963bc942e8331ca8b06d52e639df2dede43d023abc7ea27d3c37629c4e42b0dbb40c36af92fad8d08da32907ede5232247999c3f19027812c99ae6fb4c28ac09ab01e90753f9e297ad5cfafd66a2f32b209570fbe8d9c336a10bea135c652a06ce5c06f974fe7a3d1901f0a25849293c3791481052f294addc32ec2b2d938f7cdff7c67ba2f0127e109bd95a92f633a7e6d1ca98fac709a4c9a93a086d861974b504c8835debeb17d65986b5b527254fe9f36155f5808a4299cf077cfc2c2a2368520c15fce00affb6c4e0c9cc6cb609a83ed5116ec1611dbd34da7469fea634732e3da485b76c9da867021ff7d1c7e5183ec1debd6b2ce22f49efceda
DB_URL="mongodb+srv://priyankapk793:owQFY60odtG9ZMhU@cluster0.ftnzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
PORT=8070

Start the Server:
npm start










