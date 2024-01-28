import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import blogPostRoutes from "./routes/blogPosts.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// rate limiter för säkerhet

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minut
  max: 5,
  message:
    "Too many login attempts from this IP, please try again after 1 minute",
});

app.use("/api/users/login", loginLimiter);

//helmet för säkerhet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "http://localhost:5173"],
      },
    },
  })
);

//mongodb atlas anslutning
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

//routes

app.use("/api/users", userRoutes);
app.use("/api/blogposts", blogPostRoutes);

app.get("/", (req, res) => {
  res.send("Blog Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
