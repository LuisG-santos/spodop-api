import type { Request, Response } from "express";
import type { ForgotPasswordUseCase } from "../../use-cases/resetPassword/forgotPassword.js";
import { checkIfEmailIsValid } from "../../helpers/user.js";
import { AppError } from "../../error/error.js";

export class ForgotPasswordController {
  private forgotPassworduseCase: ForgotPasswordUseCase;
  constructor(forgotPassworduseCase: ForgotPasswordUseCase) {
    this.forgotPassworduseCase = forgotPassworduseCase;
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const email = req.body.email;

      if (!checkIfEmailIsValid(email)) {
        return res
          .status(400)
          .json({ message: "Invalid e-mail. Please provider a valid one" });
      }

      await this.forgotPassworduseCase.forgotPassword(email);

      return res
        .status(200)
        .json({ message: "If the email exists, a code has been sent" });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error.message);
      }
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
