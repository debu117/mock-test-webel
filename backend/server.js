import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dns from "dns";
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import resultRoutes from './routes/result.js';
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = express();
const PORT = process.env.PORT || 8080;

//MIDDLEWARES
app.use(clerkMiddleware())
app.use(cors()); //as the user will be found first then we use the JSON.
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/result", resultRoutes);

// DB
connectDB();

// ROUTES
app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});