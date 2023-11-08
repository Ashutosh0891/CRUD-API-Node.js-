# CRUD-API-Node.js-

This is a simple CRUD (Create, Read, Update, Delete) API built with Node.js and Express. It provides endpoints for managing resources.

# API ENDPOINTS

User Authentication Endpoints

POST /api/auth/signup: Register a new user.

POST /api/auth/login: Log in and receive a JWT token.

GET /api/auth/getUser: Get user details (requires authentication).

-Add the token in header every end point to get the response

Book-related Endpoints

GET /api/books/getAllBooks: Retrieve a list of all books. (requires authentication)

GET /api/books/book/:id: Retrieve details of a specific book by its ID.(requires authentication)

POST /api/books/addBook: Add a new book (requires authentication).

PUT /api/books/updateBook/:id: Update a book's details (requires authentication).

DELETE /api/books/removeBook/:id: Delete a book (requires authentication).

# HOW TO RUN

Entry point=src/index.js

To run the application, you can use node package manager(npm) to install dependencies first then start the server using command below:
To run the server, use the following command from your terminal:

1-npm run start
2-npm run watch(watch mode with nodemon)

# DECISIONS and ASSUMPTIONS

1-I chose MongoDB as the database to store book data due to its flexibility and scalability.

2-User authentication and authorization are implemented for specific endpoints, ensuring data security.

3-We assumed that the user would set up the necessary environment variables for the project, such as the MongoDB connection URI, and specify the JWT secret key.

4-Error handling is in place for different scenarios, returning appropriate HTTP status codes and error messages.

5-The project structure follows best practices for separation of concerns and modularity.

6-Async/Await is used instead of then catch to improve the code readability and reduce the number of line of code
