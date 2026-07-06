import { Router } from "express";
import { makeCreateUserController } from "../../factories/user/createUserFactory.js";
import { makeLoginController } from "../../factories/auth/loginFactory.js";
import { makeForgotPasswordController } from "../../factories/resetPassword/forgotPasswordFactory.js";
import { makeVerifyResetPasswordCodeController } from "../../factories/resetPassword/verifyResetPasswordCodeFactory.js";
import { makeResetPasswordController } from "../../factories/resetPassword/resetPasswordFactory.js";


const router: Router = Router();

const createUserController = makeCreateUserController();
const loginController = makeLoginController();
const forgotPasswordController = makeForgotPasswordController()
const verifyPasswordCodeController = makeVerifyResetPasswordCodeController()
const resetPasswordController = makeResetPasswordController()

router.post("/register", async (req, res) => {
  await createUserController.create(req, res);
});

router.post("/login", async (req, res) => {
  await loginController.login(req, res);
});

router.post('/forgot-password', async(req, res) =>{
    await forgotPasswordController.forgotPassword(req,res)
})

router.post('/verify-code', async (req, res) =>{
    await verifyPasswordCodeController.verifyCode(req,res)
})

router.post('/reset-password', async(req,res) => {
    await resetPasswordController.resetPassword(req,res)
})

export default router;
