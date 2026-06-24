import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/user/user.routes.js";
import authRoutes from "./src/routes/auth/auth.routes.js";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined");
}

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
