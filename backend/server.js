import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose"
import { connectDB } from './config/db.js';
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors())
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Server is ready");
});

app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB connected`);
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });