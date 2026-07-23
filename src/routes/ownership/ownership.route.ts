import { Router } from "express";
import { makeCreateOwnershipController } from "../../factories/ownership/createOwnershipFactory.js";
import { authMiddleware } from "../../middlewares/auth.js";
import { makeGetOwnershipController } from "../../factories/ownership/getOwnership.js";

const router: Router = Router();

const createOwnershipController = makeCreateOwnershipController();
const getOwnershipController = makeGetOwnershipController()

router.post("/register", authMiddleware,async (req, res) => {
  await createOwnershipController.create(req, res);
});

router.get("/me", authMiddleware, async(req, res) => {
  await getOwnershipController.getOwnership(req,res)
})

export default router;