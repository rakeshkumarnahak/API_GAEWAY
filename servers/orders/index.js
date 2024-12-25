const express = require("express");
const app = express();
const { v5: uuidv5 } = require("uuid"); // Import UUIDv5
const PORT = 3200;

// Namespace for UUIDv5
const NAMESPACE = uuidv5.DNS;

// Middleware to parse JSON
app.use(express.json());

// In-memory data storage
let users = [];
let orders = [];

// Routes

// Get all users (GET /users)
app.get("/users", (req, res) => {
  res.json(users);
});

// Create a new user (POST /users)
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  const userId = uuidv5(email, NAMESPACE); // Generate unique ID using UUIDv5
  const newUser = { id: userId, name, email };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all orders (GET /orders)
app.get("/orders", (req, res) => {
  res.json(orders);
});

// Create a new order (POST /orders)
app.post("/orders", (req, res) => {
  const { product, quantity, totalPrice } = req.body;

  if (!product || !quantity || !totalPrice) {
    return res.status(400).json({
      message: "Product, quantity, total price, and userId are required.",
    });
  }

  const orderId = uuidv5(`${product}-${Date.now()}`, NAMESPACE); // Generate unique ID for order
  const newOrder = { id: orderId, product, quantity, totalPrice };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Get a specific user by ID (GET /users/:id)
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json(user);
});

// Get a specific order by ID (GET /orders/:id)
app.get("/orders/:id", (req, res) => {
  const { id } = req.params;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  res.json(order);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
