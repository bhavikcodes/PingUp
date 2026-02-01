import express from "express";
import cors from "cors";
import { createServer } from "node:http"; // connects express instance with socket.io
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = connectToSocket(server, { cors: { origin: "*", methods: ["GET", "POST"], allowedHeaders: ["*"], credentials: true } });

//--------------- initialize  .env variables and request parsers and routes----------------//
dotenv.config();
app.set("port", process.env.port || 3000);
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));
app.use(express.json()); // to parse json data in request body
app.use(express.urlencoded({ extended: true })); // to parse urlencoded data in request body

// Serve static files from the frontend build directory
const frontendDistPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendDistPath));

app.use("/api/v1/users", userRoutes); // user routes

// Handle SPA routing, return all requests to React app
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});


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
