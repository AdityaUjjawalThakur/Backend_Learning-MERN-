// Express.js Learning Roadmap
// 1. Basics of Express.js
// Setting up an Express server.
// Understanding the app object.
// Creating your first route (GET, POST, etc.).
// Sending responses (res.send, res.json, etc.).
// 2. Routing
// Basic routing with app.get, app.post, app.put, and app.delete.
// Route parameters (req.params).
// Query strings (req.query).
// Handling forms and URL-encoded data (req.body).
// 3. Middleware
// Understanding middleware and its role in Express.js.
// Types of middleware:
// Application-level middleware.
// Router-level middleware.
// Built-in middleware (e.g., express.json, express.static).
// Third-party middleware (e.g., cors, morgan).
// Writing custom middleware.
// The importance of next() and request-response cycle.
// 4. Controllers
// Setting up controllers in the MVC pattern.
// Creating route-specific controller functions.
// Splitting routes and controllers into separate files.
// 5. Error Handling
// Error-handling middleware (err, req, res, next).
// Creating custom error messages.
// Using status codes for error responses (res.status()).
// 6. Serving Static Files
// Using express.static to serve HTML, CSS, JavaScript, and images.
// 7. Working with Templating Engines
// Setting up a templating engine like EJS, Pug, or Handlebars.
// Rendering dynamic content using res.render.
// 8. Handling Forms and User Input
// Parsing form data with express.urlencoded.
// Handling file uploads with multer.
// 9. Connecting to a Database
// Introduction to using a database with Express.js.
// CRUD operations with databases:
// MongoDB with Mongoose.
// MySQL/PostgreSQL with Sequelize or Knex.js.
// Storing and retrieving data from the database.
// 10. Authentication and Authorization
// Understanding the difference between authentication and authorization.
// Implementing authentication with:
// JSON Web Tokens (JWT).
// OAuth or Passport.js.
// Protecting routes with middleware.
// 11. APIs and RESTful Services
// Creating RESTful APIs.
// Structuring APIs with CRUD functionality.
// Best practices for API versioning.
// Implementing pagination, filtering, and sorting.
// 12. Validation and Error Management
// Validating user input using libraries like joi or express-validator.
// Managing errors consistently across the application.
// 13. Security Best Practices
// Implementing HTTPS.
// Preventing common vulnerabilities (e.g., CORS, XSS, CSRF).
// Securing cookies and sessions.
// 14. Working with WebSockets (Optional Advanced)
// Adding real-time functionality using Socket.IO.
// 15. Testing and Debugging
// Debugging an Express app with built-in tools and external libraries.
// Writing tests for your app with Jest, Mocha, or Supertest.
// 16. Deployment
// Deploying your app to:
// Heroku.
// Render.
// Vercel.
// Other platforms (e.g., AWS, Azure, DigitalOcean).



//connecting mysql to express
//install npm install mysql2
// const mysql=require("mysql2")//not mysql
// const db=mysql.createconnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"databasename"   //host,user,password,database
    
// })
// db.createconnection((err)=>{

// })
//basic sanitisation and validation
//basically in post route we can write middleware arraylile
//we can use express-validator and callit in app.js
//const{body,result}//here body contain request.body and
//body("name//basically fiels name").trim()to remove extraspace and 
//body("email").isEmail().wuthMessage("Not a valid")//isEmail()
//to ckeck if it is valid email format 
//withmesaage throw error message
//.notempty().withMessage("name should not be empty")
application.post("/register",[],()=>{})