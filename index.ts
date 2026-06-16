import express from "express";
import cors from "cors";
import { makeUpdateUserController } from "./src/factories/user/updateUserFactory.js";
import { makeGetUserByIdController } from "./src/factories/user/getUserByIdFactory.js";
import { makeCreateUserController } from "./src/factories/user/createUserFactory.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createUserController = makeCreateUserController();
const updateUserController = makeUpdateUserController();
const getUserByIdController = makeGetUserByIdController();

app.post("/auth/register", async (req, res) => {
  await createUserController.create(req, res);
});

app.patch("/user/:id", async (req, res) => {
  await updateUserController.updateUser(req, res);
});

app.get("/user/:id", async (req, res) => {
  await getUserByIdController.getUser(req, res);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
