# Assignment-6: E-Commerce Application

A full-stack web application built with Express.js, MongoDB, and vanilla JavaScript frontend. This application allows users to register, login, and browse/manage products.

## Features

- **User Authentication**: Secure sign-up and login functionality with bcryptjs password hashing
- **Product Management**: Browse and manage products with detailed information
- **Database Integration**: MongoDB Atlas integration for data persistence
- **RESTful API**: Clean API endpoints for authentication and products
- **CORS Support**: Cross-Origin Resource Sharing enabled for frontend-backend communication
- **Environment Configuration**: Secure configuration using environment variables

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

## Project Structure

```
├── server.js                 # Main server entry point
├── package.json              # Project dependencies and metadata
├── .env                      # Environment variables (not included in repo)
├── index.html                # Main product page
├── login.html                # Login page
├── signup.html               # Sign-up/Registration page
├── script.js                 # Frontend JavaScript
├── style.css                 # Frontend styling
├── insertDemoProducts.js     # Script to populate demo products
├── models/
│   ├── User.js              # User schema and model
│   └── Product.js           # Product schema and model
└── routes/
    ├── authRoutes.js        # Authentication endpoints
    └── productRoutes.js     # Product management endpoints
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Assignment-6
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000`

## Usage

### Starting the Application

```bash
npm start
```

The server connects to MongoDB Atlas and starts listening on port 5000.

### Inserting Demo Products

To populate the database with demo products:

```bash
node insertDemoProducts.js
```

### Accessing the Application

- **Home Page**: `http://localhost:5000/index.html`
- **Sign Up**: `http://localhost:5000/signup.html`
- **Login**: `http://localhost:5000/login.html`

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login

### Product Routes (`/api/products`)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Database Schemas

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Product Schema
```javascript
{
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String
}
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
PORT=5000
```

## Dependencies

- **express** (^5.2.1) - Web framework
- **mongoose** (^9.4.1) - MongoDB ODM
- **bcryptjs** (^3.0.3) - Password hashing
- **cors** (^2.8.6) - Cross-Origin Resource Sharing
- **dotenv** (^17.4.2) - Environment variable management

## How to Run

1. Ensure MongoDB Atlas cluster is set up and connection string is in `.env`
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the server
4. Open browser and navigate to `http://localhost:5000/index.html`

## Notes

- Passwords are hashed using bcryptjs for security
- MongoDB connections are handled via Mongoose ODM
- CORS is enabled to allow frontend-backend communication
- The application uses a simple MVC-like structure

## License

ISC

---

**Created as part of Full Stack Development Assignment-6**
