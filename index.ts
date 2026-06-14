import express from "express";
import { CreateUserController } from "./src/controllers/user/createUser.js";
import { GetUserByIdController } from "./src/controllers/user/getUserById.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/auth/register", async (req, res) => {
  const createUser = new CreateUserController();
  await createUser.create(req, res);
});

app.get("/user/:id", async (req, res) => {
  const getUser = new GetUserByIdController();
  await getUser.getUser(req, res);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
