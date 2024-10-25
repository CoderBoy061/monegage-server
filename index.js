import express from "express";
import logger from "./logger/logger.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnection from "./config/db-connection.js";
import userRoutes from "./routes/user-route.js"
import listRoute from "./routes/list-route.js"

dotenv.config();

// require("dotenv").config();

const app = express();
dbConnection();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE","PUT"],
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// connectDB();


// defining the routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/list", listRoute);

// Middleware to log each request
app.use((req, _, next) => {
  logger.info(`Received request for ${req.method} ${req.url}`);
  next();
});

// Example route
app.get("/hello-world", (_, res) => {
  res.send("Hello, world from furryfriend backend service!");
});

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// listen to the port
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "dev") {
    logger.info(
      `${process.env.NODE_ENV}  backend service is running on port http://localhost:${PORT}`
    );
  } else {
    logger.info(
      ` ${process.env.NODE_ENV}  backend service is running on port ${PORT}`
    );
  }
});
