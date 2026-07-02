import { Router} from "express";
import { makeForgotPasswordController } from "../../factories/resetPassword/resetPasswordFactory.js";

const router = Router();
const forgotPasswordController = makeForgotPasswordController()

router.post('/forgot-password', async(req, res) =>{
    await forgotPasswordController.forgotPassword(req,res)
})

export default router;