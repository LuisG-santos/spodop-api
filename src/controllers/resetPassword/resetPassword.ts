import type { Request, Response } from "express";
import { AppError } from "../../error/error.js";
import type { ResetUserPasswordUseCase } from "../../use-cases/resetPassword/resetPassword.js";
import { checkIfEmailIsValid, checkIfPasswordIsValid } from "../../helpers/user.js";
import { invalidEmailResponse, invalidPasswordResponse } from "../../helpers/http.js";

export class ResetPasswordController {
  private resetUserPasswordUseCase: ResetUserPasswordUseCase;
  constructor(resetUserPassword: ResetUserPasswordUseCase) {
    this.resetUserPasswordUseCase = resetUserPassword;
  }

  async resetPassword(req: Request, res: Response) {
    try {
        const email = req.body.email
        const code = req.body.code
        const newPassword = req.body.newPassword

        if(!checkIfEmailIsValid(email)){
            return invalidEmailResponse(res)
        }

        if(!code){
            return res.status(400).json({message: "Verification code is required"})
        }

        if(!checkIfPasswordIsValid(newPassword)){
            return invalidPasswordResponse(res)
        }

        await this.resetUserPasswordUseCase.updatePassword(email,code, newPassword)

        return res.status(200).json({message: 'Password has been updated'})
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error.message);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
