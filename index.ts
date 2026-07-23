import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/user/user.routes.js";
import authRoutes from "./src/routes/auth/auth.routes.js";
import ownershipRoutes from "./src/routes/ownership/ownership.route.js"

const app = express();
app.use(cors({
  origin: "https://spodop.com.br",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined");
}

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/ownership", ownershipRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
