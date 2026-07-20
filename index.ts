import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerDocument from "./docs/swagger.json" with {type: "json"}
import swaggerUi from "swagger-ui-express"
import userRoutes from "./src/routes/user/user.routes.js";
import authRoutes from "./src/routes/auth/auth.routes.js";
import ownershipRoutes from "./src/routes/ownership/ownership.route.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined");
}

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/ownership", ownershipRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
