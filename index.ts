import express from "express";
import db from "./src/db/client.js";
import bcrypt from "bcrypt";
import { CreateUserController } from "./src/controllers/createUser.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/auth/register", async (req, res) => {
 const createUser = new CreateUserController();
 const {statusCode, body} = await createUser.create(req);

 res.status(statusCode).json(body)
});

app.get("/user", async (req, res) => {
  try {
    const user = await db.user.findMany();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
