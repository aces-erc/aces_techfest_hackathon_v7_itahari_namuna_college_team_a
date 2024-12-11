import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import cookieParser from "cookie-parser";
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
  }),
);

app.get("/", () => {
  res.send("hello via backend!");
});

export default app;
