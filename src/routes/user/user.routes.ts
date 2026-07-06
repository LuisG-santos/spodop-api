import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.js";
import {
  makeGetUserByIdController,
  makeUpdateUserController,
} from "../../factories/user//index.js";

const router: Router = Router();
const updateUserController = makeUpdateUserController();
const getUserByIdController = makeGetUserByIdController();

router.patch("/me", async(req, res) =>{
  await updateUserController.updateUser(req,res)
} )
router.get("/me", authMiddleware ,(req, res) => {
   getUserByIdController.getUser(req, res);
});

export default router;
