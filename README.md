🖋️ Smart Stationery
Smart Stationery is a full-stack web application designed to manage and streamline the purchase and inventory of stationery items. It features secure user and admin role-based authentication and token management for enhanced security and access control.

🚀 Features
🔐 Authentication & Authorization

  JWT-based login/logout system
  
  Role-based access for Users and Admins
  
  Password hashing for enhanced security

🛍️ User Features

  View and purchase stationery products
  
  Track orders and view order history
  
  Profile management

🧑‍💼 Admin Features

  Add, update, and delete stationery items
  
  View all users and their activities
  
  Manage inventory and order tracking

🧾 Token System

  Access and refresh tokens for session management
  
  Middleware-protected routes

🛠️ Tech Stack
Frontend:

  HTML, CSS, JavaScript (optional: React.js or EJS)

Backend:

  Node.js
  
  Express.js
  
  MongoDB with Mongoose

Authentication:

  JSON Web Tokens (JWT)
  
  Bcrypt for password hashing
  
  Role-based middleware


Smart-Stationery/
│
├── client/              # Frontend files
│
├── server/              # Backend logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes (auth, user, admin)
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & role middleware
│   ├── config/          # Database & environment setup
│   └── index.js         # Entry point
│
├── .env                 # Environment variables
├── package.json         # Node dependencies
└── README.md            # Project documentation

