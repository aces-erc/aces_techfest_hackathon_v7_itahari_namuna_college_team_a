import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

import userRoutes from "./routes/userRoutes.js";
import insuranceRoutes from "../src/routes/insuranceRoutes.js";
import authRoutes from "../src/routes/authRoutes.js";
import hospitalRoutes from "../src/routes/hospitalRoutes.js";
import socketController from "../src/controller/socketController.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Set the frontend origin (ensure this is correct in your .env file)
console.log(process.env.FRONTEND_ORIGIN);

// CORS for HTTP routes (Express routes)
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,  // e.g., "http://localhost:5173"
  credentials: true
}));

// Create HTTP server and pass it to Socket.IO
const node_server = createServer(app);

// Socket.IO CORS configuration
const io = new Server(node_server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN,  // Ensure this matches your frontend's URL
    methods: ["GET", "POST"],
    credentials: true,  // Allow credentials such as cookies or authorization headers
  }
});

// Initialize Socket.IO controller
socketController(io);

// Routes
app.use("/user/", userRoutes);
app.use("/insurance/", insuranceRoutes);  
app.use("/login", authRoutes);
app.use("/hospital", hospitalRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.send("hello via backend!");
});

// Start the server
node_server.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});

export default app;
