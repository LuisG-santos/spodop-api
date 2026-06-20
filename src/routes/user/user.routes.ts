import { Router } from "express";
import {
  makeGetUserByIdController,
  makeUpdateUserController,
} from "../../factories/user//index.js";

const router: Router = Router();
const updateUserController = makeUpdateUserController();
const getUserByIdController = makeGetUserByIdController();

router.patch("/:id", async(req, res) =>{
  await updateUserController.updateUser(req,res)
} )
router.get("/:id", async (req, res) => {
  await getUserByIdController.getUser(req, res);
});

export default router;
