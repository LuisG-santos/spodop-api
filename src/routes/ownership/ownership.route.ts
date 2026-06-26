import { Router } from "express";
import { makeCreateOwnershipController } from "../../factories/ownership/createOwnershipFactory.js";
import { authMiddleware } from "../../middlewares/auth.js";

const router: Router = Router();

const createOwnershipController = makeCreateOwnershipController();

router.post("/register", authMiddleware,async (req, res) => {
  await createOwnershipController.create(req, res);
});

export default router;