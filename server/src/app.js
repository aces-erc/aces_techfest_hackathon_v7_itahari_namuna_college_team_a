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

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const node_server = createServer(app);

const io = new Server(node_server, {
  cors: {
    origin: ["*", process.env.FRONTEND_ORIGIN],
    credentials: true,
  },
});

// socket io sending configuration
socketController(io);

app.use("/user/", userRoutes);

app.use("/user/", insuranceRoutes);

app.use("/login", authRoutes);
app.use("/hospital", hospitalRoutes);
// app.use("/report")

app.get("/", (req, res) => {
  res.send("hello via backend!");
});

export default app;
