import express from "express";
import cors from "cors";
import { createServer } from "node:http"; // connects express instance with socket.io
import mongoose from "mongoose";
import dotenv from "dotenv";
import {connectToSocket} from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

//--------------- initialize  .env variables and request parsers and routes----------------//
dotenv.config();
app.set("port", process.env.port || 3000);
app.use(cors()); // allows cross origin requests
app.use(express.json({limit: "40kb"})); // to parse json data in request body
app.use(express.urlencoded({ limit: "40kb", extended: true })); // to parse urlencoded data in request body

app.use("/api/v1/users", userRoutes); // user routes



//------------------------ Start Server & Connect to DB ----------------------//
const start = async () => {
  server.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
  });
  const connectionDb = await mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => {
      console.log("successfully Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
start();
