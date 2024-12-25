const express = require("express");
const jwt = require("jsonwebtoken");
const { v5: uuidv5 } = require("uuid"); // Import UUIDv5
const app = express();
const PORT = 3100;

// Namespace for UUIDv5
const NAMESPACE = uuidv5.DNS;

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";

// Middleware to parse JSON
app.use(express.json());

// In-memory array to store user data
let users = [{ email: "admin@example.com", password: "admin123" }];
let mockUsers = [{ email: "admin@example.com", password: "admin123" }]; // Mock user for login

// Middleware to authenticate JWT
const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = user; // Attach user info to the request
    next();
  });
};

// Login route to generate JWT
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check mock user for simplicity
  const validUser = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!validUser) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // Generate JWT
  const token = jwt.sign({ email: validUser.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Create a new user (POST /users)
app.post("/users", authenticate, (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  // Generate a unique ID using UUIDv5
  const id = uuidv5(email, NAMESPACE);

  // Check for duplicate ID
  if (users.some((user) => user.id === id)) {
    return res
      .status(400)
      .json({ message: "User with the same email already exists." });
  }

  const newUser = { id, email, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all users (GET /users)
app.get("/users", (req, res) => {
  res.json(users);
});

// Get a specific user by ID (GET /users/:id)
app.get("/users/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json(user);
});

// Update a user by ID (PUT /users/:id)
app.put("/users/:id", authenticate, (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === id);
  const { email, password } = req.body;

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found." });
  }

  // Update user details
  if (password) users[userIndex].password = password;
  if (email) {
    // Generate a new ID if email changes
    users[userIndex].id = uuidv5(email, NAMESPACE);
    users[userIndex].email = email;
  }

  res.json(users[userIndex]);
});

// Delete a user by ID (DELETE /users/:id)
app.delete("/users/:id", authenticate, (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found." });
  }

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `Login with POST /login using { email: "admin@example.com", password: "admin123" }`
  );
});
