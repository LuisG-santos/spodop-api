import type { Request, Response } from "express";
import type { LoginUseCase } from "../../use-cases/auth/login.js";
import validator from "validator";
import { AppError } from "../../error/error.js";
import { checkIfEmailIsValid } from "../../helpers/user.js";

export class LoginController {
  private loginUseCase: LoginUseCase;
  constructor(loginUser: LoginUseCase) {
    this.loginUseCase = loginUser;
  }
  async login(req: Request, res: Response) {
    try {
      const params = req.body;
      const requiredFields = ["email", "password"];

      const someFieldsNotAllowed = Object.keys(params).some(
        (field) => !requiredFields.includes(field),
      );
      if (someFieldsNotAllowed) {
        return res
          .status(400)
          .json({ message: "Some provided field is not allowed" });
      }

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return res
            .status(400)
            .json({ message: `Missing field value ${field}` });
        }
      }

      if (params.email) {
        if (!checkIfEmailIsValid(params.email)) {
          return res
            .status(400)
            .json({ message: "Invalid e-mail. Please provider a valid one" });
        }
      }

      const result = await this.loginUseCase.login(
        params.email,
        params.password,
      );
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      console.log(error);
      return res.status(500).json({ message: "internal server error" });
    }
  }
}
