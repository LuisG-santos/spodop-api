import type { Request, Response } from "express";
import type { VerifyResetPasswordCodeUseCase } from "../../use-cases/resetPassword/verifyResetPassword.js";
import { AppError } from "../../error/error.js";
import { checkIfEmailIsValid } from "../../helpers/user.js";
import { invalidEmailResponse } from "../../helpers/http.js";

export class VerifyResetPasswordCodeController {
  private verifyResetPasswordUseCase: VerifyResetPasswordCodeUseCase;
  constructor(verifyResetPasswordCode: VerifyResetPasswordCodeUseCase) {
    this.verifyResetPasswordUseCase = verifyResetPasswordCode;
  }
  async verifyCode(req: Request, res: Response) {
    try {
      const code = req.body.code;
      const email = req.body.email;

      if(!checkIfEmailIsValid(email)){
       return invalidEmailResponse(res)
      }
      await this.verifyResetPasswordUseCase.verifyCode(email, code);

      return res.status(200).json({message: 'Code verified successfully'});
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error.message);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
