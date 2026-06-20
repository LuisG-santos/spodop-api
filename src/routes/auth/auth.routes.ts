import { Router } from "express";
import { makeCreateUserController } from "../../factories/user/createUserFactory.js";
import { makeLoginController } from "../../factories/auth/loginFactory.js";

const router: Router = Router();

const createUserController = makeCreateUserController();
const loginController = makeLoginController();

router.post("/register", async (req, res) => {
  await createUserController.create(req, res);
});

router.post("/login", async (req, res) => {
  await loginController.login(req, res);
});

export default router;
